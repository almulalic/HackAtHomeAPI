import { Module } from "@nestjs/common";
import { DbModule, IdentityModule, TokenLogModule } from "./Modules";

@Module({
  imports: [DbModule, IdentityModule, TokenLogModule],

  exports: [TokenLogModule],
})
export class AppModule {}
