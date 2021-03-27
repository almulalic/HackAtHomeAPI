import { Module } from "@nestjs/common";
import { OrderService } from "./../../Services/Order/OrderService";

@Module({
  controllers: [],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
