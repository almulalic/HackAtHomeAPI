import { EntityManager } from "typeorm";
import { IOrderService } from "../Contracts/IOrderService";
export declare class OrderService implements IOrderService {
    private EntityManager;
    constructor(EntityManager: EntityManager);
    CreateOrder(body: any): Promise<any>;
    GetAllOrders(): Promise<any[]>;
    GetOrder(id: any): Promise<any>;
}
