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
exports.Tokenlog = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Tokenlog = class Tokenlog {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Tokenlog.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "userId" }),
    __metadata("design:type", Number)
], Tokenlog.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("longtext", { name: "token" }),
    __metadata("design:type", String)
], Tokenlog.prototype, "token", void 0);
__decorate([
    typeorm_1.Column("int", { name: "tokenType" }),
    __metadata("design:type", Number)
], Tokenlog.prototype, "tokenType", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "isValid", width: 1 }),
    __metadata("design:type", Boolean)
], Tokenlog.prototype, "isValid", void 0);
__decorate([
    typeorm_1.Column("int", { name: "duration" }),
    __metadata("design:type", Number)
], Tokenlog.prototype, "duration", void 0);
__decorate([
    typeorm_1.Column("datetime", { name: "expiresAt" }),
    __metadata("design:type", Date)
], Tokenlog.prototype, "expiresAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "createdAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Tokenlog.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "modifiedAt",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Tokenlog.prototype, "modifiedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.tokenlogs, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    typeorm_1.JoinColumn([{ name: "userId", referencedColumnName: "id" }]),
    __metadata("design:type", User_1.User)
], Tokenlog.prototype, "user", void 0);
Tokenlog = __decorate([
    typeorm_1.Index("tokens_user_id_fk", ["userId"], {}),
    typeorm_1.Entity("tokenlog", { schema: "heroku_ce952358d978f73" })
], Tokenlog);
exports.Tokenlog = Tokenlog;
//# sourceMappingURL=Tokenlog.js.map