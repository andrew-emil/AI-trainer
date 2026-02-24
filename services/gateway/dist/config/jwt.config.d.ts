import Joi from 'joi';
export declare const jwtSchema: Joi.ObjectSchema<any>;
declare const _default: (() => {
    secret: string | undefined;
    expirationTime: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string | undefined;
    expirationTime: string | undefined;
}>;
export default _default;
