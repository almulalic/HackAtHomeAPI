import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Index("post_user_id_fk", ["userId"], {})
@Index("post_cateogry_id_fk", ["categoryId"], {})
@Entity("post", { schema: "heroku_ce952358d978f73" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("int", { name: "categoryId", nullable: true })
  categoryId: number | null;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @Column("datetime", {
    name: "createdAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("varchar", { name: "message", length: 100 })
  message: string;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
