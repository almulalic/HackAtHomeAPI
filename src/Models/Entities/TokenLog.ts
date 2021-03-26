import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Index("tokens_user_id_fk", ["userId"], {})
@Entity("tokenlog", { schema: "heroku_ce952358d978f73" })
export class TokenLog {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("longtext", { name: "token" })
  token: string;

  @Column("int", { name: "tokenType" })
  tokenType: number;

  @Column("tinyint", { name: "isValid", width: 1 })
  isValid: boolean;

  @Column("int", { name: "duration" })
  duration: number;

  @Column("datetime", { name: "expiresAt" })
  expiresAt: Date;

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

  @ManyToOne(() => User, (user) => user.tokenlogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
