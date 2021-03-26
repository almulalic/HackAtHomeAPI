import { Module } from "@nestjs/common";
import { DbModule, IdentityModule, PostModule, TokenLogModule } from "./Modules";

@Module({
  imports: [DbModule, IdentityModule, PostModule, TokenLogModule],

  exports: [TokenLogModule],
})
export class AppModule {}
