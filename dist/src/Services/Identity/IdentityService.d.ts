import { RegisterDTO, LoginDTO, LoginResponseDTO, ResendConfirmationDTO, ChangeConfirmationEmailDTO, ConfirmResetPasswordDTO, ResetPasswordDTO } from "./DTO";
import { EntityManager } from "typeorm";
import { RefreshTokenDTO } from "./DTO/RefreshTokenDTO";
import { TokenLogger } from "../../Common/TokenLogger";
import { IIdentityService } from "../Contracts/IIdentityService";
export declare class IdentityService implements IIdentityService {
    private EntityManager;
    private TokenLogger;
    constructor(EntityManager: EntityManager, TokenLogger: TokenLogger);
    IsEmailTaken(email: string): Promise<boolean>;
    Register(dto: RegisterDTO): Promise<string>;
    ResendConfirmationToken(dto: ResendConfirmationDTO): Promise<string>;
    ChangeConfirmationEmail(dto: ChangeConfirmationEmailDTO): Promise<string>;
    ConfirmIdentity(token: string): Promise<string>;
    ResetPassword(dto: ResetPasswordDTO): Promise<string>;
    ConfimPasswordReset(dto: ConfirmResetPasswordDTO): Promise<string>;
    Login(dto: LoginDTO): Promise<LoginResponseDTO>;
    RefreshToken(dto: RefreshTokenDTO): Promise<any>;
}
