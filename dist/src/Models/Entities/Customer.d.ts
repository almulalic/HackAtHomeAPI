export declare class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    isConfirmed: boolean;
    address: string;
    telephoneNumber: string;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
    modifiedAt: Date;
    archivedAt: Date | null;
}
