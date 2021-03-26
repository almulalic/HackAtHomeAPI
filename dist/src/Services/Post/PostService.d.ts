import { EntityManager } from "typeorm";
import { IPostService } from "./../Contracts/IPostService";
import { PostBodyDTO } from "./DTO/PostBodyDTO";
export declare class PostService implements IPostService {
    private EntityManager;
    constructor(EntityManager: EntityManager);
    GetAllPosts(email: string): Promise<boolean>;
    CreatePost(body: PostBodyDTO): Promise<string>;
}
