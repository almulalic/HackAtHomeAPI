import {
  RegisterDTO,
  LoginDTO,
  LoginResponseDTO,
  ResendConfirmationDTO,
  ChangeConfirmationEmailDTO,
  ConfirmResetPasswordDTO,
  ResetPasswordDTO,
} from "./DTO";
import { EntityManager } from "typeorm";
import { Credential } from "../../Common/Credential";
import { InjectEntityManager } from "@nestjs/typeorm";
import { RefreshTokenDTO } from "./DTO/RefreshTokenDTO";
import { TokenUserDTO } from "./DTO/TokenUserDTO";
import { TokenLogger, TokenType } from "../../Common/TokenLogger";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as responseMessages from "../../../responseMessages.config.json";
import { Mailer } from "../../Microservices/Mail/Mailer";
import { IIdentityService } from "../Contracts/IIdentityService";
import { User, TokenLog } from "../../Models/Entities";

@Injectable()
export class IdentityService implements IIdentityService {
  constructor(
    @InjectEntityManager()
    private EntityManager: EntityManager,
    private TokenLogger: TokenLogger
  ) {}

  public async IsEmailTaken(email: string): Promise<boolean> {
    return (await this.EntityManager.getRepository(User).findOne({ email: email })) !== undefined;
  }

  public async Register(dto: RegisterDTO): Promise<string> {
    let user: User = await this.EntityManager.getRepository(User).findOne({ email: dto.email });
    if (user)
      throw new HttpException(responseMessages.identity.register.emailAlreadyInUse, HttpStatus.BAD_REQUEST);

    let newUser: User = dto;
    newUser.password = await Credential.EncryptPassword(newUser.password);
    newUser.id = (await this.EntityManager.getRepository(User).insert(newUser)).generatedMaps[0].id;

    let confirmationToken: string = await Credential.GenerateConfirmationToken(newUser.id, "1d");
    await this.TokenLogger.AddNewTokenLog(
      confirmationToken,
      "1d",
      TokenType.AccountConfirmationToken,
      newUser.id
    );
    let confirmationMailResponse = await Mailer.SendConfirmationEmail(newUser, confirmationToken);

    return responseMessages.identity.register.success + confirmationMailResponse;
  }

  public async ResendConfirmationToken(dto: ResendConfirmationDTO): Promise<string> {
    let user: User = await this.EntityManager.getRepository(User).findOne({ email: dto.email });

    if (!User)
      throw new HttpException(
        responseMessages.identity.resendConfirmation.nonExistingUser,
        HttpStatus.BAD_REQUEST
      );
    else if (user.isConfirmed)
      throw new HttpException(
        responseMessages.identity.resendConfirmation.alreadyConfirmed,
        HttpStatus.BAD_REQUEST
      );

    let newConfirmationToken = await Credential.GenerateConfirmationToken(user.id, "1d");
    this.TokenLogger.AddNewTokenLog(newConfirmationToken, "1d", TokenType.AccountConfirmationToken, user.id);

    return await Mailer.ResendConfirmationEmail(user, newConfirmationToken);
  }

  public async ChangeConfirmationEmail(dto: ChangeConfirmationEmailDTO): Promise<string> {
    let user: User = await this.EntityManager.getRepository(User).findOne({ email: dto.email });

    if (!user)
      throw new HttpException(
        responseMessages.identity.resendConfirmation.nonExistingUser,
        HttpStatus.BAD_REQUEST
      );
    else if (user.isConfirmed)
      throw new HttpException(
        responseMessages.identity.resendConfirmation.alreadyConfirmed,
        HttpStatus.BAD_REQUEST
      );

    if (!(await Credential.DecryptPassword(dto.password, user.password)))
      throw new HttpException(responseMessages.identity.login.userNotFound, HttpStatus.FORBIDDEN);

    user.email = dto.newEmail;

    await this.EntityManager.getRepository(User).save(user);

    return responseMessages.identity.resendConfirmation.success;
  }

