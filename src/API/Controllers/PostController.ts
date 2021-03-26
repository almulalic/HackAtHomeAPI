import { Controller } from "@nestjs/common";
import { PostService } from "./../../Services/Post/PostService";

@Controller("post")
export class PostController {
  constructor(private readonly PostService: PostService) {}
}
