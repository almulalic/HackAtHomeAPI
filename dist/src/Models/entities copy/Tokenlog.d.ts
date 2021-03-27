import { User } from "./User";
export declare class Tokenlog {
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
