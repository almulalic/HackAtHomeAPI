import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

@Index("acceptedorder_user_id_fk", ["courrierId"], {})
@Index("acceptedorder_order_id_fk", ["orderId"], {})
@Entity("acceptedorder", { schema: "heroku_ce952358d978f73" })
export class Acceptedorder {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "courrierId" })
  courrierId: number;

  @Column("int", { name: "orderId" })
  orderId: number;

  @Column("int", { name: "progressStep", default: () => "'0'" })
  progressStep: number;

  @Column("timestamp", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date | null;

  @Column("timestamp", {
    name: "archivedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  archivedAt: Date;

  @ManyToOne(() => Order, (order) => order.acceptedorders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Order;

  @ManyToOne(() => User, (user) => user.acceptedorders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "courrierId", referencedColumnName: "id" }])
  courrier: User;
}
