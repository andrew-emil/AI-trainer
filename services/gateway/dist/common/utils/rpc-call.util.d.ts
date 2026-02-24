import { ClientProxy } from '@nestjs/microservices';
import Joi from 'joi';
export declare function rpcCall<T>(client: ClientProxy, pattern: string, payload: unknown, schema: Joi.ObjectSchema<any>): Promise<T>;
