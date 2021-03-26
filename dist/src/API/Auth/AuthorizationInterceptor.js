"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationInterceptor = void 0;
const responseMessages = require("../../../responseMessages.config.json");
const common_1 = require("@nestjs/common");
const Enumerations_1 = require("../../Common/Enumerations");
let AuthorizationInterceptor = class AuthorizationInterceptor {
    intercept(context, next) {
        if (context.switchToHttp().getRequest().currentUser.role !== Enumerations_1.RoleTypes.Admin)
            throw new common_1.HttpException(responseMessages.authorization.noPermission, common_1.HttpStatus.FORBIDDEN);
        return next.handle();
    }
};
AuthorizationInterceptor = __decorate([
    common_1.Injectable()
], AuthorizationInterceptor);
exports.AuthorizationInterceptor = AuthorizationInterceptor;
//# sourceMappingURL=AuthorizationInterceptor.js.map