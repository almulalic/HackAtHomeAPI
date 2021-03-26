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
exports.TokenLog = void 0;
const typeorm_1 = require("typeorm");
let TokenLog = class TokenLog {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], TokenLog.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "identityId" }),
    __metadata("design:type", Number)
], TokenLog.prototype, "identityId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "tokenType", nullable: true }),
    __metadata("design:type", Number)
], TokenLog.prototype, "tokenType", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "isValid", nullable: true }),
    __metadata("design:type", Number)
], TokenLog.prototype, "isValid", void 0);
__decorate([
    typeorm_1.Column("int", { name: "duration", nullable: true }),
    __metadata("design:type", Number)
], TokenLog.prototype, "duration", void 0);
__decorate([
    typeorm_1.Column("date", { name: "expiresAt", nullable: true }),
    __metadata("design:type", String)
], TokenLog.prototype, "expiresAt", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "createdAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], TokenLog.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("date", { name: "modifiedAt", nullable: true }),
    __metadata("design:type", String)
], TokenLog.prototype, "modifiedAt", void 0);
TokenLog = __decorate([
    typeorm_1.Entity("token_log", { schema: "heroku_1a6e6e8496717d8" })
], TokenLog);
exports.TokenLog = TokenLog;
//# sourceMappingURL=TokenLog.js.map