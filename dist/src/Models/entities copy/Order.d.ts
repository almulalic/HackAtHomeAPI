import { Acceptedorder } from "./Acceptedorder";
import { User } from "./User";
export declare class Order {
    id: number;
    userId: number;
    orderList: string;
    message: string;
    budget: number;
    createdAt: Date | null;
    archivedAt: Date | null;
    modifiedAt: Date;
    acceptedorders: Acceptedorder[];
    user: User;
}
