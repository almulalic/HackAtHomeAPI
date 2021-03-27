import { Acceptedorder } from "./Acceptedorder";
import { Order } from "./Order";
import { Post } from "./Post";
import { Tokenlog } from "./Tokenlog";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    isConfirmed: number;
    address: string;
    dateOfBirh: string;
    telephoneNumber: string;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
    modifiedAt: Date;
    archivedAt: Date | null;
    acceptedorders: Acceptedorder[];
    orders: Order[];
    posts: Post[];
    tokenlogs: Tokenlog[];
}
