import { User } from "../../Models/Entities/User";
export declare class Mailer {
    static SendConfirmationEmail: (identity: User, token: string) => Promise<string>;
    static ResendConfirmationEmail: (identity: User, token: string) => Promise<string>;
    static SendResetPasswordEmail: (identity: User, token: string) => Promise<unknown>;
    static SendGenericEmail: (body: any) => Promise<void>;
}
