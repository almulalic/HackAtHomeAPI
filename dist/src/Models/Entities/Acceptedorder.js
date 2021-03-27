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
exports.AcceptedOrder = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
const User_1 = require("./User");
let AcceptedOrder = class AcceptedOrder {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], AcceptedOrder.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "courrierId" }),
    __metadata("design:type", Number)
], AcceptedOrder.prototype, "courrierId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "orderId" }),
    __metadata("design:type", Number)
], AcceptedOrder.prototype, "orderId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "progressStep", default: () => "'0'" }),
    __metadata("design:type", Number)
], AcceptedOrder.prototype, "progressStep", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "createdAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], AcceptedOrder.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "modifiedAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], AcceptedOrder.prototype, "modifiedAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "archivedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], AcceptedOrder.prototype, "archivedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Order_1.Order, (order) => order.acceptedorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    typeorm_1.JoinColumn([{ name: "orderId", referencedColumnName: "id" }]),
    __metadata("design:type", Order_1.Order)
], AcceptedOrder.prototype, "order", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.acceptedorders, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    typeorm_1.JoinColumn([{ name: "courrierId", referencedColumnName: "id" }]),
    __metadata("design:type", User_1.User)
], AcceptedOrder.prototype, "courrier", void 0);
AcceptedOrder = __decorate([
    typeorm_1.Index("acceptedorder_user_id_fk", ["courrierId"], {}),
    typeorm_1.Index("acceptedorder_order_id_fk", ["orderId"], {}),
    typeorm_1.Entity("acceptedorder", { schema: "heroku_ce952358d978f73" })
], AcceptedOrder);
exports.AcceptedOrder = AcceptedOrder;
//# sourceMappingURL=Acceptedorder.js.map