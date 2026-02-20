
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Trainee
 * 
 */
export type Trainee = $Result.DefaultSelection<Prisma.$TraineePayload>
/**
 * Model Trainer
 * 
 */
export type Trainer = $Result.DefaultSelection<Prisma.$TrainerPayload>
/**
 * Model TrainerCertification
 * 
 */
export type TrainerCertification = $Result.DefaultSelection<Prisma.$TrainerCertificationPayload>
/**
 * Model TrainerTransformation
 * 
 */
export type TrainerTransformation = $Result.DefaultSelection<Prisma.$TrainerTransformationPayload>
/**
 * Model ResetPasswordToken
 * 
 */
export type ResetPasswordToken = $Result.DefaultSelection<Prisma.$ResetPasswordTokenPayload>
/**
 * Model TrainerRequest
 * 
 */
export type TrainerRequest = $Result.DefaultSelection<Prisma.$TrainerRequestPayload>
/**
 * Model TrainerTrainee
 * 
 */
export type TrainerTrainee = $Result.DefaultSelection<Prisma.$TrainerTraineePayload>
/**
 * Model TrainerTraineeRequest
 * 
 */
export type TrainerTraineeRequest = $Result.DefaultSelection<Prisma.$TrainerTraineeRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  trainer: 'trainer',
  trainee: 'trainee',
  admin: 'admin'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const TraineeGoal: {
  cut: 'cut',
  bulk: 'bulk',
  maintenance: 'maintenance',
  strength: 'strength',
  body_recomb: 'body_recomb'
};

export type TraineeGoal = (typeof TraineeGoal)[keyof typeof TraineeGoal]


