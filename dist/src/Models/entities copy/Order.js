"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const Acceptedorder_1 = require("./Acceptedorder");
const User_1 = require("./User");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "userId" }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("text", { name: "orderList" }),
    __metadata("design:type", String)
], Order.prototype, "orderList", void 0);
__decorate([
    typeorm_1.Column("text", { name: "message" }),
    __metadata("design:type", String)
], Order.prototype, "message", void 0);
__decorate([
    typeorm_1.Column("float", { name: "budget", precision: 12 }),
    __metadata("design:type", Number)
], Order.prototype, "budget", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "createdAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "archivedAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Order.prototype, "archivedAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "modifiedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Order.prototype, "modifiedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Acceptedorder_1.Acceptedorder, (acceptedorder) => acceptedorder.order),
    __metadata("design:type", Array)
], Order.prototype, "acceptedorders", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.orders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    typeorm_1.JoinColumn([{ name: "userId", referencedColumnName: "id" }]),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
Order = __decorate([
    typeorm_1.Index("table_name_user_id_fk", ["userId"], {}),
    typeorm_1.Entity("order", { schema: "heroku_ce952358d978f73" })
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map