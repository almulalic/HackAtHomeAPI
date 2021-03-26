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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("../../Entities/Post");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "firstName", length: 20 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "lastName", length: 30 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "email", nullable: true, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("smallint", { name: "role", nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "isConfirmed", default: () => "'0'" }),
    __metadata("design:type", Number)
], User.prototype, "isConfirmed", void 0);
__decorate([
    typeorm_1.Column("date", { name: "dateOfBirth", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "telephoneNumber", nullable: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "telephoneNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "refreshToken", nullable: true, length: 300 }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "createdAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "modifiedAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "modifiedAt", void 0);
__decorate([
    typeorm_1.Column("datetime", { name: "archivedAt", nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "archivedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Post_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    typeorm_1.Entity("user", { schema: "heroku_1a6e6e8496717d8" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map