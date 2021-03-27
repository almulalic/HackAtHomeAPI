import { Order } from "../../Models/Entities/Order";

export interface IOrderService {
  CreateOrder(body): Promise<boolean>;
  GetAllOrders(): Promise<Order[]>;
  GetOrder(id): Promise<Order>;
}
