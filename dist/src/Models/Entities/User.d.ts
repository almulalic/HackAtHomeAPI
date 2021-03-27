import { AcceptedOrder } from "./AcceptedOrder";
import { Order } from "./Order";
import { Post } from "./Post";
import { TokenLog } from "./TokenLog";
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
    acceptedorders: AcceptedOrder[];
    orders: Order[];
    posts: Post[];
    tokenlogs: TokenLog[];
}
