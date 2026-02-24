import { BadGatewayException, HttpException, InternalServerErrorException } from '@nestjs/common';
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
        const response = await firstValueFrom(client.send(pattern, payload));

        const { error, value } = schema.validate(response);
        if (error) {
            throw new BadGatewayException(
                `Invalid response from microservice: ${error.message}`,
            );
        }

        return value as T;

    } catch (err: any) {
        // map RpcException -> HttpException
        if (err?.statusCode) {
            throw new HttpException(err.message, err.statusCode);
        }

        throw new InternalServerErrorException('Microservice call failed');
    }
}