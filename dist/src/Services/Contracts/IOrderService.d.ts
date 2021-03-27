import { Order } from "../../Models/Entities/Order";
export interface IOrderService {
    CreateOrder(body: any): Promise<boolean>;
    GetAllOrders(): Promise<Order[]>;
    GetOrder(id: any): Promise<Order>;
}
