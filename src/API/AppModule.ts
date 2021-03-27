import { Module } from "@nestjs/common";
import {
  DbModule,
  IdentityModule,
  PostModule,
  OrderModule,
  AcceptedOrderModule,
  TokenLogModule,
  WebhookModule,
} from "./Modules";

@Module({
  imports: [
    DbModule,
    IdentityModule,
    PostModule,
    OrderModule,
    AcceptedOrderModule,
    TokenLogModule,
    WebhookModule,
  ],

  exports: [TokenLogModule],
})
export class AppModule {}
