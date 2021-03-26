import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity("category", { schema: "heroku_ce952358d978f73" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
