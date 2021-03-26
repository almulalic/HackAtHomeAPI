import { User } from "../../../Models/Entities";
export declare class RegisterDTO extends User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    telephoneNumber: string;
}
