import { EntityManager } from "typeorm";
import { IPostService } from "./../Contracts/IPostService";
import { PostBodyDTO } from "./DTO/PostBodyDTO";
import { Post } from "src/Models/Entities";
import { PostFilterDTO } from "./DTO/PostFilterDTO";
export declare class PostService implements IPostService {
    private EntityManager;
    constructor(EntityManager: EntityManager);
    GetAllPosts(filterParams: PostFilterDTO): Promise<Post[]>;
    CreatePost(body: PostBodyDTO): Promise<string>;
}
