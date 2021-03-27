import { WebhookService } from "./../../Services/Webhook/WebhookService";
import { OrderService } from "./../../Services/Order/OrderService";
export declare class WebhookController {
    private readonly WebhookService;
    private readonly OrderService;
    constructor(WebhookService: WebhookService, OrderService: OrderService);
    validateToken(query: any): Promise<any>;
    WebhookInvocator(query: any, body: any): Promise<any>;
}
