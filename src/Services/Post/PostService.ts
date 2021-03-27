import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { IPostService } from "./../Contracts/IPostService";
import { PostBodyDTO } from "./DTO/PostBodyDTO";
import { Post } from "src/Models/Entities";
import { PostFilterDTO } from "./DTO/PostFilterDTO";

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectEntityManager()
    private EntityManager: EntityManager
  ) {}

  public async GetAllPosts(filterParams : PostFilterDTO): Promise<Post[]> {
    let t : Post[] = await this.EntityManager.getRepository(Post).createQueryBuilder().getMany();
    if(filterParams.categoryId >= 0)
      return t.filter(x => x.categoryId==filterParams.categoryId);
    else return t;
  }

  public async CreatePost(body: PostBodyDTO): Promise<string> {
    await this.EntityManager.getRepository(Post).insert(body);
    return "Uspjesno dodan Post";
  }
}