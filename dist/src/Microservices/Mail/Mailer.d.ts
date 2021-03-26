import { Customer } from '../../Models/Entities/Customer';
export declare class Mailer {
    static SendConfirmationEmail: (identity: Customer, token: string) => Promise<string>;
    static ResendConfirmationEmail: (identity: Customer, token: string) => Promise<string>;
    static SendResetPasswordEmail: (identity: Customer, token: string) => Promise<unknown>;
    static SendGenericEmail: (body: any) => Promise<void>;
}
