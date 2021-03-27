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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Order_1 = require("../../Models/Entities/Order");
let OrderService = class OrderService {
    constructor(EntityManager) {
        this.EntityManager = EntityManager;
    }
    async CreateOrder(body) {
        let insertId = null;
        try {
            body.userId = 5;
            insertId = (await this.EntityManager.getRepository(Order_1.Order).insert(body)).generatedMaps[0].id;
        }
        catch (err) {
            console.log("CreateOrderError: " + err);
            throw new common_1.HttpException("Forma nije validna", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            responses: [
                {
                    type: "text",
                    delay: 100,
                    message: `Narudžba Uspješna. Narudžba ID: 315`,
                },
                {
                    type: "text",
                    delay: 100,
                    message: "ID možete koristit da pratite vašu narudžbu",
                },
                {
                    delay: 100,
                    type: "button",
                    title: "Pregled narudžbe ID: 315",
                    buttons: [
                        {
                            type: "webview",
                            title: "Otvori U Pregledniku",
                            value: "https://bfe90cf181be.ngrok.io/order/tracker",
                            height: "full",
                        },
                    ],
                },
            ],
            attributes: {},
        };
    }
    async GetAllOrders() {
        return await this.EntityManager.getRepository(Order_1.Order).createQueryBuilder().getMany();
    }
    async GetOrder(id) {
        return await this.EntityManager.getRepository(Order_1.Order).findOne({ id: id });
    }
};
OrderService = __decorate([
    common_2.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map