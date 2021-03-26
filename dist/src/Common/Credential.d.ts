import { Customer } from '../Models/Entities';
import { TokenCustomerDTO } from '../Services/Identity/DTO';
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
    static GenerateAccessToken(tokenCustomer: TokenCustomerDTO, duration: string): Promise<string>;
    static GenerateRefreshToken(tokenCustomer: TokenCustomerDTO, duration: string): Promise<string>;
    static GenerateResetPasswordToken(identity: Customer, duration: string): Promise<string>;
}
