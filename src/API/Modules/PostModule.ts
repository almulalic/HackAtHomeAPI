import { Module } from "@nestjs/common";
import { PostService } from "../../Services/Post/PostService";
import { PostController } from "../Controllers/PostController";

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
