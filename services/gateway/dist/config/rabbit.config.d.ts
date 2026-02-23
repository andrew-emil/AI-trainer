import Joi from "joi";
export declare const rabbitSchema: Joi.ObjectSchema<any>;
declare const _default: (() => {
    url: string | undefined;
    coachDomainQueue: string | undefined;
    interactionQueue: string | undefined;
    authQueue: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string | undefined;
    coachDomainQueue: string | undefined;
    interactionQueue: string | undefined;
    authQueue: string | undefined;
}>;
export default _default;
