import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    return request.isAuthenticated()
  }
}
/*
    tạo một authenticaGuard thực thi CanActivate
    truyền vào một executionContext
    
*/