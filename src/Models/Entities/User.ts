import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { TokenLog } from "./TokenLog";

@Entity("user", { schema: "heroku_ce952358d978f73" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "firstName", length: 20 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 30 })
  lastName: string;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("smallint", { name: "role", default: () => "'0'" })
  role: number;

  @Column("tinyint", { name: "isConfirmed", default: () => "'0'" })
  isConfirmed: number;

  @Column("varchar", { name: "address", length: 100 })
  address: string;

  @Column("date", { name: "dateOfBirh" })
  dateOfBirh: string;

  @Column("varchar", { name: "telephoneNumber", length: 100 })
  telephoneNumber: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("varchar", { name: "refreshToken", nullable: true, length: 300 })
  refreshToken: string | null;

  @Column("timestamp", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("datetime", { name: "archivedAt", nullable: true })
  archivedAt: Date | null;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => TokenLog, (tokenlog) => tokenlog.user)
  tokenlogs: TokenLog[];
}
