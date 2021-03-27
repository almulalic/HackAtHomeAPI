import { Body, Controller, Get, Query, Post } from "@nestjs/common";
import { Ok, OkResponse } from "src/Common";
import { Post as PostModel } from "src/Models/Entities";
import { PostBodyDTO } from "src/Services/Post/DTO/PostBodyDTO";
import { PostService } from "./../../Services/Post/PostService";

@Controller("post")
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Get("/getAllPosts")
  public async GetAllPosts(@Query() query): Promise<PostModel[]> {
    return await this.PostService.GetAllPosts(query);
  }

  @Post("/createPost")
  public async CreatePost(@Body() body: PostBodyDTO): Promise<OkResponse> {
    return Ok(await this.PostService.CreatePost(body));
  }
}
