"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const typeorm_1 = require("typeorm");
const Credential_1 = require("../../Common/Credential");
const typeorm_2 = require("@nestjs/typeorm");
const TokenUserDTO_1 = require("./DTO/TokenUserDTO");
const TokenLogger_1 = require("../../Common/TokenLogger");
const common_1 = require("@nestjs/common");
const responseMessages = require("../../../responseMessages.config.json");
const Mailer_1 = require("../../Microservices/Mail/Mailer");
const Entities_1 = require("../../Models/Entities");
let IdentityService = class IdentityService {
    constructor(EntityManager, TokenLogger) {
        this.EntityManager = EntityManager;
        this.TokenLogger = TokenLogger;
    }
    async IsEmailTaken(email) {
        return (await this.EntityManager.getRepository(Entities_1.User).findOne({ email: email })) !== undefined;
    }
    async Register(dto) {
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({ email: dto.email });
        if (user)
            throw new common_1.HttpException(responseMessages.identity.register.emailAlreadyInUse, common_1.HttpStatus.BAD_REQUEST);
        let newUser = dto;
        newUser.password = await Credential_1.Credential.EncryptPassword(newUser.password);
        newUser.id = (await this.EntityManager.getRepository(Entities_1.User).insert(newUser)).generatedMaps[0].id;
        let confirmationToken = await Credential_1.Credential.GenerateConfirmationToken(newUser.id, "1d");
        await this.TokenLogger.AddNewTokenLog(confirmationToken, "1d", TokenLogger_1.TokenType.AccountConfirmationToken, newUser.id);
        let confirmationMailResponse = await Mailer_1.Mailer.SendConfirmationEmail(newUser, confirmationToken);
        return responseMessages.identity.register.success + confirmationMailResponse;
    }
    async ResendConfirmationToken(dto) {
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({ email: dto.email });
        if (!Entities_1.User)
            throw new common_1.HttpException(responseMessages.identity.resendConfirmation.nonExistingUser, common_1.HttpStatus.BAD_REQUEST);
        else if (user.isConfirmed)
            throw new common_1.HttpException(responseMessages.identity.resendConfirmation.alreadyConfirmed, common_1.HttpStatus.BAD_REQUEST);
        let newConfirmationToken = await Credential_1.Credential.GenerateConfirmationToken(user.id, "1d");
        this.TokenLogger.AddNewTokenLog(newConfirmationToken, "1d", TokenLogger_1.TokenType.AccountConfirmationToken, user.id);
        return await Mailer_1.Mailer.ResendConfirmationEmail(user, newConfirmationToken);
    }
    async ChangeConfirmationEmail(dto) {
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({ email: dto.email });
        if (!user)
            throw new common_1.HttpException(responseMessages.identity.resendConfirmation.nonExistingUser, common_1.HttpStatus.BAD_REQUEST);
        else if (user.isConfirmed)
            throw new common_1.HttpException(responseMessages.identity.resendConfirmation.alreadyConfirmed, common_1.HttpStatus.BAD_REQUEST);
        if (!(await Credential_1.Credential.DecryptPassword(dto.password, user.password)))
            throw new common_1.HttpException(responseMessages.identity.login.userNotFound, common_1.HttpStatus.FORBIDDEN);
        user.email = dto.newEmail;
        await this.EntityManager.getRepository(Entities_1.User).save(user);
        return responseMessages.identity.resendConfirmation.success;
    }
    async ConfirmIdentity(token) {
        let tokenLog = await this.TokenLogger.GetToken(token);
        if (!tokenLog || tokenLog.isValid === false)
            throw new common_1.HttpException(responseMessages.identity.confirmIdentity.tokenExpieredOrInvalid, common_1.HttpStatus.BAD_REQUEST);
        let decodedToken;
        try {
            decodedToken = await Credential_1.Credential.DecodeRegisterConfirmationToken(tokenLog.token);
        }
        catch (err) {
            throw new common_1.HttpException(responseMessages.identity.confirmIdentity.tokenMalformed, common_1.HttpStatus.BAD_REQUEST);
        }
        let confirmedUser = await this.EntityManager.getRepository(Entities_1.User).findOne({
            id: decodedToken.identityId,
        });
        if (confirmedUser.isConfirmed)
            throw new common_1.HttpException(responseMessages.identity.confirmIdentity.alreadyConfirmed, common_1.HttpStatus.BAD_REQUEST);
        confirmedUser.isConfirmed = 1;
        await this.TokenLogger.InvalidateToken(tokenLog);
        await this.EntityManager.getRepository(Entities_1.User).save(confirmedUser);
        return responseMessages.identity.confirmIdentity.success;
    }
    async ResetPassword(dto) {
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({ email: dto.email });
        if (!user)
            throw new common_1.HttpException(responseMessages.identity.passwordResetRequest.nonExistingIdentity, common_1.HttpStatus.BAD_REQUEST);
        let token = await Credential_1.Credential.GenerateResetPasswordToken(user, "24h");
        this.TokenLogger.AddNewTokenLog(token, "24h", TokenLogger_1.TokenType.PasswordResetToken, user.id);
        await Mailer_1.Mailer.SendResetPasswordEmail(user, token);
        return responseMessages.identity.passwordResetRequest.success;
    }
    async ConfimPasswordReset(dto) {
        let tokenLog = await this.TokenLogger.GetToken(dto.token);
        if (!tokenLog || !tokenLog.isValid)
            throw new common_1.HttpException(responseMessages.identity.passwordResetConfirmation.tokenExpieredOrInvalid, common_1.HttpStatus.BAD_REQUEST);
        let decodedToken;
        try {
            decodedToken = await Credential_1.Credential.DecodePasswordResetToken(dto.token);
        }
        catch (err) {
            throw new common_1.HttpException(responseMessages.identity.passwordResetConfirmation.tokenMalformed, common_1.HttpStatus.BAD_REQUEST);
        }
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({
            id: decodedToken.id,
        });
        if (!user)
            throw new common_1.HttpException(responseMessages.identity.passwordResetConfirmation.nonExistingIdentity, common_1.HttpStatus.BAD_REQUEST);
        user.password = await Credential_1.Credential.EncryptPassword(dto.newPassword);
        await this.TokenLogger.InvalidateToken(tokenLog);
        await this.EntityManager.getRepository(Entities_1.User).save(user);
        return responseMessages.identity.passwordResetConfirmation.success;
    }
    async Login(dto) {
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({ email: dto.email });
        if (!user)
            throw new common_1.HttpException(responseMessages.identity.login.userNotFound, common_1.HttpStatus.NOT_FOUND);
        if (!user.isConfirmed)
            throw new common_1.HttpException(responseMessages.identity.login.notConfirmed, common_1.HttpStatus.BAD_REQUEST);
        if (!(await Credential_1.Credential.DecryptPassword(dto.password, user.password)))
            throw new common_1.HttpException(responseMessages.identity.login.wrongPassword, common_1.HttpStatus.FORBIDDEN);
        let tokenUser = new TokenUserDTO_1.TokenUserDTO(user);
        let refreshToken = await Credential_1.Credential.GenerateRefreshToken(tokenUser, "1h");
        user.refreshToken = refreshToken;
        await this.EntityManager.getRepository(Entities_1.User).save(user);
        return {
            access_token: await Credential_1.Credential.GenerateAccessToken(tokenUser, "1h"),
            refresh_token: refreshToken,
        };
    }
    async RefreshToken(dto) {
        if (!dto.refreshToken || dto.refreshToken === null)
            throw new common_1.HttpException(responseMessages.identity.refresh.nonExistingRefreshToken, common_1.HttpStatus.UNAUTHORIZED);
        let user = await this.EntityManager.getRepository(Entities_1.User).findOne({
            refreshToken: dto.refreshToken,
        });
        if (!user)
            throw new common_1.HttpException(responseMessages.identity.login.userNotFound, common_1.HttpStatus.NOT_FOUND);
        if (!(await Credential_1.Credential.VerifyJWT(dto.refreshToken)))
            throw new common_1.HttpException(responseMessages.identity.refresh.nonExistingRefreshToken, common_1.HttpStatus.UNAUTHORIZED);
        return {
            accessToken: await Credential_1.Credential.GenerateAccessToken(new TokenUserDTO_1.TokenUserDTO(user), "1h"),
        };
    }
};
IdentityService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager,
        TokenLogger_1.TokenLogger])
], IdentityService);
exports.IdentityService = IdentityService;
//# sourceMappingURL=IdentityService.js.map