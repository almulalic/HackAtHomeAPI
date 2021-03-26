import { PostBodyDTO } from "../Post/DTO/PostBodyDTO";
export interface IPostService {
    GetAllPosts(email: string): Promise<boolean>;
    CreatePost(body: PostBodyDTO): Promise<string>;
}
