"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const PostService_1 = require("../../Services/Post/PostService");
const PostController_1 = require("../Controllers/PostController");
let PostModule = class PostModule {
};
PostModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [PostController_1.PostController],
        providers: [PostService_1.PostService],
        exports: [PostService_1.PostService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=PostModule.js.map