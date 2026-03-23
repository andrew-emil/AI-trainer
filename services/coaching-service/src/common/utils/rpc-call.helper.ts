import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ZodType } from 'zod';

export async function rpcCall<T>(
    client: ClientProxy,
    pattern: string,
    payload: unknown,
    schema: ZodType<T>,
): Promise<T> {
    try {
        await client.connect();
        const response = await firstValueFrom(client.send<T>(pattern, payload));
        return schema.parse(response);

    } catch (err: any) {

        if (err?.statusCode) throw new RpcException({
            message: err.message,
            status: err.statusCode,
        });

        if (err?.status) throw new RpcException({
            message: err.message || 'Error',
            status: err.status,
        });

        throw new RpcException({
            message: `Microservice call failed for pattern: ${pattern}`,
            status: 500,
        });
    }
}