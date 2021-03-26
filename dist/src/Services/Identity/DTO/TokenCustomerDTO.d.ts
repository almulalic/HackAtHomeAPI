import { Customer } from '../../../Models/Entities';
export declare class TokenCustomerDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    address: string;
    telephoneNumber: string;
    constructor(customer: Customer);
}
