import { EntityManager } from "typeorm";
import { IWebhookService } from "../Contracts/IWebhookService";
export declare class WebhookService implements IWebhookService {
    private EntityManager;
    constructor(EntityManager: EntityManager);
    CovidPositivityCalculator(surveryResponses: any): Promise<any>;
}
