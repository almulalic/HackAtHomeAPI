import { User } from "../Models/Entities";
import { TokenUserDTO } from "../Services/Identity/DTO";
export declare class Credential {
    private static readonly _salt;
    private static readonly _jwtEmailSecret;
    private static readonly _jwtAccessSecret;
    private static readonly _jwtRefreshSecret;
    private static readonly _resetPasswordResetSecret;
    static EncryptPassword(password: string): Promise<string>;
    static DecryptPassword(recievedPassword: string, password: string): Promise<boolean>;
    static VerifyJWT(refreshToken: string): Promise<boolean>;
    static GenerateConfirmationToken(id: number, duration: string): Promise<string>;
    static DecodeRegisterConfirmationToken(token: string): Promise<any>;
    static DecodePasswordResetToken(token: string): Promise<any>;
    static GenerateAccessToken(TokenUser: TokenUserDTO, duration: string): Promise<string>;
    static GenerateRefreshToken(TokenUser: TokenUserDTO, duration: string): Promise<string>;
    static GenerateResetPasswordToken(identity: User, duration: string): Promise<string>;
}
