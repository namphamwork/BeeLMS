import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RolesInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // Nếu không có metadata 'roles' được đặt trên phương thức, cho phép truy cập
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user_data?.role;

    if (!userRole || !roles.includes(userRole)) {
      throw new ForbiddenException('Access denied.');
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
