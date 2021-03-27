import { OkResponse } from "src/Common";
import { Post as PostModel } from "src/Models/Entities";
import { PostBodyDTO } from "src/Services/Post/DTO/PostBodyDTO";
import { PostService } from "./../../Services/Post/PostService";
export declare class PostController {
    private readonly PostService;
    constructor(PostService: PostService);
    GetAllPosts(query: any): Promise<PostModel[]>;
    CreatePost(body: PostBodyDTO): Promise<OkResponse>;
}
