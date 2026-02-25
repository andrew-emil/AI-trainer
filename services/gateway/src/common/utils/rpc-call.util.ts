import {
    HttpException,
    InternalServerErrorException
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import Joi from 'joi';
import { firstValueFrom } from 'rxjs';

export async function rpcCall<T>(
    client: ClientProxy,
    pattern: string,
    payload: unknown,
    schema: Joi.ObjectSchema<any>,
): Promise<T> {
    try {
        console.log("connecting...")
        await client.connect()
        console.log('About to send message');
        const response = await firstValueFrom(client.send<T>(pattern, payload));
        console.log('Response received', response);
        return schema.validate(response).value;

    } catch (err: any) {
        console.log(err)
        // Preserve existing HttpExceptions
        if (err instanceof HttpException) {
            throw err;
        }

        // RpcException payload shape
        if (err?.statusCode) {
            throw new HttpException(err.message, err.statusCode);
        }

        // Nest HttpException wrapped shape
        if (err?.status) {
            throw new HttpException(
                err.message || 'Error',
                err.status,
            );
        }

        // Unknown failure
        throw new InternalServerErrorException(
            `Microservice call failed for pattern ${pattern}`,
        );
    }
}