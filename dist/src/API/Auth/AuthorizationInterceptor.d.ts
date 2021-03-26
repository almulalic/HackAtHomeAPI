import { Observable } from "rxjs";
import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
export declare class AuthorizationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
