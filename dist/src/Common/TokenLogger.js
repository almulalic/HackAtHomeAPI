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
exports.TokenLogger = exports.EntityType = exports.TokenType = void 0;
const typeorm_1 = require("typeorm");
const Entities_1 = require("../Models/Entities");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const luxon_1 = require("luxon");
const class_transformer_1 = require("class-transformer");
function StringTimeToSeconds(duration) {
    let timeValue = Number(duration.substr(0, duration.length - 1));
    if (duration.includes("d"))
        return timeValue * 3600 * 24;
    else if (duration.includes("h"))
        return timeValue * 3600;
    else if (duration.includes("m"))
        return timeValue * 60;
    else if (duration.includes("s"))
        return timeValue;
    return timeValue;
}
var TokenType;
(function (TokenType) {
    TokenType[TokenType["AccountConfirmationToken"] = 1] = "AccountConfirmationToken";
    TokenType[TokenType["PasswordResetToken"] = 2] = "PasswordResetToken";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var EntityType;
(function (EntityType) {
    EntityType[EntityType["User"] = 1] = "User";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
let TokenLogger = class TokenLogger {
    constructor(EntityManager) {
        this.EntityManager = EntityManager;
        this.tokenLogScope = this.EntityManager.getRepository(Entities_1.TokenLog);
    }
    async ClearPreviousTokens(tokenType, identityId) {
        let previousTokens = await this.tokenLogScope
            .createQueryBuilder()
            .where("TokenLog.identityId = :identityId", { identityId: identityId })
            .andWhere("TokenLog.tokenType = :tokenType", { tokenType: tokenType })
            .andWhere("TokenLog.isValid = 1")
            .getMany();
        previousTokens.forEach(async (token) => {
            token.isValid = false;
            await this.tokenLogScope.save(token);
        });
        return true;
    }
    async InvalidateTokenById(tokenId) {
        let tokenLog = await this.tokenLogScope.find({ id: tokenId });
        tokenLog.isValid = false;
        await this.tokenLogScope.save(tokenLog);
    }
    async InvalidateToken(tokenLog) {
        tokenLog.isValid = false;
        await this.tokenLogScope.save(tokenLog);
    }
    async GetToken(token) {
        return class_transformer_1.classToPlain(await this.tokenLogScope.findOne({ token: token }));
    }
    async AddNewTokenLog(token, duration, tokenType, identityId) {
        let clearResponse = await this.ClearPreviousTokens(tokenType, identityId);
        if (clearResponse !== true)
            throw new Error("Token clear belaj");
        let tokenLog = new Entities_1.TokenLog();
        tokenLog.userId = identityId;
        tokenLog.token = token;
        tokenLog.duration = StringTimeToSeconds(duration);
        tokenLog.isValid = true;
        tokenLog.tokenType = tokenType;
        tokenLog.expiresAt = new Date(luxon_1.DateTime.utc().plus({ seconds: tokenLog.duration }).toSQL());
        this.tokenLogScope.insert(tokenLog);
    }
};
TokenLogger = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], TokenLogger);
exports.TokenLogger = TokenLogger;
//# sourceMappingURL=TokenLogger.js.map