export const Gender: {
  male: 'male',
  female: 'female',
  unknown: 'unknown'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const TrainerRequestStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type TrainerRequestStatus = (typeof TrainerRequestStatus)[keyof typeof TrainerRequestStatus]


export const membershipStatus: {
  active: 'active',
  inactive: 'inactive'
};

export type membershipStatus = (typeof membershipStatus)[keyof typeof membershipStatus]


export const RequestStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  cancelled_by_the_trainee: 'cancelled_by_the_trainee'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type TraineeGoal = $Enums.TraineeGoal

export const TraineeGoal: typeof $Enums.TraineeGoal

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type TrainerRequestStatus = $Enums.TrainerRequestStatus

export const TrainerRequestStatus: typeof $Enums.TrainerRequestStatus

export type membershipStatus = $Enums.membershipStatus

export const membershipStatus: typeof $Enums.membershipStatus

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainee`: Exposes CRUD operations for the **Trainee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trainees
    * const trainees = await prisma.trainee.findMany()
    * ```
    */
  get trainee(): Prisma.TraineeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainer`: Exposes CRUD operations for the **Trainer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trainers
    * const trainers = await prisma.trainer.findMany()
    * ```
    */
  get trainer(): Prisma.TrainerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainerCertification`: Exposes CRUD operations for the **TrainerCertification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainerCertifications
    * const trainerCertifications = await prisma.trainerCertification.findMany()
    * ```
    */
  get trainerCertification(): Prisma.TrainerCertificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainerTransformation`: Exposes CRUD operations for the **TrainerTransformation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainerTransformations
    * const trainerTransformations = await prisma.trainerTransformation.findMany()
    * ```
    */
  get trainerTransformation(): Prisma.TrainerTransformationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resetPasswordToken`: Exposes CRUD operations for the **ResetPasswordToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResetPasswordTokens
    * const resetPasswordTokens = await prisma.resetPasswordToken.findMany()
    * ```
    */
  get resetPasswordToken(): Prisma.ResetPasswordTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainerRequest`: Exposes CRUD operations for the **TrainerRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainerRequests
    * const trainerRequests = await prisma.trainerRequest.findMany()
    * ```
    */
  get trainerRequest(): Prisma.TrainerRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainerTrainee`: Exposes CRUD operations for the **TrainerTrainee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainerTrainees
    * const trainerTrainees = await prisma.trainerTrainee.findMany()
    * ```
    */
  get trainerTrainee(): Prisma.TrainerTraineeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainerTraineeRequest`: Exposes CRUD operations for the **TrainerTraineeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainerTraineeRequests
    * const trainerTraineeRequests = await prisma.trainerTraineeRequest.findMany()
    * ```
    */
  get trainerTraineeRequest(): Prisma.TrainerTraineeRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Trainee: 'Trainee',
    Trainer: 'Trainer',
    TrainerCertification: 'TrainerCertification',
    TrainerTransformation: 'TrainerTransformation',
    ResetPasswordToken: 'ResetPasswordToken',
    TrainerRequest: 'TrainerRequest',
    TrainerTrainee: 'TrainerTrainee',
    TrainerTraineeRequest: 'TrainerTraineeRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "trainee" | "trainer" | "trainerCertification" | "trainerTransformation" | "resetPasswordToken" | "trainerRequest" | "trainerTrainee" | "trainerTraineeRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Trainee: {
        payload: Prisma.$TraineePayload<ExtArgs>
        fields: Prisma.TraineeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TraineeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TraineeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>
          }
          findFirst: {
            args: Prisma.TraineeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TraineeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>
          }
          findMany: {
            args: Prisma.TraineeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>[]
          }
          create: {
            args: Prisma.TraineeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>
          }
          createMany: {
            args: Prisma.TraineeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TraineeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>[]
          }
          delete: {
            args: Prisma.TraineeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>
          }
          update: {
            args: Prisma.TraineeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>
          }
          deleteMany: {
            args: Prisma.TraineeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TraineeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TraineeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>[]
          }
          upsert: {
            args: Prisma.TraineeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TraineePayload>
          }
          aggregate: {
            args: Prisma.TraineeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainee>
          }
          groupBy: {
            args: Prisma.TraineeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TraineeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TraineeCountArgs<ExtArgs>
            result: $Utils.Optional<TraineeCountAggregateOutputType> | number
          }
        }
      }
      Trainer: {
        payload: Prisma.$TrainerPayload<ExtArgs>
        fields: Prisma.TrainerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>
          }
          findFirst: {
            args: Prisma.TrainerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>
          }
          findMany: {
            args: Prisma.TrainerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>[]
          }
          create: {
            args: Prisma.TrainerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>
          }
          createMany: {
            args: Prisma.TrainerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>[]
          }
          delete: {
            args: Prisma.TrainerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>
          }
          update: {
            args: Prisma.TrainerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>
          }
          deleteMany: {
            args: Prisma.TrainerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>[]
          }
          upsert: {
            args: Prisma.TrainerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerPayload>
          }
          aggregate: {
            args: Prisma.TrainerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainer>
          }
          groupBy: {
            args: Prisma.TrainerGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainerGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainerCountArgs<ExtArgs>
            result: $Utils.Optional<TrainerCountAggregateOutputType> | number
          }
        }
      }
      TrainerCertification: {
        payload: Prisma.$TrainerCertificationPayload<ExtArgs>
        fields: Prisma.TrainerCertificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainerCertificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainerCertificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>
          }
          findFirst: {
            args: Prisma.TrainerCertificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainerCertificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>
          }
          findMany: {
            args: Prisma.TrainerCertificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>[]
          }
          create: {
            args: Prisma.TrainerCertificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>
          }
          createMany: {
            args: Prisma.TrainerCertificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainerCertificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>[]
          }
          delete: {
            args: Prisma.TrainerCertificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>
          }
          update: {
            args: Prisma.TrainerCertificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>
          }
          deleteMany: {
            args: Prisma.TrainerCertificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainerCertificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainerCertificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>[]
          }
          upsert: {
            args: Prisma.TrainerCertificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerCertificationPayload>
          }
          aggregate: {
            args: Prisma.TrainerCertificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainerCertification>
          }
          groupBy: {
            args: Prisma.TrainerCertificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainerCertificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainerCertificationCountArgs<ExtArgs>
            result: $Utils.Optional<TrainerCertificationCountAggregateOutputType> | number
          }
        }
      }
      TrainerTransformation: {
        payload: Prisma.$TrainerTransformationPayload<ExtArgs>
        fields: Prisma.TrainerTransformationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainerTransformationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainerTransformationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>
          }
          findFirst: {
            args: Prisma.TrainerTransformationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainerTransformationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>
          }
          findMany: {
            args: Prisma.TrainerTransformationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>[]
          }
          create: {
            args: Prisma.TrainerTransformationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>
          }
          createMany: {
            args: Prisma.TrainerTransformationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainerTransformationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>[]
          }
          delete: {
            args: Prisma.TrainerTransformationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>
          }
          update: {
            args: Prisma.TrainerTransformationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>
          }
          deleteMany: {
            args: Prisma.TrainerTransformationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainerTransformationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainerTransformationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>[]
          }
          upsert: {
            args: Prisma.TrainerTransformationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTransformationPayload>
          }
          aggregate: {
            args: Prisma.TrainerTransformationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainerTransformation>
          }
          groupBy: {
            args: Prisma.TrainerTransformationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainerTransformationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainerTransformationCountArgs<ExtArgs>
            result: $Utils.Optional<TrainerTransformationCountAggregateOutputType> | number
          }
        }
      }
      ResetPasswordToken: {
        payload: Prisma.$ResetPasswordTokenPayload<ExtArgs>
        fields: Prisma.ResetPasswordTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResetPasswordTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResetPasswordTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>
          }
          findFirst: {
            args: Prisma.ResetPasswordTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResetPasswordTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>
          }
          findMany: {
            args: Prisma.ResetPasswordTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>[]
          }
          create: {
            args: Prisma.ResetPasswordTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>
          }
          createMany: {
            args: Prisma.ResetPasswordTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResetPasswordTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>[]
          }
          delete: {
            args: Prisma.ResetPasswordTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>
          }
          update: {
            args: Prisma.ResetPasswordTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>
          }
          deleteMany: {
            args: Prisma.ResetPasswordTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResetPasswordTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResetPasswordTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>[]
          }
          upsert: {
            args: Prisma.ResetPasswordTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordTokenPayload>
          }
          aggregate: {
            args: Prisma.ResetPasswordTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResetPasswordToken>
          }
          groupBy: {
            args: Prisma.ResetPasswordTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResetPasswordTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResetPasswordTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ResetPasswordTokenCountAggregateOutputType> | number
          }
        }
      }
      TrainerRequest: {
        payload: Prisma.$TrainerRequestPayload<ExtArgs>
        fields: Prisma.TrainerRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainerRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainerRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>
          }
          findFirst: {
            args: Prisma.TrainerRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainerRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>
          }
          findMany: {
            args: Prisma.TrainerRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>[]
          }
          create: {
            args: Prisma.TrainerRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>
          }
          createMany: {
            args: Prisma.TrainerRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainerRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>[]
          }
          delete: {
            args: Prisma.TrainerRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>
          }
          update: {
            args: Prisma.TrainerRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>
          }
          deleteMany: {
            args: Prisma.TrainerRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainerRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainerRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>[]
          }
          upsert: {
            args: Prisma.TrainerRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerRequestPayload>
          }
          aggregate: {
            args: Prisma.TrainerRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainerRequest>
          }
          groupBy: {
            args: Prisma.TrainerRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainerRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainerRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TrainerRequestCountAggregateOutputType> | number
          }
        }
      }
      TrainerTrainee: {
        payload: Prisma.$TrainerTraineePayload<ExtArgs>
        fields: Prisma.TrainerTraineeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainerTraineeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainerTraineeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>
          }
          findFirst: {
            args: Prisma.TrainerTraineeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainerTraineeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>
          }
          findMany: {
            args: Prisma.TrainerTraineeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>[]
          }
          create: {
            args: Prisma.TrainerTraineeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>
          }
          createMany: {
            args: Prisma.TrainerTraineeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainerTraineeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>[]
          }
          delete: {
            args: Prisma.TrainerTraineeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>
          }
          update: {
            args: Prisma.TrainerTraineeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>
          }
          deleteMany: {
            args: Prisma.TrainerTraineeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainerTraineeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainerTraineeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>[]
          }
          upsert: {
            args: Prisma.TrainerTraineeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineePayload>
          }
          aggregate: {
            args: Prisma.TrainerTraineeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainerTrainee>
          }
          groupBy: {
            args: Prisma.TrainerTraineeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainerTraineeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainerTraineeCountArgs<ExtArgs>
            result: $Utils.Optional<TrainerTraineeCountAggregateOutputType> | number
          }
        }
      }
      TrainerTraineeRequest: {
        payload: Prisma.$TrainerTraineeRequestPayload<ExtArgs>
        fields: Prisma.TrainerTraineeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainerTraineeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainerTraineeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>
          }
          findFirst: {
            args: Prisma.TrainerTraineeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainerTraineeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>
          }
          findMany: {
            args: Prisma.TrainerTraineeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>[]
          }
          create: {
            args: Prisma.TrainerTraineeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>
          }
          createMany: {
            args: Prisma.TrainerTraineeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainerTraineeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>[]
          }
          delete: {
            args: Prisma.TrainerTraineeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>
          }
          update: {
            args: Prisma.TrainerTraineeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>
          }
          deleteMany: {
            args: Prisma.TrainerTraineeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainerTraineeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainerTraineeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>[]
          }
          upsert: {
            args: Prisma.TrainerTraineeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainerTraineeRequestPayload>
          }
          aggregate: {
            args: Prisma.TrainerTraineeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainerTraineeRequest>
          }
          groupBy: {
            args: Prisma.TrainerTraineeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainerTraineeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainerTraineeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TrainerTraineeRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    trainee?: TraineeOmit
    trainer?: TrainerOmit
    trainerCertification?: TrainerCertificationOmit
    trainerTransformation?: TrainerTransformationOmit
    resetPasswordToken?: ResetPasswordTokenOmit
    trainerRequest?: TrainerRequestOmit
    trainerTrainee?: TrainerTraineeOmit
    trainerTraineeRequest?: TrainerTraineeRequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    trainerRequests: number
    resetPasswordTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainerRequests?: boolean | UserCountOutputTypeCountTrainerRequestsArgs
    resetPasswordTokens?: boolean | UserCountOutputTypeCountResetPasswordTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainerRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResetPasswordTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetPasswordTokenWhereInput
  }


  /**
   * Count Type TraineeCountOutputType
   */

  export type TraineeCountOutputType = {
    trainerTraineeRequests: number
  }

  export type TraineeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainerTraineeRequests?: boolean | TraineeCountOutputTypeCountTrainerTraineeRequestsArgs
  }

  // Custom InputTypes
  /**
   * TraineeCountOutputType without action
   */
  export type TraineeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TraineeCountOutputType
     */
    select?: TraineeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TraineeCountOutputType without action
   */
  export type TraineeCountOutputTypeCountTrainerTraineeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTraineeRequestWhereInput
  }


  /**
   * Count Type TrainerCountOutputType
   */

  export type TrainerCountOutputType = {
    certifications: number
    transformations: number
    traineeRequests: number
    trainerTrainees: number
  }

  export type TrainerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certifications?: boolean | TrainerCountOutputTypeCountCertificationsArgs
    transformations?: boolean | TrainerCountOutputTypeCountTransformationsArgs
    traineeRequests?: boolean | TrainerCountOutputTypeCountTraineeRequestsArgs
    trainerTrainees?: boolean | TrainerCountOutputTypeCountTrainerTraineesArgs
  }

  // Custom InputTypes
  /**
   * TrainerCountOutputType without action
   */
  export type TrainerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCountOutputType
     */
    select?: TrainerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainerCountOutputType without action
   */
  export type TrainerCountOutputTypeCountCertificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerCertificationWhereInput
  }

  /**
   * TrainerCountOutputType without action
   */
  export type TrainerCountOutputTypeCountTransformationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTransformationWhereInput
  }

  /**
   * TrainerCountOutputType without action
   */
  export type TrainerCountOutputTypeCountTraineeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTraineeRequestWhereInput
  }

  /**
   * TrainerCountOutputType without action
   */
  export type TrainerCountOutputTypeCountTrainerTraineesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTraineeWhereInput
  }


  /**
   * Count Type TrainerRequestCountOutputType
   */

  export type TrainerRequestCountOutputType = {
    certifications: number
    transformations: number
  }

  export type TrainerRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certifications?: boolean | TrainerRequestCountOutputTypeCountCertificationsArgs
    transformations?: boolean | TrainerRequestCountOutputTypeCountTransformationsArgs
  }

  // Custom InputTypes
  /**
   * TrainerRequestCountOutputType without action
   */
  export type TrainerRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequestCountOutputType
     */
    select?: TrainerRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainerRequestCountOutputType without action
   */
  export type TrainerRequestCountOutputTypeCountCertificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerCertificationWhereInput
  }

  /**
   * TrainerRequestCountOutputType without action
   */
  export type TrainerRequestCountOutputTypeCountTransformationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTransformationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    gender: $Enums.Gender | null
    avatar: string | null
    avatarPublicId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    gender: $Enums.Gender | null
    avatar: string | null
    avatarPublicId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    username: number
    email: number
    passwordHash: number
    role: number
    gender: number
    avatar: number
    avatarPublicId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    gender?: true
    avatar?: true
    avatarPublicId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    gender?: true
    avatar?: true
    avatarPublicId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    passwordHash?: true
    role?: true
    gender?: true
    avatar?: true
    avatarPublicId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender: $Enums.Gender
    avatar: string | null
    avatarPublicId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    gender?: boolean
    avatar?: boolean
    avatarPublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainee?: boolean | User$traineeArgs<ExtArgs>
    trainer?: boolean | User$trainerArgs<ExtArgs>
    trainerRequests?: boolean | User$trainerRequestsArgs<ExtArgs>
    resetPasswordTokens?: boolean | User$resetPasswordTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    gender?: boolean
    avatar?: boolean
    avatarPublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    gender?: boolean
    avatar?: boolean
    avatarPublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    gender?: boolean
    avatar?: boolean
    avatarPublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "username" | "email" | "passwordHash" | "role" | "gender" | "avatar" | "avatarPublicId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainee?: boolean | User$traineeArgs<ExtArgs>
    trainer?: boolean | User$trainerArgs<ExtArgs>
    trainerRequests?: boolean | User$trainerRequestsArgs<ExtArgs>
    resetPasswordTokens?: boolean | User$resetPasswordTokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      trainee: Prisma.$TraineePayload<ExtArgs> | null
      trainer: Prisma.$TrainerPayload<ExtArgs> | null
      trainerRequests: Prisma.$TrainerRequestPayload<ExtArgs>[]
      resetPasswordTokens: Prisma.$ResetPasswordTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      username: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      gender: $Enums.Gender
      avatar: string | null
      avatarPublicId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainee<T extends User$traineeArgs<ExtArgs> = {}>(args?: Subset<T, User$traineeArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trainer<T extends User$trainerArgs<ExtArgs> = {}>(args?: Subset<T, User$trainerArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trainerRequests<T extends User$trainerRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$trainerRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resetPasswordTokens<T extends User$resetPasswordTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$resetPasswordTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly avatarPublicId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.trainee
   */
  export type User$traineeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    where?: TraineeWhereInput
  }

  /**
   * User.trainer
   */
  export type User$trainerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    where?: TrainerWhereInput
  }

  /**
   * User.trainerRequests
   */
  export type User$trainerRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    where?: TrainerRequestWhereInput
    orderBy?: TrainerRequestOrderByWithRelationInput | TrainerRequestOrderByWithRelationInput[]
    cursor?: TrainerRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerRequestScalarFieldEnum | TrainerRequestScalarFieldEnum[]
  }

  /**
   * User.resetPasswordTokens
   */
  export type User$resetPasswordTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    where?: ResetPasswordTokenWhereInput
    orderBy?: ResetPasswordTokenOrderByWithRelationInput | ResetPasswordTokenOrderByWithRelationInput[]
    cursor?: ResetPasswordTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResetPasswordTokenScalarFieldEnum | ResetPasswordTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Trainee
   */

  export type AggregateTrainee = {
    _count: TraineeCountAggregateOutputType | null
    _avg: TraineeAvgAggregateOutputType | null
    _sum: TraineeSumAggregateOutputType | null
    _min: TraineeMinAggregateOutputType | null
    _max: TraineeMaxAggregateOutputType | null
  }

  export type TraineeAvgAggregateOutputType = {
    heightCm: number | null
  }

  export type TraineeSumAggregateOutputType = {
    heightCm: number | null
  }

  export type TraineeMinAggregateOutputType = {
    userId: string | null
    goal: $Enums.TraineeGoal | null
    heightCm: number | null
    createdAt: Date | null
    isActive: boolean | null
  }

  export type TraineeMaxAggregateOutputType = {
    userId: string | null
    goal: $Enums.TraineeGoal | null
    heightCm: number | null
    createdAt: Date | null
    isActive: boolean | null
  }

  export type TraineeCountAggregateOutputType = {
    userId: number
    goal: number
    heightCm: number
    createdAt: number
    isActive: number
    _all: number
  }


  export type TraineeAvgAggregateInputType = {
    heightCm?: true
  }

  export type TraineeSumAggregateInputType = {
    heightCm?: true
  }

  export type TraineeMinAggregateInputType = {
    userId?: true
    goal?: true
    heightCm?: true
    createdAt?: true
    isActive?: true
  }

  export type TraineeMaxAggregateInputType = {
    userId?: true
    goal?: true
    heightCm?: true
    createdAt?: true
    isActive?: true
  }

  export type TraineeCountAggregateInputType = {
    userId?: true
    goal?: true
    heightCm?: true
    createdAt?: true
    isActive?: true
    _all?: true
  }

  export type TraineeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trainee to aggregate.
     */
    where?: TraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainees to fetch.
     */
    orderBy?: TraineeOrderByWithRelationInput | TraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trainees
    **/
    _count?: true | TraineeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TraineeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TraineeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TraineeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TraineeMaxAggregateInputType
  }

  export type GetTraineeAggregateType<T extends TraineeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainee[P]>
      : GetScalarType<T[P], AggregateTrainee[P]>
  }




  export type TraineeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TraineeWhereInput
    orderBy?: TraineeOrderByWithAggregationInput | TraineeOrderByWithAggregationInput[]
    by: TraineeScalarFieldEnum[] | TraineeScalarFieldEnum
    having?: TraineeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TraineeCountAggregateInputType | true
    _avg?: TraineeAvgAggregateInputType
    _sum?: TraineeSumAggregateInputType
    _min?: TraineeMinAggregateInputType
    _max?: TraineeMaxAggregateInputType
  }

  export type TraineeGroupByOutputType = {
    userId: string
    goal: $Enums.TraineeGoal
    heightCm: number | null
    createdAt: Date
    isActive: boolean
    _count: TraineeCountAggregateOutputType | null
    _avg: TraineeAvgAggregateOutputType | null
    _sum: TraineeSumAggregateOutputType | null
    _min: TraineeMinAggregateOutputType | null
    _max: TraineeMaxAggregateOutputType | null
  }

  type GetTraineeGroupByPayload<T extends TraineeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TraineeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TraineeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TraineeGroupByOutputType[P]>
            : GetScalarType<T[P], TraineeGroupByOutputType[P]>
        }
      >
    >


  export type TraineeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    goal?: boolean
    heightCm?: boolean
    createdAt?: boolean
    isActive?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    trainerTrainee?: boolean | Trainee$trainerTraineeArgs<ExtArgs>
    trainerTraineeRequests?: boolean | Trainee$trainerTraineeRequestsArgs<ExtArgs>
    _count?: boolean | TraineeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainee"]>

  export type TraineeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    goal?: boolean
    heightCm?: boolean
    createdAt?: boolean
    isActive?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainee"]>

  export type TraineeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    goal?: boolean
    heightCm?: boolean
    createdAt?: boolean
    isActive?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainee"]>

  export type TraineeSelectScalar = {
    userId?: boolean
    goal?: boolean
    heightCm?: boolean
    createdAt?: boolean
    isActive?: boolean
  }

  export type TraineeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "goal" | "heightCm" | "createdAt" | "isActive", ExtArgs["result"]["trainee"]>
  export type TraineeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    trainerTrainee?: boolean | Trainee$trainerTraineeArgs<ExtArgs>
    trainerTraineeRequests?: boolean | Trainee$trainerTraineeRequestsArgs<ExtArgs>
    _count?: boolean | TraineeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TraineeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TraineeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TraineePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trainee"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      trainerTrainee: Prisma.$TrainerTraineePayload<ExtArgs> | null
      trainerTraineeRequests: Prisma.$TrainerTraineeRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      goal: $Enums.TraineeGoal
      heightCm: number | null
      createdAt: Date
      isActive: boolean
    }, ExtArgs["result"]["trainee"]>
    composites: {}
  }

  type TraineeGetPayload<S extends boolean | null | undefined | TraineeDefaultArgs> = $Result.GetResult<Prisma.$TraineePayload, S>

  type TraineeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TraineeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TraineeCountAggregateInputType | true
    }

  export interface TraineeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trainee'], meta: { name: 'Trainee' } }
    /**
     * Find zero or one Trainee that matches the filter.
     * @param {TraineeFindUniqueArgs} args - Arguments to find a Trainee
     * @example
     * // Get one Trainee
     * const trainee = await prisma.trainee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TraineeFindUniqueArgs>(args: SelectSubset<T, TraineeFindUniqueArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trainee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TraineeFindUniqueOrThrowArgs} args - Arguments to find a Trainee
     * @example
     * // Get one Trainee
     * const trainee = await prisma.trainee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TraineeFindUniqueOrThrowArgs>(args: SelectSubset<T, TraineeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trainee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeFindFirstArgs} args - Arguments to find a Trainee
     * @example
     * // Get one Trainee
     * const trainee = await prisma.trainee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TraineeFindFirstArgs>(args?: SelectSubset<T, TraineeFindFirstArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trainee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeFindFirstOrThrowArgs} args - Arguments to find a Trainee
     * @example
     * // Get one Trainee
     * const trainee = await prisma.trainee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TraineeFindFirstOrThrowArgs>(args?: SelectSubset<T, TraineeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trainees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trainees
     * const trainees = await prisma.trainee.findMany()
     * 
     * // Get first 10 Trainees
     * const trainees = await prisma.trainee.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const traineeWithUserIdOnly = await prisma.trainee.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends TraineeFindManyArgs>(args?: SelectSubset<T, TraineeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trainee.
     * @param {TraineeCreateArgs} args - Arguments to create a Trainee.
     * @example
     * // Create one Trainee
     * const Trainee = await prisma.trainee.create({
     *   data: {
     *     // ... data to create a Trainee
     *   }
     * })
     * 
     */
    create<T extends TraineeCreateArgs>(args: SelectSubset<T, TraineeCreateArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trainees.
     * @param {TraineeCreateManyArgs} args - Arguments to create many Trainees.
     * @example
     * // Create many Trainees
     * const trainee = await prisma.trainee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TraineeCreateManyArgs>(args?: SelectSubset<T, TraineeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trainees and returns the data saved in the database.
     * @param {TraineeCreateManyAndReturnArgs} args - Arguments to create many Trainees.
     * @example
     * // Create many Trainees
     * const trainee = await prisma.trainee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trainees and only return the `userId`
     * const traineeWithUserIdOnly = await prisma.trainee.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TraineeCreateManyAndReturnArgs>(args?: SelectSubset<T, TraineeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trainee.
     * @param {TraineeDeleteArgs} args - Arguments to delete one Trainee.
     * @example
     * // Delete one Trainee
     * const Trainee = await prisma.trainee.delete({
     *   where: {
     *     // ... filter to delete one Trainee
     *   }
     * })
     * 
     */
    delete<T extends TraineeDeleteArgs>(args: SelectSubset<T, TraineeDeleteArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trainee.
     * @param {TraineeUpdateArgs} args - Arguments to update one Trainee.
     * @example
     * // Update one Trainee
     * const trainee = await prisma.trainee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TraineeUpdateArgs>(args: SelectSubset<T, TraineeUpdateArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trainees.
     * @param {TraineeDeleteManyArgs} args - Arguments to filter Trainees to delete.
     * @example
     * // Delete a few Trainees
     * const { count } = await prisma.trainee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TraineeDeleteManyArgs>(args?: SelectSubset<T, TraineeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trainees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trainees
     * const trainee = await prisma.trainee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TraineeUpdateManyArgs>(args: SelectSubset<T, TraineeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trainees and returns the data updated in the database.
     * @param {TraineeUpdateManyAndReturnArgs} args - Arguments to update many Trainees.
     * @example
     * // Update many Trainees
     * const trainee = await prisma.trainee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trainees and only return the `userId`
     * const traineeWithUserIdOnly = await prisma.trainee.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TraineeUpdateManyAndReturnArgs>(args: SelectSubset<T, TraineeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trainee.
     * @param {TraineeUpsertArgs} args - Arguments to update or create a Trainee.
     * @example
     * // Update or create a Trainee
     * const trainee = await prisma.trainee.upsert({
     *   create: {
     *     // ... data to create a Trainee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trainee we want to update
     *   }
     * })
     */
    upsert<T extends TraineeUpsertArgs>(args: SelectSubset<T, TraineeUpsertArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trainees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeCountArgs} args - Arguments to filter Trainees to count.
     * @example
     * // Count the number of Trainees
     * const count = await prisma.trainee.count({
     *   where: {
     *     // ... the filter for the Trainees we want to count
     *   }
     * })
    **/
    count<T extends TraineeCountArgs>(
      args?: Subset<T, TraineeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TraineeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trainee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TraineeAggregateArgs>(args: Subset<T, TraineeAggregateArgs>): Prisma.PrismaPromise<GetTraineeAggregateType<T>>

    /**
     * Group by Trainee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TraineeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TraineeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TraineeGroupByArgs['orderBy'] }
        : { orderBy?: TraineeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TraineeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTraineeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trainee model
   */
  readonly fields: TraineeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trainee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TraineeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainerTrainee<T extends Trainee$trainerTraineeArgs<ExtArgs> = {}>(args?: Subset<T, Trainee$trainerTraineeArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trainerTraineeRequests<T extends Trainee$trainerTraineeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Trainee$trainerTraineeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trainee model
   */
  interface TraineeFieldRefs {
    readonly userId: FieldRef<"Trainee", 'String'>
    readonly goal: FieldRef<"Trainee", 'TraineeGoal'>
    readonly heightCm: FieldRef<"Trainee", 'Int'>
    readonly createdAt: FieldRef<"Trainee", 'DateTime'>
    readonly isActive: FieldRef<"Trainee", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Trainee findUnique
   */
  export type TraineeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * Filter, which Trainee to fetch.
     */
    where: TraineeWhereUniqueInput
  }

  /**
   * Trainee findUniqueOrThrow
   */
  export type TraineeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * Filter, which Trainee to fetch.
     */
    where: TraineeWhereUniqueInput
  }

  /**
   * Trainee findFirst
   */
  export type TraineeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * Filter, which Trainee to fetch.
     */
    where?: TraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainees to fetch.
     */
    orderBy?: TraineeOrderByWithRelationInput | TraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trainees.
     */
    cursor?: TraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trainees.
     */
    distinct?: TraineeScalarFieldEnum | TraineeScalarFieldEnum[]
  }

  /**
   * Trainee findFirstOrThrow
   */
  export type TraineeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * Filter, which Trainee to fetch.
     */
    where?: TraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainees to fetch.
     */
    orderBy?: TraineeOrderByWithRelationInput | TraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trainees.
     */
    cursor?: TraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trainees.
     */
    distinct?: TraineeScalarFieldEnum | TraineeScalarFieldEnum[]
  }

  /**
   * Trainee findMany
   */
  export type TraineeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * Filter, which Trainees to fetch.
     */
    where?: TraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainees to fetch.
     */
    orderBy?: TraineeOrderByWithRelationInput | TraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trainees.
     */
    cursor?: TraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainees.
     */
    skip?: number
    distinct?: TraineeScalarFieldEnum | TraineeScalarFieldEnum[]
  }

  /**
   * Trainee create
   */
  export type TraineeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trainee.
     */
    data: XOR<TraineeCreateInput, TraineeUncheckedCreateInput>
  }

  /**
   * Trainee createMany
   */
  export type TraineeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trainees.
     */
    data: TraineeCreateManyInput | TraineeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trainee createManyAndReturn
   */
  export type TraineeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * The data used to create many Trainees.
     */
    data: TraineeCreateManyInput | TraineeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trainee update
   */
  export type TraineeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trainee.
     */
    data: XOR<TraineeUpdateInput, TraineeUncheckedUpdateInput>
    /**
     * Choose, which Trainee to update.
     */
    where: TraineeWhereUniqueInput
  }

  /**
   * Trainee updateMany
   */
  export type TraineeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trainees.
     */
    data: XOR<TraineeUpdateManyMutationInput, TraineeUncheckedUpdateManyInput>
    /**
     * Filter which Trainees to update
     */
    where?: TraineeWhereInput
    /**
     * Limit how many Trainees to update.
     */
    limit?: number
  }

  /**
   * Trainee updateManyAndReturn
   */
  export type TraineeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * The data used to update Trainees.
     */
    data: XOR<TraineeUpdateManyMutationInput, TraineeUncheckedUpdateManyInput>
    /**
     * Filter which Trainees to update
     */
    where?: TraineeWhereInput
    /**
     * Limit how many Trainees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trainee upsert
   */
  export type TraineeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trainee to update in case it exists.
     */
    where: TraineeWhereUniqueInput
    /**
     * In case the Trainee found by the `where` argument doesn't exist, create a new Trainee with this data.
     */
    create: XOR<TraineeCreateInput, TraineeUncheckedCreateInput>
    /**
     * In case the Trainee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TraineeUpdateInput, TraineeUncheckedUpdateInput>
  }

  /**
   * Trainee delete
   */
  export type TraineeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
    /**
     * Filter which Trainee to delete.
     */
    where: TraineeWhereUniqueInput
  }

  /**
   * Trainee deleteMany
   */
  export type TraineeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trainees to delete
     */
    where?: TraineeWhereInput
    /**
     * Limit how many Trainees to delete.
     */
    limit?: number
  }

  /**
   * Trainee.trainerTrainee
   */
  export type Trainee$trainerTraineeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    where?: TrainerTraineeWhereInput
  }

  /**
   * Trainee.trainerTraineeRequests
   */
  export type Trainee$trainerTraineeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    where?: TrainerTraineeRequestWhereInput
    orderBy?: TrainerTraineeRequestOrderByWithRelationInput | TrainerTraineeRequestOrderByWithRelationInput[]
    cursor?: TrainerTraineeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerTraineeRequestScalarFieldEnum | TrainerTraineeRequestScalarFieldEnum[]
  }

  /**
   * Trainee without action
   */
  export type TraineeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainee
     */
    select?: TraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainee
     */
    omit?: TraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TraineeInclude<ExtArgs> | null
  }


  /**
   * Model Trainer
   */

  export type AggregateTrainer = {
    _count: TrainerCountAggregateOutputType | null
    _avg: TrainerAvgAggregateOutputType | null
    _sum: TrainerSumAggregateOutputType | null
    _min: TrainerMinAggregateOutputType | null
    _max: TrainerMaxAggregateOutputType | null
  }

  export type TrainerAvgAggregateOutputType = {
    ratingAvg: number | null
    ratingCount: number | null
    rankScore: number | null
  }

  export type TrainerSumAggregateOutputType = {
    ratingAvg: number | null
    ratingCount: number | null
    rankScore: number | null
  }

  export type TrainerMinAggregateOutputType = {
    userId: string | null
    bio: string | null
    experienceYears: Date | null
    ratingAvg: number | null
    ratingCount: number | null
    rankScore: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type TrainerMaxAggregateOutputType = {
    userId: string | null
    bio: string | null
    experienceYears: Date | null
    ratingAvg: number | null
    ratingCount: number | null
    rankScore: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type TrainerCountAggregateOutputType = {
    userId: number
    bio: number
    experienceYears: number
    ratingAvg: number
    ratingCount: number
    rankScore: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type TrainerAvgAggregateInputType = {
    ratingAvg?: true
    ratingCount?: true
    rankScore?: true
  }

  export type TrainerSumAggregateInputType = {
    ratingAvg?: true
    ratingCount?: true
    rankScore?: true
  }

  export type TrainerMinAggregateInputType = {
    userId?: true
    bio?: true
    experienceYears?: true
    ratingAvg?: true
    ratingCount?: true
    rankScore?: true
    isActive?: true
    createdAt?: true
  }

  export type TrainerMaxAggregateInputType = {
    userId?: true
    bio?: true
    experienceYears?: true
    ratingAvg?: true
    ratingCount?: true
    rankScore?: true
    isActive?: true
    createdAt?: true
  }

  export type TrainerCountAggregateInputType = {
    userId?: true
    bio?: true
    experienceYears?: true
    ratingAvg?: true
    ratingCount?: true
    rankScore?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type TrainerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trainer to aggregate.
     */
    where?: TrainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainers to fetch.
     */
    orderBy?: TrainerOrderByWithRelationInput | TrainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trainers
    **/
    _count?: true | TrainerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainerMaxAggregateInputType
  }

  export type GetTrainerAggregateType<T extends TrainerAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainer[P]>
      : GetScalarType<T[P], AggregateTrainer[P]>
  }




  export type TrainerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerWhereInput
    orderBy?: TrainerOrderByWithAggregationInput | TrainerOrderByWithAggregationInput[]
    by: TrainerScalarFieldEnum[] | TrainerScalarFieldEnum
    having?: TrainerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainerCountAggregateInputType | true
    _avg?: TrainerAvgAggregateInputType
    _sum?: TrainerSumAggregateInputType
    _min?: TrainerMinAggregateInputType
    _max?: TrainerMaxAggregateInputType
  }

  export type TrainerGroupByOutputType = {
    userId: string
    bio: string
    experienceYears: Date
    ratingAvg: number
    ratingCount: number
    rankScore: number
    isActive: boolean
    createdAt: Date
    _count: TrainerCountAggregateOutputType | null
    _avg: TrainerAvgAggregateOutputType | null
    _sum: TrainerSumAggregateOutputType | null
    _min: TrainerMinAggregateOutputType | null
    _max: TrainerMaxAggregateOutputType | null
  }

  type GetTrainerGroupByPayload<T extends TrainerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainerGroupByOutputType[P]>
            : GetScalarType<T[P], TrainerGroupByOutputType[P]>
        }
      >
    >


  export type TrainerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    bio?: boolean
    experienceYears?: boolean
    ratingAvg?: boolean
    ratingCount?: boolean
    rankScore?: boolean
    isActive?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    certifications?: boolean | Trainer$certificationsArgs<ExtArgs>
    transformations?: boolean | Trainer$transformationsArgs<ExtArgs>
    traineeRequests?: boolean | Trainer$traineeRequestsArgs<ExtArgs>
    trainerTrainees?: boolean | Trainer$trainerTraineesArgs<ExtArgs>
    _count?: boolean | TrainerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainer"]>

  export type TrainerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    bio?: boolean
    experienceYears?: boolean
    ratingAvg?: boolean
    ratingCount?: boolean
    rankScore?: boolean
    isActive?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainer"]>

  export type TrainerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    bio?: boolean
    experienceYears?: boolean
    ratingAvg?: boolean
    ratingCount?: boolean
    rankScore?: boolean
    isActive?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainer"]>

  export type TrainerSelectScalar = {
    userId?: boolean
    bio?: boolean
    experienceYears?: boolean
    ratingAvg?: boolean
    ratingCount?: boolean
    rankScore?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type TrainerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "bio" | "experienceYears" | "ratingAvg" | "ratingCount" | "rankScore" | "isActive" | "createdAt", ExtArgs["result"]["trainer"]>
  export type TrainerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    certifications?: boolean | Trainer$certificationsArgs<ExtArgs>
    transformations?: boolean | Trainer$transformationsArgs<ExtArgs>
    traineeRequests?: boolean | Trainer$traineeRequestsArgs<ExtArgs>
    trainerTrainees?: boolean | Trainer$trainerTraineesArgs<ExtArgs>
    _count?: boolean | TrainerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trainer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      certifications: Prisma.$TrainerCertificationPayload<ExtArgs>[]
      transformations: Prisma.$TrainerTransformationPayload<ExtArgs>[]
      traineeRequests: Prisma.$TrainerTraineeRequestPayload<ExtArgs>[]
      trainerTrainees: Prisma.$TrainerTraineePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      bio: string
      experienceYears: Date
      ratingAvg: number
      ratingCount: number
      rankScore: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["trainer"]>
    composites: {}
  }

  type TrainerGetPayload<S extends boolean | null | undefined | TrainerDefaultArgs> = $Result.GetResult<Prisma.$TrainerPayload, S>

  type TrainerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainerCountAggregateInputType | true
    }

  export interface TrainerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trainer'], meta: { name: 'Trainer' } }
    /**
     * Find zero or one Trainer that matches the filter.
     * @param {TrainerFindUniqueArgs} args - Arguments to find a Trainer
     * @example
     * // Get one Trainer
     * const trainer = await prisma.trainer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerFindUniqueArgs>(args: SelectSubset<T, TrainerFindUniqueArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trainer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerFindUniqueOrThrowArgs} args - Arguments to find a Trainer
     * @example
     * // Get one Trainer
     * const trainer = await prisma.trainer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trainer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerFindFirstArgs} args - Arguments to find a Trainer
     * @example
     * // Get one Trainer
     * const trainer = await prisma.trainer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerFindFirstArgs>(args?: SelectSubset<T, TrainerFindFirstArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trainer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerFindFirstOrThrowArgs} args - Arguments to find a Trainer
     * @example
     * // Get one Trainer
     * const trainer = await prisma.trainer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainerFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trainers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trainers
     * const trainers = await prisma.trainer.findMany()
     * 
     * // Get first 10 Trainers
     * const trainers = await prisma.trainer.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const trainerWithUserIdOnly = await prisma.trainer.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends TrainerFindManyArgs>(args?: SelectSubset<T, TrainerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trainer.
     * @param {TrainerCreateArgs} args - Arguments to create a Trainer.
     * @example
     * // Create one Trainer
     * const Trainer = await prisma.trainer.create({
     *   data: {
     *     // ... data to create a Trainer
     *   }
     * })
     * 
     */
    create<T extends TrainerCreateArgs>(args: SelectSubset<T, TrainerCreateArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trainers.
     * @param {TrainerCreateManyArgs} args - Arguments to create many Trainers.
     * @example
     * // Create many Trainers
     * const trainer = await prisma.trainer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainerCreateManyArgs>(args?: SelectSubset<T, TrainerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trainers and returns the data saved in the database.
     * @param {TrainerCreateManyAndReturnArgs} args - Arguments to create many Trainers.
     * @example
     * // Create many Trainers
     * const trainer = await prisma.trainer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trainers and only return the `userId`
     * const trainerWithUserIdOnly = await prisma.trainer.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainerCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trainer.
     * @param {TrainerDeleteArgs} args - Arguments to delete one Trainer.
     * @example
     * // Delete one Trainer
     * const Trainer = await prisma.trainer.delete({
     *   where: {
     *     // ... filter to delete one Trainer
     *   }
     * })
     * 
     */
    delete<T extends TrainerDeleteArgs>(args: SelectSubset<T, TrainerDeleteArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trainer.
     * @param {TrainerUpdateArgs} args - Arguments to update one Trainer.
     * @example
     * // Update one Trainer
     * const trainer = await prisma.trainer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainerUpdateArgs>(args: SelectSubset<T, TrainerUpdateArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trainers.
     * @param {TrainerDeleteManyArgs} args - Arguments to filter Trainers to delete.
     * @example
     * // Delete a few Trainers
     * const { count } = await prisma.trainer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainerDeleteManyArgs>(args?: SelectSubset<T, TrainerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trainers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trainers
     * const trainer = await prisma.trainer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainerUpdateManyArgs>(args: SelectSubset<T, TrainerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trainers and returns the data updated in the database.
     * @param {TrainerUpdateManyAndReturnArgs} args - Arguments to update many Trainers.
     * @example
     * // Update many Trainers
     * const trainer = await prisma.trainer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trainers and only return the `userId`
     * const trainerWithUserIdOnly = await prisma.trainer.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainerUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trainer.
     * @param {TrainerUpsertArgs} args - Arguments to update or create a Trainer.
     * @example
     * // Update or create a Trainer
     * const trainer = await prisma.trainer.upsert({
     *   create: {
     *     // ... data to create a Trainer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trainer we want to update
     *   }
     * })
     */
    upsert<T extends TrainerUpsertArgs>(args: SelectSubset<T, TrainerUpsertArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trainers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCountArgs} args - Arguments to filter Trainers to count.
     * @example
     * // Count the number of Trainers
     * const count = await prisma.trainer.count({
     *   where: {
     *     // ... the filter for the Trainers we want to count
     *   }
     * })
    **/
    count<T extends TrainerCountArgs>(
      args?: Subset<T, TrainerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trainer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainerAggregateArgs>(args: Subset<T, TrainerAggregateArgs>): Prisma.PrismaPromise<GetTrainerAggregateType<T>>

    /**
     * Group by Trainer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainerGroupByArgs['orderBy'] }
        : { orderBy?: TrainerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trainer model
   */
  readonly fields: TrainerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trainer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    certifications<T extends Trainer$certificationsArgs<ExtArgs> = {}>(args?: Subset<T, Trainer$certificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transformations<T extends Trainer$transformationsArgs<ExtArgs> = {}>(args?: Subset<T, Trainer$transformationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    traineeRequests<T extends Trainer$traineeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Trainer$traineeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainerTrainees<T extends Trainer$trainerTraineesArgs<ExtArgs> = {}>(args?: Subset<T, Trainer$trainerTraineesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trainer model
   */
  interface TrainerFieldRefs {
    readonly userId: FieldRef<"Trainer", 'String'>
    readonly bio: FieldRef<"Trainer", 'String'>
    readonly experienceYears: FieldRef<"Trainer", 'DateTime'>
    readonly ratingAvg: FieldRef<"Trainer", 'Float'>
    readonly ratingCount: FieldRef<"Trainer", 'Int'>
    readonly rankScore: FieldRef<"Trainer", 'Float'>
    readonly isActive: FieldRef<"Trainer", 'Boolean'>
    readonly createdAt: FieldRef<"Trainer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trainer findUnique
   */
  export type TrainerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * Filter, which Trainer to fetch.
     */
    where: TrainerWhereUniqueInput
  }

  /**
   * Trainer findUniqueOrThrow
   */
  export type TrainerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * Filter, which Trainer to fetch.
     */
    where: TrainerWhereUniqueInput
  }

  /**
   * Trainer findFirst
   */
  export type TrainerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * Filter, which Trainer to fetch.
     */
    where?: TrainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainers to fetch.
     */
    orderBy?: TrainerOrderByWithRelationInput | TrainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trainers.
     */
    cursor?: TrainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trainers.
     */
    distinct?: TrainerScalarFieldEnum | TrainerScalarFieldEnum[]
  }

  /**
   * Trainer findFirstOrThrow
   */
  export type TrainerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * Filter, which Trainer to fetch.
     */
    where?: TrainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainers to fetch.
     */
    orderBy?: TrainerOrderByWithRelationInput | TrainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trainers.
     */
    cursor?: TrainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trainers.
     */
    distinct?: TrainerScalarFieldEnum | TrainerScalarFieldEnum[]
  }

  /**
   * Trainer findMany
   */
  export type TrainerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * Filter, which Trainers to fetch.
     */
    where?: TrainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trainers to fetch.
     */
    orderBy?: TrainerOrderByWithRelationInput | TrainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trainers.
     */
    cursor?: TrainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trainers.
     */
    skip?: number
    distinct?: TrainerScalarFieldEnum | TrainerScalarFieldEnum[]
  }

  /**
   * Trainer create
   */
  export type TrainerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * The data needed to create a Trainer.
     */
    data: XOR<TrainerCreateInput, TrainerUncheckedCreateInput>
  }

  /**
   * Trainer createMany
   */
  export type TrainerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trainers.
     */
    data: TrainerCreateManyInput | TrainerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trainer createManyAndReturn
   */
  export type TrainerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * The data used to create many Trainers.
     */
    data: TrainerCreateManyInput | TrainerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trainer update
   */
  export type TrainerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * The data needed to update a Trainer.
     */
    data: XOR<TrainerUpdateInput, TrainerUncheckedUpdateInput>
    /**
     * Choose, which Trainer to update.
     */
    where: TrainerWhereUniqueInput
  }

  /**
   * Trainer updateMany
   */
  export type TrainerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trainers.
     */
    data: XOR<TrainerUpdateManyMutationInput, TrainerUncheckedUpdateManyInput>
    /**
     * Filter which Trainers to update
     */
    where?: TrainerWhereInput
    /**
     * Limit how many Trainers to update.
     */
    limit?: number
  }

  /**
   * Trainer updateManyAndReturn
   */
  export type TrainerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * The data used to update Trainers.
     */
    data: XOR<TrainerUpdateManyMutationInput, TrainerUncheckedUpdateManyInput>
    /**
     * Filter which Trainers to update
     */
    where?: TrainerWhereInput
    /**
     * Limit how many Trainers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trainer upsert
   */
  export type TrainerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * The filter to search for the Trainer to update in case it exists.
     */
    where: TrainerWhereUniqueInput
    /**
     * In case the Trainer found by the `where` argument doesn't exist, create a new Trainer with this data.
     */
    create: XOR<TrainerCreateInput, TrainerUncheckedCreateInput>
    /**
     * In case the Trainer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainerUpdateInput, TrainerUncheckedUpdateInput>
  }

  /**
   * Trainer delete
   */
  export type TrainerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    /**
     * Filter which Trainer to delete.
     */
    where: TrainerWhereUniqueInput
  }

  /**
   * Trainer deleteMany
   */
  export type TrainerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trainers to delete
     */
    where?: TrainerWhereInput
    /**
     * Limit how many Trainers to delete.
     */
    limit?: number
  }

  /**
   * Trainer.certifications
   */
  export type Trainer$certificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    where?: TrainerCertificationWhereInput
    orderBy?: TrainerCertificationOrderByWithRelationInput | TrainerCertificationOrderByWithRelationInput[]
    cursor?: TrainerCertificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerCertificationScalarFieldEnum | TrainerCertificationScalarFieldEnum[]
  }

  /**
   * Trainer.transformations
   */
  export type Trainer$transformationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    where?: TrainerTransformationWhereInput
    orderBy?: TrainerTransformationOrderByWithRelationInput | TrainerTransformationOrderByWithRelationInput[]
    cursor?: TrainerTransformationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerTransformationScalarFieldEnum | TrainerTransformationScalarFieldEnum[]
  }

  /**
   * Trainer.traineeRequests
   */
  export type Trainer$traineeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    where?: TrainerTraineeRequestWhereInput
    orderBy?: TrainerTraineeRequestOrderByWithRelationInput | TrainerTraineeRequestOrderByWithRelationInput[]
    cursor?: TrainerTraineeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerTraineeRequestScalarFieldEnum | TrainerTraineeRequestScalarFieldEnum[]
  }

  /**
   * Trainer.trainerTrainees
   */
  export type Trainer$trainerTraineesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    where?: TrainerTraineeWhereInput
    orderBy?: TrainerTraineeOrderByWithRelationInput | TrainerTraineeOrderByWithRelationInput[]
    cursor?: TrainerTraineeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerTraineeScalarFieldEnum | TrainerTraineeScalarFieldEnum[]
  }

  /**
   * Trainer without action
   */
  export type TrainerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
  }


  /**
   * Model TrainerCertification
   */

  export type AggregateTrainerCertification = {
    _count: TrainerCertificationCountAggregateOutputType | null
    _min: TrainerCertificationMinAggregateOutputType | null
    _max: TrainerCertificationMaxAggregateOutputType | null
  }

  export type TrainerCertificationMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    trainerRequestId: string | null
    name: string | null
    imageUrl: string | null
    imagePublicId: string | null
    issuedBy: string | null
    issuedAt: Date | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TrainerCertificationMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    trainerRequestId: string | null
    name: string | null
    imageUrl: string | null
    imagePublicId: string | null
    issuedBy: string | null
    issuedAt: Date | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type TrainerCertificationCountAggregateOutputType = {
    id: number
    trainerId: number
    trainerRequestId: number
    name: number
    imageUrl: number
    imagePublicId: number
    issuedBy: number
    issuedAt: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type TrainerCertificationMinAggregateInputType = {
    id?: true
    trainerId?: true
    trainerRequestId?: true
    name?: true
    imageUrl?: true
    imagePublicId?: true
    issuedBy?: true
    issuedAt?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TrainerCertificationMaxAggregateInputType = {
    id?: true
    trainerId?: true
    trainerRequestId?: true
    name?: true
    imageUrl?: true
    imagePublicId?: true
    issuedBy?: true
    issuedAt?: true
    updatedAt?: true
    createdAt?: true
  }

  export type TrainerCertificationCountAggregateInputType = {
    id?: true
    trainerId?: true
    trainerRequestId?: true
    name?: true
    imageUrl?: true
    imagePublicId?: true
    issuedBy?: true
    issuedAt?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TrainerCertificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerCertification to aggregate.
     */
    where?: TrainerCertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerCertifications to fetch.
     */
    orderBy?: TrainerCertificationOrderByWithRelationInput | TrainerCertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainerCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerCertifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerCertifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainerCertifications
    **/
    _count?: true | TrainerCertificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainerCertificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainerCertificationMaxAggregateInputType
  }

  export type GetTrainerCertificationAggregateType<T extends TrainerCertificationAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainerCertification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainerCertification[P]>
      : GetScalarType<T[P], AggregateTrainerCertification[P]>
  }




  export type TrainerCertificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerCertificationWhereInput
    orderBy?: TrainerCertificationOrderByWithAggregationInput | TrainerCertificationOrderByWithAggregationInput[]
    by: TrainerCertificationScalarFieldEnum[] | TrainerCertificationScalarFieldEnum
    having?: TrainerCertificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainerCertificationCountAggregateInputType | true
    _min?: TrainerCertificationMinAggregateInputType
    _max?: TrainerCertificationMaxAggregateInputType
  }

  export type TrainerCertificationGroupByOutputType = {
    id: string
    trainerId: string | null
    trainerRequestId: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy: string | null
    issuedAt: Date | null
    updatedAt: Date
    createdAt: Date
    _count: TrainerCertificationCountAggregateOutputType | null
    _min: TrainerCertificationMinAggregateOutputType | null
    _max: TrainerCertificationMaxAggregateOutputType | null
  }

  type GetTrainerCertificationGroupByPayload<T extends TrainerCertificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainerCertificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainerCertificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainerCertificationGroupByOutputType[P]>
            : GetScalarType<T[P], TrainerCertificationGroupByOutputType[P]>
        }
      >
    >


  export type TrainerCertificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    issuedBy?: boolean
    issuedAt?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    trainer?: boolean | TrainerCertification$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerCertification$trainerRequestArgs<ExtArgs>
  }, ExtArgs["result"]["trainerCertification"]>

  export type TrainerCertificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    issuedBy?: boolean
    issuedAt?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    trainer?: boolean | TrainerCertification$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerCertification$trainerRequestArgs<ExtArgs>
  }, ExtArgs["result"]["trainerCertification"]>

  export type TrainerCertificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    issuedBy?: boolean
    issuedAt?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    trainer?: boolean | TrainerCertification$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerCertification$trainerRequestArgs<ExtArgs>
  }, ExtArgs["result"]["trainerCertification"]>

  export type TrainerCertificationSelectScalar = {
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    issuedBy?: boolean
    issuedAt?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type TrainerCertificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "trainerRequestId" | "name" | "imageUrl" | "imagePublicId" | "issuedBy" | "issuedAt" | "updatedAt" | "createdAt", ExtArgs["result"]["trainerCertification"]>
  export type TrainerCertificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerCertification$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerCertification$trainerRequestArgs<ExtArgs>
  }
  export type TrainerCertificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerCertification$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerCertification$trainerRequestArgs<ExtArgs>
  }
  export type TrainerCertificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerCertification$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerCertification$trainerRequestArgs<ExtArgs>
  }

  export type $TrainerCertificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainerCertification"
    objects: {
      trainer: Prisma.$TrainerPayload<ExtArgs> | null
      trainerRequest: Prisma.$TrainerRequestPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string | null
      trainerRequestId: string | null
      name: string
      imageUrl: string
      imagePublicId: string
      issuedBy: string | null
      issuedAt: Date | null
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["trainerCertification"]>
    composites: {}
  }

  type TrainerCertificationGetPayload<S extends boolean | null | undefined | TrainerCertificationDefaultArgs> = $Result.GetResult<Prisma.$TrainerCertificationPayload, S>

  type TrainerCertificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainerCertificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainerCertificationCountAggregateInputType | true
    }

  export interface TrainerCertificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainerCertification'], meta: { name: 'TrainerCertification' } }
    /**
     * Find zero or one TrainerCertification that matches the filter.
     * @param {TrainerCertificationFindUniqueArgs} args - Arguments to find a TrainerCertification
     * @example
     * // Get one TrainerCertification
     * const trainerCertification = await prisma.trainerCertification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerCertificationFindUniqueArgs>(args: SelectSubset<T, TrainerCertificationFindUniqueArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainerCertification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerCertificationFindUniqueOrThrowArgs} args - Arguments to find a TrainerCertification
     * @example
     * // Get one TrainerCertification
     * const trainerCertification = await prisma.trainerCertification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerCertificationFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainerCertificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerCertification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationFindFirstArgs} args - Arguments to find a TrainerCertification
     * @example
     * // Get one TrainerCertification
     * const trainerCertification = await prisma.trainerCertification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerCertificationFindFirstArgs>(args?: SelectSubset<T, TrainerCertificationFindFirstArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerCertification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationFindFirstOrThrowArgs} args - Arguments to find a TrainerCertification
     * @example
     * // Get one TrainerCertification
     * const trainerCertification = await prisma.trainerCertification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerCertificationFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainerCertificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainerCertifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainerCertifications
     * const trainerCertifications = await prisma.trainerCertification.findMany()
     * 
     * // Get first 10 TrainerCertifications
     * const trainerCertifications = await prisma.trainerCertification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainerCertificationWithIdOnly = await prisma.trainerCertification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainerCertificationFindManyArgs>(args?: SelectSubset<T, TrainerCertificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainerCertification.
     * @param {TrainerCertificationCreateArgs} args - Arguments to create a TrainerCertification.
     * @example
     * // Create one TrainerCertification
     * const TrainerCertification = await prisma.trainerCertification.create({
     *   data: {
     *     // ... data to create a TrainerCertification
     *   }
     * })
     * 
     */
    create<T extends TrainerCertificationCreateArgs>(args: SelectSubset<T, TrainerCertificationCreateArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainerCertifications.
     * @param {TrainerCertificationCreateManyArgs} args - Arguments to create many TrainerCertifications.
     * @example
     * // Create many TrainerCertifications
     * const trainerCertification = await prisma.trainerCertification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainerCertificationCreateManyArgs>(args?: SelectSubset<T, TrainerCertificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainerCertifications and returns the data saved in the database.
     * @param {TrainerCertificationCreateManyAndReturnArgs} args - Arguments to create many TrainerCertifications.
     * @example
     * // Create many TrainerCertifications
     * const trainerCertification = await prisma.trainerCertification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainerCertifications and only return the `id`
     * const trainerCertificationWithIdOnly = await prisma.trainerCertification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainerCertificationCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainerCertificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainerCertification.
     * @param {TrainerCertificationDeleteArgs} args - Arguments to delete one TrainerCertification.
     * @example
     * // Delete one TrainerCertification
     * const TrainerCertification = await prisma.trainerCertification.delete({
     *   where: {
     *     // ... filter to delete one TrainerCertification
     *   }
     * })
     * 
     */
    delete<T extends TrainerCertificationDeleteArgs>(args: SelectSubset<T, TrainerCertificationDeleteArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainerCertification.
     * @param {TrainerCertificationUpdateArgs} args - Arguments to update one TrainerCertification.
     * @example
     * // Update one TrainerCertification
     * const trainerCertification = await prisma.trainerCertification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainerCertificationUpdateArgs>(args: SelectSubset<T, TrainerCertificationUpdateArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainerCertifications.
     * @param {TrainerCertificationDeleteManyArgs} args - Arguments to filter TrainerCertifications to delete.
     * @example
     * // Delete a few TrainerCertifications
     * const { count } = await prisma.trainerCertification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainerCertificationDeleteManyArgs>(args?: SelectSubset<T, TrainerCertificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerCertifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainerCertifications
     * const trainerCertification = await prisma.trainerCertification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainerCertificationUpdateManyArgs>(args: SelectSubset<T, TrainerCertificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerCertifications and returns the data updated in the database.
     * @param {TrainerCertificationUpdateManyAndReturnArgs} args - Arguments to update many TrainerCertifications.
     * @example
     * // Update many TrainerCertifications
     * const trainerCertification = await prisma.trainerCertification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainerCertifications and only return the `id`
     * const trainerCertificationWithIdOnly = await prisma.trainerCertification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainerCertificationUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainerCertificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainerCertification.
     * @param {TrainerCertificationUpsertArgs} args - Arguments to update or create a TrainerCertification.
     * @example
     * // Update or create a TrainerCertification
     * const trainerCertification = await prisma.trainerCertification.upsert({
     *   create: {
     *     // ... data to create a TrainerCertification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainerCertification we want to update
     *   }
     * })
     */
    upsert<T extends TrainerCertificationUpsertArgs>(args: SelectSubset<T, TrainerCertificationUpsertArgs<ExtArgs>>): Prisma__TrainerCertificationClient<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainerCertifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationCountArgs} args - Arguments to filter TrainerCertifications to count.
     * @example
     * // Count the number of TrainerCertifications
     * const count = await prisma.trainerCertification.count({
     *   where: {
     *     // ... the filter for the TrainerCertifications we want to count
     *   }
     * })
    **/
    count<T extends TrainerCertificationCountArgs>(
      args?: Subset<T, TrainerCertificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainerCertificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainerCertification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainerCertificationAggregateArgs>(args: Subset<T, TrainerCertificationAggregateArgs>): Prisma.PrismaPromise<GetTrainerCertificationAggregateType<T>>

    /**
     * Group by TrainerCertification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerCertificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainerCertificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainerCertificationGroupByArgs['orderBy'] }
        : { orderBy?: TrainerCertificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainerCertificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerCertificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainerCertification model
   */
  readonly fields: TrainerCertificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainerCertification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainerCertificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainer<T extends TrainerCertification$trainerArgs<ExtArgs> = {}>(args?: Subset<T, TrainerCertification$trainerArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trainerRequest<T extends TrainerCertification$trainerRequestArgs<ExtArgs> = {}>(args?: Subset<T, TrainerCertification$trainerRequestArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainerCertification model
   */
  interface TrainerCertificationFieldRefs {
    readonly id: FieldRef<"TrainerCertification", 'String'>
    readonly trainerId: FieldRef<"TrainerCertification", 'String'>
    readonly trainerRequestId: FieldRef<"TrainerCertification", 'String'>
    readonly name: FieldRef<"TrainerCertification", 'String'>
    readonly imageUrl: FieldRef<"TrainerCertification", 'String'>
    readonly imagePublicId: FieldRef<"TrainerCertification", 'String'>
    readonly issuedBy: FieldRef<"TrainerCertification", 'String'>
    readonly issuedAt: FieldRef<"TrainerCertification", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainerCertification", 'DateTime'>
    readonly createdAt: FieldRef<"TrainerCertification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainerCertification findUnique
   */
  export type TrainerCertificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerCertification to fetch.
     */
    where: TrainerCertificationWhereUniqueInput
  }

  /**
   * TrainerCertification findUniqueOrThrow
   */
  export type TrainerCertificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerCertification to fetch.
     */
    where: TrainerCertificationWhereUniqueInput
  }

  /**
   * TrainerCertification findFirst
   */
  export type TrainerCertificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerCertification to fetch.
     */
    where?: TrainerCertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerCertifications to fetch.
     */
    orderBy?: TrainerCertificationOrderByWithRelationInput | TrainerCertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerCertifications.
     */
    cursor?: TrainerCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerCertifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerCertifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerCertifications.
     */
    distinct?: TrainerCertificationScalarFieldEnum | TrainerCertificationScalarFieldEnum[]
  }

  /**
   * TrainerCertification findFirstOrThrow
   */
  export type TrainerCertificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerCertification to fetch.
     */
    where?: TrainerCertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerCertifications to fetch.
     */
    orderBy?: TrainerCertificationOrderByWithRelationInput | TrainerCertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerCertifications.
     */
    cursor?: TrainerCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerCertifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerCertifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerCertifications.
     */
    distinct?: TrainerCertificationScalarFieldEnum | TrainerCertificationScalarFieldEnum[]
  }

  /**
   * TrainerCertification findMany
   */
  export type TrainerCertificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerCertifications to fetch.
     */
    where?: TrainerCertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerCertifications to fetch.
     */
    orderBy?: TrainerCertificationOrderByWithRelationInput | TrainerCertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainerCertifications.
     */
    cursor?: TrainerCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerCertifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerCertifications.
     */
    skip?: number
    distinct?: TrainerCertificationScalarFieldEnum | TrainerCertificationScalarFieldEnum[]
  }

  /**
   * TrainerCertification create
   */
  export type TrainerCertificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainerCertification.
     */
    data: XOR<TrainerCertificationCreateInput, TrainerCertificationUncheckedCreateInput>
  }

  /**
   * TrainerCertification createMany
   */
  export type TrainerCertificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainerCertifications.
     */
    data: TrainerCertificationCreateManyInput | TrainerCertificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainerCertification createManyAndReturn
   */
  export type TrainerCertificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * The data used to create many TrainerCertifications.
     */
    data: TrainerCertificationCreateManyInput | TrainerCertificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerCertification update
   */
  export type TrainerCertificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainerCertification.
     */
    data: XOR<TrainerCertificationUpdateInput, TrainerCertificationUncheckedUpdateInput>
    /**
     * Choose, which TrainerCertification to update.
     */
    where: TrainerCertificationWhereUniqueInput
  }

  /**
   * TrainerCertification updateMany
   */
  export type TrainerCertificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainerCertifications.
     */
    data: XOR<TrainerCertificationUpdateManyMutationInput, TrainerCertificationUncheckedUpdateManyInput>
    /**
     * Filter which TrainerCertifications to update
     */
    where?: TrainerCertificationWhereInput
    /**
     * Limit how many TrainerCertifications to update.
     */
    limit?: number
  }

  /**
   * TrainerCertification updateManyAndReturn
   */
  export type TrainerCertificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * The data used to update TrainerCertifications.
     */
    data: XOR<TrainerCertificationUpdateManyMutationInput, TrainerCertificationUncheckedUpdateManyInput>
    /**
     * Filter which TrainerCertifications to update
     */
    where?: TrainerCertificationWhereInput
    /**
     * Limit how many TrainerCertifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerCertification upsert
   */
  export type TrainerCertificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainerCertification to update in case it exists.
     */
    where: TrainerCertificationWhereUniqueInput
    /**
     * In case the TrainerCertification found by the `where` argument doesn't exist, create a new TrainerCertification with this data.
     */
    create: XOR<TrainerCertificationCreateInput, TrainerCertificationUncheckedCreateInput>
    /**
     * In case the TrainerCertification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainerCertificationUpdateInput, TrainerCertificationUncheckedUpdateInput>
  }

  /**
   * TrainerCertification delete
   */
  export type TrainerCertificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    /**
     * Filter which TrainerCertification to delete.
     */
    where: TrainerCertificationWhereUniqueInput
  }

  /**
   * TrainerCertification deleteMany
   */
  export type TrainerCertificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerCertifications to delete
     */
    where?: TrainerCertificationWhereInput
    /**
     * Limit how many TrainerCertifications to delete.
     */
    limit?: number
  }

  /**
   * TrainerCertification.trainer
   */
  export type TrainerCertification$trainerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    where?: TrainerWhereInput
  }

  /**
   * TrainerCertification.trainerRequest
   */
  export type TrainerCertification$trainerRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    where?: TrainerRequestWhereInput
  }

  /**
   * TrainerCertification without action
   */
  export type TrainerCertificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
  }


  /**
   * Model TrainerTransformation
   */

  export type AggregateTrainerTransformation = {
    _count: TrainerTransformationCountAggregateOutputType | null
    _min: TrainerTransformationMinAggregateOutputType | null
    _max: TrainerTransformationMaxAggregateOutputType | null
  }

  export type TrainerTransformationMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    trainerRequestId: string | null
    name: string | null
    imageUrl: string | null
    imagePublicId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainerTransformationMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    trainerRequestId: string | null
    name: string | null
    imageUrl: string | null
    imagePublicId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainerTransformationCountAggregateOutputType = {
    id: number
    trainerId: number
    trainerRequestId: number
    name: number
    imageUrl: number
    imagePublicId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrainerTransformationMinAggregateInputType = {
    id?: true
    trainerId?: true
    trainerRequestId?: true
    name?: true
    imageUrl?: true
    imagePublicId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainerTransformationMaxAggregateInputType = {
    id?: true
    trainerId?: true
    trainerRequestId?: true
    name?: true
    imageUrl?: true
    imagePublicId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainerTransformationCountAggregateInputType = {
    id?: true
    trainerId?: true
    trainerRequestId?: true
    name?: true
    imageUrl?: true
    imagePublicId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrainerTransformationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerTransformation to aggregate.
     */
    where?: TrainerTransformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTransformations to fetch.
     */
    orderBy?: TrainerTransformationOrderByWithRelationInput | TrainerTransformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainerTransformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTransformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTransformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainerTransformations
    **/
    _count?: true | TrainerTransformationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainerTransformationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainerTransformationMaxAggregateInputType
  }

  export type GetTrainerTransformationAggregateType<T extends TrainerTransformationAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainerTransformation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainerTransformation[P]>
      : GetScalarType<T[P], AggregateTrainerTransformation[P]>
  }




  export type TrainerTransformationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTransformationWhereInput
    orderBy?: TrainerTransformationOrderByWithAggregationInput | TrainerTransformationOrderByWithAggregationInput[]
    by: TrainerTransformationScalarFieldEnum[] | TrainerTransformationScalarFieldEnum
    having?: TrainerTransformationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainerTransformationCountAggregateInputType | true
    _min?: TrainerTransformationMinAggregateInputType
    _max?: TrainerTransformationMaxAggregateInputType
  }

  export type TrainerTransformationGroupByOutputType = {
    id: string
    trainerId: string | null
    trainerRequestId: string | null
    name: string
    imageUrl: string
    imagePublicId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TrainerTransformationCountAggregateOutputType | null
    _min: TrainerTransformationMinAggregateOutputType | null
    _max: TrainerTransformationMaxAggregateOutputType | null
  }

  type GetTrainerTransformationGroupByPayload<T extends TrainerTransformationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainerTransformationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainerTransformationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainerTransformationGroupByOutputType[P]>
            : GetScalarType<T[P], TrainerTransformationGroupByOutputType[P]>
        }
      >
    >


  export type TrainerTransformationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | TrainerTransformation$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerTransformation$trainerRequestArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTransformation"]>

  export type TrainerTransformationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | TrainerTransformation$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerTransformation$trainerRequestArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTransformation"]>

  export type TrainerTransformationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trainer?: boolean | TrainerTransformation$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerTransformation$trainerRequestArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTransformation"]>

  export type TrainerTransformationSelectScalar = {
    id?: boolean
    trainerId?: boolean
    trainerRequestId?: boolean
    name?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrainerTransformationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "trainerRequestId" | "name" | "imageUrl" | "imagePublicId" | "createdAt" | "updatedAt", ExtArgs["result"]["trainerTransformation"]>
  export type TrainerTransformationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerTransformation$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerTransformation$trainerRequestArgs<ExtArgs>
  }
  export type TrainerTransformationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerTransformation$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerTransformation$trainerRequestArgs<ExtArgs>
  }
  export type TrainerTransformationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerTransformation$trainerArgs<ExtArgs>
    trainerRequest?: boolean | TrainerTransformation$trainerRequestArgs<ExtArgs>
  }

  export type $TrainerTransformationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainerTransformation"
    objects: {
      trainer: Prisma.$TrainerPayload<ExtArgs> | null
      trainerRequest: Prisma.$TrainerRequestPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string | null
      trainerRequestId: string | null
      name: string
      imageUrl: string
      imagePublicId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trainerTransformation"]>
    composites: {}
  }

  type TrainerTransformationGetPayload<S extends boolean | null | undefined | TrainerTransformationDefaultArgs> = $Result.GetResult<Prisma.$TrainerTransformationPayload, S>

  type TrainerTransformationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainerTransformationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainerTransformationCountAggregateInputType | true
    }

  export interface TrainerTransformationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainerTransformation'], meta: { name: 'TrainerTransformation' } }
    /**
     * Find zero or one TrainerTransformation that matches the filter.
     * @param {TrainerTransformationFindUniqueArgs} args - Arguments to find a TrainerTransformation
     * @example
     * // Get one TrainerTransformation
     * const trainerTransformation = await prisma.trainerTransformation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerTransformationFindUniqueArgs>(args: SelectSubset<T, TrainerTransformationFindUniqueArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainerTransformation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerTransformationFindUniqueOrThrowArgs} args - Arguments to find a TrainerTransformation
     * @example
     * // Get one TrainerTransformation
     * const trainerTransformation = await prisma.trainerTransformation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerTransformationFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainerTransformationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerTransformation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationFindFirstArgs} args - Arguments to find a TrainerTransformation
     * @example
     * // Get one TrainerTransformation
     * const trainerTransformation = await prisma.trainerTransformation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerTransformationFindFirstArgs>(args?: SelectSubset<T, TrainerTransformationFindFirstArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerTransformation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationFindFirstOrThrowArgs} args - Arguments to find a TrainerTransformation
     * @example
     * // Get one TrainerTransformation
     * const trainerTransformation = await prisma.trainerTransformation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerTransformationFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainerTransformationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainerTransformations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainerTransformations
     * const trainerTransformations = await prisma.trainerTransformation.findMany()
     * 
     * // Get first 10 TrainerTransformations
     * const trainerTransformations = await prisma.trainerTransformation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainerTransformationWithIdOnly = await prisma.trainerTransformation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainerTransformationFindManyArgs>(args?: SelectSubset<T, TrainerTransformationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainerTransformation.
     * @param {TrainerTransformationCreateArgs} args - Arguments to create a TrainerTransformation.
     * @example
     * // Create one TrainerTransformation
     * const TrainerTransformation = await prisma.trainerTransformation.create({
     *   data: {
     *     // ... data to create a TrainerTransformation
     *   }
     * })
     * 
     */
    create<T extends TrainerTransformationCreateArgs>(args: SelectSubset<T, TrainerTransformationCreateArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainerTransformations.
     * @param {TrainerTransformationCreateManyArgs} args - Arguments to create many TrainerTransformations.
     * @example
     * // Create many TrainerTransformations
     * const trainerTransformation = await prisma.trainerTransformation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainerTransformationCreateManyArgs>(args?: SelectSubset<T, TrainerTransformationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainerTransformations and returns the data saved in the database.
     * @param {TrainerTransformationCreateManyAndReturnArgs} args - Arguments to create many TrainerTransformations.
     * @example
     * // Create many TrainerTransformations
     * const trainerTransformation = await prisma.trainerTransformation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainerTransformations and only return the `id`
     * const trainerTransformationWithIdOnly = await prisma.trainerTransformation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainerTransformationCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainerTransformationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainerTransformation.
     * @param {TrainerTransformationDeleteArgs} args - Arguments to delete one TrainerTransformation.
     * @example
     * // Delete one TrainerTransformation
     * const TrainerTransformation = await prisma.trainerTransformation.delete({
     *   where: {
     *     // ... filter to delete one TrainerTransformation
     *   }
     * })
     * 
     */
    delete<T extends TrainerTransformationDeleteArgs>(args: SelectSubset<T, TrainerTransformationDeleteArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainerTransformation.
     * @param {TrainerTransformationUpdateArgs} args - Arguments to update one TrainerTransformation.
     * @example
     * // Update one TrainerTransformation
     * const trainerTransformation = await prisma.trainerTransformation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainerTransformationUpdateArgs>(args: SelectSubset<T, TrainerTransformationUpdateArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainerTransformations.
     * @param {TrainerTransformationDeleteManyArgs} args - Arguments to filter TrainerTransformations to delete.
     * @example
     * // Delete a few TrainerTransformations
     * const { count } = await prisma.trainerTransformation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainerTransformationDeleteManyArgs>(args?: SelectSubset<T, TrainerTransformationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerTransformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainerTransformations
     * const trainerTransformation = await prisma.trainerTransformation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainerTransformationUpdateManyArgs>(args: SelectSubset<T, TrainerTransformationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerTransformations and returns the data updated in the database.
     * @param {TrainerTransformationUpdateManyAndReturnArgs} args - Arguments to update many TrainerTransformations.
     * @example
     * // Update many TrainerTransformations
     * const trainerTransformation = await prisma.trainerTransformation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainerTransformations and only return the `id`
     * const trainerTransformationWithIdOnly = await prisma.trainerTransformation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainerTransformationUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainerTransformationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainerTransformation.
     * @param {TrainerTransformationUpsertArgs} args - Arguments to update or create a TrainerTransformation.
     * @example
     * // Update or create a TrainerTransformation
     * const trainerTransformation = await prisma.trainerTransformation.upsert({
     *   create: {
     *     // ... data to create a TrainerTransformation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainerTransformation we want to update
     *   }
     * })
     */
    upsert<T extends TrainerTransformationUpsertArgs>(args: SelectSubset<T, TrainerTransformationUpsertArgs<ExtArgs>>): Prisma__TrainerTransformationClient<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainerTransformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationCountArgs} args - Arguments to filter TrainerTransformations to count.
     * @example
     * // Count the number of TrainerTransformations
     * const count = await prisma.trainerTransformation.count({
     *   where: {
     *     // ... the filter for the TrainerTransformations we want to count
     *   }
     * })
    **/
    count<T extends TrainerTransformationCountArgs>(
      args?: Subset<T, TrainerTransformationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainerTransformationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainerTransformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainerTransformationAggregateArgs>(args: Subset<T, TrainerTransformationAggregateArgs>): Prisma.PrismaPromise<GetTrainerTransformationAggregateType<T>>

    /**
     * Group by TrainerTransformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTransformationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainerTransformationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainerTransformationGroupByArgs['orderBy'] }
        : { orderBy?: TrainerTransformationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainerTransformationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerTransformationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainerTransformation model
   */
  readonly fields: TrainerTransformationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainerTransformation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainerTransformationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainer<T extends TrainerTransformation$trainerArgs<ExtArgs> = {}>(args?: Subset<T, TrainerTransformation$trainerArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    trainerRequest<T extends TrainerTransformation$trainerRequestArgs<ExtArgs> = {}>(args?: Subset<T, TrainerTransformation$trainerRequestArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainerTransformation model
   */
  interface TrainerTransformationFieldRefs {
    readonly id: FieldRef<"TrainerTransformation", 'String'>
    readonly trainerId: FieldRef<"TrainerTransformation", 'String'>
    readonly trainerRequestId: FieldRef<"TrainerTransformation", 'String'>
    readonly name: FieldRef<"TrainerTransformation", 'String'>
    readonly imageUrl: FieldRef<"TrainerTransformation", 'String'>
    readonly imagePublicId: FieldRef<"TrainerTransformation", 'String'>
    readonly createdAt: FieldRef<"TrainerTransformation", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainerTransformation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainerTransformation findUnique
   */
  export type TrainerTransformationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTransformation to fetch.
     */
    where: TrainerTransformationWhereUniqueInput
  }

  /**
   * TrainerTransformation findUniqueOrThrow
   */
  export type TrainerTransformationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTransformation to fetch.
     */
    where: TrainerTransformationWhereUniqueInput
  }

  /**
   * TrainerTransformation findFirst
   */
  export type TrainerTransformationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTransformation to fetch.
     */
    where?: TrainerTransformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTransformations to fetch.
     */
    orderBy?: TrainerTransformationOrderByWithRelationInput | TrainerTransformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerTransformations.
     */
    cursor?: TrainerTransformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTransformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTransformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerTransformations.
     */
    distinct?: TrainerTransformationScalarFieldEnum | TrainerTransformationScalarFieldEnum[]
  }

  /**
   * TrainerTransformation findFirstOrThrow
   */
  export type TrainerTransformationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTransformation to fetch.
     */
    where?: TrainerTransformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTransformations to fetch.
     */
    orderBy?: TrainerTransformationOrderByWithRelationInput | TrainerTransformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerTransformations.
     */
    cursor?: TrainerTransformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTransformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTransformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerTransformations.
     */
    distinct?: TrainerTransformationScalarFieldEnum | TrainerTransformationScalarFieldEnum[]
  }

  /**
   * TrainerTransformation findMany
   */
  export type TrainerTransformationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTransformations to fetch.
     */
    where?: TrainerTransformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTransformations to fetch.
     */
    orderBy?: TrainerTransformationOrderByWithRelationInput | TrainerTransformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainerTransformations.
     */
    cursor?: TrainerTransformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTransformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTransformations.
     */
    skip?: number
    distinct?: TrainerTransformationScalarFieldEnum | TrainerTransformationScalarFieldEnum[]
  }

  /**
   * TrainerTransformation create
   */
  export type TrainerTransformationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainerTransformation.
     */
    data: XOR<TrainerTransformationCreateInput, TrainerTransformationUncheckedCreateInput>
  }

  /**
   * TrainerTransformation createMany
   */
  export type TrainerTransformationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainerTransformations.
     */
    data: TrainerTransformationCreateManyInput | TrainerTransformationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainerTransformation createManyAndReturn
   */
  export type TrainerTransformationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * The data used to create many TrainerTransformations.
     */
    data: TrainerTransformationCreateManyInput | TrainerTransformationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerTransformation update
   */
  export type TrainerTransformationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainerTransformation.
     */
    data: XOR<TrainerTransformationUpdateInput, TrainerTransformationUncheckedUpdateInput>
    /**
     * Choose, which TrainerTransformation to update.
     */
    where: TrainerTransformationWhereUniqueInput
  }

  /**
   * TrainerTransformation updateMany
   */
  export type TrainerTransformationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainerTransformations.
     */
    data: XOR<TrainerTransformationUpdateManyMutationInput, TrainerTransformationUncheckedUpdateManyInput>
    /**
     * Filter which TrainerTransformations to update
     */
    where?: TrainerTransformationWhereInput
    /**
     * Limit how many TrainerTransformations to update.
     */
    limit?: number
  }

  /**
   * TrainerTransformation updateManyAndReturn
   */
  export type TrainerTransformationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * The data used to update TrainerTransformations.
     */
    data: XOR<TrainerTransformationUpdateManyMutationInput, TrainerTransformationUncheckedUpdateManyInput>
    /**
     * Filter which TrainerTransformations to update
     */
    where?: TrainerTransformationWhereInput
    /**
     * Limit how many TrainerTransformations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerTransformation upsert
   */
  export type TrainerTransformationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainerTransformation to update in case it exists.
     */
    where: TrainerTransformationWhereUniqueInput
    /**
     * In case the TrainerTransformation found by the `where` argument doesn't exist, create a new TrainerTransformation with this data.
     */
    create: XOR<TrainerTransformationCreateInput, TrainerTransformationUncheckedCreateInput>
    /**
     * In case the TrainerTransformation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainerTransformationUpdateInput, TrainerTransformationUncheckedUpdateInput>
  }

  /**
   * TrainerTransformation delete
   */
  export type TrainerTransformationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    /**
     * Filter which TrainerTransformation to delete.
     */
    where: TrainerTransformationWhereUniqueInput
  }

  /**
   * TrainerTransformation deleteMany
   */
  export type TrainerTransformationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerTransformations to delete
     */
    where?: TrainerTransformationWhereInput
    /**
     * Limit how many TrainerTransformations to delete.
     */
    limit?: number
  }

  /**
   * TrainerTransformation.trainer
   */
  export type TrainerTransformation$trainerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trainer
     */
    select?: TrainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trainer
     */
    omit?: TrainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerInclude<ExtArgs> | null
    where?: TrainerWhereInput
  }

  /**
   * TrainerTransformation.trainerRequest
   */
  export type TrainerTransformation$trainerRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    where?: TrainerRequestWhereInput
  }

  /**
   * TrainerTransformation without action
   */
  export type TrainerTransformationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
  }


  /**
   * Model ResetPasswordToken
   */

  export type AggregateResetPasswordToken = {
    _count: ResetPasswordTokenCountAggregateOutputType | null
    _min: ResetPasswordTokenMinAggregateOutputType | null
    _max: ResetPasswordTokenMaxAggregateOutputType | null
  }

  export type ResetPasswordTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type ResetPasswordTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type ResetPasswordTokenCountAggregateOutputType = {
    id: number
    userId: number
    tokenHash: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type ResetPasswordTokenMinAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type ResetPasswordTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type ResetPasswordTokenCountAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ResetPasswordTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetPasswordToken to aggregate.
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordTokens to fetch.
     */
    orderBy?: ResetPasswordTokenOrderByWithRelationInput | ResetPasswordTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResetPasswordTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResetPasswordTokens
    **/
    _count?: true | ResetPasswordTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResetPasswordTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResetPasswordTokenMaxAggregateInputType
  }

  export type GetResetPasswordTokenAggregateType<T extends ResetPasswordTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateResetPasswordToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResetPasswordToken[P]>
      : GetScalarType<T[P], AggregateResetPasswordToken[P]>
  }




  export type ResetPasswordTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetPasswordTokenWhereInput
    orderBy?: ResetPasswordTokenOrderByWithAggregationInput | ResetPasswordTokenOrderByWithAggregationInput[]
    by: ResetPasswordTokenScalarFieldEnum[] | ResetPasswordTokenScalarFieldEnum
    having?: ResetPasswordTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResetPasswordTokenCountAggregateInputType | true
    _min?: ResetPasswordTokenMinAggregateInputType
    _max?: ResetPasswordTokenMaxAggregateInputType
  }

  export type ResetPasswordTokenGroupByOutputType = {
    id: string
    userId: string
    tokenHash: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: ResetPasswordTokenCountAggregateOutputType | null
    _min: ResetPasswordTokenMinAggregateOutputType | null
    _max: ResetPasswordTokenMaxAggregateOutputType | null
  }

  type GetResetPasswordTokenGroupByPayload<T extends ResetPasswordTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResetPasswordTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResetPasswordTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResetPasswordTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ResetPasswordTokenGroupByOutputType[P]>
        }
      >
    >


  export type ResetPasswordTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetPasswordToken"]>

  export type ResetPasswordTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetPasswordToken"]>

  export type ResetPasswordTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetPasswordToken"]>

  export type ResetPasswordTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type ResetPasswordTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tokenHash" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["resetPasswordToken"]>
  export type ResetPasswordTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResetPasswordTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResetPasswordTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResetPasswordTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResetPasswordToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tokenHash: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["resetPasswordToken"]>
    composites: {}
  }

  type ResetPasswordTokenGetPayload<S extends boolean | null | undefined | ResetPasswordTokenDefaultArgs> = $Result.GetResult<Prisma.$ResetPasswordTokenPayload, S>

  type ResetPasswordTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResetPasswordTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResetPasswordTokenCountAggregateInputType | true
    }

  export interface ResetPasswordTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResetPasswordToken'], meta: { name: 'ResetPasswordToken' } }
    /**
     * Find zero or one ResetPasswordToken that matches the filter.
     * @param {ResetPasswordTokenFindUniqueArgs} args - Arguments to find a ResetPasswordToken
     * @example
     * // Get one ResetPasswordToken
     * const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResetPasswordTokenFindUniqueArgs>(args: SelectSubset<T, ResetPasswordTokenFindUniqueArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResetPasswordToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResetPasswordTokenFindUniqueOrThrowArgs} args - Arguments to find a ResetPasswordToken
     * @example
     * // Get one ResetPasswordToken
     * const resetPasswordToken = await prisma.resetPasswordToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResetPasswordTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ResetPasswordTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetPasswordToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenFindFirstArgs} args - Arguments to find a ResetPasswordToken
     * @example
     * // Get one ResetPasswordToken
     * const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResetPasswordTokenFindFirstArgs>(args?: SelectSubset<T, ResetPasswordTokenFindFirstArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetPasswordToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenFindFirstOrThrowArgs} args - Arguments to find a ResetPasswordToken
     * @example
     * // Get one ResetPasswordToken
     * const resetPasswordToken = await prisma.resetPasswordToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResetPasswordTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ResetPasswordTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResetPasswordTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResetPasswordTokens
     * const resetPasswordTokens = await prisma.resetPasswordToken.findMany()
     * 
     * // Get first 10 ResetPasswordTokens
     * const resetPasswordTokens = await prisma.resetPasswordToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resetPasswordTokenWithIdOnly = await prisma.resetPasswordToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResetPasswordTokenFindManyArgs>(args?: SelectSubset<T, ResetPasswordTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResetPasswordToken.
     * @param {ResetPasswordTokenCreateArgs} args - Arguments to create a ResetPasswordToken.
     * @example
     * // Create one ResetPasswordToken
     * const ResetPasswordToken = await prisma.resetPasswordToken.create({
     *   data: {
     *     // ... data to create a ResetPasswordToken
     *   }
     * })
     * 
     */
    create<T extends ResetPasswordTokenCreateArgs>(args: SelectSubset<T, ResetPasswordTokenCreateArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResetPasswordTokens.
     * @param {ResetPasswordTokenCreateManyArgs} args - Arguments to create many ResetPasswordTokens.
     * @example
     * // Create many ResetPasswordTokens
     * const resetPasswordToken = await prisma.resetPasswordToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResetPasswordTokenCreateManyArgs>(args?: SelectSubset<T, ResetPasswordTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResetPasswordTokens and returns the data saved in the database.
     * @param {ResetPasswordTokenCreateManyAndReturnArgs} args - Arguments to create many ResetPasswordTokens.
     * @example
     * // Create many ResetPasswordTokens
     * const resetPasswordToken = await prisma.resetPasswordToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResetPasswordTokens and only return the `id`
     * const resetPasswordTokenWithIdOnly = await prisma.resetPasswordToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResetPasswordTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ResetPasswordTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResetPasswordToken.
     * @param {ResetPasswordTokenDeleteArgs} args - Arguments to delete one ResetPasswordToken.
     * @example
     * // Delete one ResetPasswordToken
     * const ResetPasswordToken = await prisma.resetPasswordToken.delete({
     *   where: {
     *     // ... filter to delete one ResetPasswordToken
     *   }
     * })
     * 
     */
    delete<T extends ResetPasswordTokenDeleteArgs>(args: SelectSubset<T, ResetPasswordTokenDeleteArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResetPasswordToken.
     * @param {ResetPasswordTokenUpdateArgs} args - Arguments to update one ResetPasswordToken.
     * @example
     * // Update one ResetPasswordToken
     * const resetPasswordToken = await prisma.resetPasswordToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResetPasswordTokenUpdateArgs>(args: SelectSubset<T, ResetPasswordTokenUpdateArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResetPasswordTokens.
     * @param {ResetPasswordTokenDeleteManyArgs} args - Arguments to filter ResetPasswordTokens to delete.
     * @example
     * // Delete a few ResetPasswordTokens
     * const { count } = await prisma.resetPasswordToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResetPasswordTokenDeleteManyArgs>(args?: SelectSubset<T, ResetPasswordTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetPasswordTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResetPasswordTokens
     * const resetPasswordToken = await prisma.resetPasswordToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResetPasswordTokenUpdateManyArgs>(args: SelectSubset<T, ResetPasswordTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetPasswordTokens and returns the data updated in the database.
     * @param {ResetPasswordTokenUpdateManyAndReturnArgs} args - Arguments to update many ResetPasswordTokens.
     * @example
     * // Update many ResetPasswordTokens
     * const resetPasswordToken = await prisma.resetPasswordToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResetPasswordTokens and only return the `id`
     * const resetPasswordTokenWithIdOnly = await prisma.resetPasswordToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResetPasswordTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ResetPasswordTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResetPasswordToken.
     * @param {ResetPasswordTokenUpsertArgs} args - Arguments to update or create a ResetPasswordToken.
     * @example
     * // Update or create a ResetPasswordToken
     * const resetPasswordToken = await prisma.resetPasswordToken.upsert({
     *   create: {
     *     // ... data to create a ResetPasswordToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResetPasswordToken we want to update
     *   }
     * })
     */
    upsert<T extends ResetPasswordTokenUpsertArgs>(args: SelectSubset<T, ResetPasswordTokenUpsertArgs<ExtArgs>>): Prisma__ResetPasswordTokenClient<$Result.GetResult<Prisma.$ResetPasswordTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResetPasswordTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenCountArgs} args - Arguments to filter ResetPasswordTokens to count.
     * @example
     * // Count the number of ResetPasswordTokens
     * const count = await prisma.resetPasswordToken.count({
     *   where: {
     *     // ... the filter for the ResetPasswordTokens we want to count
     *   }
     * })
    **/
    count<T extends ResetPasswordTokenCountArgs>(
      args?: Subset<T, ResetPasswordTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResetPasswordTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResetPasswordToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResetPasswordTokenAggregateArgs>(args: Subset<T, ResetPasswordTokenAggregateArgs>): Prisma.PrismaPromise<GetResetPasswordTokenAggregateType<T>>

    /**
     * Group by ResetPasswordToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResetPasswordTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResetPasswordTokenGroupByArgs['orderBy'] }
        : { orderBy?: ResetPasswordTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResetPasswordTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResetPasswordTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResetPasswordToken model
   */
  readonly fields: ResetPasswordTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResetPasswordToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResetPasswordTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResetPasswordToken model
   */
  interface ResetPasswordTokenFieldRefs {
    readonly id: FieldRef<"ResetPasswordToken", 'String'>
    readonly userId: FieldRef<"ResetPasswordToken", 'String'>
    readonly tokenHash: FieldRef<"ResetPasswordToken", 'String'>
    readonly expiresAt: FieldRef<"ResetPasswordToken", 'DateTime'>
    readonly usedAt: FieldRef<"ResetPasswordToken", 'DateTime'>
    readonly createdAt: FieldRef<"ResetPasswordToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResetPasswordToken findUnique
   */
  export type ResetPasswordTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordToken to fetch.
     */
    where: ResetPasswordTokenWhereUniqueInput
  }

  /**
   * ResetPasswordToken findUniqueOrThrow
   */
  export type ResetPasswordTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordToken to fetch.
     */
    where: ResetPasswordTokenWhereUniqueInput
  }

  /**
   * ResetPasswordToken findFirst
   */
  export type ResetPasswordTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordToken to fetch.
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordTokens to fetch.
     */
    orderBy?: ResetPasswordTokenOrderByWithRelationInput | ResetPasswordTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetPasswordTokens.
     */
    cursor?: ResetPasswordTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetPasswordTokens.
     */
    distinct?: ResetPasswordTokenScalarFieldEnum | ResetPasswordTokenScalarFieldEnum[]
  }

  /**
   * ResetPasswordToken findFirstOrThrow
   */
  export type ResetPasswordTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordToken to fetch.
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordTokens to fetch.
     */
    orderBy?: ResetPasswordTokenOrderByWithRelationInput | ResetPasswordTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetPasswordTokens.
     */
    cursor?: ResetPasswordTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetPasswordTokens.
     */
    distinct?: ResetPasswordTokenScalarFieldEnum | ResetPasswordTokenScalarFieldEnum[]
  }

  /**
   * ResetPasswordToken findMany
   */
  export type ResetPasswordTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordTokens to fetch.
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordTokens to fetch.
     */
    orderBy?: ResetPasswordTokenOrderByWithRelationInput | ResetPasswordTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResetPasswordTokens.
     */
    cursor?: ResetPasswordTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordTokens.
     */
    skip?: number
    distinct?: ResetPasswordTokenScalarFieldEnum | ResetPasswordTokenScalarFieldEnum[]
  }

  /**
   * ResetPasswordToken create
   */
  export type ResetPasswordTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ResetPasswordToken.
     */
    data: XOR<ResetPasswordTokenCreateInput, ResetPasswordTokenUncheckedCreateInput>
  }

  /**
   * ResetPasswordToken createMany
   */
  export type ResetPasswordTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResetPasswordTokens.
     */
    data: ResetPasswordTokenCreateManyInput | ResetPasswordTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResetPasswordToken createManyAndReturn
   */
  export type ResetPasswordTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ResetPasswordTokens.
     */
    data: ResetPasswordTokenCreateManyInput | ResetPasswordTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetPasswordToken update
   */
  export type ResetPasswordTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ResetPasswordToken.
     */
    data: XOR<ResetPasswordTokenUpdateInput, ResetPasswordTokenUncheckedUpdateInput>
    /**
     * Choose, which ResetPasswordToken to update.
     */
    where: ResetPasswordTokenWhereUniqueInput
  }

  /**
   * ResetPasswordToken updateMany
   */
  export type ResetPasswordTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResetPasswordTokens.
     */
    data: XOR<ResetPasswordTokenUpdateManyMutationInput, ResetPasswordTokenUncheckedUpdateManyInput>
    /**
     * Filter which ResetPasswordTokens to update
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * Limit how many ResetPasswordTokens to update.
     */
    limit?: number
  }

  /**
   * ResetPasswordToken updateManyAndReturn
   */
  export type ResetPasswordTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * The data used to update ResetPasswordTokens.
     */
    data: XOR<ResetPasswordTokenUpdateManyMutationInput, ResetPasswordTokenUncheckedUpdateManyInput>
    /**
     * Filter which ResetPasswordTokens to update
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * Limit how many ResetPasswordTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetPasswordToken upsert
   */
  export type ResetPasswordTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ResetPasswordToken to update in case it exists.
     */
    where: ResetPasswordTokenWhereUniqueInput
    /**
     * In case the ResetPasswordToken found by the `where` argument doesn't exist, create a new ResetPasswordToken with this data.
     */
    create: XOR<ResetPasswordTokenCreateInput, ResetPasswordTokenUncheckedCreateInput>
    /**
     * In case the ResetPasswordToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResetPasswordTokenUpdateInput, ResetPasswordTokenUncheckedUpdateInput>
  }

  /**
   * ResetPasswordToken delete
   */
  export type ResetPasswordTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
    /**
     * Filter which ResetPasswordToken to delete.
     */
    where: ResetPasswordTokenWhereUniqueInput
  }

  /**
   * ResetPasswordToken deleteMany
   */
  export type ResetPasswordTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetPasswordTokens to delete
     */
    where?: ResetPasswordTokenWhereInput
    /**
     * Limit how many ResetPasswordTokens to delete.
     */
    limit?: number
  }

  /**
   * ResetPasswordToken without action
   */
  export type ResetPasswordTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordToken
     */
    select?: ResetPasswordTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordToken
     */
    omit?: ResetPasswordTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordTokenInclude<ExtArgs> | null
  }


  /**
   * Model TrainerRequest
   */

  export type AggregateTrainerRequest = {
    _count: TrainerRequestCountAggregateOutputType | null
    _min: TrainerRequestMinAggregateOutputType | null
    _max: TrainerRequestMaxAggregateOutputType | null
  }

  export type TrainerRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.TrainerRequestStatus | null
    adminNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainerRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.TrainerRequestStatus | null
    adminNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainerRequestCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    adminNote: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrainerRequestMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainerRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainerRequestCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrainerRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerRequest to aggregate.
     */
    where?: TrainerRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: TrainerRequestOrderByWithRelationInput | TrainerRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainerRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainerRequests
    **/
    _count?: true | TrainerRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainerRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainerRequestMaxAggregateInputType
  }

  export type GetTrainerRequestAggregateType<T extends TrainerRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainerRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainerRequest[P]>
      : GetScalarType<T[P], AggregateTrainerRequest[P]>
  }




  export type TrainerRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerRequestWhereInput
    orderBy?: TrainerRequestOrderByWithAggregationInput | TrainerRequestOrderByWithAggregationInput[]
    by: TrainerRequestScalarFieldEnum[] | TrainerRequestScalarFieldEnum
    having?: TrainerRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainerRequestCountAggregateInputType | true
    _min?: TrainerRequestMinAggregateInputType
    _max?: TrainerRequestMaxAggregateInputType
  }

  export type TrainerRequestGroupByOutputType = {
    id: string
    userId: string
    status: $Enums.TrainerRequestStatus
    adminNote: string | null
    createdAt: Date
    updatedAt: Date
    _count: TrainerRequestCountAggregateOutputType | null
    _min: TrainerRequestMinAggregateOutputType | null
    _max: TrainerRequestMaxAggregateOutputType | null
  }

  type GetTrainerRequestGroupByPayload<T extends TrainerRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainerRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainerRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainerRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TrainerRequestGroupByOutputType[P]>
        }
      >
    >


  export type TrainerRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    certifications?: boolean | TrainerRequest$certificationsArgs<ExtArgs>
    transformations?: boolean | TrainerRequest$transformationsArgs<ExtArgs>
    _count?: boolean | TrainerRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerRequest"]>

  export type TrainerRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerRequest"]>

  export type TrainerRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerRequest"]>

  export type TrainerRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrainerRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "adminNote" | "createdAt" | "updatedAt", ExtArgs["result"]["trainerRequest"]>
  export type TrainerRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    certifications?: boolean | TrainerRequest$certificationsArgs<ExtArgs>
    transformations?: boolean | TrainerRequest$transformationsArgs<ExtArgs>
    _count?: boolean | TrainerRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainerRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainerRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainerRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainerRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      certifications: Prisma.$TrainerCertificationPayload<ExtArgs>[]
      transformations: Prisma.$TrainerTransformationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: $Enums.TrainerRequestStatus
      adminNote: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trainerRequest"]>
    composites: {}
  }

  type TrainerRequestGetPayload<S extends boolean | null | undefined | TrainerRequestDefaultArgs> = $Result.GetResult<Prisma.$TrainerRequestPayload, S>

  type TrainerRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainerRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainerRequestCountAggregateInputType | true
    }

  export interface TrainerRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainerRequest'], meta: { name: 'TrainerRequest' } }
    /**
     * Find zero or one TrainerRequest that matches the filter.
     * @param {TrainerRequestFindUniqueArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerRequestFindUniqueArgs>(args: SelectSubset<T, TrainerRequestFindUniqueArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainerRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerRequestFindUniqueOrThrowArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainerRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestFindFirstArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerRequestFindFirstArgs>(args?: SelectSubset<T, TrainerRequestFindFirstArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestFindFirstOrThrowArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainerRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainerRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainerRequests
     * const trainerRequests = await prisma.trainerRequest.findMany()
     * 
     * // Get first 10 TrainerRequests
     * const trainerRequests = await prisma.trainerRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainerRequestWithIdOnly = await prisma.trainerRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainerRequestFindManyArgs>(args?: SelectSubset<T, TrainerRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainerRequest.
     * @param {TrainerRequestCreateArgs} args - Arguments to create a TrainerRequest.
     * @example
     * // Create one TrainerRequest
     * const TrainerRequest = await prisma.trainerRequest.create({
     *   data: {
     *     // ... data to create a TrainerRequest
     *   }
     * })
     * 
     */
    create<T extends TrainerRequestCreateArgs>(args: SelectSubset<T, TrainerRequestCreateArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainerRequests.
     * @param {TrainerRequestCreateManyArgs} args - Arguments to create many TrainerRequests.
     * @example
     * // Create many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainerRequestCreateManyArgs>(args?: SelectSubset<T, TrainerRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainerRequests and returns the data saved in the database.
     * @param {TrainerRequestCreateManyAndReturnArgs} args - Arguments to create many TrainerRequests.
     * @example
     * // Create many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainerRequests and only return the `id`
     * const trainerRequestWithIdOnly = await prisma.trainerRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainerRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainerRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainerRequest.
     * @param {TrainerRequestDeleteArgs} args - Arguments to delete one TrainerRequest.
     * @example
     * // Delete one TrainerRequest
     * const TrainerRequest = await prisma.trainerRequest.delete({
     *   where: {
     *     // ... filter to delete one TrainerRequest
     *   }
     * })
     * 
     */
    delete<T extends TrainerRequestDeleteArgs>(args: SelectSubset<T, TrainerRequestDeleteArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainerRequest.
     * @param {TrainerRequestUpdateArgs} args - Arguments to update one TrainerRequest.
     * @example
     * // Update one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainerRequestUpdateArgs>(args: SelectSubset<T, TrainerRequestUpdateArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainerRequests.
     * @param {TrainerRequestDeleteManyArgs} args - Arguments to filter TrainerRequests to delete.
     * @example
     * // Delete a few TrainerRequests
     * const { count } = await prisma.trainerRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainerRequestDeleteManyArgs>(args?: SelectSubset<T, TrainerRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainerRequestUpdateManyArgs>(args: SelectSubset<T, TrainerRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerRequests and returns the data updated in the database.
     * @param {TrainerRequestUpdateManyAndReturnArgs} args - Arguments to update many TrainerRequests.
     * @example
     * // Update many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainerRequests and only return the `id`
     * const trainerRequestWithIdOnly = await prisma.trainerRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainerRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainerRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainerRequest.
     * @param {TrainerRequestUpsertArgs} args - Arguments to update or create a TrainerRequest.
     * @example
     * // Update or create a TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.upsert({
     *   create: {
     *     // ... data to create a TrainerRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainerRequest we want to update
     *   }
     * })
     */
    upsert<T extends TrainerRequestUpsertArgs>(args: SelectSubset<T, TrainerRequestUpsertArgs<ExtArgs>>): Prisma__TrainerRequestClient<$Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainerRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestCountArgs} args - Arguments to filter TrainerRequests to count.
     * @example
     * // Count the number of TrainerRequests
     * const count = await prisma.trainerRequest.count({
     *   where: {
     *     // ... the filter for the TrainerRequests we want to count
     *   }
     * })
    **/
    count<T extends TrainerRequestCountArgs>(
      args?: Subset<T, TrainerRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainerRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainerRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainerRequestAggregateArgs>(args: Subset<T, TrainerRequestAggregateArgs>): Prisma.PrismaPromise<GetTrainerRequestAggregateType<T>>

    /**
     * Group by TrainerRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainerRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainerRequestGroupByArgs['orderBy'] }
        : { orderBy?: TrainerRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainerRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainerRequest model
   */
  readonly fields: TrainerRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainerRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainerRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    certifications<T extends TrainerRequest$certificationsArgs<ExtArgs> = {}>(args?: Subset<T, TrainerRequest$certificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerCertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transformations<T extends TrainerRequest$transformationsArgs<ExtArgs> = {}>(args?: Subset<T, TrainerRequest$transformationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTransformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainerRequest model
   */
  interface TrainerRequestFieldRefs {
    readonly id: FieldRef<"TrainerRequest", 'String'>
    readonly userId: FieldRef<"TrainerRequest", 'String'>
    readonly status: FieldRef<"TrainerRequest", 'TrainerRequestStatus'>
    readonly adminNote: FieldRef<"TrainerRequest", 'String'>
    readonly createdAt: FieldRef<"TrainerRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainerRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainerRequest findUnique
   */
  export type TrainerRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where: TrainerRequestWhereUniqueInput
  }

  /**
   * TrainerRequest findUniqueOrThrow
   */
  export type TrainerRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where: TrainerRequestWhereUniqueInput
  }

  /**
   * TrainerRequest findFirst
   */
  export type TrainerRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where?: TrainerRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: TrainerRequestOrderByWithRelationInput | TrainerRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerRequests.
     */
    cursor?: TrainerRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerRequests.
     */
    distinct?: TrainerRequestScalarFieldEnum | TrainerRequestScalarFieldEnum[]
  }

  /**
   * TrainerRequest findFirstOrThrow
   */
  export type TrainerRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where?: TrainerRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: TrainerRequestOrderByWithRelationInput | TrainerRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerRequests.
     */
    cursor?: TrainerRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerRequests.
     */
    distinct?: TrainerRequestScalarFieldEnum | TrainerRequestScalarFieldEnum[]
  }

  /**
   * TrainerRequest findMany
   */
  export type TrainerRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerRequests to fetch.
     */
    where?: TrainerRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: TrainerRequestOrderByWithRelationInput | TrainerRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainerRequests.
     */
    cursor?: TrainerRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerRequests.
     */
    skip?: number
    distinct?: TrainerRequestScalarFieldEnum | TrainerRequestScalarFieldEnum[]
  }

  /**
   * TrainerRequest create
   */
  export type TrainerRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainerRequest.
     */
    data: XOR<TrainerRequestCreateInput, TrainerRequestUncheckedCreateInput>
  }

  /**
   * TrainerRequest createMany
   */
  export type TrainerRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainerRequests.
     */
    data: TrainerRequestCreateManyInput | TrainerRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainerRequest createManyAndReturn
   */
  export type TrainerRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * The data used to create many TrainerRequests.
     */
    data: TrainerRequestCreateManyInput | TrainerRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerRequest update
   */
  export type TrainerRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainerRequest.
     */
    data: XOR<TrainerRequestUpdateInput, TrainerRequestUncheckedUpdateInput>
    /**
     * Choose, which TrainerRequest to update.
     */
    where: TrainerRequestWhereUniqueInput
  }

  /**
   * TrainerRequest updateMany
   */
  export type TrainerRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainerRequests.
     */
    data: XOR<TrainerRequestUpdateManyMutationInput, TrainerRequestUncheckedUpdateManyInput>
    /**
     * Filter which TrainerRequests to update
     */
    where?: TrainerRequestWhereInput
    /**
     * Limit how many TrainerRequests to update.
     */
    limit?: number
  }

  /**
   * TrainerRequest updateManyAndReturn
   */
  export type TrainerRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * The data used to update TrainerRequests.
     */
    data: XOR<TrainerRequestUpdateManyMutationInput, TrainerRequestUncheckedUpdateManyInput>
    /**
     * Filter which TrainerRequests to update
     */
    where?: TrainerRequestWhereInput
    /**
     * Limit how many TrainerRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerRequest upsert
   */
  export type TrainerRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainerRequest to update in case it exists.
     */
    where: TrainerRequestWhereUniqueInput
    /**
     * In case the TrainerRequest found by the `where` argument doesn't exist, create a new TrainerRequest with this data.
     */
    create: XOR<TrainerRequestCreateInput, TrainerRequestUncheckedCreateInput>
    /**
     * In case the TrainerRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainerRequestUpdateInput, TrainerRequestUncheckedUpdateInput>
  }

  /**
   * TrainerRequest delete
   */
  export type TrainerRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
    /**
     * Filter which TrainerRequest to delete.
     */
    where: TrainerRequestWhereUniqueInput
  }

  /**
   * TrainerRequest deleteMany
   */
  export type TrainerRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerRequests to delete
     */
    where?: TrainerRequestWhereInput
    /**
     * Limit how many TrainerRequests to delete.
     */
    limit?: number
  }

  /**
   * TrainerRequest.certifications
   */
  export type TrainerRequest$certificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerCertification
     */
    select?: TrainerCertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerCertification
     */
    omit?: TrainerCertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerCertificationInclude<ExtArgs> | null
    where?: TrainerCertificationWhereInput
    orderBy?: TrainerCertificationOrderByWithRelationInput | TrainerCertificationOrderByWithRelationInput[]
    cursor?: TrainerCertificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerCertificationScalarFieldEnum | TrainerCertificationScalarFieldEnum[]
  }

  /**
   * TrainerRequest.transformations
   */
  export type TrainerRequest$transformationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTransformation
     */
    select?: TrainerTransformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTransformation
     */
    omit?: TrainerTransformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTransformationInclude<ExtArgs> | null
    where?: TrainerTransformationWhereInput
    orderBy?: TrainerTransformationOrderByWithRelationInput | TrainerTransformationOrderByWithRelationInput[]
    cursor?: TrainerTransformationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainerTransformationScalarFieldEnum | TrainerTransformationScalarFieldEnum[]
  }

  /**
   * TrainerRequest without action
   */
  export type TrainerRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: TrainerRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: TrainerRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerRequestInclude<ExtArgs> | null
  }


  /**
   * Model TrainerTrainee
   */

  export type AggregateTrainerTrainee = {
    _count: TrainerTraineeCountAggregateOutputType | null
    _avg: TrainerTraineeAvgAggregateOutputType | null
    _sum: TrainerTraineeSumAggregateOutputType | null
    _min: TrainerTraineeMinAggregateOutputType | null
    _max: TrainerTraineeMaxAggregateOutputType | null
  }

  export type TrainerTraineeAvgAggregateOutputType = {
    sessionsCount: number | null
  }

  export type TrainerTraineeSumAggregateOutputType = {
    sessionsCount: number | null
  }

  export type TrainerTraineeMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    traineeId: string | null
    membershipStatus: $Enums.membershipStatus | null
    sessionsCount: number | null
    assignedAt: Date | null
    createdAt: Date | null
  }

  export type TrainerTraineeMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    traineeId: string | null
    membershipStatus: $Enums.membershipStatus | null
    sessionsCount: number | null
    assignedAt: Date | null
    createdAt: Date | null
  }

  export type TrainerTraineeCountAggregateOutputType = {
    id: number
    trainerId: number
    traineeId: number
    membershipStatus: number
    sessionsCount: number
    assignedAt: number
    createdAt: number
    _all: number
  }


  export type TrainerTraineeAvgAggregateInputType = {
    sessionsCount?: true
  }

  export type TrainerTraineeSumAggregateInputType = {
    sessionsCount?: true
  }

  export type TrainerTraineeMinAggregateInputType = {
    id?: true
    trainerId?: true
    traineeId?: true
    membershipStatus?: true
    sessionsCount?: true
    assignedAt?: true
    createdAt?: true
  }

  export type TrainerTraineeMaxAggregateInputType = {
    id?: true
    trainerId?: true
    traineeId?: true
    membershipStatus?: true
    sessionsCount?: true
    assignedAt?: true
    createdAt?: true
  }

  export type TrainerTraineeCountAggregateInputType = {
    id?: true
    trainerId?: true
    traineeId?: true
    membershipStatus?: true
    sessionsCount?: true
    assignedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TrainerTraineeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerTrainee to aggregate.
     */
    where?: TrainerTraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTrainees to fetch.
     */
    orderBy?: TrainerTraineeOrderByWithRelationInput | TrainerTraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainerTraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTrainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTrainees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainerTrainees
    **/
    _count?: true | TrainerTraineeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainerTraineeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainerTraineeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainerTraineeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainerTraineeMaxAggregateInputType
  }

  export type GetTrainerTraineeAggregateType<T extends TrainerTraineeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainerTrainee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainerTrainee[P]>
      : GetScalarType<T[P], AggregateTrainerTrainee[P]>
  }




  export type TrainerTraineeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTraineeWhereInput
    orderBy?: TrainerTraineeOrderByWithAggregationInput | TrainerTraineeOrderByWithAggregationInput[]
    by: TrainerTraineeScalarFieldEnum[] | TrainerTraineeScalarFieldEnum
    having?: TrainerTraineeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainerTraineeCountAggregateInputType | true
    _avg?: TrainerTraineeAvgAggregateInputType
    _sum?: TrainerTraineeSumAggregateInputType
    _min?: TrainerTraineeMinAggregateInputType
    _max?: TrainerTraineeMaxAggregateInputType
  }

  export type TrainerTraineeGroupByOutputType = {
    id: string
    trainerId: string
    traineeId: string
    membershipStatus: $Enums.membershipStatus
    sessionsCount: number
    assignedAt: Date | null
    createdAt: Date
    _count: TrainerTraineeCountAggregateOutputType | null
    _avg: TrainerTraineeAvgAggregateOutputType | null
    _sum: TrainerTraineeSumAggregateOutputType | null
    _min: TrainerTraineeMinAggregateOutputType | null
    _max: TrainerTraineeMaxAggregateOutputType | null
  }

  type GetTrainerTraineeGroupByPayload<T extends TrainerTraineeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainerTraineeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainerTraineeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainerTraineeGroupByOutputType[P]>
            : GetScalarType<T[P], TrainerTraineeGroupByOutputType[P]>
        }
      >
    >


  export type TrainerTraineeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    membershipStatus?: boolean
    sessionsCount?: boolean
    assignedAt?: boolean
    createdAt?: boolean
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTrainee"]>

  export type TrainerTraineeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    membershipStatus?: boolean
    sessionsCount?: boolean
    assignedAt?: boolean
    createdAt?: boolean
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTrainee"]>

  export type TrainerTraineeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    membershipStatus?: boolean
    sessionsCount?: boolean
    assignedAt?: boolean
    createdAt?: boolean
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTrainee"]>

  export type TrainerTraineeSelectScalar = {
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    membershipStatus?: boolean
    sessionsCount?: boolean
    assignedAt?: boolean
    createdAt?: boolean
  }

  export type TrainerTraineeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "traineeId" | "membershipStatus" | "sessionsCount" | "assignedAt" | "createdAt", ExtArgs["result"]["trainerTrainee"]>
  export type TrainerTraineeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
  }
  export type TrainerTraineeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
  }
  export type TrainerTraineeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
  }

  export type $TrainerTraineePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainerTrainee"
    objects: {
      trainee: Prisma.$TraineePayload<ExtArgs>
      trainer: Prisma.$TrainerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string
      traineeId: string
      membershipStatus: $Enums.membershipStatus
      sessionsCount: number
      assignedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["trainerTrainee"]>
    composites: {}
  }

  type TrainerTraineeGetPayload<S extends boolean | null | undefined | TrainerTraineeDefaultArgs> = $Result.GetResult<Prisma.$TrainerTraineePayload, S>

  type TrainerTraineeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainerTraineeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainerTraineeCountAggregateInputType | true
    }

  export interface TrainerTraineeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainerTrainee'], meta: { name: 'TrainerTrainee' } }
    /**
     * Find zero or one TrainerTrainee that matches the filter.
     * @param {TrainerTraineeFindUniqueArgs} args - Arguments to find a TrainerTrainee
     * @example
     * // Get one TrainerTrainee
     * const trainerTrainee = await prisma.trainerTrainee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerTraineeFindUniqueArgs>(args: SelectSubset<T, TrainerTraineeFindUniqueArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainerTrainee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerTraineeFindUniqueOrThrowArgs} args - Arguments to find a TrainerTrainee
     * @example
     * // Get one TrainerTrainee
     * const trainerTrainee = await prisma.trainerTrainee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerTraineeFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainerTraineeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerTrainee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeFindFirstArgs} args - Arguments to find a TrainerTrainee
     * @example
     * // Get one TrainerTrainee
     * const trainerTrainee = await prisma.trainerTrainee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerTraineeFindFirstArgs>(args?: SelectSubset<T, TrainerTraineeFindFirstArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerTrainee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeFindFirstOrThrowArgs} args - Arguments to find a TrainerTrainee
     * @example
     * // Get one TrainerTrainee
     * const trainerTrainee = await prisma.trainerTrainee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerTraineeFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainerTraineeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainerTrainees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainerTrainees
     * const trainerTrainees = await prisma.trainerTrainee.findMany()
     * 
     * // Get first 10 TrainerTrainees
     * const trainerTrainees = await prisma.trainerTrainee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainerTraineeWithIdOnly = await prisma.trainerTrainee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainerTraineeFindManyArgs>(args?: SelectSubset<T, TrainerTraineeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainerTrainee.
     * @param {TrainerTraineeCreateArgs} args - Arguments to create a TrainerTrainee.
     * @example
     * // Create one TrainerTrainee
     * const TrainerTrainee = await prisma.trainerTrainee.create({
     *   data: {
     *     // ... data to create a TrainerTrainee
     *   }
     * })
     * 
     */
    create<T extends TrainerTraineeCreateArgs>(args: SelectSubset<T, TrainerTraineeCreateArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainerTrainees.
     * @param {TrainerTraineeCreateManyArgs} args - Arguments to create many TrainerTrainees.
     * @example
     * // Create many TrainerTrainees
     * const trainerTrainee = await prisma.trainerTrainee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainerTraineeCreateManyArgs>(args?: SelectSubset<T, TrainerTraineeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainerTrainees and returns the data saved in the database.
     * @param {TrainerTraineeCreateManyAndReturnArgs} args - Arguments to create many TrainerTrainees.
     * @example
     * // Create many TrainerTrainees
     * const trainerTrainee = await prisma.trainerTrainee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainerTrainees and only return the `id`
     * const trainerTraineeWithIdOnly = await prisma.trainerTrainee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainerTraineeCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainerTraineeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainerTrainee.
     * @param {TrainerTraineeDeleteArgs} args - Arguments to delete one TrainerTrainee.
     * @example
     * // Delete one TrainerTrainee
     * const TrainerTrainee = await prisma.trainerTrainee.delete({
     *   where: {
     *     // ... filter to delete one TrainerTrainee
     *   }
     * })
     * 
     */
    delete<T extends TrainerTraineeDeleteArgs>(args: SelectSubset<T, TrainerTraineeDeleteArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainerTrainee.
     * @param {TrainerTraineeUpdateArgs} args - Arguments to update one TrainerTrainee.
     * @example
     * // Update one TrainerTrainee
     * const trainerTrainee = await prisma.trainerTrainee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainerTraineeUpdateArgs>(args: SelectSubset<T, TrainerTraineeUpdateArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainerTrainees.
     * @param {TrainerTraineeDeleteManyArgs} args - Arguments to filter TrainerTrainees to delete.
     * @example
     * // Delete a few TrainerTrainees
     * const { count } = await prisma.trainerTrainee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainerTraineeDeleteManyArgs>(args?: SelectSubset<T, TrainerTraineeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerTrainees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainerTrainees
     * const trainerTrainee = await prisma.trainerTrainee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainerTraineeUpdateManyArgs>(args: SelectSubset<T, TrainerTraineeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerTrainees and returns the data updated in the database.
     * @param {TrainerTraineeUpdateManyAndReturnArgs} args - Arguments to update many TrainerTrainees.
     * @example
     * // Update many TrainerTrainees
     * const trainerTrainee = await prisma.trainerTrainee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainerTrainees and only return the `id`
     * const trainerTraineeWithIdOnly = await prisma.trainerTrainee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainerTraineeUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainerTraineeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainerTrainee.
     * @param {TrainerTraineeUpsertArgs} args - Arguments to update or create a TrainerTrainee.
     * @example
     * // Update or create a TrainerTrainee
     * const trainerTrainee = await prisma.trainerTrainee.upsert({
     *   create: {
     *     // ... data to create a TrainerTrainee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainerTrainee we want to update
     *   }
     * })
     */
    upsert<T extends TrainerTraineeUpsertArgs>(args: SelectSubset<T, TrainerTraineeUpsertArgs<ExtArgs>>): Prisma__TrainerTraineeClient<$Result.GetResult<Prisma.$TrainerTraineePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainerTrainees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeCountArgs} args - Arguments to filter TrainerTrainees to count.
     * @example
     * // Count the number of TrainerTrainees
     * const count = await prisma.trainerTrainee.count({
     *   where: {
     *     // ... the filter for the TrainerTrainees we want to count
     *   }
     * })
    **/
    count<T extends TrainerTraineeCountArgs>(
      args?: Subset<T, TrainerTraineeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainerTraineeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainerTrainee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainerTraineeAggregateArgs>(args: Subset<T, TrainerTraineeAggregateArgs>): Prisma.PrismaPromise<GetTrainerTraineeAggregateType<T>>

    /**
     * Group by TrainerTrainee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainerTraineeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainerTraineeGroupByArgs['orderBy'] }
        : { orderBy?: TrainerTraineeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainerTraineeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerTraineeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainerTrainee model
   */
  readonly fields: TrainerTraineeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainerTrainee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainerTraineeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainee<T extends TraineeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TraineeDefaultArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainer<T extends TrainerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainerDefaultArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainerTrainee model
   */
  interface TrainerTraineeFieldRefs {
    readonly id: FieldRef<"TrainerTrainee", 'String'>
    readonly trainerId: FieldRef<"TrainerTrainee", 'String'>
    readonly traineeId: FieldRef<"TrainerTrainee", 'String'>
    readonly membershipStatus: FieldRef<"TrainerTrainee", 'membershipStatus'>
    readonly sessionsCount: FieldRef<"TrainerTrainee", 'Int'>
    readonly assignedAt: FieldRef<"TrainerTrainee", 'DateTime'>
    readonly createdAt: FieldRef<"TrainerTrainee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainerTrainee findUnique
   */
  export type TrainerTraineeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTrainee to fetch.
     */
    where: TrainerTraineeWhereUniqueInput
  }

  /**
   * TrainerTrainee findUniqueOrThrow
   */
  export type TrainerTraineeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTrainee to fetch.
     */
    where: TrainerTraineeWhereUniqueInput
  }

  /**
   * TrainerTrainee findFirst
   */
  export type TrainerTraineeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTrainee to fetch.
     */
    where?: TrainerTraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTrainees to fetch.
     */
    orderBy?: TrainerTraineeOrderByWithRelationInput | TrainerTraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerTrainees.
     */
    cursor?: TrainerTraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTrainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTrainees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerTrainees.
     */
    distinct?: TrainerTraineeScalarFieldEnum | TrainerTraineeScalarFieldEnum[]
  }

  /**
   * TrainerTrainee findFirstOrThrow
   */
  export type TrainerTraineeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTrainee to fetch.
     */
    where?: TrainerTraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTrainees to fetch.
     */
    orderBy?: TrainerTraineeOrderByWithRelationInput | TrainerTraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerTrainees.
     */
    cursor?: TrainerTraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTrainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTrainees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerTrainees.
     */
    distinct?: TrainerTraineeScalarFieldEnum | TrainerTraineeScalarFieldEnum[]
  }

  /**
   * TrainerTrainee findMany
   */
  export type TrainerTraineeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTrainees to fetch.
     */
    where?: TrainerTraineeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTrainees to fetch.
     */
    orderBy?: TrainerTraineeOrderByWithRelationInput | TrainerTraineeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainerTrainees.
     */
    cursor?: TrainerTraineeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTrainees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTrainees.
     */
    skip?: number
    distinct?: TrainerTraineeScalarFieldEnum | TrainerTraineeScalarFieldEnum[]
  }

  /**
   * TrainerTrainee create
   */
  export type TrainerTraineeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainerTrainee.
     */
    data: XOR<TrainerTraineeCreateInput, TrainerTraineeUncheckedCreateInput>
  }

  /**
   * TrainerTrainee createMany
   */
  export type TrainerTraineeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainerTrainees.
     */
    data: TrainerTraineeCreateManyInput | TrainerTraineeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainerTrainee createManyAndReturn
   */
  export type TrainerTraineeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * The data used to create many TrainerTrainees.
     */
    data: TrainerTraineeCreateManyInput | TrainerTraineeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerTrainee update
   */
  export type TrainerTraineeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainerTrainee.
     */
    data: XOR<TrainerTraineeUpdateInput, TrainerTraineeUncheckedUpdateInput>
    /**
     * Choose, which TrainerTrainee to update.
     */
    where: TrainerTraineeWhereUniqueInput
  }

  /**
   * TrainerTrainee updateMany
   */
  export type TrainerTraineeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainerTrainees.
     */
    data: XOR<TrainerTraineeUpdateManyMutationInput, TrainerTraineeUncheckedUpdateManyInput>
    /**
     * Filter which TrainerTrainees to update
     */
    where?: TrainerTraineeWhereInput
    /**
     * Limit how many TrainerTrainees to update.
     */
    limit?: number
  }

  /**
   * TrainerTrainee updateManyAndReturn
   */
  export type TrainerTraineeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * The data used to update TrainerTrainees.
     */
    data: XOR<TrainerTraineeUpdateManyMutationInput, TrainerTraineeUncheckedUpdateManyInput>
    /**
     * Filter which TrainerTrainees to update
     */
    where?: TrainerTraineeWhereInput
    /**
     * Limit how many TrainerTrainees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerTrainee upsert
   */
  export type TrainerTraineeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainerTrainee to update in case it exists.
     */
    where: TrainerTraineeWhereUniqueInput
    /**
     * In case the TrainerTrainee found by the `where` argument doesn't exist, create a new TrainerTrainee with this data.
     */
    create: XOR<TrainerTraineeCreateInput, TrainerTraineeUncheckedCreateInput>
    /**
     * In case the TrainerTrainee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainerTraineeUpdateInput, TrainerTraineeUncheckedUpdateInput>
  }

  /**
   * TrainerTrainee delete
   */
  export type TrainerTraineeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
    /**
     * Filter which TrainerTrainee to delete.
     */
    where: TrainerTraineeWhereUniqueInput
  }

  /**
   * TrainerTrainee deleteMany
   */
  export type TrainerTraineeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerTrainees to delete
     */
    where?: TrainerTraineeWhereInput
    /**
     * Limit how many TrainerTrainees to delete.
     */
    limit?: number
  }

  /**
   * TrainerTrainee without action
   */
  export type TrainerTraineeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTrainee
     */
    select?: TrainerTraineeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTrainee
     */
    omit?: TrainerTraineeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeInclude<ExtArgs> | null
  }


  /**
   * Model TrainerTraineeRequest
   */

  export type AggregateTrainerTraineeRequest = {
    _count: TrainerTraineeRequestCountAggregateOutputType | null
    _avg: TrainerTraineeRequestAvgAggregateOutputType | null
    _sum: TrainerTraineeRequestSumAggregateOutputType | null
    _min: TrainerTraineeRequestMinAggregateOutputType | null
    _max: TrainerTraineeRequestMaxAggregateOutputType | null
  }

  export type TrainerTraineeRequestAvgAggregateOutputType = {
    sessionsCount: number | null
  }

  export type TrainerTraineeRequestSumAggregateOutputType = {
    sessionsCount: number | null
  }

  export type TrainerTraineeRequestMinAggregateOutputType = {
    id: string | null
    trainerId: string | null
    traineeId: string | null
    sessionsCount: number | null
    status: $Enums.RequestStatus | null
    createdAt: Date | null
    respondedAt: Date | null
  }

  export type TrainerTraineeRequestMaxAggregateOutputType = {
    id: string | null
    trainerId: string | null
    traineeId: string | null
    sessionsCount: number | null
    status: $Enums.RequestStatus | null
    createdAt: Date | null
    respondedAt: Date | null
  }

  export type TrainerTraineeRequestCountAggregateOutputType = {
    id: number
    trainerId: number
    traineeId: number
    sessionsCount: number
    status: number
    createdAt: number
    respondedAt: number
    _all: number
  }


  export type TrainerTraineeRequestAvgAggregateInputType = {
    sessionsCount?: true
  }

  export type TrainerTraineeRequestSumAggregateInputType = {
    sessionsCount?: true
  }

  export type TrainerTraineeRequestMinAggregateInputType = {
    id?: true
    trainerId?: true
    traineeId?: true
    sessionsCount?: true
    status?: true
    createdAt?: true
    respondedAt?: true
  }

  export type TrainerTraineeRequestMaxAggregateInputType = {
    id?: true
    trainerId?: true
    traineeId?: true
    sessionsCount?: true
    status?: true
    createdAt?: true
    respondedAt?: true
  }

  export type TrainerTraineeRequestCountAggregateInputType = {
    id?: true
    trainerId?: true
    traineeId?: true
    sessionsCount?: true
    status?: true
    createdAt?: true
    respondedAt?: true
    _all?: true
  }

  export type TrainerTraineeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerTraineeRequest to aggregate.
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTraineeRequests to fetch.
     */
    orderBy?: TrainerTraineeRequestOrderByWithRelationInput | TrainerTraineeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainerTraineeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTraineeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTraineeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainerTraineeRequests
    **/
    _count?: true | TrainerTraineeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainerTraineeRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainerTraineeRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainerTraineeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainerTraineeRequestMaxAggregateInputType
  }

  export type GetTrainerTraineeRequestAggregateType<T extends TrainerTraineeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainerTraineeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainerTraineeRequest[P]>
      : GetScalarType<T[P], AggregateTrainerTraineeRequest[P]>
  }




  export type TrainerTraineeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainerTraineeRequestWhereInput
    orderBy?: TrainerTraineeRequestOrderByWithAggregationInput | TrainerTraineeRequestOrderByWithAggregationInput[]
    by: TrainerTraineeRequestScalarFieldEnum[] | TrainerTraineeRequestScalarFieldEnum
    having?: TrainerTraineeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainerTraineeRequestCountAggregateInputType | true
    _avg?: TrainerTraineeRequestAvgAggregateInputType
    _sum?: TrainerTraineeRequestSumAggregateInputType
    _min?: TrainerTraineeRequestMinAggregateInputType
    _max?: TrainerTraineeRequestMaxAggregateInputType
  }

  export type TrainerTraineeRequestGroupByOutputType = {
    id: string
    trainerId: string
    traineeId: string
    sessionsCount: number
    status: $Enums.RequestStatus
    createdAt: Date
    respondedAt: Date | null
    _count: TrainerTraineeRequestCountAggregateOutputType | null
    _avg: TrainerTraineeRequestAvgAggregateOutputType | null
    _sum: TrainerTraineeRequestSumAggregateOutputType | null
    _min: TrainerTraineeRequestMinAggregateOutputType | null
    _max: TrainerTraineeRequestMaxAggregateOutputType | null
  }

  type GetTrainerTraineeRequestGroupByPayload<T extends TrainerTraineeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainerTraineeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainerTraineeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainerTraineeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TrainerTraineeRequestGroupByOutputType[P]>
        }
      >
    >


  export type TrainerTraineeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    sessionsCount?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTraineeRequest"]>

  export type TrainerTraineeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    sessionsCount?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTraineeRequest"]>

  export type TrainerTraineeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    sessionsCount?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainerTraineeRequest"]>

  export type TrainerTraineeRequestSelectScalar = {
    id?: boolean
    trainerId?: boolean
    traineeId?: boolean
    sessionsCount?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
  }

  export type TrainerTraineeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainerId" | "traineeId" | "sessionsCount" | "status" | "createdAt" | "respondedAt", ExtArgs["result"]["trainerTraineeRequest"]>
  export type TrainerTraineeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
  }
  export type TrainerTraineeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
  }
  export type TrainerTraineeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainer?: boolean | TrainerDefaultArgs<ExtArgs>
    trainee?: boolean | TraineeDefaultArgs<ExtArgs>
  }

  export type $TrainerTraineeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainerTraineeRequest"
    objects: {
      trainer: Prisma.$TrainerPayload<ExtArgs>
      trainee: Prisma.$TraineePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainerId: string
      traineeId: string
      sessionsCount: number
      status: $Enums.RequestStatus
      createdAt: Date
      respondedAt: Date | null
    }, ExtArgs["result"]["trainerTraineeRequest"]>
    composites: {}
  }

  type TrainerTraineeRequestGetPayload<S extends boolean | null | undefined | TrainerTraineeRequestDefaultArgs> = $Result.GetResult<Prisma.$TrainerTraineeRequestPayload, S>

  type TrainerTraineeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainerTraineeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainerTraineeRequestCountAggregateInputType | true
    }

  export interface TrainerTraineeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainerTraineeRequest'], meta: { name: 'TrainerTraineeRequest' } }
    /**
     * Find zero or one TrainerTraineeRequest that matches the filter.
     * @param {TrainerTraineeRequestFindUniqueArgs} args - Arguments to find a TrainerTraineeRequest
     * @example
     * // Get one TrainerTraineeRequest
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerTraineeRequestFindUniqueArgs>(args: SelectSubset<T, TrainerTraineeRequestFindUniqueArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainerTraineeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerTraineeRequestFindUniqueOrThrowArgs} args - Arguments to find a TrainerTraineeRequest
     * @example
     * // Get one TrainerTraineeRequest
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerTraineeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainerTraineeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerTraineeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestFindFirstArgs} args - Arguments to find a TrainerTraineeRequest
     * @example
     * // Get one TrainerTraineeRequest
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerTraineeRequestFindFirstArgs>(args?: SelectSubset<T, TrainerTraineeRequestFindFirstArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainerTraineeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestFindFirstOrThrowArgs} args - Arguments to find a TrainerTraineeRequest
     * @example
     * // Get one TrainerTraineeRequest
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerTraineeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainerTraineeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainerTraineeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainerTraineeRequests
     * const trainerTraineeRequests = await prisma.trainerTraineeRequest.findMany()
     * 
     * // Get first 10 TrainerTraineeRequests
     * const trainerTraineeRequests = await prisma.trainerTraineeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainerTraineeRequestWithIdOnly = await prisma.trainerTraineeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainerTraineeRequestFindManyArgs>(args?: SelectSubset<T, TrainerTraineeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainerTraineeRequest.
     * @param {TrainerTraineeRequestCreateArgs} args - Arguments to create a TrainerTraineeRequest.
     * @example
     * // Create one TrainerTraineeRequest
     * const TrainerTraineeRequest = await prisma.trainerTraineeRequest.create({
     *   data: {
     *     // ... data to create a TrainerTraineeRequest
     *   }
     * })
     * 
     */
    create<T extends TrainerTraineeRequestCreateArgs>(args: SelectSubset<T, TrainerTraineeRequestCreateArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainerTraineeRequests.
     * @param {TrainerTraineeRequestCreateManyArgs} args - Arguments to create many TrainerTraineeRequests.
     * @example
     * // Create many TrainerTraineeRequests
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainerTraineeRequestCreateManyArgs>(args?: SelectSubset<T, TrainerTraineeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainerTraineeRequests and returns the data saved in the database.
     * @param {TrainerTraineeRequestCreateManyAndReturnArgs} args - Arguments to create many TrainerTraineeRequests.
     * @example
     * // Create many TrainerTraineeRequests
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainerTraineeRequests and only return the `id`
     * const trainerTraineeRequestWithIdOnly = await prisma.trainerTraineeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainerTraineeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainerTraineeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainerTraineeRequest.
     * @param {TrainerTraineeRequestDeleteArgs} args - Arguments to delete one TrainerTraineeRequest.
     * @example
     * // Delete one TrainerTraineeRequest
     * const TrainerTraineeRequest = await prisma.trainerTraineeRequest.delete({
     *   where: {
     *     // ... filter to delete one TrainerTraineeRequest
     *   }
     * })
     * 
     */
    delete<T extends TrainerTraineeRequestDeleteArgs>(args: SelectSubset<T, TrainerTraineeRequestDeleteArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainerTraineeRequest.
     * @param {TrainerTraineeRequestUpdateArgs} args - Arguments to update one TrainerTraineeRequest.
     * @example
     * // Update one TrainerTraineeRequest
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainerTraineeRequestUpdateArgs>(args: SelectSubset<T, TrainerTraineeRequestUpdateArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainerTraineeRequests.
     * @param {TrainerTraineeRequestDeleteManyArgs} args - Arguments to filter TrainerTraineeRequests to delete.
     * @example
     * // Delete a few TrainerTraineeRequests
     * const { count } = await prisma.trainerTraineeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainerTraineeRequestDeleteManyArgs>(args?: SelectSubset<T, TrainerTraineeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerTraineeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainerTraineeRequests
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainerTraineeRequestUpdateManyArgs>(args: SelectSubset<T, TrainerTraineeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainerTraineeRequests and returns the data updated in the database.
     * @param {TrainerTraineeRequestUpdateManyAndReturnArgs} args - Arguments to update many TrainerTraineeRequests.
     * @example
     * // Update many TrainerTraineeRequests
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainerTraineeRequests and only return the `id`
     * const trainerTraineeRequestWithIdOnly = await prisma.trainerTraineeRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainerTraineeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainerTraineeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainerTraineeRequest.
     * @param {TrainerTraineeRequestUpsertArgs} args - Arguments to update or create a TrainerTraineeRequest.
     * @example
     * // Update or create a TrainerTraineeRequest
     * const trainerTraineeRequest = await prisma.trainerTraineeRequest.upsert({
     *   create: {
     *     // ... data to create a TrainerTraineeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainerTraineeRequest we want to update
     *   }
     * })
     */
    upsert<T extends TrainerTraineeRequestUpsertArgs>(args: SelectSubset<T, TrainerTraineeRequestUpsertArgs<ExtArgs>>): Prisma__TrainerTraineeRequestClient<$Result.GetResult<Prisma.$TrainerTraineeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainerTraineeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestCountArgs} args - Arguments to filter TrainerTraineeRequests to count.
     * @example
     * // Count the number of TrainerTraineeRequests
     * const count = await prisma.trainerTraineeRequest.count({
     *   where: {
     *     // ... the filter for the TrainerTraineeRequests we want to count
     *   }
     * })
    **/
    count<T extends TrainerTraineeRequestCountArgs>(
      args?: Subset<T, TrainerTraineeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainerTraineeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainerTraineeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainerTraineeRequestAggregateArgs>(args: Subset<T, TrainerTraineeRequestAggregateArgs>): Prisma.PrismaPromise<GetTrainerTraineeRequestAggregateType<T>>

    /**
     * Group by TrainerTraineeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerTraineeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainerTraineeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainerTraineeRequestGroupByArgs['orderBy'] }
        : { orderBy?: TrainerTraineeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainerTraineeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerTraineeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainerTraineeRequest model
   */
  readonly fields: TrainerTraineeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainerTraineeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainerTraineeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainer<T extends TrainerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainerDefaultArgs<ExtArgs>>): Prisma__TrainerClient<$Result.GetResult<Prisma.$TrainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    trainee<T extends TraineeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TraineeDefaultArgs<ExtArgs>>): Prisma__TraineeClient<$Result.GetResult<Prisma.$TraineePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainerTraineeRequest model
   */
  interface TrainerTraineeRequestFieldRefs {
    readonly id: FieldRef<"TrainerTraineeRequest", 'String'>
    readonly trainerId: FieldRef<"TrainerTraineeRequest", 'String'>
    readonly traineeId: FieldRef<"TrainerTraineeRequest", 'String'>
    readonly sessionsCount: FieldRef<"TrainerTraineeRequest", 'Int'>
    readonly status: FieldRef<"TrainerTraineeRequest", 'RequestStatus'>
    readonly createdAt: FieldRef<"TrainerTraineeRequest", 'DateTime'>
    readonly respondedAt: FieldRef<"TrainerTraineeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainerTraineeRequest findUnique
   */
  export type TrainerTraineeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTraineeRequest to fetch.
     */
    where: TrainerTraineeRequestWhereUniqueInput
  }

  /**
   * TrainerTraineeRequest findUniqueOrThrow
   */
  export type TrainerTraineeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTraineeRequest to fetch.
     */
    where: TrainerTraineeRequestWhereUniqueInput
  }

  /**
   * TrainerTraineeRequest findFirst
   */
  export type TrainerTraineeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTraineeRequest to fetch.
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTraineeRequests to fetch.
     */
    orderBy?: TrainerTraineeRequestOrderByWithRelationInput | TrainerTraineeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerTraineeRequests.
     */
    cursor?: TrainerTraineeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTraineeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTraineeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerTraineeRequests.
     */
    distinct?: TrainerTraineeRequestScalarFieldEnum | TrainerTraineeRequestScalarFieldEnum[]
  }

  /**
   * TrainerTraineeRequest findFirstOrThrow
   */
  export type TrainerTraineeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTraineeRequest to fetch.
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTraineeRequests to fetch.
     */
    orderBy?: TrainerTraineeRequestOrderByWithRelationInput | TrainerTraineeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainerTraineeRequests.
     */
    cursor?: TrainerTraineeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTraineeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTraineeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainerTraineeRequests.
     */
    distinct?: TrainerTraineeRequestScalarFieldEnum | TrainerTraineeRequestScalarFieldEnum[]
  }

  /**
   * TrainerTraineeRequest findMany
   */
  export type TrainerTraineeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TrainerTraineeRequests to fetch.
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainerTraineeRequests to fetch.
     */
    orderBy?: TrainerTraineeRequestOrderByWithRelationInput | TrainerTraineeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainerTraineeRequests.
     */
    cursor?: TrainerTraineeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainerTraineeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainerTraineeRequests.
     */
    skip?: number
    distinct?: TrainerTraineeRequestScalarFieldEnum | TrainerTraineeRequestScalarFieldEnum[]
  }

  /**
   * TrainerTraineeRequest create
   */
  export type TrainerTraineeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainerTraineeRequest.
     */
    data: XOR<TrainerTraineeRequestCreateInput, TrainerTraineeRequestUncheckedCreateInput>
  }

  /**
   * TrainerTraineeRequest createMany
   */
  export type TrainerTraineeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainerTraineeRequests.
     */
    data: TrainerTraineeRequestCreateManyInput | TrainerTraineeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainerTraineeRequest createManyAndReturn
   */
  export type TrainerTraineeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many TrainerTraineeRequests.
     */
    data: TrainerTraineeRequestCreateManyInput | TrainerTraineeRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerTraineeRequest update
   */
  export type TrainerTraineeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainerTraineeRequest.
     */
    data: XOR<TrainerTraineeRequestUpdateInput, TrainerTraineeRequestUncheckedUpdateInput>
    /**
     * Choose, which TrainerTraineeRequest to update.
     */
    where: TrainerTraineeRequestWhereUniqueInput
  }

  /**
   * TrainerTraineeRequest updateMany
   */
  export type TrainerTraineeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainerTraineeRequests.
     */
    data: XOR<TrainerTraineeRequestUpdateManyMutationInput, TrainerTraineeRequestUncheckedUpdateManyInput>
    /**
     * Filter which TrainerTraineeRequests to update
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * Limit how many TrainerTraineeRequests to update.
     */
    limit?: number
  }

  /**
   * TrainerTraineeRequest updateManyAndReturn
   */
  export type TrainerTraineeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * The data used to update TrainerTraineeRequests.
     */
    data: XOR<TrainerTraineeRequestUpdateManyMutationInput, TrainerTraineeRequestUncheckedUpdateManyInput>
    /**
     * Filter which TrainerTraineeRequests to update
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * Limit how many TrainerTraineeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainerTraineeRequest upsert
   */
  export type TrainerTraineeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainerTraineeRequest to update in case it exists.
     */
    where: TrainerTraineeRequestWhereUniqueInput
    /**
     * In case the TrainerTraineeRequest found by the `where` argument doesn't exist, create a new TrainerTraineeRequest with this data.
     */
    create: XOR<TrainerTraineeRequestCreateInput, TrainerTraineeRequestUncheckedCreateInput>
    /**
     * In case the TrainerTraineeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainerTraineeRequestUpdateInput, TrainerTraineeRequestUncheckedUpdateInput>
  }

  /**
   * TrainerTraineeRequest delete
   */
  export type TrainerTraineeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
    /**
     * Filter which TrainerTraineeRequest to delete.
     */
    where: TrainerTraineeRequestWhereUniqueInput
  }

  /**
   * TrainerTraineeRequest deleteMany
   */
  export type TrainerTraineeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerTraineeRequests to delete
     */
    where?: TrainerTraineeRequestWhereInput
    /**
     * Limit how many TrainerTraineeRequests to delete.
     */
    limit?: number
  }

  /**
   * TrainerTraineeRequest without action
   */
  export type TrainerTraineeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerTraineeRequest
     */
    select?: TrainerTraineeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainerTraineeRequest
     */
    omit?: TrainerTraineeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainerTraineeRequestInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    gender: 'gender',
    avatar: 'avatar',
    avatarPublicId: 'avatarPublicId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TraineeScalarFieldEnum: {
    userId: 'userId',
    goal: 'goal',
    heightCm: 'heightCm',
    createdAt: 'createdAt',
    isActive: 'isActive'
  };

  export type TraineeScalarFieldEnum = (typeof TraineeScalarFieldEnum)[keyof typeof TraineeScalarFieldEnum]


  export const TrainerScalarFieldEnum: {
    userId: 'userId',
    bio: 'bio',
    experienceYears: 'experienceYears',
    ratingAvg: 'ratingAvg',
    ratingCount: 'ratingCount',
    rankScore: 'rankScore',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type TrainerScalarFieldEnum = (typeof TrainerScalarFieldEnum)[keyof typeof TrainerScalarFieldEnum]


  export const TrainerCertificationScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    trainerRequestId: 'trainerRequestId',
    name: 'name',
    imageUrl: 'imageUrl',
    imagePublicId: 'imagePublicId',
    issuedBy: 'issuedBy',
    issuedAt: 'issuedAt',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type TrainerCertificationScalarFieldEnum = (typeof TrainerCertificationScalarFieldEnum)[keyof typeof TrainerCertificationScalarFieldEnum]


  export const TrainerTransformationScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    trainerRequestId: 'trainerRequestId',
    name: 'name',
    imageUrl: 'imageUrl',
    imagePublicId: 'imagePublicId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrainerTransformationScalarFieldEnum = (typeof TrainerTransformationScalarFieldEnum)[keyof typeof TrainerTransformationScalarFieldEnum]


  export const ResetPasswordTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type ResetPasswordTokenScalarFieldEnum = (typeof ResetPasswordTokenScalarFieldEnum)[keyof typeof ResetPasswordTokenScalarFieldEnum]


  export const TrainerRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    adminNote: 'adminNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrainerRequestScalarFieldEnum = (typeof TrainerRequestScalarFieldEnum)[keyof typeof TrainerRequestScalarFieldEnum]


  export const TrainerTraineeScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    traineeId: 'traineeId',
    membershipStatus: 'membershipStatus',
    sessionsCount: 'sessionsCount',
    assignedAt: 'assignedAt',
    createdAt: 'createdAt'
  };

  export type TrainerTraineeScalarFieldEnum = (typeof TrainerTraineeScalarFieldEnum)[keyof typeof TrainerTraineeScalarFieldEnum]


  export const TrainerTraineeRequestScalarFieldEnum: {
    id: 'id',
    trainerId: 'trainerId',
    traineeId: 'traineeId',
    sessionsCount: 'sessionsCount',
    status: 'status',
    createdAt: 'createdAt',
    respondedAt: 'respondedAt'
  };

  export type TrainerTraineeRequestScalarFieldEnum = (typeof TrainerTraineeRequestScalarFieldEnum)[keyof typeof TrainerTraineeRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TraineeGoal'
   */
  export type EnumTraineeGoalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TraineeGoal'>
    


  /**
   * Reference to a field of type 'TraineeGoal[]'
   */
  export type ListEnumTraineeGoalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TraineeGoal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'TrainerRequestStatus'
   */
  export type EnumTrainerRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrainerRequestStatus'>
    


  /**
   * Reference to a field of type 'TrainerRequestStatus[]'
   */
  export type ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrainerRequestStatus[]'>
    


  /**
   * Reference to a field of type 'membershipStatus'
   */
  export type EnummembershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'membershipStatus'>
    


  /**
   * Reference to a field of type 'membershipStatus[]'
   */
  export type ListEnummembershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'membershipStatus[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    avatar?: StringNullableFilter<"User"> | string | null
    avatarPublicId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    trainee?: XOR<TraineeNullableScalarRelationFilter, TraineeWhereInput> | null
    trainer?: XOR<TrainerNullableScalarRelationFilter, TrainerWhereInput> | null
    trainerRequests?: TrainerRequestListRelationFilter
    resetPasswordTokens?: ResetPasswordTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    avatar?: SortOrderInput | SortOrder
    avatarPublicId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainee?: TraineeOrderByWithRelationInput
    trainer?: TrainerOrderByWithRelationInput
    trainerRequests?: TrainerRequestOrderByRelationAggregateInput
    resetPasswordTokens?: ResetPasswordTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    avatar?: StringNullableFilter<"User"> | string | null
    avatarPublicId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    trainee?: XOR<TraineeNullableScalarRelationFilter, TraineeWhereInput> | null
    trainer?: XOR<TrainerNullableScalarRelationFilter, TrainerWhereInput> | null
    trainerRequests?: TrainerRequestListRelationFilter
    resetPasswordTokens?: ResetPasswordTokenListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    avatar?: SortOrderInput | SortOrder
    avatarPublicId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    gender?: EnumGenderWithAggregatesFilter<"User"> | $Enums.Gender
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarPublicId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TraineeWhereInput = {
    AND?: TraineeWhereInput | TraineeWhereInput[]
    OR?: TraineeWhereInput[]
    NOT?: TraineeWhereInput | TraineeWhereInput[]
    userId?: StringFilter<"Trainee"> | string
    goal?: EnumTraineeGoalFilter<"Trainee"> | $Enums.TraineeGoal
    heightCm?: IntNullableFilter<"Trainee"> | number | null
    createdAt?: DateTimeFilter<"Trainee"> | Date | string
    isActive?: BoolFilter<"Trainee"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    trainerTrainee?: XOR<TrainerTraineeNullableScalarRelationFilter, TrainerTraineeWhereInput> | null
    trainerTraineeRequests?: TrainerTraineeRequestListRelationFilter
  }

  export type TraineeOrderByWithRelationInput = {
    userId?: SortOrder
    goal?: SortOrder
    heightCm?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    user?: UserOrderByWithRelationInput
    trainerTrainee?: TrainerTraineeOrderByWithRelationInput
    trainerTraineeRequests?: TrainerTraineeRequestOrderByRelationAggregateInput
  }

  export type TraineeWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: TraineeWhereInput | TraineeWhereInput[]
    OR?: TraineeWhereInput[]
    NOT?: TraineeWhereInput | TraineeWhereInput[]
    goal?: EnumTraineeGoalFilter<"Trainee"> | $Enums.TraineeGoal
    heightCm?: IntNullableFilter<"Trainee"> | number | null
    createdAt?: DateTimeFilter<"Trainee"> | Date | string
    isActive?: BoolFilter<"Trainee"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    trainerTrainee?: XOR<TrainerTraineeNullableScalarRelationFilter, TrainerTraineeWhereInput> | null
    trainerTraineeRequests?: TrainerTraineeRequestListRelationFilter
  }, "userId">

  export type TraineeOrderByWithAggregationInput = {
    userId?: SortOrder
    goal?: SortOrder
    heightCm?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
    _count?: TraineeCountOrderByAggregateInput
    _avg?: TraineeAvgOrderByAggregateInput
    _max?: TraineeMaxOrderByAggregateInput
    _min?: TraineeMinOrderByAggregateInput
    _sum?: TraineeSumOrderByAggregateInput
  }

  export type TraineeScalarWhereWithAggregatesInput = {
    AND?: TraineeScalarWhereWithAggregatesInput | TraineeScalarWhereWithAggregatesInput[]
    OR?: TraineeScalarWhereWithAggregatesInput[]
    NOT?: TraineeScalarWhereWithAggregatesInput | TraineeScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Trainee"> | string
    goal?: EnumTraineeGoalWithAggregatesFilter<"Trainee"> | $Enums.TraineeGoal
    heightCm?: IntNullableWithAggregatesFilter<"Trainee"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Trainee"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Trainee"> | boolean
  }

  export type TrainerWhereInput = {
    AND?: TrainerWhereInput | TrainerWhereInput[]
    OR?: TrainerWhereInput[]
    NOT?: TrainerWhereInput | TrainerWhereInput[]
    userId?: StringFilter<"Trainer"> | string
    bio?: StringFilter<"Trainer"> | string
    experienceYears?: DateTimeFilter<"Trainer"> | Date | string
    ratingAvg?: FloatFilter<"Trainer"> | number
    ratingCount?: IntFilter<"Trainer"> | number
    rankScore?: FloatFilter<"Trainer"> | number
    isActive?: BoolFilter<"Trainer"> | boolean
    createdAt?: DateTimeFilter<"Trainer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    certifications?: TrainerCertificationListRelationFilter
    transformations?: TrainerTransformationListRelationFilter
    traineeRequests?: TrainerTraineeRequestListRelationFilter
    trainerTrainees?: TrainerTraineeListRelationFilter
  }

  export type TrainerOrderByWithRelationInput = {
    userId?: SortOrder
    bio?: SortOrder
    experienceYears?: SortOrder
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    certifications?: TrainerCertificationOrderByRelationAggregateInput
    transformations?: TrainerTransformationOrderByRelationAggregateInput
    traineeRequests?: TrainerTraineeRequestOrderByRelationAggregateInput
    trainerTrainees?: TrainerTraineeOrderByRelationAggregateInput
  }

  export type TrainerWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: TrainerWhereInput | TrainerWhereInput[]
    OR?: TrainerWhereInput[]
    NOT?: TrainerWhereInput | TrainerWhereInput[]
    bio?: StringFilter<"Trainer"> | string
    experienceYears?: DateTimeFilter<"Trainer"> | Date | string
    ratingAvg?: FloatFilter<"Trainer"> | number
    ratingCount?: IntFilter<"Trainer"> | number
    rankScore?: FloatFilter<"Trainer"> | number
    isActive?: BoolFilter<"Trainer"> | boolean
    createdAt?: DateTimeFilter<"Trainer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    certifications?: TrainerCertificationListRelationFilter
    transformations?: TrainerTransformationListRelationFilter
    traineeRequests?: TrainerTraineeRequestListRelationFilter
    trainerTrainees?: TrainerTraineeListRelationFilter
  }, "userId">

  export type TrainerOrderByWithAggregationInput = {
    userId?: SortOrder
    bio?: SortOrder
    experienceYears?: SortOrder
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: TrainerCountOrderByAggregateInput
    _avg?: TrainerAvgOrderByAggregateInput
    _max?: TrainerMaxOrderByAggregateInput
    _min?: TrainerMinOrderByAggregateInput
    _sum?: TrainerSumOrderByAggregateInput
  }

  export type TrainerScalarWhereWithAggregatesInput = {
    AND?: TrainerScalarWhereWithAggregatesInput | TrainerScalarWhereWithAggregatesInput[]
    OR?: TrainerScalarWhereWithAggregatesInput[]
    NOT?: TrainerScalarWhereWithAggregatesInput | TrainerScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Trainer"> | string
    bio?: StringWithAggregatesFilter<"Trainer"> | string
    experienceYears?: DateTimeWithAggregatesFilter<"Trainer"> | Date | string
    ratingAvg?: FloatWithAggregatesFilter<"Trainer"> | number
    ratingCount?: IntWithAggregatesFilter<"Trainer"> | number
    rankScore?: FloatWithAggregatesFilter<"Trainer"> | number
    isActive?: BoolWithAggregatesFilter<"Trainer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Trainer"> | Date | string
  }

  export type TrainerCertificationWhereInput = {
    AND?: TrainerCertificationWhereInput | TrainerCertificationWhereInput[]
    OR?: TrainerCertificationWhereInput[]
    NOT?: TrainerCertificationWhereInput | TrainerCertificationWhereInput[]
    id?: StringFilter<"TrainerCertification"> | string
    trainerId?: StringNullableFilter<"TrainerCertification"> | string | null
    trainerRequestId?: StringNullableFilter<"TrainerCertification"> | string | null
    name?: StringFilter<"TrainerCertification"> | string
    imageUrl?: StringFilter<"TrainerCertification"> | string
    imagePublicId?: StringFilter<"TrainerCertification"> | string
    issuedBy?: StringNullableFilter<"TrainerCertification"> | string | null
    issuedAt?: DateTimeNullableFilter<"TrainerCertification"> | Date | string | null
    updatedAt?: DateTimeFilter<"TrainerCertification"> | Date | string
    createdAt?: DateTimeFilter<"TrainerCertification"> | Date | string
    trainer?: XOR<TrainerNullableScalarRelationFilter, TrainerWhereInput> | null
    trainerRequest?: XOR<TrainerRequestNullableScalarRelationFilter, TrainerRequestWhereInput> | null
  }

  export type TrainerCertificationOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    trainerRequestId?: SortOrderInput | SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    issuedBy?: SortOrderInput | SortOrder
    issuedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    trainer?: TrainerOrderByWithRelationInput
    trainerRequest?: TrainerRequestOrderByWithRelationInput
  }

  export type TrainerCertificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trainerId_name_imageUrl?: TrainerCertificationTrainerIdNameImageUrlCompoundUniqueInput
    AND?: TrainerCertificationWhereInput | TrainerCertificationWhereInput[]
    OR?: TrainerCertificationWhereInput[]
    NOT?: TrainerCertificationWhereInput | TrainerCertificationWhereInput[]
    trainerId?: StringNullableFilter<"TrainerCertification"> | string | null
    trainerRequestId?: StringNullableFilter<"TrainerCertification"> | string | null
    name?: StringFilter<"TrainerCertification"> | string
    imageUrl?: StringFilter<"TrainerCertification"> | string
    imagePublicId?: StringFilter<"TrainerCertification"> | string
    issuedBy?: StringNullableFilter<"TrainerCertification"> | string | null
    issuedAt?: DateTimeNullableFilter<"TrainerCertification"> | Date | string | null
    updatedAt?: DateTimeFilter<"TrainerCertification"> | Date | string
    createdAt?: DateTimeFilter<"TrainerCertification"> | Date | string
    trainer?: XOR<TrainerNullableScalarRelationFilter, TrainerWhereInput> | null
    trainerRequest?: XOR<TrainerRequestNullableScalarRelationFilter, TrainerRequestWhereInput> | null
  }, "id" | "trainerId_name_imageUrl">

  export type TrainerCertificationOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    trainerRequestId?: SortOrderInput | SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    issuedBy?: SortOrderInput | SortOrder
    issuedAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: TrainerCertificationCountOrderByAggregateInput
    _max?: TrainerCertificationMaxOrderByAggregateInput
    _min?: TrainerCertificationMinOrderByAggregateInput
  }

  export type TrainerCertificationScalarWhereWithAggregatesInput = {
    AND?: TrainerCertificationScalarWhereWithAggregatesInput | TrainerCertificationScalarWhereWithAggregatesInput[]
    OR?: TrainerCertificationScalarWhereWithAggregatesInput[]
    NOT?: TrainerCertificationScalarWhereWithAggregatesInput | TrainerCertificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainerCertification"> | string
    trainerId?: StringNullableWithAggregatesFilter<"TrainerCertification"> | string | null
    trainerRequestId?: StringNullableWithAggregatesFilter<"TrainerCertification"> | string | null
    name?: StringWithAggregatesFilter<"TrainerCertification"> | string
    imageUrl?: StringWithAggregatesFilter<"TrainerCertification"> | string
    imagePublicId?: StringWithAggregatesFilter<"TrainerCertification"> | string
    issuedBy?: StringNullableWithAggregatesFilter<"TrainerCertification"> | string | null
    issuedAt?: DateTimeNullableWithAggregatesFilter<"TrainerCertification"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"TrainerCertification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TrainerCertification"> | Date | string
  }

  export type TrainerTransformationWhereInput = {
    AND?: TrainerTransformationWhereInput | TrainerTransformationWhereInput[]
    OR?: TrainerTransformationWhereInput[]
    NOT?: TrainerTransformationWhereInput | TrainerTransformationWhereInput[]
    id?: StringFilter<"TrainerTransformation"> | string
    trainerId?: StringNullableFilter<"TrainerTransformation"> | string | null
    trainerRequestId?: StringNullableFilter<"TrainerTransformation"> | string | null
    name?: StringFilter<"TrainerTransformation"> | string
    imageUrl?: StringFilter<"TrainerTransformation"> | string
    imagePublicId?: StringNullableFilter<"TrainerTransformation"> | string | null
    createdAt?: DateTimeFilter<"TrainerTransformation"> | Date | string
    updatedAt?: DateTimeFilter<"TrainerTransformation"> | Date | string
    trainer?: XOR<TrainerNullableScalarRelationFilter, TrainerWhereInput> | null
    trainerRequest?: XOR<TrainerRequestNullableScalarRelationFilter, TrainerRequestWhereInput> | null
  }

  export type TrainerTransformationOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    trainerRequestId?: SortOrderInput | SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trainer?: TrainerOrderByWithRelationInput
    trainerRequest?: TrainerRequestOrderByWithRelationInput
  }

  export type TrainerTransformationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trainerId_name_imageUrl?: TrainerTransformationTrainerIdNameImageUrlCompoundUniqueInput
    AND?: TrainerTransformationWhereInput | TrainerTransformationWhereInput[]
    OR?: TrainerTransformationWhereInput[]
    NOT?: TrainerTransformationWhereInput | TrainerTransformationWhereInput[]
    trainerId?: StringNullableFilter<"TrainerTransformation"> | string | null
    trainerRequestId?: StringNullableFilter<"TrainerTransformation"> | string | null
    name?: StringFilter<"TrainerTransformation"> | string
    imageUrl?: StringFilter<"TrainerTransformation"> | string
    imagePublicId?: StringNullableFilter<"TrainerTransformation"> | string | null
    createdAt?: DateTimeFilter<"TrainerTransformation"> | Date | string
    updatedAt?: DateTimeFilter<"TrainerTransformation"> | Date | string
    trainer?: XOR<TrainerNullableScalarRelationFilter, TrainerWhereInput> | null
    trainerRequest?: XOR<TrainerRequestNullableScalarRelationFilter, TrainerRequestWhereInput> | null
  }, "id" | "trainerId_name_imageUrl">

  export type TrainerTransformationOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrderInput | SortOrder
    trainerRequestId?: SortOrderInput | SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrainerTransformationCountOrderByAggregateInput
    _max?: TrainerTransformationMaxOrderByAggregateInput
    _min?: TrainerTransformationMinOrderByAggregateInput
  }

  export type TrainerTransformationScalarWhereWithAggregatesInput = {
    AND?: TrainerTransformationScalarWhereWithAggregatesInput | TrainerTransformationScalarWhereWithAggregatesInput[]
    OR?: TrainerTransformationScalarWhereWithAggregatesInput[]
    NOT?: TrainerTransformationScalarWhereWithAggregatesInput | TrainerTransformationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainerTransformation"> | string
    trainerId?: StringNullableWithAggregatesFilter<"TrainerTransformation"> | string | null
    trainerRequestId?: StringNullableWithAggregatesFilter<"TrainerTransformation"> | string | null
    name?: StringWithAggregatesFilter<"TrainerTransformation"> | string
    imageUrl?: StringWithAggregatesFilter<"TrainerTransformation"> | string
    imagePublicId?: StringNullableWithAggregatesFilter<"TrainerTransformation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrainerTransformation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainerTransformation"> | Date | string
  }

  export type ResetPasswordTokenWhereInput = {
    AND?: ResetPasswordTokenWhereInput | ResetPasswordTokenWhereInput[]
    OR?: ResetPasswordTokenWhereInput[]
    NOT?: ResetPasswordTokenWhereInput | ResetPasswordTokenWhereInput[]
    id?: StringFilter<"ResetPasswordToken"> | string
    userId?: StringFilter<"ResetPasswordToken"> | string
    tokenHash?: StringFilter<"ResetPasswordToken"> | string
    expiresAt?: DateTimeFilter<"ResetPasswordToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"ResetPasswordToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ResetPasswordToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ResetPasswordTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ResetPasswordTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResetPasswordTokenWhereInput | ResetPasswordTokenWhereInput[]
    OR?: ResetPasswordTokenWhereInput[]
    NOT?: ResetPasswordTokenWhereInput | ResetPasswordTokenWhereInput[]
    userId?: StringFilter<"ResetPasswordToken"> | string
    tokenHash?: StringFilter<"ResetPasswordToken"> | string
    expiresAt?: DateTimeFilter<"ResetPasswordToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"ResetPasswordToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ResetPasswordToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ResetPasswordTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ResetPasswordTokenCountOrderByAggregateInput
    _max?: ResetPasswordTokenMaxOrderByAggregateInput
    _min?: ResetPasswordTokenMinOrderByAggregateInput
  }

  export type ResetPasswordTokenScalarWhereWithAggregatesInput = {
    AND?: ResetPasswordTokenScalarWhereWithAggregatesInput | ResetPasswordTokenScalarWhereWithAggregatesInput[]
    OR?: ResetPasswordTokenScalarWhereWithAggregatesInput[]
    NOT?: ResetPasswordTokenScalarWhereWithAggregatesInput | ResetPasswordTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResetPasswordToken"> | string
    userId?: StringWithAggregatesFilter<"ResetPasswordToken"> | string
    tokenHash?: StringWithAggregatesFilter<"ResetPasswordToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"ResetPasswordToken"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"ResetPasswordToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ResetPasswordToken"> | Date | string
  }

  export type TrainerRequestWhereInput = {
    AND?: TrainerRequestWhereInput | TrainerRequestWhereInput[]
    OR?: TrainerRequestWhereInput[]
    NOT?: TrainerRequestWhereInput | TrainerRequestWhereInput[]
    id?: StringFilter<"TrainerRequest"> | string
    userId?: StringFilter<"TrainerRequest"> | string
    status?: EnumTrainerRequestStatusFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus
    adminNote?: StringNullableFilter<"TrainerRequest"> | string | null
    createdAt?: DateTimeFilter<"TrainerRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TrainerRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    certifications?: TrainerCertificationListRelationFilter
    transformations?: TrainerTransformationListRelationFilter
  }

  export type TrainerRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    adminNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    certifications?: TrainerCertificationOrderByRelationAggregateInput
    transformations?: TrainerTransformationOrderByRelationAggregateInput
  }

  export type TrainerRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: TrainerRequestWhereInput | TrainerRequestWhereInput[]
    OR?: TrainerRequestWhereInput[]
    NOT?: TrainerRequestWhereInput | TrainerRequestWhereInput[]
    status?: EnumTrainerRequestStatusFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus
    adminNote?: StringNullableFilter<"TrainerRequest"> | string | null
    createdAt?: DateTimeFilter<"TrainerRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TrainerRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    certifications?: TrainerCertificationListRelationFilter
    transformations?: TrainerTransformationListRelationFilter
  }, "id" | "userId">

  export type TrainerRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    adminNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrainerRequestCountOrderByAggregateInput
    _max?: TrainerRequestMaxOrderByAggregateInput
    _min?: TrainerRequestMinOrderByAggregateInput
  }

  export type TrainerRequestScalarWhereWithAggregatesInput = {
    AND?: TrainerRequestScalarWhereWithAggregatesInput | TrainerRequestScalarWhereWithAggregatesInput[]
    OR?: TrainerRequestScalarWhereWithAggregatesInput[]
    NOT?: TrainerRequestScalarWhereWithAggregatesInput | TrainerRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainerRequest"> | string
    userId?: StringWithAggregatesFilter<"TrainerRequest"> | string
    status?: EnumTrainerRequestStatusWithAggregatesFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus
    adminNote?: StringNullableWithAggregatesFilter<"TrainerRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrainerRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainerRequest"> | Date | string
  }

  export type TrainerTraineeWhereInput = {
    AND?: TrainerTraineeWhereInput | TrainerTraineeWhereInput[]
    OR?: TrainerTraineeWhereInput[]
    NOT?: TrainerTraineeWhereInput | TrainerTraineeWhereInput[]
    id?: StringFilter<"TrainerTrainee"> | string
    trainerId?: StringFilter<"TrainerTrainee"> | string
    traineeId?: StringFilter<"TrainerTrainee"> | string
    membershipStatus?: EnummembershipStatusFilter<"TrainerTrainee"> | $Enums.membershipStatus
    sessionsCount?: IntFilter<"TrainerTrainee"> | number
    assignedAt?: DateTimeNullableFilter<"TrainerTrainee"> | Date | string | null
    createdAt?: DateTimeFilter<"TrainerTrainee"> | Date | string
    trainee?: XOR<TraineeScalarRelationFilter, TraineeWhereInput>
    trainer?: XOR<TrainerScalarRelationFilter, TrainerWhereInput>
  }

  export type TrainerTraineeOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    membershipStatus?: SortOrder
    sessionsCount?: SortOrder
    assignedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    trainee?: TraineeOrderByWithRelationInput
    trainer?: TrainerOrderByWithRelationInput
  }

  export type TrainerTraineeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    traineeId?: string
    trainerId_traineeId?: TrainerTraineeTrainerIdTraineeIdCompoundUniqueInput
    AND?: TrainerTraineeWhereInput | TrainerTraineeWhereInput[]
    OR?: TrainerTraineeWhereInput[]
    NOT?: TrainerTraineeWhereInput | TrainerTraineeWhereInput[]
    trainerId?: StringFilter<"TrainerTrainee"> | string
    membershipStatus?: EnummembershipStatusFilter<"TrainerTrainee"> | $Enums.membershipStatus
    sessionsCount?: IntFilter<"TrainerTrainee"> | number
    assignedAt?: DateTimeNullableFilter<"TrainerTrainee"> | Date | string | null
    createdAt?: DateTimeFilter<"TrainerTrainee"> | Date | string
    trainee?: XOR<TraineeScalarRelationFilter, TraineeWhereInput>
    trainer?: XOR<TrainerScalarRelationFilter, TrainerWhereInput>
  }, "id" | "traineeId" | "trainerId_traineeId">

  export type TrainerTraineeOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    membershipStatus?: SortOrder
    sessionsCount?: SortOrder
    assignedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TrainerTraineeCountOrderByAggregateInput
    _avg?: TrainerTraineeAvgOrderByAggregateInput
    _max?: TrainerTraineeMaxOrderByAggregateInput
    _min?: TrainerTraineeMinOrderByAggregateInput
    _sum?: TrainerTraineeSumOrderByAggregateInput
  }

  export type TrainerTraineeScalarWhereWithAggregatesInput = {
    AND?: TrainerTraineeScalarWhereWithAggregatesInput | TrainerTraineeScalarWhereWithAggregatesInput[]
    OR?: TrainerTraineeScalarWhereWithAggregatesInput[]
    NOT?: TrainerTraineeScalarWhereWithAggregatesInput | TrainerTraineeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainerTrainee"> | string
    trainerId?: StringWithAggregatesFilter<"TrainerTrainee"> | string
    traineeId?: StringWithAggregatesFilter<"TrainerTrainee"> | string
    membershipStatus?: EnummembershipStatusWithAggregatesFilter<"TrainerTrainee"> | $Enums.membershipStatus
    sessionsCount?: IntWithAggregatesFilter<"TrainerTrainee"> | number
    assignedAt?: DateTimeNullableWithAggregatesFilter<"TrainerTrainee"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrainerTrainee"> | Date | string
  }

  export type TrainerTraineeRequestWhereInput = {
    AND?: TrainerTraineeRequestWhereInput | TrainerTraineeRequestWhereInput[]
    OR?: TrainerTraineeRequestWhereInput[]
    NOT?: TrainerTraineeRequestWhereInput | TrainerTraineeRequestWhereInput[]
    id?: StringFilter<"TrainerTraineeRequest"> | string
    trainerId?: StringFilter<"TrainerTraineeRequest"> | string
    traineeId?: StringFilter<"TrainerTraineeRequest"> | string
    sessionsCount?: IntFilter<"TrainerTraineeRequest"> | number
    status?: EnumRequestStatusFilter<"TrainerTraineeRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeFilter<"TrainerTraineeRequest"> | Date | string
    respondedAt?: DateTimeNullableFilter<"TrainerTraineeRequest"> | Date | string | null
    trainer?: XOR<TrainerScalarRelationFilter, TrainerWhereInput>
    trainee?: XOR<TraineeScalarRelationFilter, TraineeWhereInput>
  }

  export type TrainerTraineeRequestOrderByWithRelationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    sessionsCount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrderInput | SortOrder
    trainer?: TrainerOrderByWithRelationInput
    trainee?: TraineeOrderByWithRelationInput
  }

  export type TrainerTraineeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainerTraineeRequestWhereInput | TrainerTraineeRequestWhereInput[]
    OR?: TrainerTraineeRequestWhereInput[]
    NOT?: TrainerTraineeRequestWhereInput | TrainerTraineeRequestWhereInput[]
    trainerId?: StringFilter<"TrainerTraineeRequest"> | string
    traineeId?: StringFilter<"TrainerTraineeRequest"> | string
    sessionsCount?: IntFilter<"TrainerTraineeRequest"> | number
    status?: EnumRequestStatusFilter<"TrainerTraineeRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeFilter<"TrainerTraineeRequest"> | Date | string
    respondedAt?: DateTimeNullableFilter<"TrainerTraineeRequest"> | Date | string | null
    trainer?: XOR<TrainerScalarRelationFilter, TrainerWhereInput>
    trainee?: XOR<TraineeScalarRelationFilter, TraineeWhereInput>
  }, "id">

  export type TrainerTraineeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    sessionsCount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrderInput | SortOrder
    _count?: TrainerTraineeRequestCountOrderByAggregateInput
    _avg?: TrainerTraineeRequestAvgOrderByAggregateInput
    _max?: TrainerTraineeRequestMaxOrderByAggregateInput
    _min?: TrainerTraineeRequestMinOrderByAggregateInput
    _sum?: TrainerTraineeRequestSumOrderByAggregateInput
  }

  export type TrainerTraineeRequestScalarWhereWithAggregatesInput = {
    AND?: TrainerTraineeRequestScalarWhereWithAggregatesInput | TrainerTraineeRequestScalarWhereWithAggregatesInput[]
    OR?: TrainerTraineeRequestScalarWhereWithAggregatesInput[]
    NOT?: TrainerTraineeRequestScalarWhereWithAggregatesInput | TrainerTraineeRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainerTraineeRequest"> | string
    trainerId?: StringWithAggregatesFilter<"TrainerTraineeRequest"> | string
    traineeId?: StringWithAggregatesFilter<"TrainerTraineeRequest"> | string
    sessionsCount?: IntWithAggregatesFilter<"TrainerTraineeRequest"> | number
    status?: EnumRequestStatusWithAggregatesFilter<"TrainerTraineeRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeWithAggregatesFilter<"TrainerTraineeRequest"> | Date | string
    respondedAt?: DateTimeNullableWithAggregatesFilter<"TrainerTraineeRequest"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeCreateNestedOneWithoutUserInput
    trainer?: TrainerCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestCreateNestedManyWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeUncheckedCreateNestedOneWithoutUserInput
    trainer?: TrainerUncheckedCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestUncheckedCreateNestedManyWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUpdateOneWithoutUserNestedInput
    trainer?: TrainerUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUpdateManyWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUncheckedUpdateOneWithoutUserNestedInput
    trainer?: TrainerUncheckedUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUncheckedUpdateManyWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TraineeCreateInput = {
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    user: UserCreateNestedOneWithoutTraineeInput
    trainerTrainee?: TrainerTraineeCreateNestedOneWithoutTraineeInput
    trainerTraineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTraineeInput
  }

  export type TraineeUncheckedCreateInput = {
    userId: string
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    trainerTrainee?: TrainerTraineeUncheckedCreateNestedOneWithoutTraineeInput
    trainerTraineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTraineeInput
  }

  export type TraineeUpdateInput = {
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutTraineeNestedInput
    trainerTrainee?: TrainerTraineeUpdateOneWithoutTraineeNestedInput
    trainerTraineeRequests?: TrainerTraineeRequestUpdateManyWithoutTraineeNestedInput
  }

  export type TraineeUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    trainerTrainee?: TrainerTraineeUncheckedUpdateOneWithoutTraineeNestedInput
    trainerTraineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTraineeNestedInput
  }

  export type TraineeCreateManyInput = {
    userId: string
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
  }

  export type TraineeUpdateManyMutationInput = {
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TraineeUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TrainerCreateInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerInput
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUncheckedCreateInput = {
    userId: string
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUpdateInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerNestedInput
    certifications?: TrainerCertificationUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerCreateManyInput = {
    userId: string
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type TrainerUpdateManyMutationInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerCertificationCreateInput = {
    id?: string
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    trainer?: TrainerCreateNestedOneWithoutCertificationsInput
    trainerRequest?: TrainerRequestCreateNestedOneWithoutCertificationsInput
  }

  export type TrainerCertificationUncheckedCreateInput = {
    id?: string
    trainerId?: string | null
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TrainerCertificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUpdateOneWithoutCertificationsNestedInput
    trainerRequest?: TrainerRequestUpdateOneWithoutCertificationsNestedInput
  }

  export type TrainerCertificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerCertificationCreateManyInput = {
    id?: string
    trainerId?: string | null
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TrainerCertificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerCertificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationCreateInput = {
    id?: string
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer?: TrainerCreateNestedOneWithoutTransformationsInput
    trainerRequest?: TrainerRequestCreateNestedOneWithoutTransformationsInput
  }

  export type TrainerTransformationUncheckedCreateInput = {
    id?: string
    trainerId?: string | null
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerTransformationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUpdateOneWithoutTransformationsNestedInput
    trainerRequest?: TrainerRequestUpdateOneWithoutTransformationsNestedInput
  }

  export type TrainerTransformationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationCreateManyInput = {
    id?: string
    trainerId?: string | null
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerTransformationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetPasswordTokenCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutResetPasswordTokensInput
  }

  export type ResetPasswordTokenUncheckedCreateInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResetPasswordTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResetPasswordTokensNestedInput
  }

  export type ResetPasswordTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetPasswordTokenCreateManyInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResetPasswordTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetPasswordTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerRequestCreateInput = {
    id?: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerRequestsInput
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerRequestInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestUncheckedCreateInput = {
    id?: string
    userId: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerRequestInput
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerRequestsNestedInput
    certifications?: TrainerCertificationUpdateManyWithoutTrainerRequestNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerRequestNestedInput
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerRequestCreateManyInput = {
    id?: string
    userId: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeCreateInput = {
    id?: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
    trainee: TraineeCreateNestedOneWithoutTrainerTraineeInput
    trainer: TrainerCreateNestedOneWithoutTrainerTraineesInput
  }

  export type TrainerTraineeUncheckedCreateInput = {
    id?: string
    trainerId: string
    traineeId: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TrainerTraineeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUpdateOneRequiredWithoutTrainerTraineeNestedInput
    trainer?: TrainerUpdateOneRequiredWithoutTrainerTraineesNestedInput
  }

  export type TrainerTraineeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeCreateManyInput = {
    id?: string
    trainerId: string
    traineeId: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TrainerTraineeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeRequestCreateInput = {
    id?: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    trainer: TrainerCreateNestedOneWithoutTraineeRequestsInput
    trainee: TraineeCreateNestedOneWithoutTrainerTraineeRequestsInput
  }

  export type TrainerTraineeRequestUncheckedCreateInput = {
    id?: string
    trainerId: string
    traineeId: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type TrainerTraineeRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trainer?: TrainerUpdateOneRequiredWithoutTraineeRequestsNestedInput
    trainee?: TraineeUpdateOneRequiredWithoutTrainerTraineeRequestsNestedInput
  }

  export type TrainerTraineeRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrainerTraineeRequestCreateManyInput = {
    id?: string
    trainerId: string
    traineeId: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type TrainerTraineeRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrainerTraineeRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TraineeNullableScalarRelationFilter = {
    is?: TraineeWhereInput | null
    isNot?: TraineeWhereInput | null
  }

  export type TrainerNullableScalarRelationFilter = {
    is?: TrainerWhereInput | null
    isNot?: TrainerWhereInput | null
  }

  export type TrainerRequestListRelationFilter = {
    every?: TrainerRequestWhereInput
    some?: TrainerRequestWhereInput
    none?: TrainerRequestWhereInput
  }

  export type ResetPasswordTokenListRelationFilter = {
    every?: ResetPasswordTokenWhereInput
    some?: ResetPasswordTokenWhereInput
    none?: ResetPasswordTokenWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TrainerRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResetPasswordTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    avatar?: SortOrder
    avatarPublicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    avatar?: SortOrder
    avatarPublicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    avatar?: SortOrder
    avatarPublicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTraineeGoalFilter<$PrismaModel = never> = {
    equals?: $Enums.TraineeGoal | EnumTraineeGoalFieldRefInput<$PrismaModel>
    in?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    not?: NestedEnumTraineeGoalFilter<$PrismaModel> | $Enums.TraineeGoal
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TrainerTraineeNullableScalarRelationFilter = {
    is?: TrainerTraineeWhereInput | null
    isNot?: TrainerTraineeWhereInput | null
  }

  export type TrainerTraineeRequestListRelationFilter = {
    every?: TrainerTraineeRequestWhereInput
    some?: TrainerTraineeRequestWhereInput
    none?: TrainerTraineeRequestWhereInput
  }

  export type TrainerTraineeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TraineeCountOrderByAggregateInput = {
    userId?: SortOrder
    goal?: SortOrder
    heightCm?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type TraineeAvgOrderByAggregateInput = {
    heightCm?: SortOrder
  }

  export type TraineeMaxOrderByAggregateInput = {
    userId?: SortOrder
    goal?: SortOrder
    heightCm?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type TraineeMinOrderByAggregateInput = {
    userId?: SortOrder
    goal?: SortOrder
    heightCm?: SortOrder
    createdAt?: SortOrder
    isActive?: SortOrder
  }

  export type TraineeSumOrderByAggregateInput = {
    heightCm?: SortOrder
  }

  export type EnumTraineeGoalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TraineeGoal | EnumTraineeGoalFieldRefInput<$PrismaModel>
    in?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    not?: NestedEnumTraineeGoalWithAggregatesFilter<$PrismaModel> | $Enums.TraineeGoal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTraineeGoalFilter<$PrismaModel>
    _max?: NestedEnumTraineeGoalFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TrainerCertificationListRelationFilter = {
    every?: TrainerCertificationWhereInput
    some?: TrainerCertificationWhereInput
    none?: TrainerCertificationWhereInput
  }

  export type TrainerTransformationListRelationFilter = {
    every?: TrainerTransformationWhereInput
    some?: TrainerTransformationWhereInput
    none?: TrainerTransformationWhereInput
  }

  export type TrainerTraineeListRelationFilter = {
    every?: TrainerTraineeWhereInput
    some?: TrainerTraineeWhereInput
    none?: TrainerTraineeWhereInput
  }

  export type TrainerCertificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainerTransformationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainerTraineeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainerCountOrderByAggregateInput = {
    userId?: SortOrder
    bio?: SortOrder
    experienceYears?: SortOrder
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerAvgOrderByAggregateInput = {
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
  }

  export type TrainerMaxOrderByAggregateInput = {
    userId?: SortOrder
    bio?: SortOrder
    experienceYears?: SortOrder
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerMinOrderByAggregateInput = {
    userId?: SortOrder
    bio?: SortOrder
    experienceYears?: SortOrder
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerSumOrderByAggregateInput = {
    ratingAvg?: SortOrder
    ratingCount?: SortOrder
    rankScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TrainerRequestNullableScalarRelationFilter = {
    is?: TrainerRequestWhereInput | null
    isNot?: TrainerRequestWhereInput | null
  }

  export type TrainerCertificationTrainerIdNameImageUrlCompoundUniqueInput = {
    trainerId: string
    name: string
    imageUrl: string
  }

  export type TrainerCertificationCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    trainerRequestId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    issuedBy?: SortOrder
    issuedAt?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerCertificationMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    trainerRequestId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    issuedBy?: SortOrder
    issuedAt?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerCertificationMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    trainerRequestId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    issuedBy?: SortOrder
    issuedAt?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TrainerTransformationTrainerIdNameImageUrlCompoundUniqueInput = {
    trainerId: string
    name: string
    imageUrl: string
  }

  export type TrainerTransformationCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    trainerRequestId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainerTransformationMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    trainerRequestId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainerTransformationMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    trainerRequestId?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResetPasswordTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ResetPasswordTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ResetPasswordTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTrainerRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TrainerRequestStatus | EnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrainerRequestStatusFilter<$PrismaModel> | $Enums.TrainerRequestStatus
  }

  export type TrainerRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainerRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainerRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTrainerRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrainerRequestStatus | EnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrainerRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.TrainerRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrainerRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumTrainerRequestStatusFilter<$PrismaModel>
  }

  export type EnummembershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.membershipStatus | EnummembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnummembershipStatusFilter<$PrismaModel> | $Enums.membershipStatus
  }

  export type TraineeScalarRelationFilter = {
    is?: TraineeWhereInput
    isNot?: TraineeWhereInput
  }

  export type TrainerScalarRelationFilter = {
    is?: TrainerWhereInput
    isNot?: TrainerWhereInput
  }

  export type TrainerTraineeTrainerIdTraineeIdCompoundUniqueInput = {
    trainerId: string
    traineeId: string
  }

  export type TrainerTraineeCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    membershipStatus?: SortOrder
    sessionsCount?: SortOrder
    assignedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerTraineeAvgOrderByAggregateInput = {
    sessionsCount?: SortOrder
  }

  export type TrainerTraineeMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    membershipStatus?: SortOrder
    sessionsCount?: SortOrder
    assignedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerTraineeMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    membershipStatus?: SortOrder
    sessionsCount?: SortOrder
    assignedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TrainerTraineeSumOrderByAggregateInput = {
    sessionsCount?: SortOrder
  }

  export type EnummembershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.membershipStatus | EnummembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnummembershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.membershipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummembershipStatusFilter<$PrismaModel>
    _max?: NestedEnummembershipStatusFilter<$PrismaModel>
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type TrainerTraineeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    sessionsCount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrder
  }

  export type TrainerTraineeRequestAvgOrderByAggregateInput = {
    sessionsCount?: SortOrder
  }

  export type TrainerTraineeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    sessionsCount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrder
  }

  export type TrainerTraineeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    trainerId?: SortOrder
    traineeId?: SortOrder
    sessionsCount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrder
  }

  export type TrainerTraineeRequestSumOrderByAggregateInput = {
    sessionsCount?: SortOrder
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type TraineeCreateNestedOneWithoutUserInput = {
    create?: XOR<TraineeCreateWithoutUserInput, TraineeUncheckedCreateWithoutUserInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutUserInput
    connect?: TraineeWhereUniqueInput
  }

  export type TrainerCreateNestedOneWithoutUserInput = {
    create?: XOR<TrainerCreateWithoutUserInput, TrainerUncheckedCreateWithoutUserInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutUserInput
    connect?: TrainerWhereUniqueInput
  }

  export type TrainerRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainerRequestCreateWithoutUserInput, TrainerRequestUncheckedCreateWithoutUserInput> | TrainerRequestCreateWithoutUserInput[] | TrainerRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutUserInput | TrainerRequestCreateOrConnectWithoutUserInput[]
    createMany?: TrainerRequestCreateManyUserInputEnvelope
    connect?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
  }

  export type ResetPasswordTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetPasswordTokenCreateWithoutUserInput, ResetPasswordTokenUncheckedCreateWithoutUserInput> | ResetPasswordTokenCreateWithoutUserInput[] | ResetPasswordTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordTokenCreateOrConnectWithoutUserInput | ResetPasswordTokenCreateOrConnectWithoutUserInput[]
    createMany?: ResetPasswordTokenCreateManyUserInputEnvelope
    connect?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
  }

  export type TraineeUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TraineeCreateWithoutUserInput, TraineeUncheckedCreateWithoutUserInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutUserInput
    connect?: TraineeWhereUniqueInput
  }

  export type TrainerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TrainerCreateWithoutUserInput, TrainerUncheckedCreateWithoutUserInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutUserInput
    connect?: TrainerWhereUniqueInput
  }

  export type TrainerRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainerRequestCreateWithoutUserInput, TrainerRequestUncheckedCreateWithoutUserInput> | TrainerRequestCreateWithoutUserInput[] | TrainerRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutUserInput | TrainerRequestCreateOrConnectWithoutUserInput[]
    createMany?: TrainerRequestCreateManyUserInputEnvelope
    connect?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
  }

  export type ResetPasswordTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetPasswordTokenCreateWithoutUserInput, ResetPasswordTokenUncheckedCreateWithoutUserInput> | ResetPasswordTokenCreateWithoutUserInput[] | ResetPasswordTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordTokenCreateOrConnectWithoutUserInput | ResetPasswordTokenCreateOrConnectWithoutUserInput[]
    createMany?: ResetPasswordTokenCreateManyUserInputEnvelope
    connect?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TraineeUpdateOneWithoutUserNestedInput = {
    create?: XOR<TraineeCreateWithoutUserInput, TraineeUncheckedCreateWithoutUserInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutUserInput
    upsert?: TraineeUpsertWithoutUserInput
    disconnect?: TraineeWhereInput | boolean
    delete?: TraineeWhereInput | boolean
    connect?: TraineeWhereUniqueInput
    update?: XOR<XOR<TraineeUpdateToOneWithWhereWithoutUserInput, TraineeUpdateWithoutUserInput>, TraineeUncheckedUpdateWithoutUserInput>
  }

  export type TrainerUpdateOneWithoutUserNestedInput = {
    create?: XOR<TrainerCreateWithoutUserInput, TrainerUncheckedCreateWithoutUserInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutUserInput
    upsert?: TrainerUpsertWithoutUserInput
    disconnect?: TrainerWhereInput | boolean
    delete?: TrainerWhereInput | boolean
    connect?: TrainerWhereUniqueInput
    update?: XOR<XOR<TrainerUpdateToOneWithWhereWithoutUserInput, TrainerUpdateWithoutUserInput>, TrainerUncheckedUpdateWithoutUserInput>
  }

  export type TrainerRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainerRequestCreateWithoutUserInput, TrainerRequestUncheckedCreateWithoutUserInput> | TrainerRequestCreateWithoutUserInput[] | TrainerRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutUserInput | TrainerRequestCreateOrConnectWithoutUserInput[]
    upsert?: TrainerRequestUpsertWithWhereUniqueWithoutUserInput | TrainerRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainerRequestCreateManyUserInputEnvelope
    set?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    disconnect?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    delete?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    connect?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    update?: TrainerRequestUpdateWithWhereUniqueWithoutUserInput | TrainerRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainerRequestUpdateManyWithWhereWithoutUserInput | TrainerRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainerRequestScalarWhereInput | TrainerRequestScalarWhereInput[]
  }

  export type ResetPasswordTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetPasswordTokenCreateWithoutUserInput, ResetPasswordTokenUncheckedCreateWithoutUserInput> | ResetPasswordTokenCreateWithoutUserInput[] | ResetPasswordTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordTokenCreateOrConnectWithoutUserInput | ResetPasswordTokenCreateOrConnectWithoutUserInput[]
    upsert?: ResetPasswordTokenUpsertWithWhereUniqueWithoutUserInput | ResetPasswordTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetPasswordTokenCreateManyUserInputEnvelope
    set?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    disconnect?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    delete?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    connect?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    update?: ResetPasswordTokenUpdateWithWhereUniqueWithoutUserInput | ResetPasswordTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetPasswordTokenUpdateManyWithWhereWithoutUserInput | ResetPasswordTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetPasswordTokenScalarWhereInput | ResetPasswordTokenScalarWhereInput[]
  }

  export type TraineeUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TraineeCreateWithoutUserInput, TraineeUncheckedCreateWithoutUserInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutUserInput
    upsert?: TraineeUpsertWithoutUserInput
    disconnect?: TraineeWhereInput | boolean
    delete?: TraineeWhereInput | boolean
    connect?: TraineeWhereUniqueInput
    update?: XOR<XOR<TraineeUpdateToOneWithWhereWithoutUserInput, TraineeUpdateWithoutUserInput>, TraineeUncheckedUpdateWithoutUserInput>
  }

  export type TrainerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TrainerCreateWithoutUserInput, TrainerUncheckedCreateWithoutUserInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutUserInput
    upsert?: TrainerUpsertWithoutUserInput
    disconnect?: TrainerWhereInput | boolean
    delete?: TrainerWhereInput | boolean
    connect?: TrainerWhereUniqueInput
    update?: XOR<XOR<TrainerUpdateToOneWithWhereWithoutUserInput, TrainerUpdateWithoutUserInput>, TrainerUncheckedUpdateWithoutUserInput>
  }

  export type TrainerRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainerRequestCreateWithoutUserInput, TrainerRequestUncheckedCreateWithoutUserInput> | TrainerRequestCreateWithoutUserInput[] | TrainerRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutUserInput | TrainerRequestCreateOrConnectWithoutUserInput[]
    upsert?: TrainerRequestUpsertWithWhereUniqueWithoutUserInput | TrainerRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainerRequestCreateManyUserInputEnvelope
    set?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    disconnect?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    delete?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    connect?: TrainerRequestWhereUniqueInput | TrainerRequestWhereUniqueInput[]
    update?: TrainerRequestUpdateWithWhereUniqueWithoutUserInput | TrainerRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainerRequestUpdateManyWithWhereWithoutUserInput | TrainerRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainerRequestScalarWhereInput | TrainerRequestScalarWhereInput[]
  }

  export type ResetPasswordTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetPasswordTokenCreateWithoutUserInput, ResetPasswordTokenUncheckedCreateWithoutUserInput> | ResetPasswordTokenCreateWithoutUserInput[] | ResetPasswordTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordTokenCreateOrConnectWithoutUserInput | ResetPasswordTokenCreateOrConnectWithoutUserInput[]
    upsert?: ResetPasswordTokenUpsertWithWhereUniqueWithoutUserInput | ResetPasswordTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetPasswordTokenCreateManyUserInputEnvelope
    set?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    disconnect?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    delete?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    connect?: ResetPasswordTokenWhereUniqueInput | ResetPasswordTokenWhereUniqueInput[]
    update?: ResetPasswordTokenUpdateWithWhereUniqueWithoutUserInput | ResetPasswordTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetPasswordTokenUpdateManyWithWhereWithoutUserInput | ResetPasswordTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetPasswordTokenScalarWhereInput | ResetPasswordTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTraineeInput = {
    create?: XOR<UserCreateWithoutTraineeInput, UserUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: UserCreateOrConnectWithoutTraineeInput
    connect?: UserWhereUniqueInput
  }

  export type TrainerTraineeCreateNestedOneWithoutTraineeInput = {
    create?: XOR<TrainerTraineeCreateWithoutTraineeInput, TrainerTraineeUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTraineeInput
    connect?: TrainerTraineeWhereUniqueInput
  }

  export type TrainerTraineeRequestCreateNestedManyWithoutTraineeInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTraineeInput, TrainerTraineeRequestUncheckedCreateWithoutTraineeInput> | TrainerTraineeRequestCreateWithoutTraineeInput[] | TrainerTraineeRequestUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTraineeInput | TrainerTraineeRequestCreateOrConnectWithoutTraineeInput[]
    createMany?: TrainerTraineeRequestCreateManyTraineeInputEnvelope
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
  }

  export type TrainerTraineeUncheckedCreateNestedOneWithoutTraineeInput = {
    create?: XOR<TrainerTraineeCreateWithoutTraineeInput, TrainerTraineeUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTraineeInput
    connect?: TrainerTraineeWhereUniqueInput
  }

  export type TrainerTraineeRequestUncheckedCreateNestedManyWithoutTraineeInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTraineeInput, TrainerTraineeRequestUncheckedCreateWithoutTraineeInput> | TrainerTraineeRequestCreateWithoutTraineeInput[] | TrainerTraineeRequestUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTraineeInput | TrainerTraineeRequestCreateOrConnectWithoutTraineeInput[]
    createMany?: TrainerTraineeRequestCreateManyTraineeInputEnvelope
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
  }

  export type EnumTraineeGoalFieldUpdateOperationsInput = {
    set?: $Enums.TraineeGoal
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTraineeNestedInput = {
    create?: XOR<UserCreateWithoutTraineeInput, UserUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: UserCreateOrConnectWithoutTraineeInput
    upsert?: UserUpsertWithoutTraineeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTraineeInput, UserUpdateWithoutTraineeInput>, UserUncheckedUpdateWithoutTraineeInput>
  }

  export type TrainerTraineeUpdateOneWithoutTraineeNestedInput = {
    create?: XOR<TrainerTraineeCreateWithoutTraineeInput, TrainerTraineeUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTraineeInput
    upsert?: TrainerTraineeUpsertWithoutTraineeInput
    disconnect?: TrainerTraineeWhereInput | boolean
    delete?: TrainerTraineeWhereInput | boolean
    connect?: TrainerTraineeWhereUniqueInput
    update?: XOR<XOR<TrainerTraineeUpdateToOneWithWhereWithoutTraineeInput, TrainerTraineeUpdateWithoutTraineeInput>, TrainerTraineeUncheckedUpdateWithoutTraineeInput>
  }

  export type TrainerTraineeRequestUpdateManyWithoutTraineeNestedInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTraineeInput, TrainerTraineeRequestUncheckedCreateWithoutTraineeInput> | TrainerTraineeRequestCreateWithoutTraineeInput[] | TrainerTraineeRequestUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTraineeInput | TrainerTraineeRequestCreateOrConnectWithoutTraineeInput[]
    upsert?: TrainerTraineeRequestUpsertWithWhereUniqueWithoutTraineeInput | TrainerTraineeRequestUpsertWithWhereUniqueWithoutTraineeInput[]
    createMany?: TrainerTraineeRequestCreateManyTraineeInputEnvelope
    set?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    disconnect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    delete?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    update?: TrainerTraineeRequestUpdateWithWhereUniqueWithoutTraineeInput | TrainerTraineeRequestUpdateWithWhereUniqueWithoutTraineeInput[]
    updateMany?: TrainerTraineeRequestUpdateManyWithWhereWithoutTraineeInput | TrainerTraineeRequestUpdateManyWithWhereWithoutTraineeInput[]
    deleteMany?: TrainerTraineeRequestScalarWhereInput | TrainerTraineeRequestScalarWhereInput[]
  }

  export type TrainerTraineeUncheckedUpdateOneWithoutTraineeNestedInput = {
    create?: XOR<TrainerTraineeCreateWithoutTraineeInput, TrainerTraineeUncheckedCreateWithoutTraineeInput>
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTraineeInput
    upsert?: TrainerTraineeUpsertWithoutTraineeInput
    disconnect?: TrainerTraineeWhereInput | boolean
    delete?: TrainerTraineeWhereInput | boolean
    connect?: TrainerTraineeWhereUniqueInput
    update?: XOR<XOR<TrainerTraineeUpdateToOneWithWhereWithoutTraineeInput, TrainerTraineeUpdateWithoutTraineeInput>, TrainerTraineeUncheckedUpdateWithoutTraineeInput>
  }

  export type TrainerTraineeRequestUncheckedUpdateManyWithoutTraineeNestedInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTraineeInput, TrainerTraineeRequestUncheckedCreateWithoutTraineeInput> | TrainerTraineeRequestCreateWithoutTraineeInput[] | TrainerTraineeRequestUncheckedCreateWithoutTraineeInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTraineeInput | TrainerTraineeRequestCreateOrConnectWithoutTraineeInput[]
    upsert?: TrainerTraineeRequestUpsertWithWhereUniqueWithoutTraineeInput | TrainerTraineeRequestUpsertWithWhereUniqueWithoutTraineeInput[]
    createMany?: TrainerTraineeRequestCreateManyTraineeInputEnvelope
    set?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    disconnect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    delete?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    update?: TrainerTraineeRequestUpdateWithWhereUniqueWithoutTraineeInput | TrainerTraineeRequestUpdateWithWhereUniqueWithoutTraineeInput[]
    updateMany?: TrainerTraineeRequestUpdateManyWithWhereWithoutTraineeInput | TrainerTraineeRequestUpdateManyWithWhereWithoutTraineeInput[]
    deleteMany?: TrainerTraineeRequestScalarWhereInput | TrainerTraineeRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTrainerInput = {
    create?: XOR<UserCreateWithoutTrainerInput, UserUncheckedCreateWithoutTrainerInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainerInput
    connect?: UserWhereUniqueInput
  }

  export type TrainerCertificationCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerInput, TrainerCertificationUncheckedCreateWithoutTrainerInput> | TrainerCertificationCreateWithoutTrainerInput[] | TrainerCertificationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerInput | TrainerCertificationCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerCertificationCreateManyTrainerInputEnvelope
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
  }

  export type TrainerTransformationCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerInput, TrainerTransformationUncheckedCreateWithoutTrainerInput> | TrainerTransformationCreateWithoutTrainerInput[] | TrainerTransformationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerInput | TrainerTransformationCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerTransformationCreateManyTrainerInputEnvelope
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
  }

  export type TrainerTraineeRequestCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTrainerInput, TrainerTraineeRequestUncheckedCreateWithoutTrainerInput> | TrainerTraineeRequestCreateWithoutTrainerInput[] | TrainerTraineeRequestUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTrainerInput | TrainerTraineeRequestCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerTraineeRequestCreateManyTrainerInputEnvelope
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
  }

  export type TrainerTraineeCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerTraineeCreateWithoutTrainerInput, TrainerTraineeUncheckedCreateWithoutTrainerInput> | TrainerTraineeCreateWithoutTrainerInput[] | TrainerTraineeUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTrainerInput | TrainerTraineeCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerTraineeCreateManyTrainerInputEnvelope
    connect?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
  }

  export type TrainerCertificationUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerInput, TrainerCertificationUncheckedCreateWithoutTrainerInput> | TrainerCertificationCreateWithoutTrainerInput[] | TrainerCertificationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerInput | TrainerCertificationCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerCertificationCreateManyTrainerInputEnvelope
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
  }

  export type TrainerTransformationUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerInput, TrainerTransformationUncheckedCreateWithoutTrainerInput> | TrainerTransformationCreateWithoutTrainerInput[] | TrainerTransformationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerInput | TrainerTransformationCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerTransformationCreateManyTrainerInputEnvelope
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
  }

  export type TrainerTraineeRequestUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTrainerInput, TrainerTraineeRequestUncheckedCreateWithoutTrainerInput> | TrainerTraineeRequestCreateWithoutTrainerInput[] | TrainerTraineeRequestUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTrainerInput | TrainerTraineeRequestCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerTraineeRequestCreateManyTrainerInputEnvelope
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
  }

  export type TrainerTraineeUncheckedCreateNestedManyWithoutTrainerInput = {
    create?: XOR<TrainerTraineeCreateWithoutTrainerInput, TrainerTraineeUncheckedCreateWithoutTrainerInput> | TrainerTraineeCreateWithoutTrainerInput[] | TrainerTraineeUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTrainerInput | TrainerTraineeCreateOrConnectWithoutTrainerInput[]
    createMany?: TrainerTraineeCreateManyTrainerInputEnvelope
    connect?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTrainerNestedInput = {
    create?: XOR<UserCreateWithoutTrainerInput, UserUncheckedCreateWithoutTrainerInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainerInput
    upsert?: UserUpsertWithoutTrainerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainerInput, UserUpdateWithoutTrainerInput>, UserUncheckedUpdateWithoutTrainerInput>
  }

  export type TrainerCertificationUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerInput, TrainerCertificationUncheckedCreateWithoutTrainerInput> | TrainerCertificationCreateWithoutTrainerInput[] | TrainerCertificationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerInput | TrainerCertificationCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerCertificationUpsertWithWhereUniqueWithoutTrainerInput | TrainerCertificationUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerCertificationCreateManyTrainerInputEnvelope
    set?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    disconnect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    delete?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    update?: TrainerCertificationUpdateWithWhereUniqueWithoutTrainerInput | TrainerCertificationUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerCertificationUpdateManyWithWhereWithoutTrainerInput | TrainerCertificationUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerCertificationScalarWhereInput | TrainerCertificationScalarWhereInput[]
  }

  export type TrainerTransformationUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerInput, TrainerTransformationUncheckedCreateWithoutTrainerInput> | TrainerTransformationCreateWithoutTrainerInput[] | TrainerTransformationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerInput | TrainerTransformationCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerTransformationUpsertWithWhereUniqueWithoutTrainerInput | TrainerTransformationUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerTransformationCreateManyTrainerInputEnvelope
    set?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    disconnect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    delete?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    update?: TrainerTransformationUpdateWithWhereUniqueWithoutTrainerInput | TrainerTransformationUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerTransformationUpdateManyWithWhereWithoutTrainerInput | TrainerTransformationUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerTransformationScalarWhereInput | TrainerTransformationScalarWhereInput[]
  }

  export type TrainerTraineeRequestUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTrainerInput, TrainerTraineeRequestUncheckedCreateWithoutTrainerInput> | TrainerTraineeRequestCreateWithoutTrainerInput[] | TrainerTraineeRequestUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTrainerInput | TrainerTraineeRequestCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerTraineeRequestUpsertWithWhereUniqueWithoutTrainerInput | TrainerTraineeRequestUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerTraineeRequestCreateManyTrainerInputEnvelope
    set?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    disconnect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    delete?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    update?: TrainerTraineeRequestUpdateWithWhereUniqueWithoutTrainerInput | TrainerTraineeRequestUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerTraineeRequestUpdateManyWithWhereWithoutTrainerInput | TrainerTraineeRequestUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerTraineeRequestScalarWhereInput | TrainerTraineeRequestScalarWhereInput[]
  }

  export type TrainerTraineeUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerTraineeCreateWithoutTrainerInput, TrainerTraineeUncheckedCreateWithoutTrainerInput> | TrainerTraineeCreateWithoutTrainerInput[] | TrainerTraineeUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTrainerInput | TrainerTraineeCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerTraineeUpsertWithWhereUniqueWithoutTrainerInput | TrainerTraineeUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerTraineeCreateManyTrainerInputEnvelope
    set?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    disconnect?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    delete?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    connect?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    update?: TrainerTraineeUpdateWithWhereUniqueWithoutTrainerInput | TrainerTraineeUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerTraineeUpdateManyWithWhereWithoutTrainerInput | TrainerTraineeUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerTraineeScalarWhereInput | TrainerTraineeScalarWhereInput[]
  }

  export type TrainerCertificationUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerInput, TrainerCertificationUncheckedCreateWithoutTrainerInput> | TrainerCertificationCreateWithoutTrainerInput[] | TrainerCertificationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerInput | TrainerCertificationCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerCertificationUpsertWithWhereUniqueWithoutTrainerInput | TrainerCertificationUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerCertificationCreateManyTrainerInputEnvelope
    set?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    disconnect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    delete?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    update?: TrainerCertificationUpdateWithWhereUniqueWithoutTrainerInput | TrainerCertificationUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerCertificationUpdateManyWithWhereWithoutTrainerInput | TrainerCertificationUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerCertificationScalarWhereInput | TrainerCertificationScalarWhereInput[]
  }

  export type TrainerTransformationUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerInput, TrainerTransformationUncheckedCreateWithoutTrainerInput> | TrainerTransformationCreateWithoutTrainerInput[] | TrainerTransformationUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerInput | TrainerTransformationCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerTransformationUpsertWithWhereUniqueWithoutTrainerInput | TrainerTransformationUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerTransformationCreateManyTrainerInputEnvelope
    set?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    disconnect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    delete?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    update?: TrainerTransformationUpdateWithWhereUniqueWithoutTrainerInput | TrainerTransformationUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerTransformationUpdateManyWithWhereWithoutTrainerInput | TrainerTransformationUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerTransformationScalarWhereInput | TrainerTransformationScalarWhereInput[]
  }

  export type TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerTraineeRequestCreateWithoutTrainerInput, TrainerTraineeRequestUncheckedCreateWithoutTrainerInput> | TrainerTraineeRequestCreateWithoutTrainerInput[] | TrainerTraineeRequestUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeRequestCreateOrConnectWithoutTrainerInput | TrainerTraineeRequestCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerTraineeRequestUpsertWithWhereUniqueWithoutTrainerInput | TrainerTraineeRequestUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerTraineeRequestCreateManyTrainerInputEnvelope
    set?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    disconnect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    delete?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    connect?: TrainerTraineeRequestWhereUniqueInput | TrainerTraineeRequestWhereUniqueInput[]
    update?: TrainerTraineeRequestUpdateWithWhereUniqueWithoutTrainerInput | TrainerTraineeRequestUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerTraineeRequestUpdateManyWithWhereWithoutTrainerInput | TrainerTraineeRequestUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerTraineeRequestScalarWhereInput | TrainerTraineeRequestScalarWhereInput[]
  }

  export type TrainerTraineeUncheckedUpdateManyWithoutTrainerNestedInput = {
    create?: XOR<TrainerTraineeCreateWithoutTrainerInput, TrainerTraineeUncheckedCreateWithoutTrainerInput> | TrainerTraineeCreateWithoutTrainerInput[] | TrainerTraineeUncheckedCreateWithoutTrainerInput[]
    connectOrCreate?: TrainerTraineeCreateOrConnectWithoutTrainerInput | TrainerTraineeCreateOrConnectWithoutTrainerInput[]
    upsert?: TrainerTraineeUpsertWithWhereUniqueWithoutTrainerInput | TrainerTraineeUpsertWithWhereUniqueWithoutTrainerInput[]
    createMany?: TrainerTraineeCreateManyTrainerInputEnvelope
    set?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    disconnect?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    delete?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    connect?: TrainerTraineeWhereUniqueInput | TrainerTraineeWhereUniqueInput[]
    update?: TrainerTraineeUpdateWithWhereUniqueWithoutTrainerInput | TrainerTraineeUpdateWithWhereUniqueWithoutTrainerInput[]
    updateMany?: TrainerTraineeUpdateManyWithWhereWithoutTrainerInput | TrainerTraineeUpdateManyWithWhereWithoutTrainerInput[]
    deleteMany?: TrainerTraineeScalarWhereInput | TrainerTraineeScalarWhereInput[]
  }

  export type TrainerCreateNestedOneWithoutCertificationsInput = {
    create?: XOR<TrainerCreateWithoutCertificationsInput, TrainerUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutCertificationsInput
    connect?: TrainerWhereUniqueInput
  }

  export type TrainerRequestCreateNestedOneWithoutCertificationsInput = {
    create?: XOR<TrainerRequestCreateWithoutCertificationsInput, TrainerRequestUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutCertificationsInput
    connect?: TrainerRequestWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TrainerUpdateOneWithoutCertificationsNestedInput = {
    create?: XOR<TrainerCreateWithoutCertificationsInput, TrainerUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutCertificationsInput
    upsert?: TrainerUpsertWithoutCertificationsInput
    disconnect?: TrainerWhereInput | boolean
    delete?: TrainerWhereInput | boolean
    connect?: TrainerWhereUniqueInput
    update?: XOR<XOR<TrainerUpdateToOneWithWhereWithoutCertificationsInput, TrainerUpdateWithoutCertificationsInput>, TrainerUncheckedUpdateWithoutCertificationsInput>
  }

  export type TrainerRequestUpdateOneWithoutCertificationsNestedInput = {
    create?: XOR<TrainerRequestCreateWithoutCertificationsInput, TrainerRequestUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutCertificationsInput
    upsert?: TrainerRequestUpsertWithoutCertificationsInput
    disconnect?: TrainerRequestWhereInput | boolean
    delete?: TrainerRequestWhereInput | boolean
    connect?: TrainerRequestWhereUniqueInput
    update?: XOR<XOR<TrainerRequestUpdateToOneWithWhereWithoutCertificationsInput, TrainerRequestUpdateWithoutCertificationsInput>, TrainerRequestUncheckedUpdateWithoutCertificationsInput>
  }

  export type TrainerCreateNestedOneWithoutTransformationsInput = {
    create?: XOR<TrainerCreateWithoutTransformationsInput, TrainerUncheckedCreateWithoutTransformationsInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutTransformationsInput
    connect?: TrainerWhereUniqueInput
  }

  export type TrainerRequestCreateNestedOneWithoutTransformationsInput = {
    create?: XOR<TrainerRequestCreateWithoutTransformationsInput, TrainerRequestUncheckedCreateWithoutTransformationsInput>
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutTransformationsInput
    connect?: TrainerRequestWhereUniqueInput
  }

  export type TrainerUpdateOneWithoutTransformationsNestedInput = {
    create?: XOR<TrainerCreateWithoutTransformationsInput, TrainerUncheckedCreateWithoutTransformationsInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutTransformationsInput
    upsert?: TrainerUpsertWithoutTransformationsInput
    disconnect?: TrainerWhereInput | boolean
    delete?: TrainerWhereInput | boolean
    connect?: TrainerWhereUniqueInput
    update?: XOR<XOR<TrainerUpdateToOneWithWhereWithoutTransformationsInput, TrainerUpdateWithoutTransformationsInput>, TrainerUncheckedUpdateWithoutTransformationsInput>
  }

  export type TrainerRequestUpdateOneWithoutTransformationsNestedInput = {
    create?: XOR<TrainerRequestCreateWithoutTransformationsInput, TrainerRequestUncheckedCreateWithoutTransformationsInput>
    connectOrCreate?: TrainerRequestCreateOrConnectWithoutTransformationsInput
    upsert?: TrainerRequestUpsertWithoutTransformationsInput
    disconnect?: TrainerRequestWhereInput | boolean
    delete?: TrainerRequestWhereInput | boolean
    connect?: TrainerRequestWhereUniqueInput
    update?: XOR<XOR<TrainerRequestUpdateToOneWithWhereWithoutTransformationsInput, TrainerRequestUpdateWithoutTransformationsInput>, TrainerRequestUncheckedUpdateWithoutTransformationsInput>
  }

  export type UserCreateNestedOneWithoutResetPasswordTokensInput = {
    create?: XOR<UserCreateWithoutResetPasswordTokensInput, UserUncheckedCreateWithoutResetPasswordTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetPasswordTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResetPasswordTokensNestedInput = {
    create?: XOR<UserCreateWithoutResetPasswordTokensInput, UserUncheckedCreateWithoutResetPasswordTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetPasswordTokensInput
    upsert?: UserUpsertWithoutResetPasswordTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResetPasswordTokensInput, UserUpdateWithoutResetPasswordTokensInput>, UserUncheckedUpdateWithoutResetPasswordTokensInput>
  }

  export type UserCreateNestedOneWithoutTrainerRequestsInput = {
    create?: XOR<UserCreateWithoutTrainerRequestsInput, UserUncheckedCreateWithoutTrainerRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainerRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type TrainerCertificationCreateNestedManyWithoutTrainerRequestInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerRequestInput, TrainerCertificationUncheckedCreateWithoutTrainerRequestInput> | TrainerCertificationCreateWithoutTrainerRequestInput[] | TrainerCertificationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerRequestInput | TrainerCertificationCreateOrConnectWithoutTrainerRequestInput[]
    createMany?: TrainerCertificationCreateManyTrainerRequestInputEnvelope
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
  }

  export type TrainerTransformationCreateNestedManyWithoutTrainerRequestInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerRequestInput, TrainerTransformationUncheckedCreateWithoutTrainerRequestInput> | TrainerTransformationCreateWithoutTrainerRequestInput[] | TrainerTransformationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerRequestInput | TrainerTransformationCreateOrConnectWithoutTrainerRequestInput[]
    createMany?: TrainerTransformationCreateManyTrainerRequestInputEnvelope
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
  }

  export type TrainerCertificationUncheckedCreateNestedManyWithoutTrainerRequestInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerRequestInput, TrainerCertificationUncheckedCreateWithoutTrainerRequestInput> | TrainerCertificationCreateWithoutTrainerRequestInput[] | TrainerCertificationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerRequestInput | TrainerCertificationCreateOrConnectWithoutTrainerRequestInput[]
    createMany?: TrainerCertificationCreateManyTrainerRequestInputEnvelope
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
  }

  export type TrainerTransformationUncheckedCreateNestedManyWithoutTrainerRequestInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerRequestInput, TrainerTransformationUncheckedCreateWithoutTrainerRequestInput> | TrainerTransformationCreateWithoutTrainerRequestInput[] | TrainerTransformationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerRequestInput | TrainerTransformationCreateOrConnectWithoutTrainerRequestInput[]
    createMany?: TrainerTransformationCreateManyTrainerRequestInputEnvelope
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
  }

  export type EnumTrainerRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.TrainerRequestStatus
  }

  export type UserUpdateOneRequiredWithoutTrainerRequestsNestedInput = {
    create?: XOR<UserCreateWithoutTrainerRequestsInput, UserUncheckedCreateWithoutTrainerRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainerRequestsInput
    upsert?: UserUpsertWithoutTrainerRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainerRequestsInput, UserUpdateWithoutTrainerRequestsInput>, UserUncheckedUpdateWithoutTrainerRequestsInput>
  }

  export type TrainerCertificationUpdateManyWithoutTrainerRequestNestedInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerRequestInput, TrainerCertificationUncheckedCreateWithoutTrainerRequestInput> | TrainerCertificationCreateWithoutTrainerRequestInput[] | TrainerCertificationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerRequestInput | TrainerCertificationCreateOrConnectWithoutTrainerRequestInput[]
    upsert?: TrainerCertificationUpsertWithWhereUniqueWithoutTrainerRequestInput | TrainerCertificationUpsertWithWhereUniqueWithoutTrainerRequestInput[]
    createMany?: TrainerCertificationCreateManyTrainerRequestInputEnvelope
    set?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    disconnect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    delete?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    update?: TrainerCertificationUpdateWithWhereUniqueWithoutTrainerRequestInput | TrainerCertificationUpdateWithWhereUniqueWithoutTrainerRequestInput[]
    updateMany?: TrainerCertificationUpdateManyWithWhereWithoutTrainerRequestInput | TrainerCertificationUpdateManyWithWhereWithoutTrainerRequestInput[]
    deleteMany?: TrainerCertificationScalarWhereInput | TrainerCertificationScalarWhereInput[]
  }

  export type TrainerTransformationUpdateManyWithoutTrainerRequestNestedInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerRequestInput, TrainerTransformationUncheckedCreateWithoutTrainerRequestInput> | TrainerTransformationCreateWithoutTrainerRequestInput[] | TrainerTransformationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerRequestInput | TrainerTransformationCreateOrConnectWithoutTrainerRequestInput[]
    upsert?: TrainerTransformationUpsertWithWhereUniqueWithoutTrainerRequestInput | TrainerTransformationUpsertWithWhereUniqueWithoutTrainerRequestInput[]
    createMany?: TrainerTransformationCreateManyTrainerRequestInputEnvelope
    set?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    disconnect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    delete?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    update?: TrainerTransformationUpdateWithWhereUniqueWithoutTrainerRequestInput | TrainerTransformationUpdateWithWhereUniqueWithoutTrainerRequestInput[]
    updateMany?: TrainerTransformationUpdateManyWithWhereWithoutTrainerRequestInput | TrainerTransformationUpdateManyWithWhereWithoutTrainerRequestInput[]
    deleteMany?: TrainerTransformationScalarWhereInput | TrainerTransformationScalarWhereInput[]
  }

  export type TrainerCertificationUncheckedUpdateManyWithoutTrainerRequestNestedInput = {
    create?: XOR<TrainerCertificationCreateWithoutTrainerRequestInput, TrainerCertificationUncheckedCreateWithoutTrainerRequestInput> | TrainerCertificationCreateWithoutTrainerRequestInput[] | TrainerCertificationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerCertificationCreateOrConnectWithoutTrainerRequestInput | TrainerCertificationCreateOrConnectWithoutTrainerRequestInput[]
    upsert?: TrainerCertificationUpsertWithWhereUniqueWithoutTrainerRequestInput | TrainerCertificationUpsertWithWhereUniqueWithoutTrainerRequestInput[]
    createMany?: TrainerCertificationCreateManyTrainerRequestInputEnvelope
    set?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    disconnect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    delete?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    connect?: TrainerCertificationWhereUniqueInput | TrainerCertificationWhereUniqueInput[]
    update?: TrainerCertificationUpdateWithWhereUniqueWithoutTrainerRequestInput | TrainerCertificationUpdateWithWhereUniqueWithoutTrainerRequestInput[]
    updateMany?: TrainerCertificationUpdateManyWithWhereWithoutTrainerRequestInput | TrainerCertificationUpdateManyWithWhereWithoutTrainerRequestInput[]
    deleteMany?: TrainerCertificationScalarWhereInput | TrainerCertificationScalarWhereInput[]
  }

  export type TrainerTransformationUncheckedUpdateManyWithoutTrainerRequestNestedInput = {
    create?: XOR<TrainerTransformationCreateWithoutTrainerRequestInput, TrainerTransformationUncheckedCreateWithoutTrainerRequestInput> | TrainerTransformationCreateWithoutTrainerRequestInput[] | TrainerTransformationUncheckedCreateWithoutTrainerRequestInput[]
    connectOrCreate?: TrainerTransformationCreateOrConnectWithoutTrainerRequestInput | TrainerTransformationCreateOrConnectWithoutTrainerRequestInput[]
    upsert?: TrainerTransformationUpsertWithWhereUniqueWithoutTrainerRequestInput | TrainerTransformationUpsertWithWhereUniqueWithoutTrainerRequestInput[]
    createMany?: TrainerTransformationCreateManyTrainerRequestInputEnvelope
    set?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    disconnect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    delete?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    connect?: TrainerTransformationWhereUniqueInput | TrainerTransformationWhereUniqueInput[]
    update?: TrainerTransformationUpdateWithWhereUniqueWithoutTrainerRequestInput | TrainerTransformationUpdateWithWhereUniqueWithoutTrainerRequestInput[]
    updateMany?: TrainerTransformationUpdateManyWithWhereWithoutTrainerRequestInput | TrainerTransformationUpdateManyWithWhereWithoutTrainerRequestInput[]
    deleteMany?: TrainerTransformationScalarWhereInput | TrainerTransformationScalarWhereInput[]
  }

  export type TraineeCreateNestedOneWithoutTrainerTraineeInput = {
    create?: XOR<TraineeCreateWithoutTrainerTraineeInput, TraineeUncheckedCreateWithoutTrainerTraineeInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutTrainerTraineeInput
    connect?: TraineeWhereUniqueInput
  }

  export type TrainerCreateNestedOneWithoutTrainerTraineesInput = {
    create?: XOR<TrainerCreateWithoutTrainerTraineesInput, TrainerUncheckedCreateWithoutTrainerTraineesInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutTrainerTraineesInput
    connect?: TrainerWhereUniqueInput
  }

  export type EnummembershipStatusFieldUpdateOperationsInput = {
    set?: $Enums.membershipStatus
  }

  export type TraineeUpdateOneRequiredWithoutTrainerTraineeNestedInput = {
    create?: XOR<TraineeCreateWithoutTrainerTraineeInput, TraineeUncheckedCreateWithoutTrainerTraineeInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutTrainerTraineeInput
    upsert?: TraineeUpsertWithoutTrainerTraineeInput
    connect?: TraineeWhereUniqueInput
    update?: XOR<XOR<TraineeUpdateToOneWithWhereWithoutTrainerTraineeInput, TraineeUpdateWithoutTrainerTraineeInput>, TraineeUncheckedUpdateWithoutTrainerTraineeInput>
  }

  export type TrainerUpdateOneRequiredWithoutTrainerTraineesNestedInput = {
    create?: XOR<TrainerCreateWithoutTrainerTraineesInput, TrainerUncheckedCreateWithoutTrainerTraineesInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutTrainerTraineesInput
    upsert?: TrainerUpsertWithoutTrainerTraineesInput
    connect?: TrainerWhereUniqueInput
    update?: XOR<XOR<TrainerUpdateToOneWithWhereWithoutTrainerTraineesInput, TrainerUpdateWithoutTrainerTraineesInput>, TrainerUncheckedUpdateWithoutTrainerTraineesInput>
  }

  export type TrainerCreateNestedOneWithoutTraineeRequestsInput = {
    create?: XOR<TrainerCreateWithoutTraineeRequestsInput, TrainerUncheckedCreateWithoutTraineeRequestsInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutTraineeRequestsInput
    connect?: TrainerWhereUniqueInput
  }

  export type TraineeCreateNestedOneWithoutTrainerTraineeRequestsInput = {
    create?: XOR<TraineeCreateWithoutTrainerTraineeRequestsInput, TraineeUncheckedCreateWithoutTrainerTraineeRequestsInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutTrainerTraineeRequestsInput
    connect?: TraineeWhereUniqueInput
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type TrainerUpdateOneRequiredWithoutTraineeRequestsNestedInput = {
    create?: XOR<TrainerCreateWithoutTraineeRequestsInput, TrainerUncheckedCreateWithoutTraineeRequestsInput>
    connectOrCreate?: TrainerCreateOrConnectWithoutTraineeRequestsInput
    upsert?: TrainerUpsertWithoutTraineeRequestsInput
    connect?: TrainerWhereUniqueInput
    update?: XOR<XOR<TrainerUpdateToOneWithWhereWithoutTraineeRequestsInput, TrainerUpdateWithoutTraineeRequestsInput>, TrainerUncheckedUpdateWithoutTraineeRequestsInput>
  }

  export type TraineeUpdateOneRequiredWithoutTrainerTraineeRequestsNestedInput = {
    create?: XOR<TraineeCreateWithoutTrainerTraineeRequestsInput, TraineeUncheckedCreateWithoutTrainerTraineeRequestsInput>
    connectOrCreate?: TraineeCreateOrConnectWithoutTrainerTraineeRequestsInput
    upsert?: TraineeUpsertWithoutTrainerTraineeRequestsInput
    connect?: TraineeWhereUniqueInput
    update?: XOR<XOR<TraineeUpdateToOneWithWhereWithoutTrainerTraineeRequestsInput, TraineeUpdateWithoutTrainerTraineeRequestsInput>, TraineeUncheckedUpdateWithoutTrainerTraineeRequestsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTraineeGoalFilter<$PrismaModel = never> = {
    equals?: $Enums.TraineeGoal | EnumTraineeGoalFieldRefInput<$PrismaModel>
    in?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    not?: NestedEnumTraineeGoalFilter<$PrismaModel> | $Enums.TraineeGoal
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumTraineeGoalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TraineeGoal | EnumTraineeGoalFieldRefInput<$PrismaModel>
    in?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    notIn?: $Enums.TraineeGoal[] | ListEnumTraineeGoalFieldRefInput<$PrismaModel>
    not?: NestedEnumTraineeGoalWithAggregatesFilter<$PrismaModel> | $Enums.TraineeGoal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTraineeGoalFilter<$PrismaModel>
    _max?: NestedEnumTraineeGoalFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTrainerRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TrainerRequestStatus | EnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrainerRequestStatusFilter<$PrismaModel> | $Enums.TrainerRequestStatus
  }

  export type NestedEnumTrainerRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrainerRequestStatus | EnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TrainerRequestStatus[] | ListEnumTrainerRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTrainerRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.TrainerRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTrainerRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumTrainerRequestStatusFilter<$PrismaModel>
  }

  export type NestedEnummembershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.membershipStatus | EnummembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnummembershipStatusFilter<$PrismaModel> | $Enums.membershipStatus
  }

  export type NestedEnummembershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.membershipStatus | EnummembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.membershipStatus[] | ListEnummembershipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnummembershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.membershipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummembershipStatusFilter<$PrismaModel>
    _max?: NestedEnummembershipStatusFilter<$PrismaModel>
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type TraineeCreateWithoutUserInput = {
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    trainerTrainee?: TrainerTraineeCreateNestedOneWithoutTraineeInput
    trainerTraineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTraineeInput
  }

  export type TraineeUncheckedCreateWithoutUserInput = {
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    trainerTrainee?: TrainerTraineeUncheckedCreateNestedOneWithoutTraineeInput
    trainerTraineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTraineeInput
  }

  export type TraineeCreateOrConnectWithoutUserInput = {
    where: TraineeWhereUniqueInput
    create: XOR<TraineeCreateWithoutUserInput, TraineeUncheckedCreateWithoutUserInput>
  }

  export type TrainerCreateWithoutUserInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUncheckedCreateWithoutUserInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type TrainerCreateOrConnectWithoutUserInput = {
    where: TrainerWhereUniqueInput
    create: XOR<TrainerCreateWithoutUserInput, TrainerUncheckedCreateWithoutUserInput>
  }

  export type TrainerRequestCreateWithoutUserInput = {
    id?: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerRequestInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestUncheckedCreateWithoutUserInput = {
    id?: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerRequestInput
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestCreateOrConnectWithoutUserInput = {
    where: TrainerRequestWhereUniqueInput
    create: XOR<TrainerRequestCreateWithoutUserInput, TrainerRequestUncheckedCreateWithoutUserInput>
  }

  export type TrainerRequestCreateManyUserInputEnvelope = {
    data: TrainerRequestCreateManyUserInput | TrainerRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResetPasswordTokenCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResetPasswordTokenUncheckedCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResetPasswordTokenCreateOrConnectWithoutUserInput = {
    where: ResetPasswordTokenWhereUniqueInput
    create: XOR<ResetPasswordTokenCreateWithoutUserInput, ResetPasswordTokenUncheckedCreateWithoutUserInput>
  }

  export type ResetPasswordTokenCreateManyUserInputEnvelope = {
    data: ResetPasswordTokenCreateManyUserInput | ResetPasswordTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TraineeUpsertWithoutUserInput = {
    update: XOR<TraineeUpdateWithoutUserInput, TraineeUncheckedUpdateWithoutUserInput>
    create: XOR<TraineeCreateWithoutUserInput, TraineeUncheckedCreateWithoutUserInput>
    where?: TraineeWhereInput
  }

  export type TraineeUpdateToOneWithWhereWithoutUserInput = {
    where?: TraineeWhereInput
    data: XOR<TraineeUpdateWithoutUserInput, TraineeUncheckedUpdateWithoutUserInput>
  }

  export type TraineeUpdateWithoutUserInput = {
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    trainerTrainee?: TrainerTraineeUpdateOneWithoutTraineeNestedInput
    trainerTraineeRequests?: TrainerTraineeRequestUpdateManyWithoutTraineeNestedInput
  }

  export type TraineeUncheckedUpdateWithoutUserInput = {
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    trainerTrainee?: TrainerTraineeUncheckedUpdateOneWithoutTraineeNestedInput
    trainerTraineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTraineeNestedInput
  }

  export type TrainerUpsertWithoutUserInput = {
    update: XOR<TrainerUpdateWithoutUserInput, TrainerUncheckedUpdateWithoutUserInput>
    create: XOR<TrainerCreateWithoutUserInput, TrainerUncheckedCreateWithoutUserInput>
    where?: TrainerWhereInput
  }

  export type TrainerUpdateToOneWithWhereWithoutUserInput = {
    where?: TrainerWhereInput
    data: XOR<TrainerUpdateWithoutUserInput, TrainerUncheckedUpdateWithoutUserInput>
  }

  export type TrainerUpdateWithoutUserInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerUncheckedUpdateWithoutUserInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: TrainerRequestWhereUniqueInput
    update: XOR<TrainerRequestUpdateWithoutUserInput, TrainerRequestUncheckedUpdateWithoutUserInput>
    create: XOR<TrainerRequestCreateWithoutUserInput, TrainerRequestUncheckedCreateWithoutUserInput>
  }

  export type TrainerRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: TrainerRequestWhereUniqueInput
    data: XOR<TrainerRequestUpdateWithoutUserInput, TrainerRequestUncheckedUpdateWithoutUserInput>
  }

  export type TrainerRequestUpdateManyWithWhereWithoutUserInput = {
    where: TrainerRequestScalarWhereInput
    data: XOR<TrainerRequestUpdateManyMutationInput, TrainerRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type TrainerRequestScalarWhereInput = {
    AND?: TrainerRequestScalarWhereInput | TrainerRequestScalarWhereInput[]
    OR?: TrainerRequestScalarWhereInput[]
    NOT?: TrainerRequestScalarWhereInput | TrainerRequestScalarWhereInput[]
    id?: StringFilter<"TrainerRequest"> | string
    userId?: StringFilter<"TrainerRequest"> | string
    status?: EnumTrainerRequestStatusFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus
    adminNote?: StringNullableFilter<"TrainerRequest"> | string | null
    createdAt?: DateTimeFilter<"TrainerRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TrainerRequest"> | Date | string
  }

  export type ResetPasswordTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: ResetPasswordTokenWhereUniqueInput
    update: XOR<ResetPasswordTokenUpdateWithoutUserInput, ResetPasswordTokenUncheckedUpdateWithoutUserInput>
    create: XOR<ResetPasswordTokenCreateWithoutUserInput, ResetPasswordTokenUncheckedCreateWithoutUserInput>
  }

  export type ResetPasswordTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: ResetPasswordTokenWhereUniqueInput
    data: XOR<ResetPasswordTokenUpdateWithoutUserInput, ResetPasswordTokenUncheckedUpdateWithoutUserInput>
  }

  export type ResetPasswordTokenUpdateManyWithWhereWithoutUserInput = {
    where: ResetPasswordTokenScalarWhereInput
    data: XOR<ResetPasswordTokenUpdateManyMutationInput, ResetPasswordTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type ResetPasswordTokenScalarWhereInput = {
    AND?: ResetPasswordTokenScalarWhereInput | ResetPasswordTokenScalarWhereInput[]
    OR?: ResetPasswordTokenScalarWhereInput[]
    NOT?: ResetPasswordTokenScalarWhereInput | ResetPasswordTokenScalarWhereInput[]
    id?: StringFilter<"ResetPasswordToken"> | string
    userId?: StringFilter<"ResetPasswordToken"> | string
    tokenHash?: StringFilter<"ResetPasswordToken"> | string
    expiresAt?: DateTimeFilter<"ResetPasswordToken"> | Date | string
    usedAt?: DateTimeNullableFilter<"ResetPasswordToken"> | Date | string | null
    createdAt?: DateTimeFilter<"ResetPasswordToken"> | Date | string
  }

  export type UserCreateWithoutTraineeInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer?: TrainerCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestCreateNestedManyWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTraineeInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer?: TrainerUncheckedCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestUncheckedCreateNestedManyWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTraineeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTraineeInput, UserUncheckedCreateWithoutTraineeInput>
  }

  export type TrainerTraineeCreateWithoutTraineeInput = {
    id?: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
    trainer: TrainerCreateNestedOneWithoutTrainerTraineesInput
  }

  export type TrainerTraineeUncheckedCreateWithoutTraineeInput = {
    id?: string
    trainerId: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TrainerTraineeCreateOrConnectWithoutTraineeInput = {
    where: TrainerTraineeWhereUniqueInput
    create: XOR<TrainerTraineeCreateWithoutTraineeInput, TrainerTraineeUncheckedCreateWithoutTraineeInput>
  }

  export type TrainerTraineeRequestCreateWithoutTraineeInput = {
    id?: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    trainer: TrainerCreateNestedOneWithoutTraineeRequestsInput
  }

  export type TrainerTraineeRequestUncheckedCreateWithoutTraineeInput = {
    id?: string
    trainerId: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type TrainerTraineeRequestCreateOrConnectWithoutTraineeInput = {
    where: TrainerTraineeRequestWhereUniqueInput
    create: XOR<TrainerTraineeRequestCreateWithoutTraineeInput, TrainerTraineeRequestUncheckedCreateWithoutTraineeInput>
  }

  export type TrainerTraineeRequestCreateManyTraineeInputEnvelope = {
    data: TrainerTraineeRequestCreateManyTraineeInput | TrainerTraineeRequestCreateManyTraineeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTraineeInput = {
    update: XOR<UserUpdateWithoutTraineeInput, UserUncheckedUpdateWithoutTraineeInput>
    create: XOR<UserCreateWithoutTraineeInput, UserUncheckedCreateWithoutTraineeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTraineeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTraineeInput, UserUncheckedUpdateWithoutTraineeInput>
  }

  export type UserUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUpdateManyWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUncheckedUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUncheckedUpdateManyWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainerTraineeUpsertWithoutTraineeInput = {
    update: XOR<TrainerTraineeUpdateWithoutTraineeInput, TrainerTraineeUncheckedUpdateWithoutTraineeInput>
    create: XOR<TrainerTraineeCreateWithoutTraineeInput, TrainerTraineeUncheckedCreateWithoutTraineeInput>
    where?: TrainerTraineeWhereInput
  }

  export type TrainerTraineeUpdateToOneWithWhereWithoutTraineeInput = {
    where?: TrainerTraineeWhereInput
    data: XOR<TrainerTraineeUpdateWithoutTraineeInput, TrainerTraineeUncheckedUpdateWithoutTraineeInput>
  }

  export type TrainerTraineeUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUpdateOneRequiredWithoutTrainerTraineesNestedInput
  }

  export type TrainerTraineeUncheckedUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeRequestUpsertWithWhereUniqueWithoutTraineeInput = {
    where: TrainerTraineeRequestWhereUniqueInput
    update: XOR<TrainerTraineeRequestUpdateWithoutTraineeInput, TrainerTraineeRequestUncheckedUpdateWithoutTraineeInput>
    create: XOR<TrainerTraineeRequestCreateWithoutTraineeInput, TrainerTraineeRequestUncheckedCreateWithoutTraineeInput>
  }

  export type TrainerTraineeRequestUpdateWithWhereUniqueWithoutTraineeInput = {
    where: TrainerTraineeRequestWhereUniqueInput
    data: XOR<TrainerTraineeRequestUpdateWithoutTraineeInput, TrainerTraineeRequestUncheckedUpdateWithoutTraineeInput>
  }

  export type TrainerTraineeRequestUpdateManyWithWhereWithoutTraineeInput = {
    where: TrainerTraineeRequestScalarWhereInput
    data: XOR<TrainerTraineeRequestUpdateManyMutationInput, TrainerTraineeRequestUncheckedUpdateManyWithoutTraineeInput>
  }

  export type TrainerTraineeRequestScalarWhereInput = {
    AND?: TrainerTraineeRequestScalarWhereInput | TrainerTraineeRequestScalarWhereInput[]
    OR?: TrainerTraineeRequestScalarWhereInput[]
    NOT?: TrainerTraineeRequestScalarWhereInput | TrainerTraineeRequestScalarWhereInput[]
    id?: StringFilter<"TrainerTraineeRequest"> | string
    trainerId?: StringFilter<"TrainerTraineeRequest"> | string
    traineeId?: StringFilter<"TrainerTraineeRequest"> | string
    sessionsCount?: IntFilter<"TrainerTraineeRequest"> | number
    status?: EnumRequestStatusFilter<"TrainerTraineeRequest"> | $Enums.RequestStatus
    createdAt?: DateTimeFilter<"TrainerTraineeRequest"> | Date | string
    respondedAt?: DateTimeNullableFilter<"TrainerTraineeRequest"> | Date | string | null
  }

  export type UserCreateWithoutTrainerInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestCreateNestedManyWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrainerInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeUncheckedCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestUncheckedCreateNestedManyWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrainerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainerInput, UserUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerCertificationCreateWithoutTrainerInput = {
    id?: string
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    trainerRequest?: TrainerRequestCreateNestedOneWithoutCertificationsInput
  }

  export type TrainerCertificationUncheckedCreateWithoutTrainerInput = {
    id?: string
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TrainerCertificationCreateOrConnectWithoutTrainerInput = {
    where: TrainerCertificationWhereUniqueInput
    create: XOR<TrainerCertificationCreateWithoutTrainerInput, TrainerCertificationUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerCertificationCreateManyTrainerInputEnvelope = {
    data: TrainerCertificationCreateManyTrainerInput | TrainerCertificationCreateManyTrainerInput[]
    skipDuplicates?: boolean
  }

  export type TrainerTransformationCreateWithoutTrainerInput = {
    id?: string
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainerRequest?: TrainerRequestCreateNestedOneWithoutTransformationsInput
  }

  export type TrainerTransformationUncheckedCreateWithoutTrainerInput = {
    id?: string
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerTransformationCreateOrConnectWithoutTrainerInput = {
    where: TrainerTransformationWhereUniqueInput
    create: XOR<TrainerTransformationCreateWithoutTrainerInput, TrainerTransformationUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerTransformationCreateManyTrainerInputEnvelope = {
    data: TrainerTransformationCreateManyTrainerInput | TrainerTransformationCreateManyTrainerInput[]
    skipDuplicates?: boolean
  }

  export type TrainerTraineeRequestCreateWithoutTrainerInput = {
    id?: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    trainee: TraineeCreateNestedOneWithoutTrainerTraineeRequestsInput
  }

  export type TrainerTraineeRequestUncheckedCreateWithoutTrainerInput = {
    id?: string
    traineeId: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type TrainerTraineeRequestCreateOrConnectWithoutTrainerInput = {
    where: TrainerTraineeRequestWhereUniqueInput
    create: XOR<TrainerTraineeRequestCreateWithoutTrainerInput, TrainerTraineeRequestUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerTraineeRequestCreateManyTrainerInputEnvelope = {
    data: TrainerTraineeRequestCreateManyTrainerInput | TrainerTraineeRequestCreateManyTrainerInput[]
    skipDuplicates?: boolean
  }

  export type TrainerTraineeCreateWithoutTrainerInput = {
    id?: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
    trainee: TraineeCreateNestedOneWithoutTrainerTraineeInput
  }

  export type TrainerTraineeUncheckedCreateWithoutTrainerInput = {
    id?: string
    traineeId: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TrainerTraineeCreateOrConnectWithoutTrainerInput = {
    where: TrainerTraineeWhereUniqueInput
    create: XOR<TrainerTraineeCreateWithoutTrainerInput, TrainerTraineeUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerTraineeCreateManyTrainerInputEnvelope = {
    data: TrainerTraineeCreateManyTrainerInput | TrainerTraineeCreateManyTrainerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTrainerInput = {
    update: XOR<UserUpdateWithoutTrainerInput, UserUncheckedUpdateWithoutTrainerInput>
    create: XOR<UserCreateWithoutTrainerInput, UserUncheckedCreateWithoutTrainerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainerInput, UserUncheckedUpdateWithoutTrainerInput>
  }

  export type UserUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUpdateManyWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUncheckedUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUncheckedUpdateManyWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainerCertificationUpsertWithWhereUniqueWithoutTrainerInput = {
    where: TrainerCertificationWhereUniqueInput
    update: XOR<TrainerCertificationUpdateWithoutTrainerInput, TrainerCertificationUncheckedUpdateWithoutTrainerInput>
    create: XOR<TrainerCertificationCreateWithoutTrainerInput, TrainerCertificationUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerCertificationUpdateWithWhereUniqueWithoutTrainerInput = {
    where: TrainerCertificationWhereUniqueInput
    data: XOR<TrainerCertificationUpdateWithoutTrainerInput, TrainerCertificationUncheckedUpdateWithoutTrainerInput>
  }

  export type TrainerCertificationUpdateManyWithWhereWithoutTrainerInput = {
    where: TrainerCertificationScalarWhereInput
    data: XOR<TrainerCertificationUpdateManyMutationInput, TrainerCertificationUncheckedUpdateManyWithoutTrainerInput>
  }

  export type TrainerCertificationScalarWhereInput = {
    AND?: TrainerCertificationScalarWhereInput | TrainerCertificationScalarWhereInput[]
    OR?: TrainerCertificationScalarWhereInput[]
    NOT?: TrainerCertificationScalarWhereInput | TrainerCertificationScalarWhereInput[]
    id?: StringFilter<"TrainerCertification"> | string
    trainerId?: StringNullableFilter<"TrainerCertification"> | string | null
    trainerRequestId?: StringNullableFilter<"TrainerCertification"> | string | null
    name?: StringFilter<"TrainerCertification"> | string
    imageUrl?: StringFilter<"TrainerCertification"> | string
    imagePublicId?: StringFilter<"TrainerCertification"> | string
    issuedBy?: StringNullableFilter<"TrainerCertification"> | string | null
    issuedAt?: DateTimeNullableFilter<"TrainerCertification"> | Date | string | null
    updatedAt?: DateTimeFilter<"TrainerCertification"> | Date | string
    createdAt?: DateTimeFilter<"TrainerCertification"> | Date | string
  }

  export type TrainerTransformationUpsertWithWhereUniqueWithoutTrainerInput = {
    where: TrainerTransformationWhereUniqueInput
    update: XOR<TrainerTransformationUpdateWithoutTrainerInput, TrainerTransformationUncheckedUpdateWithoutTrainerInput>
    create: XOR<TrainerTransformationCreateWithoutTrainerInput, TrainerTransformationUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerTransformationUpdateWithWhereUniqueWithoutTrainerInput = {
    where: TrainerTransformationWhereUniqueInput
    data: XOR<TrainerTransformationUpdateWithoutTrainerInput, TrainerTransformationUncheckedUpdateWithoutTrainerInput>
  }

  export type TrainerTransformationUpdateManyWithWhereWithoutTrainerInput = {
    where: TrainerTransformationScalarWhereInput
    data: XOR<TrainerTransformationUpdateManyMutationInput, TrainerTransformationUncheckedUpdateManyWithoutTrainerInput>
  }

  export type TrainerTransformationScalarWhereInput = {
    AND?: TrainerTransformationScalarWhereInput | TrainerTransformationScalarWhereInput[]
    OR?: TrainerTransformationScalarWhereInput[]
    NOT?: TrainerTransformationScalarWhereInput | TrainerTransformationScalarWhereInput[]
    id?: StringFilter<"TrainerTransformation"> | string
    trainerId?: StringNullableFilter<"TrainerTransformation"> | string | null
    trainerRequestId?: StringNullableFilter<"TrainerTransformation"> | string | null
    name?: StringFilter<"TrainerTransformation"> | string
    imageUrl?: StringFilter<"TrainerTransformation"> | string
    imagePublicId?: StringNullableFilter<"TrainerTransformation"> | string | null
    createdAt?: DateTimeFilter<"TrainerTransformation"> | Date | string
    updatedAt?: DateTimeFilter<"TrainerTransformation"> | Date | string
  }

  export type TrainerTraineeRequestUpsertWithWhereUniqueWithoutTrainerInput = {
    where: TrainerTraineeRequestWhereUniqueInput
    update: XOR<TrainerTraineeRequestUpdateWithoutTrainerInput, TrainerTraineeRequestUncheckedUpdateWithoutTrainerInput>
    create: XOR<TrainerTraineeRequestCreateWithoutTrainerInput, TrainerTraineeRequestUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerTraineeRequestUpdateWithWhereUniqueWithoutTrainerInput = {
    where: TrainerTraineeRequestWhereUniqueInput
    data: XOR<TrainerTraineeRequestUpdateWithoutTrainerInput, TrainerTraineeRequestUncheckedUpdateWithoutTrainerInput>
  }

  export type TrainerTraineeRequestUpdateManyWithWhereWithoutTrainerInput = {
    where: TrainerTraineeRequestScalarWhereInput
    data: XOR<TrainerTraineeRequestUpdateManyMutationInput, TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerInput>
  }

  export type TrainerTraineeUpsertWithWhereUniqueWithoutTrainerInput = {
    where: TrainerTraineeWhereUniqueInput
    update: XOR<TrainerTraineeUpdateWithoutTrainerInput, TrainerTraineeUncheckedUpdateWithoutTrainerInput>
    create: XOR<TrainerTraineeCreateWithoutTrainerInput, TrainerTraineeUncheckedCreateWithoutTrainerInput>
  }

  export type TrainerTraineeUpdateWithWhereUniqueWithoutTrainerInput = {
    where: TrainerTraineeWhereUniqueInput
    data: XOR<TrainerTraineeUpdateWithoutTrainerInput, TrainerTraineeUncheckedUpdateWithoutTrainerInput>
  }

  export type TrainerTraineeUpdateManyWithWhereWithoutTrainerInput = {
    where: TrainerTraineeScalarWhereInput
    data: XOR<TrainerTraineeUpdateManyMutationInput, TrainerTraineeUncheckedUpdateManyWithoutTrainerInput>
  }

  export type TrainerTraineeScalarWhereInput = {
    AND?: TrainerTraineeScalarWhereInput | TrainerTraineeScalarWhereInput[]
    OR?: TrainerTraineeScalarWhereInput[]
    NOT?: TrainerTraineeScalarWhereInput | TrainerTraineeScalarWhereInput[]
    id?: StringFilter<"TrainerTrainee"> | string
    trainerId?: StringFilter<"TrainerTrainee"> | string
    traineeId?: StringFilter<"TrainerTrainee"> | string
    membershipStatus?: EnummembershipStatusFilter<"TrainerTrainee"> | $Enums.membershipStatus
    sessionsCount?: IntFilter<"TrainerTrainee"> | number
    assignedAt?: DateTimeNullableFilter<"TrainerTrainee"> | Date | string | null
    createdAt?: DateTimeFilter<"TrainerTrainee"> | Date | string
  }

  export type TrainerCreateWithoutCertificationsInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUncheckedCreateWithoutCertificationsInput = {
    userId: string
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type TrainerCreateOrConnectWithoutCertificationsInput = {
    where: TrainerWhereUniqueInput
    create: XOR<TrainerCreateWithoutCertificationsInput, TrainerUncheckedCreateWithoutCertificationsInput>
  }

  export type TrainerRequestCreateWithoutCertificationsInput = {
    id?: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerRequestsInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestUncheckedCreateWithoutCertificationsInput = {
    id?: string
    userId: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestCreateOrConnectWithoutCertificationsInput = {
    where: TrainerRequestWhereUniqueInput
    create: XOR<TrainerRequestCreateWithoutCertificationsInput, TrainerRequestUncheckedCreateWithoutCertificationsInput>
  }

  export type TrainerUpsertWithoutCertificationsInput = {
    update: XOR<TrainerUpdateWithoutCertificationsInput, TrainerUncheckedUpdateWithoutCertificationsInput>
    create: XOR<TrainerCreateWithoutCertificationsInput, TrainerUncheckedCreateWithoutCertificationsInput>
    where?: TrainerWhereInput
  }

  export type TrainerUpdateToOneWithWhereWithoutCertificationsInput = {
    where?: TrainerWhereInput
    data: XOR<TrainerUpdateWithoutCertificationsInput, TrainerUncheckedUpdateWithoutCertificationsInput>
  }

  export type TrainerUpdateWithoutCertificationsInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerUncheckedUpdateWithoutCertificationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerRequestUpsertWithoutCertificationsInput = {
    update: XOR<TrainerRequestUpdateWithoutCertificationsInput, TrainerRequestUncheckedUpdateWithoutCertificationsInput>
    create: XOR<TrainerRequestCreateWithoutCertificationsInput, TrainerRequestUncheckedCreateWithoutCertificationsInput>
    where?: TrainerRequestWhereInput
  }

  export type TrainerRequestUpdateToOneWithWhereWithoutCertificationsInput = {
    where?: TrainerRequestWhereInput
    data: XOR<TrainerRequestUpdateWithoutCertificationsInput, TrainerRequestUncheckedUpdateWithoutCertificationsInput>
  }

  export type TrainerRequestUpdateWithoutCertificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerRequestsNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerRequestUncheckedUpdateWithoutCertificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerCreateWithoutTransformationsInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerInput
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUncheckedCreateWithoutTransformationsInput = {
    userId: string
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type TrainerCreateOrConnectWithoutTransformationsInput = {
    where: TrainerWhereUniqueInput
    create: XOR<TrainerCreateWithoutTransformationsInput, TrainerUncheckedCreateWithoutTransformationsInput>
  }

  export type TrainerRequestCreateWithoutTransformationsInput = {
    id?: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerRequestsInput
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestUncheckedCreateWithoutTransformationsInput = {
    id?: string
    userId: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerRequestInput
  }

  export type TrainerRequestCreateOrConnectWithoutTransformationsInput = {
    where: TrainerRequestWhereUniqueInput
    create: XOR<TrainerRequestCreateWithoutTransformationsInput, TrainerRequestUncheckedCreateWithoutTransformationsInput>
  }

  export type TrainerUpsertWithoutTransformationsInput = {
    update: XOR<TrainerUpdateWithoutTransformationsInput, TrainerUncheckedUpdateWithoutTransformationsInput>
    create: XOR<TrainerCreateWithoutTransformationsInput, TrainerUncheckedCreateWithoutTransformationsInput>
    where?: TrainerWhereInput
  }

  export type TrainerUpdateToOneWithWhereWithoutTransformationsInput = {
    where?: TrainerWhereInput
    data: XOR<TrainerUpdateWithoutTransformationsInput, TrainerUncheckedUpdateWithoutTransformationsInput>
  }

  export type TrainerUpdateWithoutTransformationsInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerNestedInput
    certifications?: TrainerCertificationUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerUncheckedUpdateWithoutTransformationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerRequestUpsertWithoutTransformationsInput = {
    update: XOR<TrainerRequestUpdateWithoutTransformationsInput, TrainerRequestUncheckedUpdateWithoutTransformationsInput>
    create: XOR<TrainerRequestCreateWithoutTransformationsInput, TrainerRequestUncheckedCreateWithoutTransformationsInput>
    where?: TrainerRequestWhereInput
  }

  export type TrainerRequestUpdateToOneWithWhereWithoutTransformationsInput = {
    where?: TrainerRequestWhereInput
    data: XOR<TrainerRequestUpdateWithoutTransformationsInput, TrainerRequestUncheckedUpdateWithoutTransformationsInput>
  }

  export type TrainerRequestUpdateWithoutTransformationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerRequestsNestedInput
    certifications?: TrainerCertificationUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerRequestUncheckedUpdateWithoutTransformationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerRequestNestedInput
  }

  export type UserCreateWithoutResetPasswordTokensInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeCreateNestedOneWithoutUserInput
    trainer?: TrainerCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResetPasswordTokensInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeUncheckedCreateNestedOneWithoutUserInput
    trainer?: TrainerUncheckedCreateNestedOneWithoutUserInput
    trainerRequests?: TrainerRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResetPasswordTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResetPasswordTokensInput, UserUncheckedCreateWithoutResetPasswordTokensInput>
  }

  export type UserUpsertWithoutResetPasswordTokensInput = {
    update: XOR<UserUpdateWithoutResetPasswordTokensInput, UserUncheckedUpdateWithoutResetPasswordTokensInput>
    create: XOR<UserCreateWithoutResetPasswordTokensInput, UserUncheckedCreateWithoutResetPasswordTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResetPasswordTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResetPasswordTokensInput, UserUncheckedUpdateWithoutResetPasswordTokensInput>
  }

  export type UserUpdateWithoutResetPasswordTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUpdateOneWithoutUserNestedInput
    trainer?: TrainerUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResetPasswordTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUncheckedUpdateOneWithoutUserNestedInput
    trainer?: TrainerUncheckedUpdateOneWithoutUserNestedInput
    trainerRequests?: TrainerRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTrainerRequestsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeCreateNestedOneWithoutUserInput
    trainer?: TrainerCreateNestedOneWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrainerRequestsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    gender?: $Enums.Gender
    avatar?: string | null
    avatarPublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainee?: TraineeUncheckedCreateNestedOneWithoutUserInput
    trainer?: TrainerUncheckedCreateNestedOneWithoutUserInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrainerRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainerRequestsInput, UserUncheckedCreateWithoutTrainerRequestsInput>
  }

  export type TrainerCertificationCreateWithoutTrainerRequestInput = {
    id?: string
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    trainer?: TrainerCreateNestedOneWithoutCertificationsInput
  }

  export type TrainerCertificationUncheckedCreateWithoutTrainerRequestInput = {
    id?: string
    trainerId?: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TrainerCertificationCreateOrConnectWithoutTrainerRequestInput = {
    where: TrainerCertificationWhereUniqueInput
    create: XOR<TrainerCertificationCreateWithoutTrainerRequestInput, TrainerCertificationUncheckedCreateWithoutTrainerRequestInput>
  }

  export type TrainerCertificationCreateManyTrainerRequestInputEnvelope = {
    data: TrainerCertificationCreateManyTrainerRequestInput | TrainerCertificationCreateManyTrainerRequestInput[]
    skipDuplicates?: boolean
  }

  export type TrainerTransformationCreateWithoutTrainerRequestInput = {
    id?: string
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainer?: TrainerCreateNestedOneWithoutTransformationsInput
  }

  export type TrainerTransformationUncheckedCreateWithoutTrainerRequestInput = {
    id?: string
    trainerId?: string | null
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerTransformationCreateOrConnectWithoutTrainerRequestInput = {
    where: TrainerTransformationWhereUniqueInput
    create: XOR<TrainerTransformationCreateWithoutTrainerRequestInput, TrainerTransformationUncheckedCreateWithoutTrainerRequestInput>
  }

  export type TrainerTransformationCreateManyTrainerRequestInputEnvelope = {
    data: TrainerTransformationCreateManyTrainerRequestInput | TrainerTransformationCreateManyTrainerRequestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTrainerRequestsInput = {
    update: XOR<UserUpdateWithoutTrainerRequestsInput, UserUncheckedUpdateWithoutTrainerRequestsInput>
    create: XOR<UserCreateWithoutTrainerRequestsInput, UserUncheckedCreateWithoutTrainerRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainerRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainerRequestsInput, UserUncheckedUpdateWithoutTrainerRequestsInput>
  }

  export type UserUpdateWithoutTrainerRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUpdateOneWithoutUserNestedInput
    trainer?: TrainerUpdateOneWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainerRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    avatarPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUncheckedUpdateOneWithoutUserNestedInput
    trainer?: TrainerUncheckedUpdateOneWithoutUserNestedInput
    resetPasswordTokens?: ResetPasswordTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainerCertificationUpsertWithWhereUniqueWithoutTrainerRequestInput = {
    where: TrainerCertificationWhereUniqueInput
    update: XOR<TrainerCertificationUpdateWithoutTrainerRequestInput, TrainerCertificationUncheckedUpdateWithoutTrainerRequestInput>
    create: XOR<TrainerCertificationCreateWithoutTrainerRequestInput, TrainerCertificationUncheckedCreateWithoutTrainerRequestInput>
  }

  export type TrainerCertificationUpdateWithWhereUniqueWithoutTrainerRequestInput = {
    where: TrainerCertificationWhereUniqueInput
    data: XOR<TrainerCertificationUpdateWithoutTrainerRequestInput, TrainerCertificationUncheckedUpdateWithoutTrainerRequestInput>
  }

  export type TrainerCertificationUpdateManyWithWhereWithoutTrainerRequestInput = {
    where: TrainerCertificationScalarWhereInput
    data: XOR<TrainerCertificationUpdateManyMutationInput, TrainerCertificationUncheckedUpdateManyWithoutTrainerRequestInput>
  }

  export type TrainerTransformationUpsertWithWhereUniqueWithoutTrainerRequestInput = {
    where: TrainerTransformationWhereUniqueInput
    update: XOR<TrainerTransformationUpdateWithoutTrainerRequestInput, TrainerTransformationUncheckedUpdateWithoutTrainerRequestInput>
    create: XOR<TrainerTransformationCreateWithoutTrainerRequestInput, TrainerTransformationUncheckedCreateWithoutTrainerRequestInput>
  }

  export type TrainerTransformationUpdateWithWhereUniqueWithoutTrainerRequestInput = {
    where: TrainerTransformationWhereUniqueInput
    data: XOR<TrainerTransformationUpdateWithoutTrainerRequestInput, TrainerTransformationUncheckedUpdateWithoutTrainerRequestInput>
  }

  export type TrainerTransformationUpdateManyWithWhereWithoutTrainerRequestInput = {
    where: TrainerTransformationScalarWhereInput
    data: XOR<TrainerTransformationUpdateManyMutationInput, TrainerTransformationUncheckedUpdateManyWithoutTrainerRequestInput>
  }

  export type TraineeCreateWithoutTrainerTraineeInput = {
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    user: UserCreateNestedOneWithoutTraineeInput
    trainerTraineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTraineeInput
  }

  export type TraineeUncheckedCreateWithoutTrainerTraineeInput = {
    userId: string
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    trainerTraineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTraineeInput
  }

  export type TraineeCreateOrConnectWithoutTrainerTraineeInput = {
    where: TraineeWhereUniqueInput
    create: XOR<TraineeCreateWithoutTrainerTraineeInput, TraineeUncheckedCreateWithoutTrainerTraineeInput>
  }

  export type TrainerCreateWithoutTrainerTraineesInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerInput
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUncheckedCreateWithoutTrainerTraineesInput = {
    userId: string
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerInput
    traineeRequests?: TrainerTraineeRequestUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type TrainerCreateOrConnectWithoutTrainerTraineesInput = {
    where: TrainerWhereUniqueInput
    create: XOR<TrainerCreateWithoutTrainerTraineesInput, TrainerUncheckedCreateWithoutTrainerTraineesInput>
  }

  export type TraineeUpsertWithoutTrainerTraineeInput = {
    update: XOR<TraineeUpdateWithoutTrainerTraineeInput, TraineeUncheckedUpdateWithoutTrainerTraineeInput>
    create: XOR<TraineeCreateWithoutTrainerTraineeInput, TraineeUncheckedCreateWithoutTrainerTraineeInput>
    where?: TraineeWhereInput
  }

  export type TraineeUpdateToOneWithWhereWithoutTrainerTraineeInput = {
    where?: TraineeWhereInput
    data: XOR<TraineeUpdateWithoutTrainerTraineeInput, TraineeUncheckedUpdateWithoutTrainerTraineeInput>
  }

  export type TraineeUpdateWithoutTrainerTraineeInput = {
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutTraineeNestedInput
    trainerTraineeRequests?: TrainerTraineeRequestUpdateManyWithoutTraineeNestedInput
  }

  export type TraineeUncheckedUpdateWithoutTrainerTraineeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    trainerTraineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTraineeNestedInput
  }

  export type TrainerUpsertWithoutTrainerTraineesInput = {
    update: XOR<TrainerUpdateWithoutTrainerTraineesInput, TrainerUncheckedUpdateWithoutTrainerTraineesInput>
    create: XOR<TrainerCreateWithoutTrainerTraineesInput, TrainerUncheckedCreateWithoutTrainerTraineesInput>
    where?: TrainerWhereInput
  }

  export type TrainerUpdateToOneWithWhereWithoutTrainerTraineesInput = {
    where?: TrainerWhereInput
    data: XOR<TrainerUpdateWithoutTrainerTraineesInput, TrainerUncheckedUpdateWithoutTrainerTraineesInput>
  }

  export type TrainerUpdateWithoutTrainerTraineesInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerNestedInput
    certifications?: TrainerCertificationUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerUncheckedUpdateWithoutTrainerTraineesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerNestedInput
    traineeRequests?: TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerCreateWithoutTraineeRequestsInput = {
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTrainerInput
    certifications?: TrainerCertificationCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeCreateNestedManyWithoutTrainerInput
  }

  export type TrainerUncheckedCreateWithoutTraineeRequestsInput = {
    userId: string
    bio: string
    experienceYears?: Date | string
    ratingAvg?: number
    ratingCount?: number
    rankScore?: number
    isActive?: boolean
    createdAt?: Date | string
    certifications?: TrainerCertificationUncheckedCreateNestedManyWithoutTrainerInput
    transformations?: TrainerTransformationUncheckedCreateNestedManyWithoutTrainerInput
    trainerTrainees?: TrainerTraineeUncheckedCreateNestedManyWithoutTrainerInput
  }

  export type TrainerCreateOrConnectWithoutTraineeRequestsInput = {
    where: TrainerWhereUniqueInput
    create: XOR<TrainerCreateWithoutTraineeRequestsInput, TrainerUncheckedCreateWithoutTraineeRequestsInput>
  }

  export type TraineeCreateWithoutTrainerTraineeRequestsInput = {
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    user: UserCreateNestedOneWithoutTraineeInput
    trainerTrainee?: TrainerTraineeCreateNestedOneWithoutTraineeInput
  }

  export type TraineeUncheckedCreateWithoutTrainerTraineeRequestsInput = {
    userId: string
    goal: $Enums.TraineeGoal
    heightCm?: number | null
    createdAt?: Date | string
    isActive?: boolean
    trainerTrainee?: TrainerTraineeUncheckedCreateNestedOneWithoutTraineeInput
  }

  export type TraineeCreateOrConnectWithoutTrainerTraineeRequestsInput = {
    where: TraineeWhereUniqueInput
    create: XOR<TraineeCreateWithoutTrainerTraineeRequestsInput, TraineeUncheckedCreateWithoutTrainerTraineeRequestsInput>
  }

  export type TrainerUpsertWithoutTraineeRequestsInput = {
    update: XOR<TrainerUpdateWithoutTraineeRequestsInput, TrainerUncheckedUpdateWithoutTraineeRequestsInput>
    create: XOR<TrainerCreateWithoutTraineeRequestsInput, TrainerUncheckedCreateWithoutTraineeRequestsInput>
    where?: TrainerWhereInput
  }

  export type TrainerUpdateToOneWithWhereWithoutTraineeRequestsInput = {
    where?: TrainerWhereInput
    data: XOR<TrainerUpdateWithoutTraineeRequestsInput, TrainerUncheckedUpdateWithoutTraineeRequestsInput>
  }

  export type TrainerUpdateWithoutTraineeRequestsInput = {
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainerNestedInput
    certifications?: TrainerCertificationUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUpdateManyWithoutTrainerNestedInput
  }

  export type TrainerUncheckedUpdateWithoutTraineeRequestsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    experienceYears?: DateTimeFieldUpdateOperationsInput | Date | string
    ratingAvg?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    rankScore?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerNestedInput
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerNestedInput
    trainerTrainees?: TrainerTraineeUncheckedUpdateManyWithoutTrainerNestedInput
  }

  export type TraineeUpsertWithoutTrainerTraineeRequestsInput = {
    update: XOR<TraineeUpdateWithoutTrainerTraineeRequestsInput, TraineeUncheckedUpdateWithoutTrainerTraineeRequestsInput>
    create: XOR<TraineeCreateWithoutTrainerTraineeRequestsInput, TraineeUncheckedCreateWithoutTrainerTraineeRequestsInput>
    where?: TraineeWhereInput
  }

  export type TraineeUpdateToOneWithWhereWithoutTrainerTraineeRequestsInput = {
    where?: TraineeWhereInput
    data: XOR<TraineeUpdateWithoutTrainerTraineeRequestsInput, TraineeUncheckedUpdateWithoutTrainerTraineeRequestsInput>
  }

  export type TraineeUpdateWithoutTrainerTraineeRequestsInput = {
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutTraineeNestedInput
    trainerTrainee?: TrainerTraineeUpdateOneWithoutTraineeNestedInput
  }

  export type TraineeUncheckedUpdateWithoutTrainerTraineeRequestsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    goal?: EnumTraineeGoalFieldUpdateOperationsInput | $Enums.TraineeGoal
    heightCm?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    trainerTrainee?: TrainerTraineeUncheckedUpdateOneWithoutTraineeNestedInput
  }

  export type TrainerRequestCreateManyUserInput = {
    id?: string
    status?: $Enums.TrainerRequestStatus
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResetPasswordTokenCreateManyUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TrainerRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUpdateManyWithoutTrainerRequestNestedInput
    transformations?: TrainerTransformationUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certifications?: TrainerCertificationUncheckedUpdateManyWithoutTrainerRequestNestedInput
    transformations?: TrainerTransformationUncheckedUpdateManyWithoutTrainerRequestNestedInput
  }

  export type TrainerRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetPasswordTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetPasswordTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetPasswordTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeRequestCreateManyTraineeInput = {
    id?: string
    trainerId: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type TrainerTraineeRequestUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trainer?: TrainerUpdateOneRequiredWithoutTraineeRequestsNestedInput
  }

  export type TrainerTraineeRequestUncheckedUpdateWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrainerTraineeRequestUncheckedUpdateManyWithoutTraineeInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrainerCertificationCreateManyTrainerInput = {
    id?: string
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TrainerTransformationCreateManyTrainerInput = {
    id?: string
    trainerRequestId?: string | null
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerTraineeRequestCreateManyTrainerInput = {
    id?: string
    traineeId: string
    sessionsCount: number
    status?: $Enums.RequestStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type TrainerTraineeCreateManyTrainerInput = {
    id?: string
    traineeId: string
    membershipStatus?: $Enums.membershipStatus
    sessionsCount: number
    assignedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TrainerCertificationUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainerRequest?: TrainerRequestUpdateOneWithoutCertificationsNestedInput
  }

  export type TrainerCertificationUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerCertificationUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainerRequest?: TrainerRequestUpdateOneWithoutTransformationsNestedInput
  }

  export type TrainerTransformationUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeRequestUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trainee?: TraineeUpdateOneRequiredWithoutTrainerTraineeRequestsNestedInput
  }

  export type TrainerTraineeRequestUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrainerTraineeRequestUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    sessionsCount?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrainerTraineeUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainee?: TraineeUpdateOneRequiredWithoutTrainerTraineeNestedInput
  }

  export type TrainerTraineeUncheckedUpdateWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTraineeUncheckedUpdateManyWithoutTrainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    traineeId?: StringFieldUpdateOperationsInput | string
    membershipStatus?: EnummembershipStatusFieldUpdateOperationsInput | $Enums.membershipStatus
    sessionsCount?: IntFieldUpdateOperationsInput | number
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerCertificationCreateManyTrainerRequestInput = {
    id?: string
    trainerId?: string | null
    name: string
    imageUrl: string
    imagePublicId: string
    issuedBy?: string | null
    issuedAt?: Date | string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type TrainerTransformationCreateManyTrainerRequestInput = {
    id?: string
    trainerId?: string | null
    name: string
    imageUrl: string
    imagePublicId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainerCertificationUpdateWithoutTrainerRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUpdateOneWithoutCertificationsNestedInput
  }

  export type TrainerCertificationUncheckedUpdateWithoutTrainerRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerCertificationUncheckedUpdateManyWithoutTrainerRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: StringFieldUpdateOperationsInput | string
    issuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationUpdateWithoutTrainerRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainer?: TrainerUpdateOneWithoutTransformationsNestedInput
  }

  export type TrainerTransformationUncheckedUpdateWithoutTrainerRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainerTransformationUncheckedUpdateManyWithoutTrainerRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainerId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}