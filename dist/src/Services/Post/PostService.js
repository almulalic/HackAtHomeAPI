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
exports.PostService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const Entities_1 = require("../../Models/Entities");
const Common_1 = require("../../Common");
let PostService = class PostService {
    constructor(EntityManager) {
        this.EntityManager = EntityManager;
    }
    async GetAllPosts(filterParams) {
        return await (await this.EntityManager.getRepository(Entities_1.Post).createQueryBuilder().getMany()).filter(x => x.categoryId == filterParams.categoryId);
    }
    async CreatePost(body) {
        await this.EntityManager.getRepository(Entities_1.Post).insert(body);
        return "Uspjesno dodan Post";
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map