  public async ConfirmIdentity(token: string): Promise<string> {
    let tokenLog: TokenLog = await this.TokenLogger.GetToken(token);

    if (!tokenLog || tokenLog.isValid === false)
      throw new HttpException(
        responseMessages.identity.confirmIdentity.tokenExpieredOrInvalid,
        HttpStatus.BAD_REQUEST
      );

    let decodedToken;

    try {
      decodedToken = await Credential.DecodeRegisterConfirmationToken(tokenLog.token);
    } catch (err) {
      throw new HttpException(
        responseMessages.identity.confirmIdentity.tokenMalformed,
        HttpStatus.BAD_REQUEST
      );
    }

    let confirmedUser: User = await this.EntityManager.getRepository(User).findOne({
      id: decodedToken.identityId,
    });

    if (confirmedUser.isConfirmed)
      throw new HttpException(
        responseMessages.identity.confirmIdentity.alreadyConfirmed,
        HttpStatus.BAD_REQUEST
      );

    confirmedUser.isConfirmed = 1;

    await this.TokenLogger.InvalidateToken(tokenLog);

    await this.EntityManager.getRepository(User).save(confirmedUser);

    return responseMessages.identity.confirmIdentity.success;
  }

  public async ResetPassword(dto: ResetPasswordDTO): Promise<string> {
    let user: User = await this.EntityManager.getRepository(User).findOne({ email: dto.email });

    if (!user)
      throw new HttpException(
        responseMessages.identity.passwordResetRequest.nonExistingIdentity,
        HttpStatus.BAD_REQUEST
      );

    let token = await Credential.GenerateResetPasswordToken(user, "24h");

    this.TokenLogger.AddNewTokenLog(token, "24h", TokenType.PasswordResetToken, user.id);

    await Mailer.SendResetPasswordEmail(user, token);

    return responseMessages.identity.passwordResetRequest.success;
  }

  public async ConfimPasswordReset(dto: ConfirmResetPasswordDTO): Promise<string> {
    let tokenLog: TokenLog = await this.TokenLogger.GetToken(dto.token);

    if (!tokenLog || !tokenLog.isValid)
      throw new HttpException(
        responseMessages.identity.passwordResetConfirmation.tokenExpieredOrInvalid,
        HttpStatus.BAD_REQUEST
      );

    let decodedToken;

    try {
      decodedToken = await Credential.DecodePasswordResetToken(dto.token);
    } catch (err) {
      throw new HttpException(
        responseMessages.identity.passwordResetConfirmation.tokenMalformed,
        HttpStatus.BAD_REQUEST
      );
    }

    let user: User = await this.EntityManager.getRepository(User).findOne({
      id: decodedToken.id,
    });

    if (!user)
      throw new HttpException(
        responseMessages.identity.passwordResetConfirmation.nonExistingIdentity,
        HttpStatus.BAD_REQUEST
      );

    user.password = await Credential.EncryptPassword(dto.newPassword);

    await this.TokenLogger.InvalidateToken(tokenLog);

    await this.EntityManager.getRepository(User).save(user);

    return responseMessages.identity.passwordResetConfirmation.success;
  }

  public async Login(dto: LoginDTO): Promise<LoginResponseDTO> {
    let user: User = await this.EntityManager.getRepository(User).findOne({ email: dto.email });

    if (!user) throw new HttpException(responseMessages.identity.login.userNotFound, HttpStatus.NOT_FOUND);

    if (!user.isConfirmed)
      throw new HttpException(responseMessages.identity.login.notConfirmed, HttpStatus.BAD_REQUEST);

    if (!(await Credential.DecryptPassword(dto.password, user.password)))
      throw new HttpException(responseMessages.identity.login.wrongPassword, HttpStatus.FORBIDDEN);

    let tokenUser: TokenUserDTO = new TokenUserDTO(user);

    let refreshToken = await Credential.GenerateRefreshToken(tokenUser, "1h");

    user.refreshToken = refreshToken;

    await this.EntityManager.getRepository(User).save(user);

    return {
      access_token: await Credential.GenerateAccessToken(tokenUser, "1h"),
      refresh_token: refreshToken,
    };
  }

  public async RefreshToken(dto: RefreshTokenDTO): Promise<any> {
    if (!dto.refreshToken || dto.refreshToken === null)
      throw new HttpException(
        responseMessages.identity.refresh.nonExistingRefreshToken,
        HttpStatus.UNAUTHORIZED
      );

    let user: User = await this.EntityManager.getRepository(User).findOne({
      refreshToken: dto.refreshToken,
    });

    if (!user) throw new HttpException(responseMessages.identity.login.userNotFound, HttpStatus.NOT_FOUND);

    if (!(await Credential.VerifyJWT(dto.refreshToken)))
      throw new HttpException(
        responseMessages.identity.refresh.nonExistingRefreshToken,
        HttpStatus.UNAUTHORIZED
      );

    return {
      accessToken: await Credential.GenerateAccessToken(new TokenUserDTO(user), "1h"),
    };
  }
}
