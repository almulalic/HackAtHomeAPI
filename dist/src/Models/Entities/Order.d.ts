import { AcceptedOrder } from "./AcceptedOrder";
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
    acceptedorders: AcceptedOrder[];
    user: User;
}
