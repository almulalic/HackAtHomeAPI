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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const User_1 = require("./User");
let Post = class Post {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "userId" }),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "categoryId", nullable: true }),
    __metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
__decorate([
    typeorm_1.Column("text", { name: "url", nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "url", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        name: "createdAt",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "message", length: 100 }),
    __metadata("design:type", String)
], Post.prototype, "message", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.posts, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    typeorm_1.JoinColumn([{ name: "categoryId", referencedColumnName: "id" }]),
    __metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.posts, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    }),
    typeorm_1.JoinColumn([{ name: "userId", referencedColumnName: "id" }]),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
Post = __decorate([
    typeorm_1.Index("post_user_id_fk", ["userId"], {}),
    typeorm_1.Index("post_cateogry_id_fk", ["categoryId"], {}),
    typeorm_1.Entity("post", { schema: "heroku_ce952358d978f73" })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map