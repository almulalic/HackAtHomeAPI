import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Customer", { schema: "heroku_1a6e6e8496717d8" })
export class Customer {
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

  @Column("tinyint", { name: "isConfirmed", default: () => false })
  isConfirmed: boolean;

  @Column("varchar", { name: "address", length: 100 })
  address: string;

  @Column("varchar", { name: "telephoneNumber", length: 100 })
  telephoneNumber: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("varchar", { name: "refreshToken", nullable: true, length: 300 })
  refreshToken: string | null;

  @Column("timestamp", {
    name: "createdAt",
    select: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    select: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("datetime", { name: "archivedAt", select: false, nullable: true })
  archivedAt: Date | null;
}
