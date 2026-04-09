import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Request } from "express";
import { AuthPayloadDto } from "../dto/authPayload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req.cookies?.accessToken,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: configService.getOrThrow<string>("jwt.secret"),
            ignoreExpiration: false,
        })
    }

    validate(payload: AuthPayloadDto) {
        if (!payload.sub) throw new UnauthorizedException("Invalid token");
        return payload;
    }
}