import { EntityManager } from 'typeorm';
import { TokenLog } from '../Models/Entities';
export declare enum TokenType {
    AccountConfirmationToken = 1,
    PasswordResetToken = 2
}
export declare enum EntityType {
    Customer = 1
}
export declare class TokenLogger {
    private readonly EntityManager;
    private readonly tokenLogScope;
    constructor(EntityManager: EntityManager);
    ClearPreviousTokens(tokenType: TokenType, identityId: number): Promise<boolean>;
    InvalidateTokenById(tokenId: number): Promise<void>;
    InvalidateToken(tokenLog: TokenLog): Promise<void>;
    GetToken(token: string): Promise<TokenLog>;
    AddNewTokenLog(token: string, duration: string, tokenType: TokenType, identityId: number): Promise<void>;
}
