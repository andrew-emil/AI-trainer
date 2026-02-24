"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcCall = rpcCall;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
async function rpcCall(client, pattern, payload, schema) {
    try {
        await client.connect();
        console.log('About to send message');
        const response = await (0, rxjs_1.lastValueFrom)(client.send(pattern, payload));
        console.log('Response received', response);
        return schema.validate(response).value;
    }
    catch (err) {
        console.log(err);
        if (err instanceof common_1.HttpException) {
            throw err;
        }
        if (err?.statusCode) {
            throw new common_1.HttpException(err.message, err.statusCode);
        }
        if (err?.status) {
            throw new common_1.HttpException(err.message || 'Error', err.status);
        }
        throw new common_1.InternalServerErrorException(`Microservice call failed for pattern ${pattern}`);
    }
}
//# sourceMappingURL=rpc-call.util.js.map