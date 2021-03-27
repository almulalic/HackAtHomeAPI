import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Order } from "../../Models/Entities/Order";
import { IOrderService } from "../Contracts/IOrderService";

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectEntityManager()
    private EntityManager: EntityManager
  ) {}

  public async CreateOrder(body: any): Promise<any> {
    let insertId = null;

    try {
      body.userId = 5;
      insertId = (await this.EntityManager.getRepository(Order).insert(body)).generatedMaps[0].id;
    } catch (err) {
      console.log("CreateOrderError: " + err);
      throw new HttpException("Forma nije validna", HttpStatus.INTERNAL_SERVER_ERROR);
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

  public async GetAllOrders(): Promise<any[]> {
    return await this.EntityManager.getRepository(Order).createQueryBuilder().getMany();
  }

  public async GetOrder(id: any): Promise<any> {
    return await this.EntityManager.getRepository(Order).findOne({ id: id });
  }
}
