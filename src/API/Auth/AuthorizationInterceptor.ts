import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";
import * as responseMessages from "../../../responseMessages.config.json";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { RoleTypes } from "../../Common/Enumerations";

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.switchToHttp().getRequest().currentUser.role !== RoleTypes.Admin)
      throw new HttpException(responseMessages.authorization.noPermission, HttpStatus.FORBIDDEN);

    return next.handle();
  }
}
