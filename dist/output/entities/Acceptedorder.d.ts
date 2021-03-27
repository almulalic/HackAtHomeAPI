import { Order } from "./Order";
import { User } from "./User";
export declare class Acceptedorder {
    id: number;
    courrierId: number;
    orderId: number;
    progressStep: number;
    createdAt: Date;
    modifiedAt: Date | null;
    archivedAt: Date;
    order: Order;
    courrier: User;
}
