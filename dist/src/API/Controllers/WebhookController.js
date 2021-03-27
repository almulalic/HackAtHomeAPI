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
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const CalculatorTypes_1 = require("./../../Services/Webhook/DTO/CalculatorTypes");
const WebhookService_1 = require("./../../Services/Webhook/WebhookService");
const OrderService_1 = require("./../../Services/Order/OrderService");
const typeorm_1 = require("@nestjs/typeorm");
function CovidPositivityCalculator(surveryResponses) {
    let covid19 = 0, influenca = 0, cold = 0;
    let values = [
        [4, 4, 1],
        [4, 4, 3],
        [2, 1, 1],
        [2, 2, 4],
        [1, 1, 4],
        [2, 2, 4],
        [2, 4, 4],
        [2, 4, 2],
        [3, 4, 2],
        [2, 2, 1],
        [1, 1, 1],
        [2, 1, 1],
    ];
    surveryResponses.forEach((response, i) => {
        if (response) {
            covid19 += values[i][0];
            influenca += values[i][1];
            cold += values[i][2];
        }
    });
    let covidPercentage = (covid19 / CalculatorTypes_1.MaxValues.Covid19) * 100;
    return {
        responses: [
            {
                type: "text",
                delay: 1000,
                message: "Na osnovu vaših odgovora došao sam do sljedećih zaključaka:",
            },
            {
                type: "text",
                delay: 1000,
                message: `Covid-19: ${covidPercentage.toFixed(2)}%\n` +
                    `Grip: ${((influenca / CalculatorTypes_1.MaxValues.Influenca) * 100).toFixed(2)}%\n` +
                    `Prehlada: ${((cold / CalculatorTypes_1.MaxValues.Cold) * 100).toFixed(2)}%`,
            },
            covidPercentage >= 0.5
                ? {
                    type: "text",
                    delay: 1000,
                    message: "Po ovome testu šansa da trenutno imate koronu je veća od 50% te vam savjetujem da se testirate.",
                }
                : {},
            {
                delay: 1000,
                type: "button",
                title: "Izvor Informacija",
                buttons: [
                    {
                        type: "webview",
                        title: "Otvori U Pregledniku",
                        value: "https://www.data4life.care/en/corona/covapp/",
                        height: "full",
                    },
                ],
            },
            {
                type: "quickReplies",
                title: "Akcije",
                buttons: [
                    {
                        type: "goto",
                        title: "Ponovi Test",
                        value: "d624ab44-8ba3-487a-87b0-a7804d0695b9",
                        id: "d624ab44-8ba3-487a-87b0-a7804d0695b9",
                    },
                    {
                        type: "goto",
                        title: "Početni Meni",
                        value: "95a961da-5979-4ed7-b5c3-906508b324c4",
                        id: "95a961da-5979-4ed7-b5c3-906508b324c4",
                    },
                ],
            },
        ],
        attributes: {
            token: "yMmUfZVEx957MRW1Rbf7_8hXNcV_vz1P",
        },
    };
}
let WebhookController = class WebhookController {
    constructor(WebhookService, OrderService) {
        this.WebhookService = WebhookService;
        this.OrderService = OrderService;
    }
    async validateToken(query) {
        if (query.token !== process.env.WEBHOOK_PRIVATE_TOKEN)
            throw new common_1.HttpException("Token nije validan", common_1.HttpStatus.UNAUTHORIZED);
        return query.challenge;
    }
    async WebhookInvocator(query, body) {
        if (query.token !== process.env.WEBHOOK_PRIVATE_TOKEN)
            throw new common_1.HttpException("Token nije validan", common_1.HttpStatus.UNAUTHORIZED);
        console.log(body);
        if (!body.attributes)
            return;
        console.log(body);
        switch (body.attributes.webhookType) {
            case "coronaCalculator":
                return await CovidPositivityCalculator(CalculatorTypes_1.CalculatorTypes.map((x) => {
                    return body.attributes[x];
                }).map((x) => x == "true"));
            case "login":
                if (body.attributes.token == "testnitoken")
                    return {
                        responses: [
                            {
                                type: "quickReplies",
                                title: "Login Uspješan",
                                buttons: [
                                    {
                                        title: "Nastavi",
                                        type: "goto",
                                        value: "a91b9b68-7f9c-4d82-96c0-3e45a7bb8857",
                                        id: "a91b9b68-7f9c-4d82-96c0-3e45a7bb8857",
                                    },
                                ],
                            },
                        ],
                        attributes: {
                            isTokenValid: "true",
                            token: "testnitoken",
                        },
                    };
                else
                    throw new common_1.HttpException("Token nije validan", common_1.HttpStatus.UNAUTHORIZED);
            case "tokenValidation":
                if (body.attributes.token == "testnitoken")
                    return {
                        responses: [],
                        attributes: {
                            isTokenValid: "true",
                            token: "yMmUfZVEx957MRW1Rbf7_8hXNcV_vz1P",
                        },
                    };
                else
                    throw new common_1.HttpException("Token nije validan", common_1.HttpStatus.UNAUTHORIZED);
            case "narudzba":
                switch (body.attributes.narudzbaMeniIzbor) {
                    case "novaNarudzba":
                        return await this.OrderService.CreateOrder({
                            orderList: body.attributes.orderList,
                            budget: body.attributes.orderBudget,
                            message: body.attributes.orderMessage,
                        });
                    case "mojeNarudzbe":
                        return {
                            responses: [
                                {
                                    delay: 100,
                                    type: "button",
                                    title: "Pregled nardudžbe 315",
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
                        };
                    case "pregledNarudzbe":
                        return {
                            responses: [
                                {
                                    delay: 100,
                                    type: "button",
                                    title: "Pregled nardudžbe 315",
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
                        };
                }
        }
    }
};
__decorate([
    common_1.Get("/"),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "validateToken", null);
__decorate([
    common_1.Post("/"),
    __param(0, common_1.Query()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "WebhookInvocator", null);
WebhookController = __decorate([
    common_1.Controller("webhook"),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [WebhookService_1.WebhookService,
        OrderService_1.OrderService])
], WebhookController);
exports.WebhookController = WebhookController;
//# sourceMappingURL=WebhookController.js.map