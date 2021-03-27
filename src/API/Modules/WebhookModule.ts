import { Module } from "@nestjs/common";
import { OrderService } from "../../Services/Order/OrderService";
import { WebhookController } from "../Controllers/WebhookController";
import { WebhookService } from "./../../Services/Webhook/WebhookService";

@Module({
  imports: [],
  controllers: [WebhookController],
  providers: [WebhookService, OrderService],
  exports: [WebhookService, OrderService],
})
export class WebhookModule {}
