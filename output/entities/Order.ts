import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Acceptedorder } from "./Acceptedorder";
import { User } from "./User";

@Index("table_name_user_id_fk", ["userId"], {})
@Entity("order", { schema: "heroku_ce952358d978f73" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("text", { name: "orderList" })
  orderList: string;

  @Column("text", { name: "message" })
  message: string;

  @Column("float", { name: "budget", precision: 12 })
  budget: number;

  @Column("timestamp", {
    name: "createdAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "archivedAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  archivedAt: Date | null;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @OneToMany(() => Acceptedorder, (acceptedorder) => acceptedorder.order)
  acceptedorders: Acceptedorder[];

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
