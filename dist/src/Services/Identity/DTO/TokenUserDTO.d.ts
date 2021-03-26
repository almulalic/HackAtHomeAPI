import { User } from "../../../Models/Entities";
export declare class TokenUserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    telephoneNumber: string;
    constructor(User: User);
}
