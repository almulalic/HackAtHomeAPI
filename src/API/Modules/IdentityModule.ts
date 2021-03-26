import { Module } from "@nestjs/common";
import { IdentityService } from "../../Services/Identity/IdentityService";
import { IdentityController } from "../Controllers";
import { TokenLogger } from "./../../Common/TokenLogger";

@Module({
  imports: [],
  controllers: [IdentityController],
  providers: [IdentityService, TokenLogger],
  exports: [IdentityService],
})
export class IdentityModule {}
