import { User } from "./User";
export declare class TokenLog {
    id: number;
    userId: number;
    token: string;
    tokenType: number;
    isValid: boolean;
    duration: number;
    expiresAt: Date;
    createdAt: Date;
    modifiedAt: Date;
    user: User;
}
