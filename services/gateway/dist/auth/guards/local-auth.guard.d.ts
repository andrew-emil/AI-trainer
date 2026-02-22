import { LocalStrategy } from '../strategies/local.strategy';
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    private readonly localStrategy;
    constructor(localStrategy: LocalStrategy);
}
export {};
