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
exports.IdentityController = void 0;
const DTO_1 = require("../../Services/Identity/DTO");
const Common_1 = require("../../Common");
const IdentityService_1 = require("../../Services/Identity/IdentityService");
const common_1 = require("@nestjs/common");
const ChangeConfirmationEmailDTO_1 = require("./../../Services/Identity/DTO/ChangeConfirmationEmailDTO");
let IdentityController = class IdentityController {
    constructor(IdentityService) {
        this.IdentityService = IdentityService;
    }
    async IsEmailTaken(email) {
        return Common_1.Ok(await this.IdentityService.IsEmailTaken(email));
    }
    async Register(body) {
        return Common_1.Ok(await this.IdentityService.Register(body));
    }
    async ResendConfirmationToken(body) {
        return Common_1.Ok(await this.IdentityService.ResendConfirmationToken(body));
    }
    async ConfirmIdentity(token) {
        return Common_1.Ok(await this.IdentityService.ConfirmIdentity(token));
    }
    async ChangeConfirmationEmail(body) {
        return Common_1.Ok(await this.IdentityService.ChangeConfirmationEmail(body));
    }
    async ResetPassword(body) {
        return Common_1.Ok(await this.IdentityService.ResetPassword(body));
    }
    async ConfimPasswordReset(body) {
        return Common_1.Ok(await this.IdentityService.ConfimPasswordReset(body));
    }
    async Login(dto) {
        return await this.IdentityService.Login(dto);
    }
    async RefreshToken(body) {
        return await this.IdentityService.RefreshToken(body);
    }
};
__decorate([
    common_1.Get("/isEmailTaken/:email"),
    __param(0, common_1.Param("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "IsEmailTaken", null);
__decorate([
    common_1.Post("/register"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.RegisterDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "Register", null);
__decorate([
    common_1.Post("/resendConfirmationCode"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.ResendConfirmationDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "ResendConfirmationToken", null);
__decorate([
    common_1.Get("/confirm/:token"),
    __param(0, common_1.Param("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "ConfirmIdentity", null);
__decorate([
    common_1.Post("/changeConfriamtionEmail"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangeConfirmationEmailDTO_1.ChangeConfirmationEmailDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "ChangeConfirmationEmail", null);
__decorate([
    common_1.Post("/resetPassword"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.ResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "ResetPassword", null);
__decorate([
    common_1.Post("/confirmPasswordReset"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.ConfirmResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "ConfimPasswordReset", null);
__decorate([
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.Post("/login"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "Login", null);
__decorate([
    common_1.Post("/refreshToken"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.RefreshTokenDTO]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "RefreshToken", null);
IdentityController = __decorate([
    common_1.Controller("identity"),
    __metadata("design:paramtypes", [IdentityService_1.IdentityService])
], IdentityController);
exports.IdentityController = IdentityController;
//# sourceMappingURL=IdentityController.js.map