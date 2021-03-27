import { Post } from "src/Models/Entities";
import { PostBodyDTO } from "../Post/DTO/PostBodyDTO";
export interface IPostService {
    GetAllPosts(filterParams: any): Promise<Post[]>;
    CreatePost(body: PostBodyDTO): Promise<string>;
}
