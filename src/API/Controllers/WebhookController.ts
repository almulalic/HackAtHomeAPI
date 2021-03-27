import { Body, Controller, Get, Query, Post, HttpStatus, HttpException } from "@nestjs/common";
import { CalculatorTypes, MaxValues } from "./../../Services/Webhook/DTO/CalculatorTypes";
import { WebhookService } from "./../../Services/Webhook/WebhookService";
import { OrderService } from "./../../Services/Order/OrderService";
import { InjectEntityManager } from "@nestjs/typeorm";

function CovidPositivityCalculator(surveryResponses) {
  let covid19 = 0,
    influenca = 0,
    cold = 0;

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

  let covidPercentage = (covid19 / MaxValues.Covid19) * 100;

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
        message:
          `Covid-19: ${covidPercentage.toFixed(2)}%\n` +
          `Grip: ${((influenca / MaxValues.Influenca) * 100).toFixed(2)}%\n` +
          `Prehlada: ${((cold / MaxValues.Cold) * 100).toFixed(2)}%`,
      },
      covidPercentage >= 0.5
        ? {
            type: "text",
            delay: 1000,
            message:
              "Po ovome testu šansa da trenutno imate koronu je veća od 50% te vam savjetujem da se testirate.",
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

@Controller("webhook")
export class WebhookController {
  constructor(
    @InjectEntityManager()
    private readonly WebhookService: WebhookService,
    private readonly OrderService: OrderService
  ) {}

  @Get("/")
  public async validateToken(@Query() query) {
    if (query.token !== process.env.WEBHOOK_PRIVATE_TOKEN)
      throw new HttpException("Token nije validan", HttpStatus.UNAUTHORIZED);

    return query.challenge;
  }

  @Post("/")
  public async WebhookInvocator(@Query() query, @Body() body): Promise<any> {
    if (query.token !== process.env.WEBHOOK_PRIVATE_TOKEN)
      throw new HttpException("Token nije validan", HttpStatus.UNAUTHORIZED);

    console.log(body);
    if (!body.attributes) return;
    console.log(body);

    switch (body.attributes.webhookType) {
      case "coronaCalculator":
        return await CovidPositivityCalculator(
          CalculatorTypes.map((x) => {
            return body.attributes[x];
          }).map((x) => x == "true")
        );

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
        else throw new HttpException("Token nije validan", HttpStatus.UNAUTHORIZED);

      case "tokenValidation":
        if (body.attributes.token == "testnitoken")
          return {
            responses: [],
            attributes: {
              isTokenValid: "true",
              token: "yMmUfZVEx957MRW1Rbf7_8hXNcV_vz1P",
            },
          };
        else throw new HttpException("Token nije validan", HttpStatus.UNAUTHORIZED);

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
}
