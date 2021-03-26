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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
let Customer = class Customer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "firstName", length: 20 }),
    __metadata("design:type", String)
], Customer.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "lastName", length: 30 }),
    __metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "email", length: 50 }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("smallint", { name: "role", default: () => "'0'" }),
    __metadata("design:type", Number)
], Customer.prototype, "role", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "isConfirmed", default: () => false }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isConfirmed", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "address", length: 100 }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telephoneNumber", length: 100 }),
    __metadata("design:type", String)
], Customer.prototype, "telephoneNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "password", length: 100 }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "refreshToken", nullable: true, length: 300 }),
    __metadata("design:type", String)
], Customer.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "createdAt",
        select: false,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "modifiedAt",
        select: false,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Customer.prototype, "modifiedAt", void 0);
__decorate([
    typeorm_1.Column("datetime", { name: "archivedAt", select: false, nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "archivedAt", void 0);
Customer = __decorate([
    typeorm_1.Entity("Customer", { schema: "heroku_1a6e6e8496717d8" })
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map