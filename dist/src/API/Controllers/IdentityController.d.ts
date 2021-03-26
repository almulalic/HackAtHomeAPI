import { RegisterDTO, LoginDTO, LoginResponseDTO, RefreshTokenDTO, RefreshTokenResponseDTO, ResendConfirmationDTO, ResetPasswordDTO, ConfirmResetPasswordDTO } from "../../Services/Identity/DTO";
import { OkResponse } from "../../Common";
import { IdentityService } from "../../Services/Identity/IdentityService";
import { ChangeConfirmationEmailDTO } from "./../../Services/Identity/DTO/ChangeConfirmationEmailDTO";
export declare class IdentityController {
    private readonly IdentityService;
    constructor(IdentityService: IdentityService);
    IsEmailTaken(email: string): Promise<OkResponse>;
    Register(body: RegisterDTO): Promise<OkResponse>;
    ResendConfirmationToken(body: ResendConfirmationDTO): Promise<OkResponse>;
    ConfirmIdentity(token: string): Promise<OkResponse>;
    ChangeConfirmationEmail(body: ChangeConfirmationEmailDTO): Promise<OkResponse>;
    ResetPassword(body: ResetPasswordDTO): Promise<OkResponse>;
    ConfimPasswordReset(body: ConfirmResetPasswordDTO): Promise<OkResponse>;
    Login(dto: LoginDTO): Promise<LoginResponseDTO>;
    RefreshToken(body: RefreshTokenDTO): Promise<RefreshTokenResponseDTO>;
}
