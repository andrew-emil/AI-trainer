import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/common/enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthPayloadDto } from '../dto/authPayload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    if (!requiredRoles || requiredRoles.length === 0)
      return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as AuthPayloadDto

    if (!user?.role) throw new ForbiddenException('Role missing');
    if (user.role === UserRole.ADMIN) return true;

    return requiredRoles.includes(user.role);
  }
}
