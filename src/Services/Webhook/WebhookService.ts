import { IdentityService } from "./../Identity/IdentityService";
import { InjectEntityManager } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { IWebhookService } from "../Contracts/IWebhookService";
import { MaxValues } from "./DTO/CalculatorTypes";

@Injectable()
export class WebhookService implements IWebhookService {
  constructor(
    @InjectEntityManager()
    private EntityManager: EntityManager
  ) {}

  public async CovidPositivityCalculator(surveryResponses): Promise<any> {
    return null;
  }
}
