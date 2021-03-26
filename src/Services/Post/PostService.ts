import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { IPostService } from "./../Contracts/IPostService";
import { PostBodyDTO } from "./DTO/PostBodyDTO";

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectEntityManager()
    private EntityManager: EntityManager
  ) {}

  public async GetAllPosts(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async CreatePost(body: PostBodyDTO): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
