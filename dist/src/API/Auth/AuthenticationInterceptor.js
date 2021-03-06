"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationInterceptor = void 0;
const jwt = require("jsonwebtoken");
const responseMessages = require("../../../responseMessages.config.json");
const common_1 = require("@nestjs/common");
let AuthenticationInterceptor = class AuthenticationInterceptor {
    intercept(context, next) {
        let token = context.switchToHttp().getRequest().headers["x-token"];
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
                if (err)
                    throw new common_1.HttpException(responseMessages.authorization.tokenMalformet, common_1.HttpStatus.UNAUTHORIZED);
                context.switchToHttp().getRequest().currentUser = Object.values(decodedToken)[0];
            });
        }
        else
            throw new common_1.HttpException(responseMessages.authorization.missingToken, common_1.HttpStatus.UNAUTHORIZED);
        return next.handle();
    }
};
AuthenticationInterceptor = __decorate([
    common_1.Injectable()
], AuthenticationInterceptor);
exports.AuthenticationInterceptor = AuthenticationInterceptor;
//# sourceMappingURL=AuthenticationInterceptor.js.map