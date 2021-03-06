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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const Common_1 = require("../../Common");
const Entities_1 = require("../../Models/Entities");
const PostBodyDTO_1 = require("../../Services/Post/DTO/PostBodyDTO");
const PostService_1 = require("./../../Services/Post/PostService");
let PostController = class PostController {
    constructor(PostService) {
        this.PostService = PostService;
    }
    async GetAllPosts(query) {
        return await this.PostService.GetAllPosts(query);
    }
    async CreatePost(body) {
        return Common_1.Ok(await this.PostService.CreatePost(body));
    }
};
__decorate([
    common_1.Get("/getAllPosts"),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "GetAllPosts", null);
__decorate([
    common_1.Post("/createPost"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostBodyDTO_1.PostBodyDTO]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "CreatePost", null);
PostController = __decorate([
    common_1.Controller("post"),
    __metadata("design:paramtypes", [PostService_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map