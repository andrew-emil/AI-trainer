import { ErrorResponse } from "@/types/errorResponse";
import { AxiosError } from "axios";

type SuccessResult<T> = readonly [T, null];

type ErrorResult<E = AxiosError<ErrorResponse>> = readonly [null, E];
type Result<T, E = AxiosError<ErrorResponse>> = SuccessResult<T> | ErrorResult<E>;

export async function tryCatch<T, E extends ErrorResponse = ErrorResponse>(
    promise: Promise<T>,
): Promise<Result<T, E>> {
    try {
        const result = await promise;
        return [result, null];
    } catch (error) {
        return [{} as never, error?.response as E];
    }
}