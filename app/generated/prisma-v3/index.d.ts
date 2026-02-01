
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model Upvote
 * 
 */
export type Upvote = $Result.DefaultSelection<Prisma.$UpvotePayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomMember
 * 
 */
export type RoomMember = $Result.DefaultSelection<Prisma.$RoomMemberPayload>
/**
 * Model RoomStream
 * 
 */
export type RoomStream = $Result.DefaultSelection<Prisma.$RoomStreamPayload>
/**
 * Model RoomStreamUpvote
 * 
 */
export type RoomStreamUpvote = $Result.DefaultSelection<Prisma.$RoomStreamUpvotePayload>
/**
 * Model SkipVote
 * 
 */
export type SkipVote = $Result.DefaultSelection<Prisma.$SkipVotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StreamType: {
  Spotify: 'Spotify',
  Youtube: 'Youtube'
};

export type StreamType = (typeof StreamType)[keyof typeof StreamType]


export const Provider: {
  Google: 'Google',
  Email: 'Email'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


export const RoomMemberRole: {
  CREATOR: 'CREATOR',
  MEMBER: 'MEMBER'
};

export type RoomMemberRole = (typeof RoomMemberRole)[keyof typeof RoomMemberRole]

}

export type StreamType = $Enums.StreamType

export const StreamType: typeof $Enums.StreamType

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type RoomMemberRole = $Enums.RoomMemberRole

export const RoomMemberRole: typeof $Enums.RoomMemberRole

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
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
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
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streams
    * const streams = await prisma.stream.findMany()
    * ```
    */
  get stream(): Prisma.StreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.upvote`: Exposes CRUD operations for the **Upvote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Upvotes
    * const upvotes = await prisma.upvote.findMany()
    * ```
    */
  get upvote(): Prisma.UpvoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomMember`: Exposes CRUD operations for the **RoomMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomMembers
    * const roomMembers = await prisma.roomMember.findMany()
    * ```
    */
  get roomMember(): Prisma.RoomMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomStream`: Exposes CRUD operations for the **RoomStream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStreams
    * const roomStreams = await prisma.roomStream.findMany()
    * ```
    */
  get roomStream(): Prisma.RoomStreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomStreamUpvote`: Exposes CRUD operations for the **RoomStreamUpvote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStreamUpvotes
    * const roomStreamUpvotes = await prisma.roomStreamUpvote.findMany()
    * ```
    */
  get roomStreamUpvote(): Prisma.RoomStreamUpvoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skipVote`: Exposes CRUD operations for the **SkipVote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkipVotes
    * const skipVotes = await prisma.skipVote.findMany()
    * ```
    */
  get skipVote(): Prisma.SkipVoteDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
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
    Stream: 'Stream',
    Upvote: 'Upvote',
    Room: 'Room',
    RoomMember: 'RoomMember',
    RoomStream: 'RoomStream',
    RoomStreamUpvote: 'RoomStreamUpvote',
    SkipVote: 'SkipVote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "stream" | "upvote" | "room" | "roomMember" | "roomStream" | "roomStreamUpvote" | "skipVote"
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
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>
        fields: Prisma.StreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StreamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStream>
          }
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>
            result: $Utils.Optional<StreamCountAggregateOutputType> | number
          }
        }
      }
      Upvote: {
        payload: Prisma.$UpvotePayload<ExtArgs>
        fields: Prisma.UpvoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UpvoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UpvoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>
          }
          findFirst: {
            args: Prisma.UpvoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UpvoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>
          }
          findMany: {
            args: Prisma.UpvoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>[]
          }
          create: {
            args: Prisma.UpvoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>
          }
          createMany: {
            args: Prisma.UpvoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UpvoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>[]
          }
          delete: {
            args: Prisma.UpvoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>
          }
          update: {
            args: Prisma.UpvoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>
          }
          deleteMany: {
            args: Prisma.UpvoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UpvoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UpvoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>[]
          }
          upsert: {
            args: Prisma.UpvoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UpvotePayload>
          }
          aggregate: {
            args: Prisma.UpvoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUpvote>
          }
          groupBy: {
            args: Prisma.UpvoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<UpvoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.UpvoteCountArgs<ExtArgs>
            result: $Utils.Optional<UpvoteCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomMember: {
        payload: Prisma.$RoomMemberPayload<ExtArgs>
        fields: Prisma.RoomMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>
          }
          findFirst: {
            args: Prisma.RoomMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>
          }
          findMany: {
            args: Prisma.RoomMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>[]
          }
          create: {
            args: Prisma.RoomMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>
          }
          createMany: {
            args: Prisma.RoomMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>[]
          }
          delete: {
            args: Prisma.RoomMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>
          }
          update: {
            args: Prisma.RoomMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>
          }
          deleteMany: {
            args: Prisma.RoomMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>[]
          }
          upsert: {
            args: Prisma.RoomMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomMemberPayload>
          }
          aggregate: {
            args: Prisma.RoomMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomMember>
          }
          groupBy: {
            args: Prisma.RoomMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomMemberCountArgs<ExtArgs>
            result: $Utils.Optional<RoomMemberCountAggregateOutputType> | number
          }
        }
      }
      RoomStream: {
        payload: Prisma.$RoomStreamPayload<ExtArgs>
        fields: Prisma.RoomStreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>
          }
          findFirst: {
            args: Prisma.RoomStreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>
          }
          findMany: {
            args: Prisma.RoomStreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>[]
          }
          create: {
            args: Prisma.RoomStreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>
          }
          createMany: {
            args: Prisma.RoomStreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStreamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>[]
          }
          delete: {
            args: Prisma.RoomStreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>
          }
          update: {
            args: Prisma.RoomStreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>
          }
          deleteMany: {
            args: Prisma.RoomStreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomStreamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>[]
          }
          upsert: {
            args: Prisma.RoomStreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamPayload>
          }
          aggregate: {
            args: Prisma.RoomStreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStream>
          }
          groupBy: {
            args: Prisma.RoomStreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStreamGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStreamCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStreamCountAggregateOutputType> | number
          }
        }
      }
      RoomStreamUpvote: {
        payload: Prisma.$RoomStreamUpvotePayload<ExtArgs>
        fields: Prisma.RoomStreamUpvoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStreamUpvoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStreamUpvoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>
          }
          findFirst: {
            args: Prisma.RoomStreamUpvoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStreamUpvoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>
          }
          findMany: {
            args: Prisma.RoomStreamUpvoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>[]
          }
          create: {
            args: Prisma.RoomStreamUpvoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>
          }
          createMany: {
            args: Prisma.RoomStreamUpvoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStreamUpvoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>[]
          }
          delete: {
            args: Prisma.RoomStreamUpvoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>
          }
          update: {
            args: Prisma.RoomStreamUpvoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>
          }
          deleteMany: {
            args: Prisma.RoomStreamUpvoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStreamUpvoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomStreamUpvoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>[]
          }
          upsert: {
            args: Prisma.RoomStreamUpvoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamUpvotePayload>
          }
          aggregate: {
            args: Prisma.RoomStreamUpvoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStreamUpvote>
          }
          groupBy: {
            args: Prisma.RoomStreamUpvoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStreamUpvoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStreamUpvoteCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStreamUpvoteCountAggregateOutputType> | number
          }
        }
      }
      SkipVote: {
        payload: Prisma.$SkipVotePayload<ExtArgs>
        fields: Prisma.SkipVoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkipVoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkipVoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>
          }
          findFirst: {
            args: Prisma.SkipVoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkipVoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>
          }
          findMany: {
            args: Prisma.SkipVoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>[]
          }
          create: {
            args: Prisma.SkipVoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>
          }
          createMany: {
            args: Prisma.SkipVoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkipVoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>[]
          }
          delete: {
            args: Prisma.SkipVoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>
          }
          update: {
            args: Prisma.SkipVoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>
          }
          deleteMany: {
            args: Prisma.SkipVoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkipVoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkipVoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>[]
          }
          upsert: {
            args: Prisma.SkipVoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkipVotePayload>
          }
          aggregate: {
            args: Prisma.SkipVoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkipVote>
          }
          groupBy: {
            args: Prisma.SkipVoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkipVoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkipVoteCountArgs<ExtArgs>
            result: $Utils.Optional<SkipVoteCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    stream?: StreamOmit
    upvote?: UpvoteOmit
    room?: RoomOmit
    roomMember?: RoomMemberOmit
    roomStream?: RoomStreamOmit
    roomStreamUpvote?: RoomStreamUpvoteOmit
    skipVote?: SkipVoteOmit
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
    createdRooms: number
    roomMembers: number
    addedRoomStreams: number
    roomStreamUpvotes: number
    skipVotes: number
    Streams: number
    upvotes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdRooms?: boolean | UserCountOutputTypeCountCreatedRoomsArgs
    roomMembers?: boolean | UserCountOutputTypeCountRoomMembersArgs
    addedRoomStreams?: boolean | UserCountOutputTypeCountAddedRoomStreamsArgs
    roomStreamUpvotes?: boolean | UserCountOutputTypeCountRoomStreamUpvotesArgs
    skipVotes?: boolean | UserCountOutputTypeCountSkipVotesArgs
    Streams?: boolean | UserCountOutputTypeCountStreamsArgs
    upvotes?: boolean | UserCountOutputTypeCountUpvotesArgs
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
  export type UserCountOutputTypeCountCreatedRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddedRoomStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomStreamUpvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamUpvoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkipVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkipVoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUpvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpvoteWhereInput
  }


  /**
   * Count Type StreamCountOutputType
   */

  export type StreamCountOutputType = {
    roomStreams: number
    upvotes: number
  }

  export type StreamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStreams?: boolean | StreamCountOutputTypeCountRoomStreamsArgs
    upvotes?: boolean | StreamCountOutputTypeCountUpvotesArgs
  }

  // Custom InputTypes
  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamCountOutputType
     */
    select?: StreamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountRoomStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamWhereInput
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountUpvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpvoteWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    members: number
    streams: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | RoomCountOutputTypeCountMembersArgs
    streams?: boolean | RoomCountOutputTypeCountStreamsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomMemberWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamWhereInput
  }


  /**
   * Count Type RoomStreamCountOutputType
   */

  export type RoomStreamCountOutputType = {
    currentInRooms: number
    upvotes: number
    skipVotes: number
  }

  export type RoomStreamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentInRooms?: boolean | RoomStreamCountOutputTypeCountCurrentInRoomsArgs
    upvotes?: boolean | RoomStreamCountOutputTypeCountUpvotesArgs
    skipVotes?: boolean | RoomStreamCountOutputTypeCountSkipVotesArgs
  }

  // Custom InputTypes
  /**
   * RoomStreamCountOutputType without action
   */
  export type RoomStreamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamCountOutputType
     */
    select?: RoomStreamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomStreamCountOutputType without action
   */
  export type RoomStreamCountOutputTypeCountCurrentInRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * RoomStreamCountOutputType without action
   */
  export type RoomStreamCountOutputTypeCountUpvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamUpvoteWhereInput
  }

  /**
   * RoomStreamCountOutputType without action
   */
  export type RoomStreamCountOutputTypeCountSkipVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkipVoteWhereInput
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
    email: string | null
    image: string | null
    provider: $Enums.Provider | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    image: string | null
    provider: $Enums.Provider | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    image: number
    provider: number
    password: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    image?: true
    provider?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    image?: true
    provider?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    image?: true
    provider?: true
    password?: true
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
    email: string
    image: string | null
    provider: $Enums.Provider
    password: string | null
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
    email?: boolean
    image?: boolean
    provider?: boolean
    password?: boolean
    createdRooms?: boolean | User$createdRoomsArgs<ExtArgs>
    roomMembers?: boolean | User$roomMembersArgs<ExtArgs>
    addedRoomStreams?: boolean | User$addedRoomStreamsArgs<ExtArgs>
    roomStreamUpvotes?: boolean | User$roomStreamUpvotesArgs<ExtArgs>
    skipVotes?: boolean | User$skipVotesArgs<ExtArgs>
    Streams?: boolean | User$StreamsArgs<ExtArgs>
    upvotes?: boolean | User$upvotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    image?: boolean
    provider?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    image?: boolean
    provider?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    image?: boolean
    provider?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "image" | "provider" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdRooms?: boolean | User$createdRoomsArgs<ExtArgs>
    roomMembers?: boolean | User$roomMembersArgs<ExtArgs>
    addedRoomStreams?: boolean | User$addedRoomStreamsArgs<ExtArgs>
    roomStreamUpvotes?: boolean | User$roomStreamUpvotesArgs<ExtArgs>
    skipVotes?: boolean | User$skipVotesArgs<ExtArgs>
    Streams?: boolean | User$StreamsArgs<ExtArgs>
    upvotes?: boolean | User$upvotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdRooms: Prisma.$RoomPayload<ExtArgs>[]
      roomMembers: Prisma.$RoomMemberPayload<ExtArgs>[]
      addedRoomStreams: Prisma.$RoomStreamPayload<ExtArgs>[]
      roomStreamUpvotes: Prisma.$RoomStreamUpvotePayload<ExtArgs>[]
      skipVotes: Prisma.$SkipVotePayload<ExtArgs>[]
      Streams: Prisma.$StreamPayload<ExtArgs>[]
      upvotes: Prisma.$UpvotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      image: string | null
      provider: $Enums.Provider
      password: string | null
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
    createdRooms<T extends User$createdRoomsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomMembers<T extends User$roomMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$roomMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addedRoomStreams<T extends User$addedRoomStreamsArgs<ExtArgs> = {}>(args?: Subset<T, User$addedRoomStreamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomStreamUpvotes<T extends User$roomStreamUpvotesArgs<ExtArgs> = {}>(args?: Subset<T, User$roomStreamUpvotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skipVotes<T extends User$skipVotesArgs<ExtArgs> = {}>(args?: Subset<T, User$skipVotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Streams<T extends User$StreamsArgs<ExtArgs> = {}>(args?: Subset<T, User$StreamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    upvotes<T extends User$upvotesArgs<ExtArgs> = {}>(args?: Subset<T, User$upvotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly email: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'Provider'>
    readonly password: FieldRef<"User", 'String'>
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
   * User.createdRooms
   */
  export type User$createdRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * User.roomMembers
   */
  export type User$roomMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    where?: RoomMemberWhereInput
    orderBy?: RoomMemberOrderByWithRelationInput | RoomMemberOrderByWithRelationInput[]
    cursor?: RoomMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[]
  }

  /**
   * User.addedRoomStreams
   */
  export type User$addedRoomStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    where?: RoomStreamWhereInput
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    cursor?: RoomStreamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamScalarFieldEnum | RoomStreamScalarFieldEnum[]
  }

  /**
   * User.roomStreamUpvotes
   */
  export type User$roomStreamUpvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    where?: RoomStreamUpvoteWhereInput
    orderBy?: RoomStreamUpvoteOrderByWithRelationInput | RoomStreamUpvoteOrderByWithRelationInput[]
    cursor?: RoomStreamUpvoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamUpvoteScalarFieldEnum | RoomStreamUpvoteScalarFieldEnum[]
  }

  /**
   * User.skipVotes
   */
  export type User$skipVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    where?: SkipVoteWhereInput
    orderBy?: SkipVoteOrderByWithRelationInput | SkipVoteOrderByWithRelationInput[]
    cursor?: SkipVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkipVoteScalarFieldEnum | SkipVoteScalarFieldEnum[]
  }

  /**
   * User.Streams
   */
  export type User$StreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    cursor?: StreamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * User.upvotes
   */
  export type User$upvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    where?: UpvoteWhereInput
    orderBy?: UpvoteOrderByWithRelationInput | UpvoteOrderByWithRelationInput[]
    cursor?: UpvoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UpvoteScalarFieldEnum | UpvoteScalarFieldEnum[]
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
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  export type StreamMinAggregateOutputType = {
    id: string | null
    type: $Enums.StreamType | null
    active: boolean | null
    UserId: string | null
    url: string | null
    extractedId: string | null
    bigImg: string | null
    smallImg: string | null
    title: string | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    type: $Enums.StreamType | null
    active: boolean | null
    UserId: string | null
    url: string | null
    extractedId: string | null
    bigImg: string | null
    smallImg: string | null
    title: string | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    type: number
    active: number
    UserId: number
    url: number
    extractedId: number
    bigImg: number
    smallImg: number
    title: number
    _all: number
  }


  export type StreamMinAggregateInputType = {
    id?: true
    type?: true
    active?: true
    UserId?: true
    url?: true
    extractedId?: true
    bigImg?: true
    smallImg?: true
    title?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    type?: true
    active?: true
    UserId?: true
    url?: true
    extractedId?: true
    bigImg?: true
    smallImg?: true
    title?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    type?: true
    active?: true
    UserId?: true
    url?: true
    extractedId?: true
    bigImg?: true
    smallImg?: true
    title?: true
    _all?: true
  }

  export type StreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streams
    **/
    _count?: true | StreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamMaxAggregateInputType
  }

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
        [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>
  }




  export type StreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithAggregationInput | StreamOrderByWithAggregationInput[]
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum
    having?: StreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamCountAggregateInputType | true
    _min?: StreamMinAggregateInputType
    _max?: StreamMaxAggregateInputType
  }

  export type StreamGroupByOutputType = {
    id: string
    type: $Enums.StreamType
    active: boolean
    UserId: string
    url: string
    extractedId: string
    bigImg: string
    smallImg: string
    title: string
    _count: StreamCountAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>
        }
      >
    >


  export type StreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    active?: boolean
    UserId?: boolean
    url?: boolean
    extractedId?: boolean
    bigImg?: boolean
    smallImg?: boolean
    title?: boolean
    roomStreams?: boolean | Stream$roomStreamsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    upvotes?: boolean | Stream$upvotesArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    active?: boolean
    UserId?: boolean
    url?: boolean
    extractedId?: boolean
    bigImg?: boolean
    smallImg?: boolean
    title?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    active?: boolean
    UserId?: boolean
    url?: boolean
    extractedId?: boolean
    bigImg?: boolean
    smallImg?: boolean
    title?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectScalar = {
    id?: boolean
    type?: boolean
    active?: boolean
    UserId?: boolean
    url?: boolean
    extractedId?: boolean
    bigImg?: boolean
    smallImg?: boolean
    title?: boolean
  }

  export type StreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "active" | "UserId" | "url" | "extractedId" | "bigImg" | "smallImg" | "title", ExtArgs["result"]["stream"]>
  export type StreamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStreams?: boolean | Stream$roomStreamsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    upvotes?: boolean | Stream$upvotesArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StreamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StreamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stream"
    objects: {
      roomStreams: Prisma.$RoomStreamPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      upvotes: Prisma.$UpvotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.StreamType
      active: boolean
      UserId: string
      url: string
      extractedId: string
      bigImg: string
      smallImg: string
      title: string
    }, ExtArgs["result"]["stream"]>
    composites: {}
  }

  type StreamGetPayload<S extends boolean | null | undefined | StreamDefaultArgs> = $Result.GetResult<Prisma.$StreamPayload, S>

  type StreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamCountAggregateInputType | true
    }

  export interface StreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stream'], meta: { name: 'Stream' } }
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     * 
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamFindManyArgs>(args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     * 
     */
    create<T extends StreamCreateArgs>(args: SelectSubset<T, StreamCreateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamCreateManyArgs>(args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Streams and returns the data saved in the database.
     * @param {StreamCreateManyAndReturnArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     * 
     */
    delete<T extends StreamDeleteArgs>(args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamUpdateArgs>(args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeleteManyArgs>(args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamUpdateManyArgs>(args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams and returns the data updated in the database.
     * @param {StreamUpdateManyAndReturnArgs} args - Arguments to update many Streams.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.updateManyAndReturn({
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
    updateManyAndReturn<T extends StreamUpdateManyAndReturnArgs>(args: SelectSubset<T, StreamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
    **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StreamAggregateArgs>(args: Subset<T, StreamAggregateArgs>): Prisma.PrismaPromise<GetStreamAggregateType<T>>

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
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
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stream model
   */
  readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomStreams<T extends Stream$roomStreamsArgs<ExtArgs> = {}>(args?: Subset<T, Stream$roomStreamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    upvotes<T extends Stream$upvotesArgs<ExtArgs> = {}>(args?: Subset<T, Stream$upvotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Stream model
   */
  interface StreamFieldRefs {
    readonly id: FieldRef<"Stream", 'String'>
    readonly type: FieldRef<"Stream", 'StreamType'>
    readonly active: FieldRef<"Stream", 'Boolean'>
    readonly UserId: FieldRef<"Stream", 'String'>
    readonly url: FieldRef<"Stream", 'String'>
    readonly extractedId: FieldRef<"Stream", 'String'>
    readonly bigImg: FieldRef<"Stream", 'String'>
    readonly smallImg: FieldRef<"Stream", 'String'>
    readonly title: FieldRef<"Stream", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream create
   */
  export type StreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>
  }

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stream createManyAndReturn
   */
  export type StreamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream update
   */
  export type StreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
  }

  /**
   * Stream updateManyAndReturn
   */
  export type StreamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
  }

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to delete.
     */
    limit?: number
  }

  /**
   * Stream.roomStreams
   */
  export type Stream$roomStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    where?: RoomStreamWhereInput
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    cursor?: RoomStreamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamScalarFieldEnum | RoomStreamScalarFieldEnum[]
  }

  /**
   * Stream.upvotes
   */
  export type Stream$upvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    where?: UpvoteWhereInput
    orderBy?: UpvoteOrderByWithRelationInput | UpvoteOrderByWithRelationInput[]
    cursor?: UpvoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UpvoteScalarFieldEnum | UpvoteScalarFieldEnum[]
  }

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
  }


  /**
   * Model Upvote
   */

  export type AggregateUpvote = {
    _count: UpvoteCountAggregateOutputType | null
    _min: UpvoteMinAggregateOutputType | null
    _max: UpvoteMaxAggregateOutputType | null
  }

  export type UpvoteMinAggregateOutputType = {
    id: string | null
    UserId: string | null
    StreamId: string | null
  }

  export type UpvoteMaxAggregateOutputType = {
    id: string | null
    UserId: string | null
    StreamId: string | null
  }

  export type UpvoteCountAggregateOutputType = {
    id: number
    UserId: number
    StreamId: number
    _all: number
  }


  export type UpvoteMinAggregateInputType = {
    id?: true
    UserId?: true
    StreamId?: true
  }

  export type UpvoteMaxAggregateInputType = {
    id?: true
    UserId?: true
    StreamId?: true
  }

  export type UpvoteCountAggregateInputType = {
    id?: true
    UserId?: true
    StreamId?: true
    _all?: true
  }

  export type UpvoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Upvote to aggregate.
     */
    where?: UpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Upvotes to fetch.
     */
    orderBy?: UpvoteOrderByWithRelationInput | UpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Upvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Upvotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Upvotes
    **/
    _count?: true | UpvoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UpvoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UpvoteMaxAggregateInputType
  }

  export type GetUpvoteAggregateType<T extends UpvoteAggregateArgs> = {
        [P in keyof T & keyof AggregateUpvote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUpvote[P]>
      : GetScalarType<T[P], AggregateUpvote[P]>
  }




  export type UpvoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UpvoteWhereInput
    orderBy?: UpvoteOrderByWithAggregationInput | UpvoteOrderByWithAggregationInput[]
    by: UpvoteScalarFieldEnum[] | UpvoteScalarFieldEnum
    having?: UpvoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UpvoteCountAggregateInputType | true
    _min?: UpvoteMinAggregateInputType
    _max?: UpvoteMaxAggregateInputType
  }

  export type UpvoteGroupByOutputType = {
    id: string
    UserId: string
    StreamId: string
    _count: UpvoteCountAggregateOutputType | null
    _min: UpvoteMinAggregateOutputType | null
    _max: UpvoteMaxAggregateOutputType | null
  }

  type GetUpvoteGroupByPayload<T extends UpvoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UpvoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UpvoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UpvoteGroupByOutputType[P]>
            : GetScalarType<T[P], UpvoteGroupByOutputType[P]>
        }
      >
    >


  export type UpvoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    UserId?: boolean
    StreamId?: boolean
    Stream?: boolean | StreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["upvote"]>

  export type UpvoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    UserId?: boolean
    StreamId?: boolean
    Stream?: boolean | StreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["upvote"]>

  export type UpvoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    UserId?: boolean
    StreamId?: boolean
    Stream?: boolean | StreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["upvote"]>

  export type UpvoteSelectScalar = {
    id?: boolean
    UserId?: boolean
    StreamId?: boolean
  }

  export type UpvoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "UserId" | "StreamId", ExtArgs["result"]["upvote"]>
  export type UpvoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Stream?: boolean | StreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UpvoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Stream?: boolean | StreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UpvoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Stream?: boolean | StreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UpvotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Upvote"
    objects: {
      Stream: Prisma.$StreamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      UserId: string
      StreamId: string
    }, ExtArgs["result"]["upvote"]>
    composites: {}
  }

  type UpvoteGetPayload<S extends boolean | null | undefined | UpvoteDefaultArgs> = $Result.GetResult<Prisma.$UpvotePayload, S>

  type UpvoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UpvoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UpvoteCountAggregateInputType | true
    }

  export interface UpvoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Upvote'], meta: { name: 'Upvote' } }
    /**
     * Find zero or one Upvote that matches the filter.
     * @param {UpvoteFindUniqueArgs} args - Arguments to find a Upvote
     * @example
     * // Get one Upvote
     * const upvote = await prisma.upvote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UpvoteFindUniqueArgs>(args: SelectSubset<T, UpvoteFindUniqueArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Upvote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UpvoteFindUniqueOrThrowArgs} args - Arguments to find a Upvote
     * @example
     * // Get one Upvote
     * const upvote = await prisma.upvote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UpvoteFindUniqueOrThrowArgs>(args: SelectSubset<T, UpvoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Upvote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteFindFirstArgs} args - Arguments to find a Upvote
     * @example
     * // Get one Upvote
     * const upvote = await prisma.upvote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UpvoteFindFirstArgs>(args?: SelectSubset<T, UpvoteFindFirstArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Upvote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteFindFirstOrThrowArgs} args - Arguments to find a Upvote
     * @example
     * // Get one Upvote
     * const upvote = await prisma.upvote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UpvoteFindFirstOrThrowArgs>(args?: SelectSubset<T, UpvoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Upvotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Upvotes
     * const upvotes = await prisma.upvote.findMany()
     * 
     * // Get first 10 Upvotes
     * const upvotes = await prisma.upvote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const upvoteWithIdOnly = await prisma.upvote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UpvoteFindManyArgs>(args?: SelectSubset<T, UpvoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Upvote.
     * @param {UpvoteCreateArgs} args - Arguments to create a Upvote.
     * @example
     * // Create one Upvote
     * const Upvote = await prisma.upvote.create({
     *   data: {
     *     // ... data to create a Upvote
     *   }
     * })
     * 
     */
    create<T extends UpvoteCreateArgs>(args: SelectSubset<T, UpvoteCreateArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Upvotes.
     * @param {UpvoteCreateManyArgs} args - Arguments to create many Upvotes.
     * @example
     * // Create many Upvotes
     * const upvote = await prisma.upvote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UpvoteCreateManyArgs>(args?: SelectSubset<T, UpvoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Upvotes and returns the data saved in the database.
     * @param {UpvoteCreateManyAndReturnArgs} args - Arguments to create many Upvotes.
     * @example
     * // Create many Upvotes
     * const upvote = await prisma.upvote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Upvotes and only return the `id`
     * const upvoteWithIdOnly = await prisma.upvote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UpvoteCreateManyAndReturnArgs>(args?: SelectSubset<T, UpvoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Upvote.
     * @param {UpvoteDeleteArgs} args - Arguments to delete one Upvote.
     * @example
     * // Delete one Upvote
     * const Upvote = await prisma.upvote.delete({
     *   where: {
     *     // ... filter to delete one Upvote
     *   }
     * })
     * 
     */
    delete<T extends UpvoteDeleteArgs>(args: SelectSubset<T, UpvoteDeleteArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Upvote.
     * @param {UpvoteUpdateArgs} args - Arguments to update one Upvote.
     * @example
     * // Update one Upvote
     * const upvote = await prisma.upvote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UpvoteUpdateArgs>(args: SelectSubset<T, UpvoteUpdateArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Upvotes.
     * @param {UpvoteDeleteManyArgs} args - Arguments to filter Upvotes to delete.
     * @example
     * // Delete a few Upvotes
     * const { count } = await prisma.upvote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UpvoteDeleteManyArgs>(args?: SelectSubset<T, UpvoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Upvotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Upvotes
     * const upvote = await prisma.upvote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UpvoteUpdateManyArgs>(args: SelectSubset<T, UpvoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Upvotes and returns the data updated in the database.
     * @param {UpvoteUpdateManyAndReturnArgs} args - Arguments to update many Upvotes.
     * @example
     * // Update many Upvotes
     * const upvote = await prisma.upvote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Upvotes and only return the `id`
     * const upvoteWithIdOnly = await prisma.upvote.updateManyAndReturn({
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
    updateManyAndReturn<T extends UpvoteUpdateManyAndReturnArgs>(args: SelectSubset<T, UpvoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Upvote.
     * @param {UpvoteUpsertArgs} args - Arguments to update or create a Upvote.
     * @example
     * // Update or create a Upvote
     * const upvote = await prisma.upvote.upsert({
     *   create: {
     *     // ... data to create a Upvote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Upvote we want to update
     *   }
     * })
     */
    upsert<T extends UpvoteUpsertArgs>(args: SelectSubset<T, UpvoteUpsertArgs<ExtArgs>>): Prisma__UpvoteClient<$Result.GetResult<Prisma.$UpvotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Upvotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteCountArgs} args - Arguments to filter Upvotes to count.
     * @example
     * // Count the number of Upvotes
     * const count = await prisma.upvote.count({
     *   where: {
     *     // ... the filter for the Upvotes we want to count
     *   }
     * })
    **/
    count<T extends UpvoteCountArgs>(
      args?: Subset<T, UpvoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UpvoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Upvote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UpvoteAggregateArgs>(args: Subset<T, UpvoteAggregateArgs>): Prisma.PrismaPromise<GetUpvoteAggregateType<T>>

    /**
     * Group by Upvote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpvoteGroupByArgs} args - Group by arguments.
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
      T extends UpvoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UpvoteGroupByArgs['orderBy'] }
        : { orderBy?: UpvoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UpvoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUpvoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Upvote model
   */
  readonly fields: UpvoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Upvote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UpvoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Upvote model
   */
  interface UpvoteFieldRefs {
    readonly id: FieldRef<"Upvote", 'String'>
    readonly UserId: FieldRef<"Upvote", 'String'>
    readonly StreamId: FieldRef<"Upvote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Upvote findUnique
   */
  export type UpvoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * Filter, which Upvote to fetch.
     */
    where: UpvoteWhereUniqueInput
  }

  /**
   * Upvote findUniqueOrThrow
   */
  export type UpvoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * Filter, which Upvote to fetch.
     */
    where: UpvoteWhereUniqueInput
  }

  /**
   * Upvote findFirst
   */
  export type UpvoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * Filter, which Upvote to fetch.
     */
    where?: UpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Upvotes to fetch.
     */
    orderBy?: UpvoteOrderByWithRelationInput | UpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Upvotes.
     */
    cursor?: UpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Upvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Upvotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Upvotes.
     */
    distinct?: UpvoteScalarFieldEnum | UpvoteScalarFieldEnum[]
  }

  /**
   * Upvote findFirstOrThrow
   */
  export type UpvoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * Filter, which Upvote to fetch.
     */
    where?: UpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Upvotes to fetch.
     */
    orderBy?: UpvoteOrderByWithRelationInput | UpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Upvotes.
     */
    cursor?: UpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Upvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Upvotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Upvotes.
     */
    distinct?: UpvoteScalarFieldEnum | UpvoteScalarFieldEnum[]
  }

  /**
   * Upvote findMany
   */
  export type UpvoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * Filter, which Upvotes to fetch.
     */
    where?: UpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Upvotes to fetch.
     */
    orderBy?: UpvoteOrderByWithRelationInput | UpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Upvotes.
     */
    cursor?: UpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Upvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Upvotes.
     */
    skip?: number
    distinct?: UpvoteScalarFieldEnum | UpvoteScalarFieldEnum[]
  }

  /**
   * Upvote create
   */
  export type UpvoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Upvote.
     */
    data: XOR<UpvoteCreateInput, UpvoteUncheckedCreateInput>
  }

  /**
   * Upvote createMany
   */
  export type UpvoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Upvotes.
     */
    data: UpvoteCreateManyInput | UpvoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Upvote createManyAndReturn
   */
  export type UpvoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * The data used to create many Upvotes.
     */
    data: UpvoteCreateManyInput | UpvoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Upvote update
   */
  export type UpvoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Upvote.
     */
    data: XOR<UpvoteUpdateInput, UpvoteUncheckedUpdateInput>
    /**
     * Choose, which Upvote to update.
     */
    where: UpvoteWhereUniqueInput
  }

  /**
   * Upvote updateMany
   */
  export type UpvoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Upvotes.
     */
    data: XOR<UpvoteUpdateManyMutationInput, UpvoteUncheckedUpdateManyInput>
    /**
     * Filter which Upvotes to update
     */
    where?: UpvoteWhereInput
    /**
     * Limit how many Upvotes to update.
     */
    limit?: number
  }

  /**
   * Upvote updateManyAndReturn
   */
  export type UpvoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * The data used to update Upvotes.
     */
    data: XOR<UpvoteUpdateManyMutationInput, UpvoteUncheckedUpdateManyInput>
    /**
     * Filter which Upvotes to update
     */
    where?: UpvoteWhereInput
    /**
     * Limit how many Upvotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Upvote upsert
   */
  export type UpvoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Upvote to update in case it exists.
     */
    where: UpvoteWhereUniqueInput
    /**
     * In case the Upvote found by the `where` argument doesn't exist, create a new Upvote with this data.
     */
    create: XOR<UpvoteCreateInput, UpvoteUncheckedCreateInput>
    /**
     * In case the Upvote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UpvoteUpdateInput, UpvoteUncheckedUpdateInput>
  }

  /**
   * Upvote delete
   */
  export type UpvoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
    /**
     * Filter which Upvote to delete.
     */
    where: UpvoteWhereUniqueInput
  }

  /**
   * Upvote deleteMany
   */
  export type UpvoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Upvotes to delete
     */
    where?: UpvoteWhereInput
    /**
     * Limit how many Upvotes to delete.
     */
    limit?: number
  }

  /**
   * Upvote without action
   */
  export type UpvoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Upvote
     */
    select?: UpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Upvote
     */
    omit?: UpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UpvoteInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    playbackTime: number | null
  }

  export type RoomSumAggregateOutputType = {
    playbackTime: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isPublic: boolean | null
    creatorId: string | null
    currentStreamId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPlaying: boolean | null
    lastSyncTime: Date | null
    playbackTime: number | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isPublic: boolean | null
    creatorId: string | null
    currentStreamId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPlaying: boolean | null
    lastSyncTime: Date | null
    playbackTime: number | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isPublic: number
    creatorId: number
    currentStreamId: number
    createdAt: number
    updatedAt: number
    isPlaying: number
    lastSyncTime: number
    playbackTime: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    playbackTime?: true
  }

  export type RoomSumAggregateInputType = {
    playbackTime?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isPublic?: true
    creatorId?: true
    currentStreamId?: true
    createdAt?: true
    updatedAt?: true
    isPlaying?: true
    lastSyncTime?: true
    playbackTime?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isPublic?: true
    creatorId?: true
    currentStreamId?: true
    createdAt?: true
    updatedAt?: true
    isPlaying?: true
    lastSyncTime?: true
    playbackTime?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isPublic?: true
    creatorId?: true
    currentStreamId?: true
    createdAt?: true
    updatedAt?: true
    isPlaying?: true
    lastSyncTime?: true
    playbackTime?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isPublic: boolean
    creatorId: string
    currentStreamId: string | null
    createdAt: Date
    updatedAt: Date
    isPlaying: boolean
    lastSyncTime: Date | null
    playbackTime: number | null
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    creatorId?: boolean
    currentStreamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPlaying?: boolean
    lastSyncTime?: boolean
    playbackTime?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    currentStream?: boolean | Room$currentStreamArgs<ExtArgs>
    members?: boolean | Room$membersArgs<ExtArgs>
    streams?: boolean | Room$streamsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    creatorId?: boolean
    currentStreamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPlaying?: boolean
    lastSyncTime?: boolean
    playbackTime?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    currentStream?: boolean | Room$currentStreamArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    creatorId?: boolean
    currentStreamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPlaying?: boolean
    lastSyncTime?: boolean
    playbackTime?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    currentStream?: boolean | Room$currentStreamArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    creatorId?: boolean
    currentStreamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPlaying?: boolean
    lastSyncTime?: boolean
    playbackTime?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isPublic" | "creatorId" | "currentStreamId" | "createdAt" | "updatedAt" | "isPlaying" | "lastSyncTime" | "playbackTime", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    currentStream?: boolean | Room$currentStreamArgs<ExtArgs>
    members?: boolean | Room$membersArgs<ExtArgs>
    streams?: boolean | Room$streamsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    currentStream?: boolean | Room$currentStreamArgs<ExtArgs>
  }
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    currentStream?: boolean | Room$currentStreamArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      currentStream: Prisma.$RoomStreamPayload<ExtArgs> | null
      members: Prisma.$RoomMemberPayload<ExtArgs>[]
      streams: Prisma.$RoomStreamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isPublic: boolean
      creatorId: string
      currentStreamId: string | null
      createdAt: Date
      updatedAt: Date
      isPlaying: boolean
      lastSyncTime: Date | null
      playbackTime: number | null
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
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
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    currentStream<T extends Room$currentStreamArgs<ExtArgs> = {}>(args?: Subset<T, Room$currentStreamArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    members<T extends Room$membersArgs<ExtArgs> = {}>(args?: Subset<T, Room$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    streams<T extends Room$streamsArgs<ExtArgs> = {}>(args?: Subset<T, Room$streamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly description: FieldRef<"Room", 'String'>
    readonly isPublic: FieldRef<"Room", 'Boolean'>
    readonly creatorId: FieldRef<"Room", 'String'>
    readonly currentStreamId: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
    readonly isPlaying: FieldRef<"Room", 'Boolean'>
    readonly lastSyncTime: FieldRef<"Room", 'DateTime'>
    readonly playbackTime: FieldRef<"Room", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.currentStream
   */
  export type Room$currentStreamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    where?: RoomStreamWhereInput
  }

  /**
   * Room.members
   */
  export type Room$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    where?: RoomMemberWhereInput
    orderBy?: RoomMemberOrderByWithRelationInput | RoomMemberOrderByWithRelationInput[]
    cursor?: RoomMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[]
  }

  /**
   * Room.streams
   */
  export type Room$streamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    where?: RoomStreamWhereInput
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    cursor?: RoomStreamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamScalarFieldEnum | RoomStreamScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomMember
   */

  export type AggregateRoomMember = {
    _count: RoomMemberCountAggregateOutputType | null
    _min: RoomMemberMinAggregateOutputType | null
    _max: RoomMemberMaxAggregateOutputType | null
  }

  export type RoomMemberMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    role: $Enums.RoomMemberRole | null
    joinedAt: Date | null
  }

  export type RoomMemberMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    role: $Enums.RoomMemberRole | null
    joinedAt: Date | null
  }

  export type RoomMemberCountAggregateOutputType = {
    id: number
    roomId: number
    userId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type RoomMemberMinAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type RoomMemberMaxAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type RoomMemberCountAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type RoomMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomMember to aggregate.
     */
    where?: RoomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?: RoomMemberOrderByWithRelationInput | RoomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomMembers
    **/
    _count?: true | RoomMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMemberMaxAggregateInputType
  }

  export type GetRoomMemberAggregateType<T extends RoomMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomMember[P]>
      : GetScalarType<T[P], AggregateRoomMember[P]>
  }




  export type RoomMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomMemberWhereInput
    orderBy?: RoomMemberOrderByWithAggregationInput | RoomMemberOrderByWithAggregationInput[]
    by: RoomMemberScalarFieldEnum[] | RoomMemberScalarFieldEnum
    having?: RoomMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomMemberCountAggregateInputType | true
    _min?: RoomMemberMinAggregateInputType
    _max?: RoomMemberMaxAggregateInputType
  }

  export type RoomMemberGroupByOutputType = {
    id: string
    roomId: string
    userId: string
    role: $Enums.RoomMemberRole
    joinedAt: Date
    _count: RoomMemberCountAggregateOutputType | null
    _min: RoomMemberMinAggregateOutputType | null
    _max: RoomMemberMaxAggregateOutputType | null
  }

  type GetRoomMemberGroupByPayload<T extends RoomMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomMemberGroupByOutputType[P]>
            : GetScalarType<T[P], RoomMemberGroupByOutputType[P]>
        }
      >
    >


  export type RoomMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomMember"]>

  export type RoomMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomMember"]>

  export type RoomMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomMember"]>

  export type RoomMemberSelectScalar = {
    id?: boolean
    roomId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type RoomMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "userId" | "role" | "joinedAt", ExtArgs["result"]["roomMember"]>
  export type RoomMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomMember"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      userId: string
      role: $Enums.RoomMemberRole
      joinedAt: Date
    }, ExtArgs["result"]["roomMember"]>
    composites: {}
  }

  type RoomMemberGetPayload<S extends boolean | null | undefined | RoomMemberDefaultArgs> = $Result.GetResult<Prisma.$RoomMemberPayload, S>

  type RoomMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomMemberCountAggregateInputType | true
    }

  export interface RoomMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomMember'], meta: { name: 'RoomMember' } }
    /**
     * Find zero or one RoomMember that matches the filter.
     * @param {RoomMemberFindUniqueArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomMemberFindUniqueArgs>(args: SelectSubset<T, RoomMemberFindUniqueArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomMemberFindUniqueOrThrowArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberFindFirstArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomMemberFindFirstArgs>(args?: SelectSubset<T, RoomMemberFindFirstArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberFindFirstOrThrowArgs} args - Arguments to find a RoomMember
     * @example
     * // Get one RoomMember
     * const roomMember = await prisma.roomMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomMembers
     * const roomMembers = await prisma.roomMember.findMany()
     * 
     * // Get first 10 RoomMembers
     * const roomMembers = await prisma.roomMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomMemberWithIdOnly = await prisma.roomMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomMemberFindManyArgs>(args?: SelectSubset<T, RoomMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomMember.
     * @param {RoomMemberCreateArgs} args - Arguments to create a RoomMember.
     * @example
     * // Create one RoomMember
     * const RoomMember = await prisma.roomMember.create({
     *   data: {
     *     // ... data to create a RoomMember
     *   }
     * })
     * 
     */
    create<T extends RoomMemberCreateArgs>(args: SelectSubset<T, RoomMemberCreateArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomMembers.
     * @param {RoomMemberCreateManyArgs} args - Arguments to create many RoomMembers.
     * @example
     * // Create many RoomMembers
     * const roomMember = await prisma.roomMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomMemberCreateManyArgs>(args?: SelectSubset<T, RoomMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomMembers and returns the data saved in the database.
     * @param {RoomMemberCreateManyAndReturnArgs} args - Arguments to create many RoomMembers.
     * @example
     * // Create many RoomMembers
     * const roomMember = await prisma.roomMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomMembers and only return the `id`
     * const roomMemberWithIdOnly = await prisma.roomMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomMember.
     * @param {RoomMemberDeleteArgs} args - Arguments to delete one RoomMember.
     * @example
     * // Delete one RoomMember
     * const RoomMember = await prisma.roomMember.delete({
     *   where: {
     *     // ... filter to delete one RoomMember
     *   }
     * })
     * 
     */
    delete<T extends RoomMemberDeleteArgs>(args: SelectSubset<T, RoomMemberDeleteArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomMember.
     * @param {RoomMemberUpdateArgs} args - Arguments to update one RoomMember.
     * @example
     * // Update one RoomMember
     * const roomMember = await prisma.roomMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomMemberUpdateArgs>(args: SelectSubset<T, RoomMemberUpdateArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomMembers.
     * @param {RoomMemberDeleteManyArgs} args - Arguments to filter RoomMembers to delete.
     * @example
     * // Delete a few RoomMembers
     * const { count } = await prisma.roomMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomMemberDeleteManyArgs>(args?: SelectSubset<T, RoomMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomMembers
     * const roomMember = await prisma.roomMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomMemberUpdateManyArgs>(args: SelectSubset<T, RoomMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomMembers and returns the data updated in the database.
     * @param {RoomMemberUpdateManyAndReturnArgs} args - Arguments to update many RoomMembers.
     * @example
     * // Update many RoomMembers
     * const roomMember = await prisma.roomMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomMembers and only return the `id`
     * const roomMemberWithIdOnly = await prisma.roomMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomMember.
     * @param {RoomMemberUpsertArgs} args - Arguments to update or create a RoomMember.
     * @example
     * // Update or create a RoomMember
     * const roomMember = await prisma.roomMember.upsert({
     *   create: {
     *     // ... data to create a RoomMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomMember we want to update
     *   }
     * })
     */
    upsert<T extends RoomMemberUpsertArgs>(args: SelectSubset<T, RoomMemberUpsertArgs<ExtArgs>>): Prisma__RoomMemberClient<$Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberCountArgs} args - Arguments to filter RoomMembers to count.
     * @example
     * // Count the number of RoomMembers
     * const count = await prisma.roomMember.count({
     *   where: {
     *     // ... the filter for the RoomMembers we want to count
     *   }
     * })
    **/
    count<T extends RoomMemberCountArgs>(
      args?: Subset<T, RoomMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomMemberAggregateArgs>(args: Subset<T, RoomMemberAggregateArgs>): Prisma.PrismaPromise<GetRoomMemberAggregateType<T>>

    /**
     * Group by RoomMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomMemberGroupByArgs} args - Group by arguments.
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
      T extends RoomMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomMemberGroupByArgs['orderBy'] }
        : { orderBy?: RoomMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomMember model
   */
  readonly fields: RoomMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RoomMember model
   */
  interface RoomMemberFieldRefs {
    readonly id: FieldRef<"RoomMember", 'String'>
    readonly roomId: FieldRef<"RoomMember", 'String'>
    readonly userId: FieldRef<"RoomMember", 'String'>
    readonly role: FieldRef<"RoomMember", 'RoomMemberRole'>
    readonly joinedAt: FieldRef<"RoomMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomMember findUnique
   */
  export type RoomMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * Filter, which RoomMember to fetch.
     */
    where: RoomMemberWhereUniqueInput
  }

  /**
   * RoomMember findUniqueOrThrow
   */
  export type RoomMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * Filter, which RoomMember to fetch.
     */
    where: RoomMemberWhereUniqueInput
  }

  /**
   * RoomMember findFirst
   */
  export type RoomMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * Filter, which RoomMember to fetch.
     */
    where?: RoomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?: RoomMemberOrderByWithRelationInput | RoomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomMembers.
     */
    cursor?: RoomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomMembers.
     */
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[]
  }

  /**
   * RoomMember findFirstOrThrow
   */
  export type RoomMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * Filter, which RoomMember to fetch.
     */
    where?: RoomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?: RoomMemberOrderByWithRelationInput | RoomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomMembers.
     */
    cursor?: RoomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomMembers.
     */
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[]
  }

  /**
   * RoomMember findMany
   */
  export type RoomMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * Filter, which RoomMembers to fetch.
     */
    where?: RoomMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomMembers to fetch.
     */
    orderBy?: RoomMemberOrderByWithRelationInput | RoomMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomMembers.
     */
    cursor?: RoomMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomMembers.
     */
    skip?: number
    distinct?: RoomMemberScalarFieldEnum | RoomMemberScalarFieldEnum[]
  }

  /**
   * RoomMember create
   */
  export type RoomMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomMember.
     */
    data: XOR<RoomMemberCreateInput, RoomMemberUncheckedCreateInput>
  }

  /**
   * RoomMember createMany
   */
  export type RoomMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomMembers.
     */
    data: RoomMemberCreateManyInput | RoomMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomMember createManyAndReturn
   */
  export type RoomMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * The data used to create many RoomMembers.
     */
    data: RoomMemberCreateManyInput | RoomMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomMember update
   */
  export type RoomMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomMember.
     */
    data: XOR<RoomMemberUpdateInput, RoomMemberUncheckedUpdateInput>
    /**
     * Choose, which RoomMember to update.
     */
    where: RoomMemberWhereUniqueInput
  }

  /**
   * RoomMember updateMany
   */
  export type RoomMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomMembers.
     */
    data: XOR<RoomMemberUpdateManyMutationInput, RoomMemberUncheckedUpdateManyInput>
    /**
     * Filter which RoomMembers to update
     */
    where?: RoomMemberWhereInput
    /**
     * Limit how many RoomMembers to update.
     */
    limit?: number
  }

  /**
   * RoomMember updateManyAndReturn
   */
  export type RoomMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * The data used to update RoomMembers.
     */
    data: XOR<RoomMemberUpdateManyMutationInput, RoomMemberUncheckedUpdateManyInput>
    /**
     * Filter which RoomMembers to update
     */
    where?: RoomMemberWhereInput
    /**
     * Limit how many RoomMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomMember upsert
   */
  export type RoomMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomMember to update in case it exists.
     */
    where: RoomMemberWhereUniqueInput
    /**
     * In case the RoomMember found by the `where` argument doesn't exist, create a new RoomMember with this data.
     */
    create: XOR<RoomMemberCreateInput, RoomMemberUncheckedCreateInput>
    /**
     * In case the RoomMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomMemberUpdateInput, RoomMemberUncheckedUpdateInput>
  }

  /**
   * RoomMember delete
   */
  export type RoomMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
    /**
     * Filter which RoomMember to delete.
     */
    where: RoomMemberWhereUniqueInput
  }

  /**
   * RoomMember deleteMany
   */
  export type RoomMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomMembers to delete
     */
    where?: RoomMemberWhereInput
    /**
     * Limit how many RoomMembers to delete.
     */
    limit?: number
  }

  /**
   * RoomMember without action
   */
  export type RoomMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomMember
     */
    select?: RoomMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomMember
     */
    omit?: RoomMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomMemberInclude<ExtArgs> | null
  }


  /**
   * Model RoomStream
   */

  export type AggregateRoomStream = {
    _count: RoomStreamCountAggregateOutputType | null
    _avg: RoomStreamAvgAggregateOutputType | null
    _sum: RoomStreamSumAggregateOutputType | null
    _min: RoomStreamMinAggregateOutputType | null
    _max: RoomStreamMaxAggregateOutputType | null
  }

  export type RoomStreamAvgAggregateOutputType = {
    order: number | null
  }

  export type RoomStreamSumAggregateOutputType = {
    order: number | null
  }

  export type RoomStreamMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    streamId: string | null
    addedById: string | null
    addedAt: Date | null
    order: number | null
  }

  export type RoomStreamMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    streamId: string | null
    addedById: string | null
    addedAt: Date | null
    order: number | null
  }

  export type RoomStreamCountAggregateOutputType = {
    id: number
    roomId: number
    streamId: number
    addedById: number
    addedAt: number
    order: number
    _all: number
  }


  export type RoomStreamAvgAggregateInputType = {
    order?: true
  }

  export type RoomStreamSumAggregateInputType = {
    order?: true
  }

  export type RoomStreamMinAggregateInputType = {
    id?: true
    roomId?: true
    streamId?: true
    addedById?: true
    addedAt?: true
    order?: true
  }

  export type RoomStreamMaxAggregateInputType = {
    id?: true
    roomId?: true
    streamId?: true
    addedById?: true
    addedAt?: true
    order?: true
  }

  export type RoomStreamCountAggregateInputType = {
    id?: true
    roomId?: true
    streamId?: true
    addedById?: true
    addedAt?: true
    order?: true
    _all?: true
  }

  export type RoomStreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStream to aggregate.
     */
    where?: RoomStreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreams to fetch.
     */
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStreams
    **/
    _count?: true | RoomStreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomStreamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomStreamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStreamMaxAggregateInputType
  }

  export type GetRoomStreamAggregateType<T extends RoomStreamAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStream[P]>
      : GetScalarType<T[P], AggregateRoomStream[P]>
  }




  export type RoomStreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamWhereInput
    orderBy?: RoomStreamOrderByWithAggregationInput | RoomStreamOrderByWithAggregationInput[]
    by: RoomStreamScalarFieldEnum[] | RoomStreamScalarFieldEnum
    having?: RoomStreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStreamCountAggregateInputType | true
    _avg?: RoomStreamAvgAggregateInputType
    _sum?: RoomStreamSumAggregateInputType
    _min?: RoomStreamMinAggregateInputType
    _max?: RoomStreamMaxAggregateInputType
  }

  export type RoomStreamGroupByOutputType = {
    id: string
    roomId: string
    streamId: string
    addedById: string
    addedAt: Date
    order: number
    _count: RoomStreamCountAggregateOutputType | null
    _avg: RoomStreamAvgAggregateOutputType | null
    _sum: RoomStreamSumAggregateOutputType | null
    _min: RoomStreamMinAggregateOutputType | null
    _max: RoomStreamMaxAggregateOutputType | null
  }

  type GetRoomStreamGroupByPayload<T extends RoomStreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStreamGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStreamGroupByOutputType[P]>
        }
      >
    >


  export type RoomStreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    streamId?: boolean
    addedById?: boolean
    addedAt?: boolean
    order?: boolean
    currentInRooms?: boolean | RoomStream$currentInRoomsArgs<ExtArgs>
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    upvotes?: boolean | RoomStream$upvotesArgs<ExtArgs>
    skipVotes?: boolean | RoomStream$skipVotesArgs<ExtArgs>
    _count?: boolean | RoomStreamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStream"]>

  export type RoomStreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    streamId?: boolean
    addedById?: boolean
    addedAt?: boolean
    order?: boolean
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStream"]>

  export type RoomStreamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    streamId?: boolean
    addedById?: boolean
    addedAt?: boolean
    order?: boolean
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStream"]>

  export type RoomStreamSelectScalar = {
    id?: boolean
    roomId?: boolean
    streamId?: boolean
    addedById?: boolean
    addedAt?: boolean
    order?: boolean
  }

  export type RoomStreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "streamId" | "addedById" | "addedAt" | "order", ExtArgs["result"]["roomStream"]>
  export type RoomStreamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentInRooms?: boolean | RoomStream$currentInRoomsArgs<ExtArgs>
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
    upvotes?: boolean | RoomStream$upvotesArgs<ExtArgs>
    skipVotes?: boolean | RoomStream$skipVotesArgs<ExtArgs>
    _count?: boolean | RoomStreamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomStreamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type RoomStreamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addedBy?: boolean | UserDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $RoomStreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStream"
    objects: {
      currentInRooms: Prisma.$RoomPayload<ExtArgs>[]
      addedBy: Prisma.$UserPayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs>
      stream: Prisma.$StreamPayload<ExtArgs>
      upvotes: Prisma.$RoomStreamUpvotePayload<ExtArgs>[]
      skipVotes: Prisma.$SkipVotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      streamId: string
      addedById: string
      addedAt: Date
      order: number
    }, ExtArgs["result"]["roomStream"]>
    composites: {}
  }

  type RoomStreamGetPayload<S extends boolean | null | undefined | RoomStreamDefaultArgs> = $Result.GetResult<Prisma.$RoomStreamPayload, S>

  type RoomStreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomStreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomStreamCountAggregateInputType | true
    }

  export interface RoomStreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStream'], meta: { name: 'RoomStream' } }
    /**
     * Find zero or one RoomStream that matches the filter.
     * @param {RoomStreamFindUniqueArgs} args - Arguments to find a RoomStream
     * @example
     * // Get one RoomStream
     * const roomStream = await prisma.roomStream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStreamFindUniqueArgs>(args: SelectSubset<T, RoomStreamFindUniqueArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomStream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomStreamFindUniqueOrThrowArgs} args - Arguments to find a RoomStream
     * @example
     * // Get one RoomStream
     * const roomStream = await prisma.roomStream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStreamFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamFindFirstArgs} args - Arguments to find a RoomStream
     * @example
     * // Get one RoomStream
     * const roomStream = await prisma.roomStream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStreamFindFirstArgs>(args?: SelectSubset<T, RoomStreamFindFirstArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamFindFirstOrThrowArgs} args - Arguments to find a RoomStream
     * @example
     * // Get one RoomStream
     * const roomStream = await prisma.roomStream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStreamFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomStreams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStreams
     * const roomStreams = await prisma.roomStream.findMany()
     * 
     * // Get first 10 RoomStreams
     * const roomStreams = await prisma.roomStream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomStreamWithIdOnly = await prisma.roomStream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomStreamFindManyArgs>(args?: SelectSubset<T, RoomStreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomStream.
     * @param {RoomStreamCreateArgs} args - Arguments to create a RoomStream.
     * @example
     * // Create one RoomStream
     * const RoomStream = await prisma.roomStream.create({
     *   data: {
     *     // ... data to create a RoomStream
     *   }
     * })
     * 
     */
    create<T extends RoomStreamCreateArgs>(args: SelectSubset<T, RoomStreamCreateArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomStreams.
     * @param {RoomStreamCreateManyArgs} args - Arguments to create many RoomStreams.
     * @example
     * // Create many RoomStreams
     * const roomStream = await prisma.roomStream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStreamCreateManyArgs>(args?: SelectSubset<T, RoomStreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStreams and returns the data saved in the database.
     * @param {RoomStreamCreateManyAndReturnArgs} args - Arguments to create many RoomStreams.
     * @example
     * // Create many RoomStreams
     * const roomStream = await prisma.roomStream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStreams and only return the `id`
     * const roomStreamWithIdOnly = await prisma.roomStream.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStreamCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStreamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomStream.
     * @param {RoomStreamDeleteArgs} args - Arguments to delete one RoomStream.
     * @example
     * // Delete one RoomStream
     * const RoomStream = await prisma.roomStream.delete({
     *   where: {
     *     // ... filter to delete one RoomStream
     *   }
     * })
     * 
     */
    delete<T extends RoomStreamDeleteArgs>(args: SelectSubset<T, RoomStreamDeleteArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomStream.
     * @param {RoomStreamUpdateArgs} args - Arguments to update one RoomStream.
     * @example
     * // Update one RoomStream
     * const roomStream = await prisma.roomStream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStreamUpdateArgs>(args: SelectSubset<T, RoomStreamUpdateArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomStreams.
     * @param {RoomStreamDeleteManyArgs} args - Arguments to filter RoomStreams to delete.
     * @example
     * // Delete a few RoomStreams
     * const { count } = await prisma.roomStream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStreamDeleteManyArgs>(args?: SelectSubset<T, RoomStreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStreams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStreams
     * const roomStream = await prisma.roomStream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStreamUpdateManyArgs>(args: SelectSubset<T, RoomStreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStreams and returns the data updated in the database.
     * @param {RoomStreamUpdateManyAndReturnArgs} args - Arguments to update many RoomStreams.
     * @example
     * // Update many RoomStreams
     * const roomStream = await prisma.roomStream.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomStreams and only return the `id`
     * const roomStreamWithIdOnly = await prisma.roomStream.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomStreamUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomStreamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomStream.
     * @param {RoomStreamUpsertArgs} args - Arguments to update or create a RoomStream.
     * @example
     * // Update or create a RoomStream
     * const roomStream = await prisma.roomStream.upsert({
     *   create: {
     *     // ... data to create a RoomStream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStream we want to update
     *   }
     * })
     */
    upsert<T extends RoomStreamUpsertArgs>(args: SelectSubset<T, RoomStreamUpsertArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomStreams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamCountArgs} args - Arguments to filter RoomStreams to count.
     * @example
     * // Count the number of RoomStreams
     * const count = await prisma.roomStream.count({
     *   where: {
     *     // ... the filter for the RoomStreams we want to count
     *   }
     * })
    **/
    count<T extends RoomStreamCountArgs>(
      args?: Subset<T, RoomStreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomStreamAggregateArgs>(args: Subset<T, RoomStreamAggregateArgs>): Prisma.PrismaPromise<GetRoomStreamAggregateType<T>>

    /**
     * Group by RoomStream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamGroupByArgs} args - Group by arguments.
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
      T extends RoomStreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStreamGroupByArgs['orderBy'] }
        : { orderBy?: RoomStreamGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomStreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStream model
   */
  readonly fields: RoomStreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    currentInRooms<T extends RoomStream$currentInRoomsArgs<ExtArgs> = {}>(args?: Subset<T, RoomStream$currentInRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    upvotes<T extends RoomStream$upvotesArgs<ExtArgs> = {}>(args?: Subset<T, RoomStream$upvotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skipVotes<T extends RoomStream$skipVotesArgs<ExtArgs> = {}>(args?: Subset<T, RoomStream$skipVotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the RoomStream model
   */
  interface RoomStreamFieldRefs {
    readonly id: FieldRef<"RoomStream", 'String'>
    readonly roomId: FieldRef<"RoomStream", 'String'>
    readonly streamId: FieldRef<"RoomStream", 'String'>
    readonly addedById: FieldRef<"RoomStream", 'String'>
    readonly addedAt: FieldRef<"RoomStream", 'DateTime'>
    readonly order: FieldRef<"RoomStream", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RoomStream findUnique
   */
  export type RoomStreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * Filter, which RoomStream to fetch.
     */
    where: RoomStreamWhereUniqueInput
  }

  /**
   * RoomStream findUniqueOrThrow
   */
  export type RoomStreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * Filter, which RoomStream to fetch.
     */
    where: RoomStreamWhereUniqueInput
  }

  /**
   * RoomStream findFirst
   */
  export type RoomStreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * Filter, which RoomStream to fetch.
     */
    where?: RoomStreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreams to fetch.
     */
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStreams.
     */
    cursor?: RoomStreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStreams.
     */
    distinct?: RoomStreamScalarFieldEnum | RoomStreamScalarFieldEnum[]
  }

  /**
   * RoomStream findFirstOrThrow
   */
  export type RoomStreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * Filter, which RoomStream to fetch.
     */
    where?: RoomStreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreams to fetch.
     */
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStreams.
     */
    cursor?: RoomStreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStreams.
     */
    distinct?: RoomStreamScalarFieldEnum | RoomStreamScalarFieldEnum[]
  }

  /**
   * RoomStream findMany
   */
  export type RoomStreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreams to fetch.
     */
    where?: RoomStreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreams to fetch.
     */
    orderBy?: RoomStreamOrderByWithRelationInput | RoomStreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStreams.
     */
    cursor?: RoomStreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreams.
     */
    skip?: number
    distinct?: RoomStreamScalarFieldEnum | RoomStreamScalarFieldEnum[]
  }

  /**
   * RoomStream create
   */
  export type RoomStreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStream.
     */
    data: XOR<RoomStreamCreateInput, RoomStreamUncheckedCreateInput>
  }

  /**
   * RoomStream createMany
   */
  export type RoomStreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStreams.
     */
    data: RoomStreamCreateManyInput | RoomStreamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStream createManyAndReturn
   */
  export type RoomStreamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * The data used to create many RoomStreams.
     */
    data: RoomStreamCreateManyInput | RoomStreamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStream update
   */
  export type RoomStreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStream.
     */
    data: XOR<RoomStreamUpdateInput, RoomStreamUncheckedUpdateInput>
    /**
     * Choose, which RoomStream to update.
     */
    where: RoomStreamWhereUniqueInput
  }

  /**
   * RoomStream updateMany
   */
  export type RoomStreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStreams.
     */
    data: XOR<RoomStreamUpdateManyMutationInput, RoomStreamUncheckedUpdateManyInput>
    /**
     * Filter which RoomStreams to update
     */
    where?: RoomStreamWhereInput
    /**
     * Limit how many RoomStreams to update.
     */
    limit?: number
  }

  /**
   * RoomStream updateManyAndReturn
   */
  export type RoomStreamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * The data used to update RoomStreams.
     */
    data: XOR<RoomStreamUpdateManyMutationInput, RoomStreamUncheckedUpdateManyInput>
    /**
     * Filter which RoomStreams to update
     */
    where?: RoomStreamWhereInput
    /**
     * Limit how many RoomStreams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStream upsert
   */
  export type RoomStreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStream to update in case it exists.
     */
    where: RoomStreamWhereUniqueInput
    /**
     * In case the RoomStream found by the `where` argument doesn't exist, create a new RoomStream with this data.
     */
    create: XOR<RoomStreamCreateInput, RoomStreamUncheckedCreateInput>
    /**
     * In case the RoomStream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStreamUpdateInput, RoomStreamUncheckedUpdateInput>
  }

  /**
   * RoomStream delete
   */
  export type RoomStreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
    /**
     * Filter which RoomStream to delete.
     */
    where: RoomStreamWhereUniqueInput
  }

  /**
   * RoomStream deleteMany
   */
  export type RoomStreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStreams to delete
     */
    where?: RoomStreamWhereInput
    /**
     * Limit how many RoomStreams to delete.
     */
    limit?: number
  }

  /**
   * RoomStream.currentInRooms
   */
  export type RoomStream$currentInRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * RoomStream.upvotes
   */
  export type RoomStream$upvotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    where?: RoomStreamUpvoteWhereInput
    orderBy?: RoomStreamUpvoteOrderByWithRelationInput | RoomStreamUpvoteOrderByWithRelationInput[]
    cursor?: RoomStreamUpvoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamUpvoteScalarFieldEnum | RoomStreamUpvoteScalarFieldEnum[]
  }

  /**
   * RoomStream.skipVotes
   */
  export type RoomStream$skipVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    where?: SkipVoteWhereInput
    orderBy?: SkipVoteOrderByWithRelationInput | SkipVoteOrderByWithRelationInput[]
    cursor?: SkipVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkipVoteScalarFieldEnum | SkipVoteScalarFieldEnum[]
  }

  /**
   * RoomStream without action
   */
  export type RoomStreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStream
     */
    select?: RoomStreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStream
     */
    omit?: RoomStreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamInclude<ExtArgs> | null
  }


  /**
   * Model RoomStreamUpvote
   */

  export type AggregateRoomStreamUpvote = {
    _count: RoomStreamUpvoteCountAggregateOutputType | null
    _min: RoomStreamUpvoteMinAggregateOutputType | null
    _max: RoomStreamUpvoteMaxAggregateOutputType | null
  }

  export type RoomStreamUpvoteMinAggregateOutputType = {
    id: string | null
    roomStreamId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type RoomStreamUpvoteMaxAggregateOutputType = {
    id: string | null
    roomStreamId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type RoomStreamUpvoteCountAggregateOutputType = {
    id: number
    roomStreamId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type RoomStreamUpvoteMinAggregateInputType = {
    id?: true
    roomStreamId?: true
    userId?: true
    createdAt?: true
  }

  export type RoomStreamUpvoteMaxAggregateInputType = {
    id?: true
    roomStreamId?: true
    userId?: true
    createdAt?: true
  }

  export type RoomStreamUpvoteCountAggregateInputType = {
    id?: true
    roomStreamId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type RoomStreamUpvoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStreamUpvote to aggregate.
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamUpvotes to fetch.
     */
    orderBy?: RoomStreamUpvoteOrderByWithRelationInput | RoomStreamUpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStreamUpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamUpvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamUpvotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStreamUpvotes
    **/
    _count?: true | RoomStreamUpvoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStreamUpvoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStreamUpvoteMaxAggregateInputType
  }

  export type GetRoomStreamUpvoteAggregateType<T extends RoomStreamUpvoteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStreamUpvote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStreamUpvote[P]>
      : GetScalarType<T[P], AggregateRoomStreamUpvote[P]>
  }




  export type RoomStreamUpvoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamUpvoteWhereInput
    orderBy?: RoomStreamUpvoteOrderByWithAggregationInput | RoomStreamUpvoteOrderByWithAggregationInput[]
    by: RoomStreamUpvoteScalarFieldEnum[] | RoomStreamUpvoteScalarFieldEnum
    having?: RoomStreamUpvoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStreamUpvoteCountAggregateInputType | true
    _min?: RoomStreamUpvoteMinAggregateInputType
    _max?: RoomStreamUpvoteMaxAggregateInputType
  }

  export type RoomStreamUpvoteGroupByOutputType = {
    id: string
    roomStreamId: string
    userId: string
    createdAt: Date
    _count: RoomStreamUpvoteCountAggregateOutputType | null
    _min: RoomStreamUpvoteMinAggregateOutputType | null
    _max: RoomStreamUpvoteMaxAggregateOutputType | null
  }

  type GetRoomStreamUpvoteGroupByPayload<T extends RoomStreamUpvoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStreamUpvoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStreamUpvoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStreamUpvoteGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStreamUpvoteGroupByOutputType[P]>
        }
      >
    >


  export type RoomStreamUpvoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStreamUpvote"]>

  export type RoomStreamUpvoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStreamUpvote"]>

  export type RoomStreamUpvoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStreamUpvote"]>

  export type RoomStreamUpvoteSelectScalar = {
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type RoomStreamUpvoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomStreamId" | "userId" | "createdAt", ExtArgs["result"]["roomStreamUpvote"]>
  export type RoomStreamUpvoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomStreamUpvoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomStreamUpvoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomStreamUpvotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStreamUpvote"
    objects: {
      roomStream: Prisma.$RoomStreamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomStreamId: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["roomStreamUpvote"]>
    composites: {}
  }

  type RoomStreamUpvoteGetPayload<S extends boolean | null | undefined | RoomStreamUpvoteDefaultArgs> = $Result.GetResult<Prisma.$RoomStreamUpvotePayload, S>

  type RoomStreamUpvoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomStreamUpvoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomStreamUpvoteCountAggregateInputType | true
    }

  export interface RoomStreamUpvoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStreamUpvote'], meta: { name: 'RoomStreamUpvote' } }
    /**
     * Find zero or one RoomStreamUpvote that matches the filter.
     * @param {RoomStreamUpvoteFindUniqueArgs} args - Arguments to find a RoomStreamUpvote
     * @example
     * // Get one RoomStreamUpvote
     * const roomStreamUpvote = await prisma.roomStreamUpvote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStreamUpvoteFindUniqueArgs>(args: SelectSubset<T, RoomStreamUpvoteFindUniqueArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomStreamUpvote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomStreamUpvoteFindUniqueOrThrowArgs} args - Arguments to find a RoomStreamUpvote
     * @example
     * // Get one RoomStreamUpvote
     * const roomStreamUpvote = await prisma.roomStreamUpvote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStreamUpvoteFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStreamUpvoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStreamUpvote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteFindFirstArgs} args - Arguments to find a RoomStreamUpvote
     * @example
     * // Get one RoomStreamUpvote
     * const roomStreamUpvote = await prisma.roomStreamUpvote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStreamUpvoteFindFirstArgs>(args?: SelectSubset<T, RoomStreamUpvoteFindFirstArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStreamUpvote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteFindFirstOrThrowArgs} args - Arguments to find a RoomStreamUpvote
     * @example
     * // Get one RoomStreamUpvote
     * const roomStreamUpvote = await prisma.roomStreamUpvote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStreamUpvoteFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStreamUpvoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomStreamUpvotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStreamUpvotes
     * const roomStreamUpvotes = await prisma.roomStreamUpvote.findMany()
     * 
     * // Get first 10 RoomStreamUpvotes
     * const roomStreamUpvotes = await prisma.roomStreamUpvote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomStreamUpvoteWithIdOnly = await prisma.roomStreamUpvote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomStreamUpvoteFindManyArgs>(args?: SelectSubset<T, RoomStreamUpvoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomStreamUpvote.
     * @param {RoomStreamUpvoteCreateArgs} args - Arguments to create a RoomStreamUpvote.
     * @example
     * // Create one RoomStreamUpvote
     * const RoomStreamUpvote = await prisma.roomStreamUpvote.create({
     *   data: {
     *     // ... data to create a RoomStreamUpvote
     *   }
     * })
     * 
     */
    create<T extends RoomStreamUpvoteCreateArgs>(args: SelectSubset<T, RoomStreamUpvoteCreateArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomStreamUpvotes.
     * @param {RoomStreamUpvoteCreateManyArgs} args - Arguments to create many RoomStreamUpvotes.
     * @example
     * // Create many RoomStreamUpvotes
     * const roomStreamUpvote = await prisma.roomStreamUpvote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStreamUpvoteCreateManyArgs>(args?: SelectSubset<T, RoomStreamUpvoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStreamUpvotes and returns the data saved in the database.
     * @param {RoomStreamUpvoteCreateManyAndReturnArgs} args - Arguments to create many RoomStreamUpvotes.
     * @example
     * // Create many RoomStreamUpvotes
     * const roomStreamUpvote = await prisma.roomStreamUpvote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStreamUpvotes and only return the `id`
     * const roomStreamUpvoteWithIdOnly = await prisma.roomStreamUpvote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStreamUpvoteCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStreamUpvoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomStreamUpvote.
     * @param {RoomStreamUpvoteDeleteArgs} args - Arguments to delete one RoomStreamUpvote.
     * @example
     * // Delete one RoomStreamUpvote
     * const RoomStreamUpvote = await prisma.roomStreamUpvote.delete({
     *   where: {
     *     // ... filter to delete one RoomStreamUpvote
     *   }
     * })
     * 
     */
    delete<T extends RoomStreamUpvoteDeleteArgs>(args: SelectSubset<T, RoomStreamUpvoteDeleteArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomStreamUpvote.
     * @param {RoomStreamUpvoteUpdateArgs} args - Arguments to update one RoomStreamUpvote.
     * @example
     * // Update one RoomStreamUpvote
     * const roomStreamUpvote = await prisma.roomStreamUpvote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStreamUpvoteUpdateArgs>(args: SelectSubset<T, RoomStreamUpvoteUpdateArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomStreamUpvotes.
     * @param {RoomStreamUpvoteDeleteManyArgs} args - Arguments to filter RoomStreamUpvotes to delete.
     * @example
     * // Delete a few RoomStreamUpvotes
     * const { count } = await prisma.roomStreamUpvote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStreamUpvoteDeleteManyArgs>(args?: SelectSubset<T, RoomStreamUpvoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStreamUpvotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStreamUpvotes
     * const roomStreamUpvote = await prisma.roomStreamUpvote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStreamUpvoteUpdateManyArgs>(args: SelectSubset<T, RoomStreamUpvoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStreamUpvotes and returns the data updated in the database.
     * @param {RoomStreamUpvoteUpdateManyAndReturnArgs} args - Arguments to update many RoomStreamUpvotes.
     * @example
     * // Update many RoomStreamUpvotes
     * const roomStreamUpvote = await prisma.roomStreamUpvote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomStreamUpvotes and only return the `id`
     * const roomStreamUpvoteWithIdOnly = await prisma.roomStreamUpvote.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomStreamUpvoteUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomStreamUpvoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomStreamUpvote.
     * @param {RoomStreamUpvoteUpsertArgs} args - Arguments to update or create a RoomStreamUpvote.
     * @example
     * // Update or create a RoomStreamUpvote
     * const roomStreamUpvote = await prisma.roomStreamUpvote.upsert({
     *   create: {
     *     // ... data to create a RoomStreamUpvote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStreamUpvote we want to update
     *   }
     * })
     */
    upsert<T extends RoomStreamUpvoteUpsertArgs>(args: SelectSubset<T, RoomStreamUpvoteUpsertArgs<ExtArgs>>): Prisma__RoomStreamUpvoteClient<$Result.GetResult<Prisma.$RoomStreamUpvotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomStreamUpvotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteCountArgs} args - Arguments to filter RoomStreamUpvotes to count.
     * @example
     * // Count the number of RoomStreamUpvotes
     * const count = await prisma.roomStreamUpvote.count({
     *   where: {
     *     // ... the filter for the RoomStreamUpvotes we want to count
     *   }
     * })
    **/
    count<T extends RoomStreamUpvoteCountArgs>(
      args?: Subset<T, RoomStreamUpvoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStreamUpvoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStreamUpvote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomStreamUpvoteAggregateArgs>(args: Subset<T, RoomStreamUpvoteAggregateArgs>): Prisma.PrismaPromise<GetRoomStreamUpvoteAggregateType<T>>

    /**
     * Group by RoomStreamUpvote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamUpvoteGroupByArgs} args - Group by arguments.
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
      T extends RoomStreamUpvoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStreamUpvoteGroupByArgs['orderBy'] }
        : { orderBy?: RoomStreamUpvoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomStreamUpvoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStreamUpvoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStreamUpvote model
   */
  readonly fields: RoomStreamUpvoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStreamUpvote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStreamUpvoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomStream<T extends RoomStreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomStreamDefaultArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RoomStreamUpvote model
   */
  interface RoomStreamUpvoteFieldRefs {
    readonly id: FieldRef<"RoomStreamUpvote", 'String'>
    readonly roomStreamId: FieldRef<"RoomStreamUpvote", 'String'>
    readonly userId: FieldRef<"RoomStreamUpvote", 'String'>
    readonly createdAt: FieldRef<"RoomStreamUpvote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomStreamUpvote findUnique
   */
  export type RoomStreamUpvoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamUpvote to fetch.
     */
    where: RoomStreamUpvoteWhereUniqueInput
  }

  /**
   * RoomStreamUpvote findUniqueOrThrow
   */
  export type RoomStreamUpvoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamUpvote to fetch.
     */
    where: RoomStreamUpvoteWhereUniqueInput
  }

  /**
   * RoomStreamUpvote findFirst
   */
  export type RoomStreamUpvoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamUpvote to fetch.
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamUpvotes to fetch.
     */
    orderBy?: RoomStreamUpvoteOrderByWithRelationInput | RoomStreamUpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStreamUpvotes.
     */
    cursor?: RoomStreamUpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamUpvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamUpvotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStreamUpvotes.
     */
    distinct?: RoomStreamUpvoteScalarFieldEnum | RoomStreamUpvoteScalarFieldEnum[]
  }

  /**
   * RoomStreamUpvote findFirstOrThrow
   */
  export type RoomStreamUpvoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamUpvote to fetch.
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamUpvotes to fetch.
     */
    orderBy?: RoomStreamUpvoteOrderByWithRelationInput | RoomStreamUpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStreamUpvotes.
     */
    cursor?: RoomStreamUpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamUpvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamUpvotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStreamUpvotes.
     */
    distinct?: RoomStreamUpvoteScalarFieldEnum | RoomStreamUpvoteScalarFieldEnum[]
  }

  /**
   * RoomStreamUpvote findMany
   */
  export type RoomStreamUpvoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamUpvotes to fetch.
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamUpvotes to fetch.
     */
    orderBy?: RoomStreamUpvoteOrderByWithRelationInput | RoomStreamUpvoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStreamUpvotes.
     */
    cursor?: RoomStreamUpvoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamUpvotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamUpvotes.
     */
    skip?: number
    distinct?: RoomStreamUpvoteScalarFieldEnum | RoomStreamUpvoteScalarFieldEnum[]
  }

  /**
   * RoomStreamUpvote create
   */
  export type RoomStreamUpvoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStreamUpvote.
     */
    data: XOR<RoomStreamUpvoteCreateInput, RoomStreamUpvoteUncheckedCreateInput>
  }

  /**
   * RoomStreamUpvote createMany
   */
  export type RoomStreamUpvoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStreamUpvotes.
     */
    data: RoomStreamUpvoteCreateManyInput | RoomStreamUpvoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStreamUpvote createManyAndReturn
   */
  export type RoomStreamUpvoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * The data used to create many RoomStreamUpvotes.
     */
    data: RoomStreamUpvoteCreateManyInput | RoomStreamUpvoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStreamUpvote update
   */
  export type RoomStreamUpvoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStreamUpvote.
     */
    data: XOR<RoomStreamUpvoteUpdateInput, RoomStreamUpvoteUncheckedUpdateInput>
    /**
     * Choose, which RoomStreamUpvote to update.
     */
    where: RoomStreamUpvoteWhereUniqueInput
  }

  /**
   * RoomStreamUpvote updateMany
   */
  export type RoomStreamUpvoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStreamUpvotes.
     */
    data: XOR<RoomStreamUpvoteUpdateManyMutationInput, RoomStreamUpvoteUncheckedUpdateManyInput>
    /**
     * Filter which RoomStreamUpvotes to update
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * Limit how many RoomStreamUpvotes to update.
     */
    limit?: number
  }

  /**
   * RoomStreamUpvote updateManyAndReturn
   */
  export type RoomStreamUpvoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * The data used to update RoomStreamUpvotes.
     */
    data: XOR<RoomStreamUpvoteUpdateManyMutationInput, RoomStreamUpvoteUncheckedUpdateManyInput>
    /**
     * Filter which RoomStreamUpvotes to update
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * Limit how many RoomStreamUpvotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStreamUpvote upsert
   */
  export type RoomStreamUpvoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStreamUpvote to update in case it exists.
     */
    where: RoomStreamUpvoteWhereUniqueInput
    /**
     * In case the RoomStreamUpvote found by the `where` argument doesn't exist, create a new RoomStreamUpvote with this data.
     */
    create: XOR<RoomStreamUpvoteCreateInput, RoomStreamUpvoteUncheckedCreateInput>
    /**
     * In case the RoomStreamUpvote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStreamUpvoteUpdateInput, RoomStreamUpvoteUncheckedUpdateInput>
  }

  /**
   * RoomStreamUpvote delete
   */
  export type RoomStreamUpvoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
    /**
     * Filter which RoomStreamUpvote to delete.
     */
    where: RoomStreamUpvoteWhereUniqueInput
  }

  /**
   * RoomStreamUpvote deleteMany
   */
  export type RoomStreamUpvoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStreamUpvotes to delete
     */
    where?: RoomStreamUpvoteWhereInput
    /**
     * Limit how many RoomStreamUpvotes to delete.
     */
    limit?: number
  }

  /**
   * RoomStreamUpvote without action
   */
  export type RoomStreamUpvoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamUpvote
     */
    select?: RoomStreamUpvoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamUpvote
     */
    omit?: RoomStreamUpvoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamUpvoteInclude<ExtArgs> | null
  }


  /**
   * Model SkipVote
   */

  export type AggregateSkipVote = {
    _count: SkipVoteCountAggregateOutputType | null
    _min: SkipVoteMinAggregateOutputType | null
    _max: SkipVoteMaxAggregateOutputType | null
  }

  export type SkipVoteMinAggregateOutputType = {
    id: string | null
    roomStreamId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type SkipVoteMaxAggregateOutputType = {
    id: string | null
    roomStreamId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type SkipVoteCountAggregateOutputType = {
    id: number
    roomStreamId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type SkipVoteMinAggregateInputType = {
    id?: true
    roomStreamId?: true
    userId?: true
    createdAt?: true
  }

  export type SkipVoteMaxAggregateInputType = {
    id?: true
    roomStreamId?: true
    userId?: true
    createdAt?: true
  }

  export type SkipVoteCountAggregateInputType = {
    id?: true
    roomStreamId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type SkipVoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkipVote to aggregate.
     */
    where?: SkipVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkipVotes to fetch.
     */
    orderBy?: SkipVoteOrderByWithRelationInput | SkipVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkipVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkipVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkipVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkipVotes
    **/
    _count?: true | SkipVoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkipVoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkipVoteMaxAggregateInputType
  }

  export type GetSkipVoteAggregateType<T extends SkipVoteAggregateArgs> = {
        [P in keyof T & keyof AggregateSkipVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkipVote[P]>
      : GetScalarType<T[P], AggregateSkipVote[P]>
  }




  export type SkipVoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkipVoteWhereInput
    orderBy?: SkipVoteOrderByWithAggregationInput | SkipVoteOrderByWithAggregationInput[]
    by: SkipVoteScalarFieldEnum[] | SkipVoteScalarFieldEnum
    having?: SkipVoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkipVoteCountAggregateInputType | true
    _min?: SkipVoteMinAggregateInputType
    _max?: SkipVoteMaxAggregateInputType
  }

  export type SkipVoteGroupByOutputType = {
    id: string
    roomStreamId: string
    userId: string
    createdAt: Date
    _count: SkipVoteCountAggregateOutputType | null
    _min: SkipVoteMinAggregateOutputType | null
    _max: SkipVoteMaxAggregateOutputType | null
  }

  type GetSkipVoteGroupByPayload<T extends SkipVoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkipVoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkipVoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkipVoteGroupByOutputType[P]>
            : GetScalarType<T[P], SkipVoteGroupByOutputType[P]>
        }
      >
    >


  export type SkipVoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skipVote"]>

  export type SkipVoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skipVote"]>

  export type SkipVoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skipVote"]>

  export type SkipVoteSelectScalar = {
    id?: boolean
    roomStreamId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type SkipVoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomStreamId" | "userId" | "createdAt", ExtArgs["result"]["skipVote"]>
  export type SkipVoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SkipVoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SkipVoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomStream?: boolean | RoomStreamDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SkipVotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkipVote"
    objects: {
      roomStream: Prisma.$RoomStreamPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomStreamId: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["skipVote"]>
    composites: {}
  }

  type SkipVoteGetPayload<S extends boolean | null | undefined | SkipVoteDefaultArgs> = $Result.GetResult<Prisma.$SkipVotePayload, S>

  type SkipVoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkipVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkipVoteCountAggregateInputType | true
    }

  export interface SkipVoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkipVote'], meta: { name: 'SkipVote' } }
    /**
     * Find zero or one SkipVote that matches the filter.
     * @param {SkipVoteFindUniqueArgs} args - Arguments to find a SkipVote
     * @example
     * // Get one SkipVote
     * const skipVote = await prisma.skipVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkipVoteFindUniqueArgs>(args: SelectSubset<T, SkipVoteFindUniqueArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkipVote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkipVoteFindUniqueOrThrowArgs} args - Arguments to find a SkipVote
     * @example
     * // Get one SkipVote
     * const skipVote = await prisma.skipVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkipVoteFindUniqueOrThrowArgs>(args: SelectSubset<T, SkipVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkipVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteFindFirstArgs} args - Arguments to find a SkipVote
     * @example
     * // Get one SkipVote
     * const skipVote = await prisma.skipVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkipVoteFindFirstArgs>(args?: SelectSubset<T, SkipVoteFindFirstArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkipVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteFindFirstOrThrowArgs} args - Arguments to find a SkipVote
     * @example
     * // Get one SkipVote
     * const skipVote = await prisma.skipVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkipVoteFindFirstOrThrowArgs>(args?: SelectSubset<T, SkipVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkipVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkipVotes
     * const skipVotes = await prisma.skipVote.findMany()
     * 
     * // Get first 10 SkipVotes
     * const skipVotes = await prisma.skipVote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skipVoteWithIdOnly = await prisma.skipVote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkipVoteFindManyArgs>(args?: SelectSubset<T, SkipVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkipVote.
     * @param {SkipVoteCreateArgs} args - Arguments to create a SkipVote.
     * @example
     * // Create one SkipVote
     * const SkipVote = await prisma.skipVote.create({
     *   data: {
     *     // ... data to create a SkipVote
     *   }
     * })
     * 
     */
    create<T extends SkipVoteCreateArgs>(args: SelectSubset<T, SkipVoteCreateArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkipVotes.
     * @param {SkipVoteCreateManyArgs} args - Arguments to create many SkipVotes.
     * @example
     * // Create many SkipVotes
     * const skipVote = await prisma.skipVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkipVoteCreateManyArgs>(args?: SelectSubset<T, SkipVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SkipVotes and returns the data saved in the database.
     * @param {SkipVoteCreateManyAndReturnArgs} args - Arguments to create many SkipVotes.
     * @example
     * // Create many SkipVotes
     * const skipVote = await prisma.skipVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SkipVotes and only return the `id`
     * const skipVoteWithIdOnly = await prisma.skipVote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkipVoteCreateManyAndReturnArgs>(args?: SelectSubset<T, SkipVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SkipVote.
     * @param {SkipVoteDeleteArgs} args - Arguments to delete one SkipVote.
     * @example
     * // Delete one SkipVote
     * const SkipVote = await prisma.skipVote.delete({
     *   where: {
     *     // ... filter to delete one SkipVote
     *   }
     * })
     * 
     */
    delete<T extends SkipVoteDeleteArgs>(args: SelectSubset<T, SkipVoteDeleteArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkipVote.
     * @param {SkipVoteUpdateArgs} args - Arguments to update one SkipVote.
     * @example
     * // Update one SkipVote
     * const skipVote = await prisma.skipVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkipVoteUpdateArgs>(args: SelectSubset<T, SkipVoteUpdateArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkipVotes.
     * @param {SkipVoteDeleteManyArgs} args - Arguments to filter SkipVotes to delete.
     * @example
     * // Delete a few SkipVotes
     * const { count } = await prisma.skipVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkipVoteDeleteManyArgs>(args?: SelectSubset<T, SkipVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkipVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkipVotes
     * const skipVote = await prisma.skipVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkipVoteUpdateManyArgs>(args: SelectSubset<T, SkipVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkipVotes and returns the data updated in the database.
     * @param {SkipVoteUpdateManyAndReturnArgs} args - Arguments to update many SkipVotes.
     * @example
     * // Update many SkipVotes
     * const skipVote = await prisma.skipVote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SkipVotes and only return the `id`
     * const skipVoteWithIdOnly = await prisma.skipVote.updateManyAndReturn({
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
    updateManyAndReturn<T extends SkipVoteUpdateManyAndReturnArgs>(args: SelectSubset<T, SkipVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SkipVote.
     * @param {SkipVoteUpsertArgs} args - Arguments to update or create a SkipVote.
     * @example
     * // Update or create a SkipVote
     * const skipVote = await prisma.skipVote.upsert({
     *   create: {
     *     // ... data to create a SkipVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkipVote we want to update
     *   }
     * })
     */
    upsert<T extends SkipVoteUpsertArgs>(args: SelectSubset<T, SkipVoteUpsertArgs<ExtArgs>>): Prisma__SkipVoteClient<$Result.GetResult<Prisma.$SkipVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SkipVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteCountArgs} args - Arguments to filter SkipVotes to count.
     * @example
     * // Count the number of SkipVotes
     * const count = await prisma.skipVote.count({
     *   where: {
     *     // ... the filter for the SkipVotes we want to count
     *   }
     * })
    **/
    count<T extends SkipVoteCountArgs>(
      args?: Subset<T, SkipVoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkipVoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkipVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SkipVoteAggregateArgs>(args: Subset<T, SkipVoteAggregateArgs>): Prisma.PrismaPromise<GetSkipVoteAggregateType<T>>

    /**
     * Group by SkipVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkipVoteGroupByArgs} args - Group by arguments.
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
      T extends SkipVoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkipVoteGroupByArgs['orderBy'] }
        : { orderBy?: SkipVoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SkipVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkipVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkipVote model
   */
  readonly fields: SkipVoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkipVote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkipVoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomStream<T extends RoomStreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomStreamDefaultArgs<ExtArgs>>): Prisma__RoomStreamClient<$Result.GetResult<Prisma.$RoomStreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SkipVote model
   */
  interface SkipVoteFieldRefs {
    readonly id: FieldRef<"SkipVote", 'String'>
    readonly roomStreamId: FieldRef<"SkipVote", 'String'>
    readonly userId: FieldRef<"SkipVote", 'String'>
    readonly createdAt: FieldRef<"SkipVote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SkipVote findUnique
   */
  export type SkipVoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * Filter, which SkipVote to fetch.
     */
    where: SkipVoteWhereUniqueInput
  }

  /**
   * SkipVote findUniqueOrThrow
   */
  export type SkipVoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * Filter, which SkipVote to fetch.
     */
    where: SkipVoteWhereUniqueInput
  }

  /**
   * SkipVote findFirst
   */
  export type SkipVoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * Filter, which SkipVote to fetch.
     */
    where?: SkipVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkipVotes to fetch.
     */
    orderBy?: SkipVoteOrderByWithRelationInput | SkipVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkipVotes.
     */
    cursor?: SkipVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkipVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkipVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkipVotes.
     */
    distinct?: SkipVoteScalarFieldEnum | SkipVoteScalarFieldEnum[]
  }

  /**
   * SkipVote findFirstOrThrow
   */
  export type SkipVoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * Filter, which SkipVote to fetch.
     */
    where?: SkipVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkipVotes to fetch.
     */
    orderBy?: SkipVoteOrderByWithRelationInput | SkipVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkipVotes.
     */
    cursor?: SkipVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkipVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkipVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkipVotes.
     */
    distinct?: SkipVoteScalarFieldEnum | SkipVoteScalarFieldEnum[]
  }

  /**
   * SkipVote findMany
   */
  export type SkipVoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * Filter, which SkipVotes to fetch.
     */
    where?: SkipVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkipVotes to fetch.
     */
    orderBy?: SkipVoteOrderByWithRelationInput | SkipVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkipVotes.
     */
    cursor?: SkipVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkipVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkipVotes.
     */
    skip?: number
    distinct?: SkipVoteScalarFieldEnum | SkipVoteScalarFieldEnum[]
  }

  /**
   * SkipVote create
   */
  export type SkipVoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * The data needed to create a SkipVote.
     */
    data: XOR<SkipVoteCreateInput, SkipVoteUncheckedCreateInput>
  }

  /**
   * SkipVote createMany
   */
  export type SkipVoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkipVotes.
     */
    data: SkipVoteCreateManyInput | SkipVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SkipVote createManyAndReturn
   */
  export type SkipVoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * The data used to create many SkipVotes.
     */
    data: SkipVoteCreateManyInput | SkipVoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SkipVote update
   */
  export type SkipVoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * The data needed to update a SkipVote.
     */
    data: XOR<SkipVoteUpdateInput, SkipVoteUncheckedUpdateInput>
    /**
     * Choose, which SkipVote to update.
     */
    where: SkipVoteWhereUniqueInput
  }

  /**
   * SkipVote updateMany
   */
  export type SkipVoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkipVotes.
     */
    data: XOR<SkipVoteUpdateManyMutationInput, SkipVoteUncheckedUpdateManyInput>
    /**
     * Filter which SkipVotes to update
     */
    where?: SkipVoteWhereInput
    /**
     * Limit how many SkipVotes to update.
     */
    limit?: number
  }

  /**
   * SkipVote updateManyAndReturn
   */
  export type SkipVoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * The data used to update SkipVotes.
     */
    data: XOR<SkipVoteUpdateManyMutationInput, SkipVoteUncheckedUpdateManyInput>
    /**
     * Filter which SkipVotes to update
     */
    where?: SkipVoteWhereInput
    /**
     * Limit how many SkipVotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SkipVote upsert
   */
  export type SkipVoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * The filter to search for the SkipVote to update in case it exists.
     */
    where: SkipVoteWhereUniqueInput
    /**
     * In case the SkipVote found by the `where` argument doesn't exist, create a new SkipVote with this data.
     */
    create: XOR<SkipVoteCreateInput, SkipVoteUncheckedCreateInput>
    /**
     * In case the SkipVote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkipVoteUpdateInput, SkipVoteUncheckedUpdateInput>
  }

  /**
   * SkipVote delete
   */
  export type SkipVoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
    /**
     * Filter which SkipVote to delete.
     */
    where: SkipVoteWhereUniqueInput
  }

  /**
   * SkipVote deleteMany
   */
  export type SkipVoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkipVotes to delete
     */
    where?: SkipVoteWhereInput
    /**
     * Limit how many SkipVotes to delete.
     */
    limit?: number
  }

  /**
   * SkipVote without action
   */
  export type SkipVoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkipVote
     */
    select?: SkipVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkipVote
     */
    omit?: SkipVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkipVoteInclude<ExtArgs> | null
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
    email: 'email',
    image: 'image',
    provider: 'provider',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StreamScalarFieldEnum: {
    id: 'id',
    type: 'type',
    active: 'active',
    UserId: 'UserId',
    url: 'url',
    extractedId: 'extractedId',
    bigImg: 'bigImg',
    smallImg: 'smallImg',
    title: 'title'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const UpvoteScalarFieldEnum: {
    id: 'id',
    UserId: 'UserId',
    StreamId: 'StreamId'
  };

  export type UpvoteScalarFieldEnum = (typeof UpvoteScalarFieldEnum)[keyof typeof UpvoteScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isPublic: 'isPublic',
    creatorId: 'creatorId',
    currentStreamId: 'currentStreamId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isPlaying: 'isPlaying',
    lastSyncTime: 'lastSyncTime',
    playbackTime: 'playbackTime'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomMemberScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type RoomMemberScalarFieldEnum = (typeof RoomMemberScalarFieldEnum)[keyof typeof RoomMemberScalarFieldEnum]


  export const RoomStreamScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    streamId: 'streamId',
    addedById: 'addedById',
    addedAt: 'addedAt',
    order: 'order'
  };

  export type RoomStreamScalarFieldEnum = (typeof RoomStreamScalarFieldEnum)[keyof typeof RoomStreamScalarFieldEnum]


  export const RoomStreamUpvoteScalarFieldEnum: {
    id: 'id',
    roomStreamId: 'roomStreamId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type RoomStreamUpvoteScalarFieldEnum = (typeof RoomStreamUpvoteScalarFieldEnum)[keyof typeof RoomStreamUpvoteScalarFieldEnum]


  export const SkipVoteScalarFieldEnum: {
    id: 'id',
    roomStreamId: 'roomStreamId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type SkipVoteScalarFieldEnum = (typeof SkipVoteScalarFieldEnum)[keyof typeof SkipVoteScalarFieldEnum]


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
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'StreamType'
   */
  export type EnumStreamTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamType'>
    


  /**
   * Reference to a field of type 'StreamType[]'
   */
  export type ListEnumStreamTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'RoomMemberRole'
   */
  export type EnumRoomMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomMemberRole'>
    


  /**
   * Reference to a field of type 'RoomMemberRole[]'
   */
  export type ListEnumRoomMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomMemberRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    provider?: EnumProviderFilter<"User"> | $Enums.Provider
    password?: StringNullableFilter<"User"> | string | null
    createdRooms?: RoomListRelationFilter
    roomMembers?: RoomMemberListRelationFilter
    addedRoomStreams?: RoomStreamListRelationFilter
    roomStreamUpvotes?: RoomStreamUpvoteListRelationFilter
    skipVotes?: SkipVoteListRelationFilter
    Streams?: StreamListRelationFilter
    upvotes?: UpvoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    image?: SortOrderInput | SortOrder
    provider?: SortOrder
    password?: SortOrderInput | SortOrder
    createdRooms?: RoomOrderByRelationAggregateInput
    roomMembers?: RoomMemberOrderByRelationAggregateInput
    addedRoomStreams?: RoomStreamOrderByRelationAggregateInput
    roomStreamUpvotes?: RoomStreamUpvoteOrderByRelationAggregateInput
    skipVotes?: SkipVoteOrderByRelationAggregateInput
    Streams?: StreamOrderByRelationAggregateInput
    upvotes?: UpvoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    image?: StringNullableFilter<"User"> | string | null
    provider?: EnumProviderFilter<"User"> | $Enums.Provider
    password?: StringNullableFilter<"User"> | string | null
    createdRooms?: RoomListRelationFilter
    roomMembers?: RoomMemberListRelationFilter
    addedRoomStreams?: RoomStreamListRelationFilter
    roomStreamUpvotes?: RoomStreamUpvoteListRelationFilter
    skipVotes?: SkipVoteListRelationFilter
    Streams?: StreamListRelationFilter
    upvotes?: UpvoteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    image?: SortOrderInput | SortOrder
    provider?: SortOrder
    password?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: EnumProviderWithAggregatesFilter<"User"> | $Enums.Provider
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    type?: EnumStreamTypeFilter<"Stream"> | $Enums.StreamType
    active?: BoolFilter<"Stream"> | boolean
    UserId?: StringFilter<"Stream"> | string
    url?: StringFilter<"Stream"> | string
    extractedId?: StringFilter<"Stream"> | string
    bigImg?: StringFilter<"Stream"> | string
    smallImg?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
    roomStreams?: RoomStreamListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    upvotes?: UpvoteListRelationFilter
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    active?: SortOrder
    UserId?: SortOrder
    url?: SortOrder
    extractedId?: SortOrder
    bigImg?: SortOrder
    smallImg?: SortOrder
    title?: SortOrder
    roomStreams?: RoomStreamOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    upvotes?: UpvoteOrderByRelationAggregateInput
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    type?: EnumStreamTypeFilter<"Stream"> | $Enums.StreamType
    active?: BoolFilter<"Stream"> | boolean
    UserId?: StringFilter<"Stream"> | string
    url?: StringFilter<"Stream"> | string
    extractedId?: StringFilter<"Stream"> | string
    bigImg?: StringFilter<"Stream"> | string
    smallImg?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
    roomStreams?: RoomStreamListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    upvotes?: UpvoteListRelationFilter
  }, "id">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    active?: SortOrder
    UserId?: SortOrder
    url?: SortOrder
    extractedId?: SortOrder
    bigImg?: SortOrder
    smallImg?: SortOrder
    title?: SortOrder
    _count?: StreamCountOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    type?: EnumStreamTypeWithAggregatesFilter<"Stream"> | $Enums.StreamType
    active?: BoolWithAggregatesFilter<"Stream"> | boolean
    UserId?: StringWithAggregatesFilter<"Stream"> | string
    url?: StringWithAggregatesFilter<"Stream"> | string
    extractedId?: StringWithAggregatesFilter<"Stream"> | string
    bigImg?: StringWithAggregatesFilter<"Stream"> | string
    smallImg?: StringWithAggregatesFilter<"Stream"> | string
    title?: StringWithAggregatesFilter<"Stream"> | string
  }

  export type UpvoteWhereInput = {
    AND?: UpvoteWhereInput | UpvoteWhereInput[]
    OR?: UpvoteWhereInput[]
    NOT?: UpvoteWhereInput | UpvoteWhereInput[]
    id?: StringFilter<"Upvote"> | string
    UserId?: StringFilter<"Upvote"> | string
    StreamId?: StringFilter<"Upvote"> | string
    Stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UpvoteOrderByWithRelationInput = {
    id?: SortOrder
    UserId?: SortOrder
    StreamId?: SortOrder
    Stream?: StreamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UpvoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    UserId_StreamId?: UpvoteUserIdStreamIdCompoundUniqueInput
    AND?: UpvoteWhereInput | UpvoteWhereInput[]
    OR?: UpvoteWhereInput[]
    NOT?: UpvoteWhereInput | UpvoteWhereInput[]
    UserId?: StringFilter<"Upvote"> | string
    StreamId?: StringFilter<"Upvote"> | string
    Stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "UserId_StreamId">

  export type UpvoteOrderByWithAggregationInput = {
    id?: SortOrder
    UserId?: SortOrder
    StreamId?: SortOrder
    _count?: UpvoteCountOrderByAggregateInput
    _max?: UpvoteMaxOrderByAggregateInput
    _min?: UpvoteMinOrderByAggregateInput
  }

  export type UpvoteScalarWhereWithAggregatesInput = {
    AND?: UpvoteScalarWhereWithAggregatesInput | UpvoteScalarWhereWithAggregatesInput[]
    OR?: UpvoteScalarWhereWithAggregatesInput[]
    NOT?: UpvoteScalarWhereWithAggregatesInput | UpvoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Upvote"> | string
    UserId?: StringWithAggregatesFilter<"Upvote"> | string
    StreamId?: StringWithAggregatesFilter<"Upvote"> | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    isPublic?: BoolFilter<"Room"> | boolean
    creatorId?: StringFilter<"Room"> | string
    currentStreamId?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    isPlaying?: BoolFilter<"Room"> | boolean
    lastSyncTime?: DateTimeNullableFilter<"Room"> | Date | string | null
    playbackTime?: FloatNullableFilter<"Room"> | number | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    currentStream?: XOR<RoomStreamNullableScalarRelationFilter, RoomStreamWhereInput> | null
    members?: RoomMemberListRelationFilter
    streams?: RoomStreamListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    creatorId?: SortOrder
    currentStreamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPlaying?: SortOrder
    lastSyncTime?: SortOrderInput | SortOrder
    playbackTime?: SortOrderInput | SortOrder
    creator?: UserOrderByWithRelationInput
    currentStream?: RoomStreamOrderByWithRelationInput
    members?: RoomMemberOrderByRelationAggregateInput
    streams?: RoomStreamOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    isPublic?: BoolFilter<"Room"> | boolean
    creatorId?: StringFilter<"Room"> | string
    currentStreamId?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    isPlaying?: BoolFilter<"Room"> | boolean
    lastSyncTime?: DateTimeNullableFilter<"Room"> | Date | string | null
    playbackTime?: FloatNullableFilter<"Room"> | number | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    currentStream?: XOR<RoomStreamNullableScalarRelationFilter, RoomStreamWhereInput> | null
    members?: RoomMemberListRelationFilter
    streams?: RoomStreamListRelationFilter
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    creatorId?: SortOrder
    currentStreamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPlaying?: SortOrder
    lastSyncTime?: SortOrderInput | SortOrder
    playbackTime?: SortOrderInput | SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    description?: StringNullableWithAggregatesFilter<"Room"> | string | null
    isPublic?: BoolWithAggregatesFilter<"Room"> | boolean
    creatorId?: StringWithAggregatesFilter<"Room"> | string
    currentStreamId?: StringNullableWithAggregatesFilter<"Room"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    isPlaying?: BoolWithAggregatesFilter<"Room"> | boolean
    lastSyncTime?: DateTimeNullableWithAggregatesFilter<"Room"> | Date | string | null
    playbackTime?: FloatNullableWithAggregatesFilter<"Room"> | number | null
  }

  export type RoomMemberWhereInput = {
    AND?: RoomMemberWhereInput | RoomMemberWhereInput[]
    OR?: RoomMemberWhereInput[]
    NOT?: RoomMemberWhereInput | RoomMemberWhereInput[]
    id?: StringFilter<"RoomMember"> | string
    roomId?: StringFilter<"RoomMember"> | string
    userId?: StringFilter<"RoomMember"> | string
    role?: EnumRoomMemberRoleFilter<"RoomMember"> | $Enums.RoomMemberRole
    joinedAt?: DateTimeFilter<"RoomMember"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoomMemberOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type RoomMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId_userId?: RoomMemberRoomIdUserIdCompoundUniqueInput
    AND?: RoomMemberWhereInput | RoomMemberWhereInput[]
    OR?: RoomMemberWhereInput[]
    NOT?: RoomMemberWhereInput | RoomMemberWhereInput[]
    roomId?: StringFilter<"RoomMember"> | string
    userId?: StringFilter<"RoomMember"> | string
    role?: EnumRoomMemberRoleFilter<"RoomMember"> | $Enums.RoomMemberRole
    joinedAt?: DateTimeFilter<"RoomMember"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "roomId_userId">

  export type RoomMemberOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: RoomMemberCountOrderByAggregateInput
    _max?: RoomMemberMaxOrderByAggregateInput
    _min?: RoomMemberMinOrderByAggregateInput
  }

  export type RoomMemberScalarWhereWithAggregatesInput = {
    AND?: RoomMemberScalarWhereWithAggregatesInput | RoomMemberScalarWhereWithAggregatesInput[]
    OR?: RoomMemberScalarWhereWithAggregatesInput[]
    NOT?: RoomMemberScalarWhereWithAggregatesInput | RoomMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomMember"> | string
    roomId?: StringWithAggregatesFilter<"RoomMember"> | string
    userId?: StringWithAggregatesFilter<"RoomMember"> | string
    role?: EnumRoomMemberRoleWithAggregatesFilter<"RoomMember"> | $Enums.RoomMemberRole
    joinedAt?: DateTimeWithAggregatesFilter<"RoomMember"> | Date | string
  }

  export type RoomStreamWhereInput = {
    AND?: RoomStreamWhereInput | RoomStreamWhereInput[]
    OR?: RoomStreamWhereInput[]
    NOT?: RoomStreamWhereInput | RoomStreamWhereInput[]
    id?: StringFilter<"RoomStream"> | string
    roomId?: StringFilter<"RoomStream"> | string
    streamId?: StringFilter<"RoomStream"> | string
    addedById?: StringFilter<"RoomStream"> | string
    addedAt?: DateTimeFilter<"RoomStream"> | Date | string
    order?: IntFilter<"RoomStream"> | number
    currentInRooms?: RoomListRelationFilter
    addedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    upvotes?: RoomStreamUpvoteListRelationFilter
    skipVotes?: SkipVoteListRelationFilter
  }

  export type RoomStreamOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    streamId?: SortOrder
    addedById?: SortOrder
    addedAt?: SortOrder
    order?: SortOrder
    currentInRooms?: RoomOrderByRelationAggregateInput
    addedBy?: UserOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
    stream?: StreamOrderByWithRelationInput
    upvotes?: RoomStreamUpvoteOrderByRelationAggregateInput
    skipVotes?: SkipVoteOrderByRelationAggregateInput
  }

  export type RoomStreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId_streamId?: RoomStreamRoomIdStreamIdCompoundUniqueInput
    AND?: RoomStreamWhereInput | RoomStreamWhereInput[]
    OR?: RoomStreamWhereInput[]
    NOT?: RoomStreamWhereInput | RoomStreamWhereInput[]
    roomId?: StringFilter<"RoomStream"> | string
    streamId?: StringFilter<"RoomStream"> | string
    addedById?: StringFilter<"RoomStream"> | string
    addedAt?: DateTimeFilter<"RoomStream"> | Date | string
    order?: IntFilter<"RoomStream"> | number
    currentInRooms?: RoomListRelationFilter
    addedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    stream?: XOR<StreamScalarRelationFilter, StreamWhereInput>
    upvotes?: RoomStreamUpvoteListRelationFilter
    skipVotes?: SkipVoteListRelationFilter
  }, "id" | "roomId_streamId">

  export type RoomStreamOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    streamId?: SortOrder
    addedById?: SortOrder
    addedAt?: SortOrder
    order?: SortOrder
    _count?: RoomStreamCountOrderByAggregateInput
    _avg?: RoomStreamAvgOrderByAggregateInput
    _max?: RoomStreamMaxOrderByAggregateInput
    _min?: RoomStreamMinOrderByAggregateInput
    _sum?: RoomStreamSumOrderByAggregateInput
  }

  export type RoomStreamScalarWhereWithAggregatesInput = {
    AND?: RoomStreamScalarWhereWithAggregatesInput | RoomStreamScalarWhereWithAggregatesInput[]
    OR?: RoomStreamScalarWhereWithAggregatesInput[]
    NOT?: RoomStreamScalarWhereWithAggregatesInput | RoomStreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomStream"> | string
    roomId?: StringWithAggregatesFilter<"RoomStream"> | string
    streamId?: StringWithAggregatesFilter<"RoomStream"> | string
    addedById?: StringWithAggregatesFilter<"RoomStream"> | string
    addedAt?: DateTimeWithAggregatesFilter<"RoomStream"> | Date | string
    order?: IntWithAggregatesFilter<"RoomStream"> | number
  }

  export type RoomStreamUpvoteWhereInput = {
    AND?: RoomStreamUpvoteWhereInput | RoomStreamUpvoteWhereInput[]
    OR?: RoomStreamUpvoteWhereInput[]
    NOT?: RoomStreamUpvoteWhereInput | RoomStreamUpvoteWhereInput[]
    id?: StringFilter<"RoomStreamUpvote"> | string
    roomStreamId?: StringFilter<"RoomStreamUpvote"> | string
    userId?: StringFilter<"RoomStreamUpvote"> | string
    createdAt?: DateTimeFilter<"RoomStreamUpvote"> | Date | string
    roomStream?: XOR<RoomStreamScalarRelationFilter, RoomStreamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoomStreamUpvoteOrderByWithRelationInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    roomStream?: RoomStreamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type RoomStreamUpvoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomStreamId_userId?: RoomStreamUpvoteRoomStreamIdUserIdCompoundUniqueInput
    AND?: RoomStreamUpvoteWhereInput | RoomStreamUpvoteWhereInput[]
    OR?: RoomStreamUpvoteWhereInput[]
    NOT?: RoomStreamUpvoteWhereInput | RoomStreamUpvoteWhereInput[]
    roomStreamId?: StringFilter<"RoomStreamUpvote"> | string
    userId?: StringFilter<"RoomStreamUpvote"> | string
    createdAt?: DateTimeFilter<"RoomStreamUpvote"> | Date | string
    roomStream?: XOR<RoomStreamScalarRelationFilter, RoomStreamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "roomStreamId_userId">

  export type RoomStreamUpvoteOrderByWithAggregationInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: RoomStreamUpvoteCountOrderByAggregateInput
    _max?: RoomStreamUpvoteMaxOrderByAggregateInput
    _min?: RoomStreamUpvoteMinOrderByAggregateInput
  }

  export type RoomStreamUpvoteScalarWhereWithAggregatesInput = {
    AND?: RoomStreamUpvoteScalarWhereWithAggregatesInput | RoomStreamUpvoteScalarWhereWithAggregatesInput[]
    OR?: RoomStreamUpvoteScalarWhereWithAggregatesInput[]
    NOT?: RoomStreamUpvoteScalarWhereWithAggregatesInput | RoomStreamUpvoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomStreamUpvote"> | string
    roomStreamId?: StringWithAggregatesFilter<"RoomStreamUpvote"> | string
    userId?: StringWithAggregatesFilter<"RoomStreamUpvote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RoomStreamUpvote"> | Date | string
  }

  export type SkipVoteWhereInput = {
    AND?: SkipVoteWhereInput | SkipVoteWhereInput[]
    OR?: SkipVoteWhereInput[]
    NOT?: SkipVoteWhereInput | SkipVoteWhereInput[]
    id?: StringFilter<"SkipVote"> | string
    roomStreamId?: StringFilter<"SkipVote"> | string
    userId?: StringFilter<"SkipVote"> | string
    createdAt?: DateTimeFilter<"SkipVote"> | Date | string
    roomStream?: XOR<RoomStreamScalarRelationFilter, RoomStreamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SkipVoteOrderByWithRelationInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    roomStream?: RoomStreamOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SkipVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomStreamId_userId?: SkipVoteRoomStreamIdUserIdCompoundUniqueInput
    AND?: SkipVoteWhereInput | SkipVoteWhereInput[]
    OR?: SkipVoteWhereInput[]
    NOT?: SkipVoteWhereInput | SkipVoteWhereInput[]
    roomStreamId?: StringFilter<"SkipVote"> | string
    userId?: StringFilter<"SkipVote"> | string
    createdAt?: DateTimeFilter<"SkipVote"> | Date | string
    roomStream?: XOR<RoomStreamScalarRelationFilter, RoomStreamWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "roomStreamId_userId">

  export type SkipVoteOrderByWithAggregationInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: SkipVoteCountOrderByAggregateInput
    _max?: SkipVoteMaxOrderByAggregateInput
    _min?: SkipVoteMinOrderByAggregateInput
  }

  export type SkipVoteScalarWhereWithAggregatesInput = {
    AND?: SkipVoteScalarWhereWithAggregatesInput | SkipVoteScalarWhereWithAggregatesInput[]
    OR?: SkipVoteScalarWhereWithAggregatesInput[]
    NOT?: SkipVoteScalarWhereWithAggregatesInput | SkipVoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SkipVote"> | string
    roomStreamId?: StringWithAggregatesFilter<"SkipVote"> | string
    userId?: StringWithAggregatesFilter<"SkipVote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SkipVote"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StreamCreateInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    roomStreams?: RoomStreamCreateNestedManyWithoutStreamInput
    user: UserCreateNestedOneWithoutStreamsInput
    upvotes?: UpvoteCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    UserId: string
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    roomStreams?: RoomStreamUncheckedCreateNestedManyWithoutStreamInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roomStreams?: RoomStreamUpdateManyWithoutStreamNestedInput
    user?: UserUpdateOneRequiredWithoutStreamsNestedInput
    upvotes?: UpvoteUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    UserId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roomStreams?: RoomStreamUncheckedUpdateManyWithoutStreamNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamCreateManyInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    UserId: string
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
  }

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    UserId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type UpvoteCreateInput = {
    id?: string
    Stream: StreamCreateNestedOneWithoutUpvotesInput
    user: UserCreateNestedOneWithoutUpvotesInput
  }

  export type UpvoteUncheckedCreateInput = {
    id?: string
    UserId: string
    StreamId: string
  }

  export type UpvoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    Stream?: StreamUpdateOneRequiredWithoutUpvotesNestedInput
    user?: UserUpdateOneRequiredWithoutUpvotesNestedInput
  }

  export type UpvoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    UserId?: StringFieldUpdateOperationsInput | string
    StreamId?: StringFieldUpdateOperationsInput | string
  }

  export type UpvoteCreateManyInput = {
    id?: string
    UserId: string
    StreamId: string
  }

  export type UpvoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type UpvoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    UserId?: StringFieldUpdateOperationsInput | string
    StreamId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomCreateInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    creator: UserCreateNestedOneWithoutCreatedRoomsInput
    currentStream?: RoomStreamCreateNestedOneWithoutCurrentInRoomsInput
    members?: RoomMemberCreateNestedManyWithoutRoomInput
    streams?: RoomStreamCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    creatorId: string
    currentStreamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput
    streams?: RoomStreamUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    creator?: UserUpdateOneRequiredWithoutCreatedRoomsNestedInput
    currentStream?: RoomStreamUpdateOneWithoutCurrentInRoomsNestedInput
    members?: RoomMemberUpdateManyWithoutRoomNestedInput
    streams?: RoomStreamUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    creatorId?: StringFieldUpdateOperationsInput | string
    currentStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput
    streams?: RoomStreamUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    creatorId: string
    currentStreamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    creatorId?: StringFieldUpdateOperationsInput | string
    currentStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RoomMemberCreateInput = {
    id?: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
    room: RoomCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutRoomMembersInput
  }

  export type RoomMemberUncheckedCreateInput = {
    id?: string
    roomId: string
    userId: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
  }

  export type RoomMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutRoomMembersNestedInput
  }

  export type RoomMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomMemberCreateManyInput = {
    id?: string
    roomId: string
    userId: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
  }

  export type RoomMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamCreateInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomCreateNestedManyWithoutCurrentStreamInput
    addedBy: UserCreateNestedOneWithoutAddedRoomStreamsInput
    room: RoomCreateNestedOneWithoutStreamsInput
    stream: StreamCreateNestedOneWithoutRoomStreamsInput
    upvotes?: RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateInput = {
    id?: string
    roomId: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomUncheckedCreateNestedManyWithoutCurrentStreamInput
    upvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUpdateManyWithoutCurrentStreamNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput
    room?: RoomUpdateOneRequiredWithoutStreamsNestedInput
    stream?: StreamUpdateOneRequiredWithoutRoomStreamsNestedInput
    upvotes?: RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput
    upvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamCreateManyInput = {
    id?: string
    roomId: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
  }

  export type RoomStreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStreamUpvoteCreateInput = {
    id?: string
    createdAt?: Date | string
    roomStream: RoomStreamCreateNestedOneWithoutUpvotesInput
    user: UserCreateNestedOneWithoutRoomStreamUpvotesInput
  }

  export type RoomStreamUpvoteUncheckedCreateInput = {
    id?: string
    roomStreamId: string
    userId: string
    createdAt?: Date | string
  }

  export type RoomStreamUpvoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomStream?: RoomStreamUpdateOneRequiredWithoutUpvotesNestedInput
    user?: UserUpdateOneRequiredWithoutRoomStreamUpvotesNestedInput
  }

  export type RoomStreamUpvoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamUpvoteCreateManyInput = {
    id?: string
    roomStreamId: string
    userId: string
    createdAt?: Date | string
  }

  export type RoomStreamUpvoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamUpvoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteCreateInput = {
    id?: string
    createdAt?: Date | string
    roomStream: RoomStreamCreateNestedOneWithoutSkipVotesInput
    user: UserCreateNestedOneWithoutSkipVotesInput
  }

  export type SkipVoteUncheckedCreateInput = {
    id?: string
    roomStreamId: string
    userId: string
    createdAt?: Date | string
  }

  export type SkipVoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomStream?: RoomStreamUpdateOneRequiredWithoutSkipVotesNestedInput
    user?: UserUpdateOneRequiredWithoutSkipVotesNestedInput
  }

  export type SkipVoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteCreateManyInput = {
    id?: string
    roomStreamId: string
    userId: string
    createdAt?: Date | string
  }

  export type SkipVoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type RoomMemberListRelationFilter = {
    every?: RoomMemberWhereInput
    some?: RoomMemberWhereInput
    none?: RoomMemberWhereInput
  }

  export type RoomStreamListRelationFilter = {
    every?: RoomStreamWhereInput
    some?: RoomStreamWhereInput
    none?: RoomStreamWhereInput
  }

  export type RoomStreamUpvoteListRelationFilter = {
    every?: RoomStreamUpvoteWhereInput
    some?: RoomStreamUpvoteWhereInput
    none?: RoomStreamUpvoteWhereInput
  }

  export type SkipVoteListRelationFilter = {
    every?: SkipVoteWhereInput
    some?: SkipVoteWhereInput
    none?: SkipVoteWhereInput
  }

  export type StreamListRelationFilter = {
    every?: StreamWhereInput
    some?: StreamWhereInput
    none?: StreamWhereInput
  }

  export type UpvoteListRelationFilter = {
    every?: UpvoteWhereInput
    some?: UpvoteWhereInput
    none?: UpvoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomStreamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomStreamUpvoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SkipVoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StreamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UpvoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    image?: SortOrder
    provider?: SortOrder
    password?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    image?: SortOrder
    provider?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    image?: SortOrder
    provider?: SortOrder
    password?: SortOrder
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

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type EnumStreamTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamType | EnumStreamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamTypeFilter<$PrismaModel> | $Enums.StreamType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    active?: SortOrder
    UserId?: SortOrder
    url?: SortOrder
    extractedId?: SortOrder
    bigImg?: SortOrder
    smallImg?: SortOrder
    title?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    active?: SortOrder
    UserId?: SortOrder
    url?: SortOrder
    extractedId?: SortOrder
    bigImg?: SortOrder
    smallImg?: SortOrder
    title?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    active?: SortOrder
    UserId?: SortOrder
    url?: SortOrder
    extractedId?: SortOrder
    bigImg?: SortOrder
    smallImg?: SortOrder
    title?: SortOrder
  }

  export type EnumStreamTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamType | EnumStreamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamTypeWithAggregatesFilter<$PrismaModel> | $Enums.StreamType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamTypeFilter<$PrismaModel>
    _max?: NestedEnumStreamTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StreamScalarRelationFilter = {
    is?: StreamWhereInput
    isNot?: StreamWhereInput
  }

  export type UpvoteUserIdStreamIdCompoundUniqueInput = {
    UserId: string
    StreamId: string
  }

  export type UpvoteCountOrderByAggregateInput = {
    id?: SortOrder
    UserId?: SortOrder
    StreamId?: SortOrder
  }

  export type UpvoteMaxOrderByAggregateInput = {
    id?: SortOrder
    UserId?: SortOrder
    StreamId?: SortOrder
  }

  export type UpvoteMinOrderByAggregateInput = {
    id?: SortOrder
    UserId?: SortOrder
    StreamId?: SortOrder
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type RoomStreamNullableScalarRelationFilter = {
    is?: RoomStreamWhereInput | null
    isNot?: RoomStreamWhereInput | null
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    creatorId?: SortOrder
    currentStreamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPlaying?: SortOrder
    lastSyncTime?: SortOrder
    playbackTime?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    playbackTime?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    creatorId?: SortOrder
    currentStreamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPlaying?: SortOrder
    lastSyncTime?: SortOrder
    playbackTime?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    creatorId?: SortOrder
    currentStreamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPlaying?: SortOrder
    lastSyncTime?: SortOrder
    playbackTime?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    playbackTime?: SortOrder
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumRoomMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomMemberRole | EnumRoomMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomMemberRoleFilter<$PrismaModel> | $Enums.RoomMemberRole
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type RoomMemberRoomIdUserIdCompoundUniqueInput = {
    roomId: string
    userId: string
  }

  export type RoomMemberCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type RoomMemberMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type EnumRoomMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomMemberRole | EnumRoomMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.RoomMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumRoomMemberRoleFilter<$PrismaModel>
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

  export type RoomStreamRoomIdStreamIdCompoundUniqueInput = {
    roomId: string
    streamId: string
  }

  export type RoomStreamCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    streamId?: SortOrder
    addedById?: SortOrder
    addedAt?: SortOrder
    order?: SortOrder
  }

  export type RoomStreamAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RoomStreamMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    streamId?: SortOrder
    addedById?: SortOrder
    addedAt?: SortOrder
    order?: SortOrder
  }

  export type RoomStreamMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    streamId?: SortOrder
    addedById?: SortOrder
    addedAt?: SortOrder
    order?: SortOrder
  }

  export type RoomStreamSumOrderByAggregateInput = {
    order?: SortOrder
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

  export type RoomStreamScalarRelationFilter = {
    is?: RoomStreamWhereInput
    isNot?: RoomStreamWhereInput
  }

  export type RoomStreamUpvoteRoomStreamIdUserIdCompoundUniqueInput = {
    roomStreamId: string
    userId: string
  }

  export type RoomStreamUpvoteCountOrderByAggregateInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomStreamUpvoteMaxOrderByAggregateInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomStreamUpvoteMinOrderByAggregateInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type SkipVoteRoomStreamIdUserIdCompoundUniqueInput = {
    roomStreamId: string
    userId: string
  }

  export type SkipVoteCountOrderByAggregateInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type SkipVoteMaxOrderByAggregateInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type SkipVoteMinOrderByAggregateInput = {
    id?: SortOrder
    roomStreamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomCreateNestedManyWithoutCreatorInput = {
    create?: XOR<RoomCreateWithoutCreatorInput, RoomUncheckedCreateWithoutCreatorInput> | RoomCreateWithoutCreatorInput[] | RoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCreatorInput | RoomCreateOrConnectWithoutCreatorInput[]
    createMany?: RoomCreateManyCreatorInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomMemberCreateWithoutUserInput, RoomMemberUncheckedCreateWithoutUserInput> | RoomMemberCreateWithoutUserInput[] | RoomMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutUserInput | RoomMemberCreateOrConnectWithoutUserInput[]
    createMany?: RoomMemberCreateManyUserInputEnvelope
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
  }

  export type RoomStreamCreateNestedManyWithoutAddedByInput = {
    create?: XOR<RoomStreamCreateWithoutAddedByInput, RoomStreamUncheckedCreateWithoutAddedByInput> | RoomStreamCreateWithoutAddedByInput[] | RoomStreamUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutAddedByInput | RoomStreamCreateOrConnectWithoutAddedByInput[]
    createMany?: RoomStreamCreateManyAddedByInputEnvelope
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
  }

  export type RoomStreamUpvoteCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutUserInput, RoomStreamUpvoteUncheckedCreateWithoutUserInput> | RoomStreamUpvoteCreateWithoutUserInput[] | RoomStreamUpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutUserInput | RoomStreamUpvoteCreateOrConnectWithoutUserInput[]
    createMany?: RoomStreamUpvoteCreateManyUserInputEnvelope
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
  }

  export type SkipVoteCreateNestedManyWithoutUserInput = {
    create?: XOR<SkipVoteCreateWithoutUserInput, SkipVoteUncheckedCreateWithoutUserInput> | SkipVoteCreateWithoutUserInput[] | SkipVoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutUserInput | SkipVoteCreateOrConnectWithoutUserInput[]
    createMany?: SkipVoteCreateManyUserInputEnvelope
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
  }

  export type StreamCreateNestedManyWithoutUserInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput> | StreamCreateWithoutUserInput[] | StreamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput | StreamCreateOrConnectWithoutUserInput[]
    createMany?: StreamCreateManyUserInputEnvelope
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
  }

  export type UpvoteCreateNestedManyWithoutUserInput = {
    create?: XOR<UpvoteCreateWithoutUserInput, UpvoteUncheckedCreateWithoutUserInput> | UpvoteCreateWithoutUserInput[] | UpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutUserInput | UpvoteCreateOrConnectWithoutUserInput[]
    createMany?: UpvoteCreateManyUserInputEnvelope
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<RoomCreateWithoutCreatorInput, RoomUncheckedCreateWithoutCreatorInput> | RoomCreateWithoutCreatorInput[] | RoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCreatorInput | RoomCreateOrConnectWithoutCreatorInput[]
    createMany?: RoomCreateManyCreatorInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomMemberCreateWithoutUserInput, RoomMemberUncheckedCreateWithoutUserInput> | RoomMemberCreateWithoutUserInput[] | RoomMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutUserInput | RoomMemberCreateOrConnectWithoutUserInput[]
    createMany?: RoomMemberCreateManyUserInputEnvelope
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
  }

  export type RoomStreamUncheckedCreateNestedManyWithoutAddedByInput = {
    create?: XOR<RoomStreamCreateWithoutAddedByInput, RoomStreamUncheckedCreateWithoutAddedByInput> | RoomStreamCreateWithoutAddedByInput[] | RoomStreamUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutAddedByInput | RoomStreamCreateOrConnectWithoutAddedByInput[]
    createMany?: RoomStreamCreateManyAddedByInputEnvelope
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
  }

  export type RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutUserInput, RoomStreamUpvoteUncheckedCreateWithoutUserInput> | RoomStreamUpvoteCreateWithoutUserInput[] | RoomStreamUpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutUserInput | RoomStreamUpvoteCreateOrConnectWithoutUserInput[]
    createMany?: RoomStreamUpvoteCreateManyUserInputEnvelope
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
  }

  export type SkipVoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SkipVoteCreateWithoutUserInput, SkipVoteUncheckedCreateWithoutUserInput> | SkipVoteCreateWithoutUserInput[] | SkipVoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutUserInput | SkipVoteCreateOrConnectWithoutUserInput[]
    createMany?: SkipVoteCreateManyUserInputEnvelope
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
  }

  export type StreamUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput> | StreamCreateWithoutUserInput[] | StreamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput | StreamCreateOrConnectWithoutUserInput[]
    createMany?: StreamCreateManyUserInputEnvelope
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
  }

  export type UpvoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UpvoteCreateWithoutUserInput, UpvoteUncheckedCreateWithoutUserInput> | UpvoteCreateWithoutUserInput[] | UpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutUserInput | UpvoteCreateOrConnectWithoutUserInput[]
    createMany?: UpvoteCreateManyUserInputEnvelope
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type RoomUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<RoomCreateWithoutCreatorInput, RoomUncheckedCreateWithoutCreatorInput> | RoomCreateWithoutCreatorInput[] | RoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCreatorInput | RoomCreateOrConnectWithoutCreatorInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutCreatorInput | RoomUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: RoomCreateManyCreatorInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutCreatorInput | RoomUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutCreatorInput | RoomUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomMemberCreateWithoutUserInput, RoomMemberUncheckedCreateWithoutUserInput> | RoomMemberCreateWithoutUserInput[] | RoomMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutUserInput | RoomMemberCreateOrConnectWithoutUserInput[]
    upsert?: RoomMemberUpsertWithWhereUniqueWithoutUserInput | RoomMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomMemberCreateManyUserInputEnvelope
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    update?: RoomMemberUpdateWithWhereUniqueWithoutUserInput | RoomMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomMemberUpdateManyWithWhereWithoutUserInput | RoomMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[]
  }

  export type RoomStreamUpdateManyWithoutAddedByNestedInput = {
    create?: XOR<RoomStreamCreateWithoutAddedByInput, RoomStreamUncheckedCreateWithoutAddedByInput> | RoomStreamCreateWithoutAddedByInput[] | RoomStreamUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutAddedByInput | RoomStreamCreateOrConnectWithoutAddedByInput[]
    upsert?: RoomStreamUpsertWithWhereUniqueWithoutAddedByInput | RoomStreamUpsertWithWhereUniqueWithoutAddedByInput[]
    createMany?: RoomStreamCreateManyAddedByInputEnvelope
    set?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    disconnect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    delete?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    update?: RoomStreamUpdateWithWhereUniqueWithoutAddedByInput | RoomStreamUpdateWithWhereUniqueWithoutAddedByInput[]
    updateMany?: RoomStreamUpdateManyWithWhereWithoutAddedByInput | RoomStreamUpdateManyWithWhereWithoutAddedByInput[]
    deleteMany?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
  }

  export type RoomStreamUpvoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutUserInput, RoomStreamUpvoteUncheckedCreateWithoutUserInput> | RoomStreamUpvoteCreateWithoutUserInput[] | RoomStreamUpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutUserInput | RoomStreamUpvoteCreateOrConnectWithoutUserInput[]
    upsert?: RoomStreamUpvoteUpsertWithWhereUniqueWithoutUserInput | RoomStreamUpvoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomStreamUpvoteCreateManyUserInputEnvelope
    set?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    disconnect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    delete?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    update?: RoomStreamUpvoteUpdateWithWhereUniqueWithoutUserInput | RoomStreamUpvoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomStreamUpvoteUpdateManyWithWhereWithoutUserInput | RoomStreamUpvoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomStreamUpvoteScalarWhereInput | RoomStreamUpvoteScalarWhereInput[]
  }

  export type SkipVoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<SkipVoteCreateWithoutUserInput, SkipVoteUncheckedCreateWithoutUserInput> | SkipVoteCreateWithoutUserInput[] | SkipVoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutUserInput | SkipVoteCreateOrConnectWithoutUserInput[]
    upsert?: SkipVoteUpsertWithWhereUniqueWithoutUserInput | SkipVoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SkipVoteCreateManyUserInputEnvelope
    set?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    disconnect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    delete?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    update?: SkipVoteUpdateWithWhereUniqueWithoutUserInput | SkipVoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SkipVoteUpdateManyWithWhereWithoutUserInput | SkipVoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SkipVoteScalarWhereInput | SkipVoteScalarWhereInput[]
  }

  export type StreamUpdateManyWithoutUserNestedInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput> | StreamCreateWithoutUserInput[] | StreamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput | StreamCreateOrConnectWithoutUserInput[]
    upsert?: StreamUpsertWithWhereUniqueWithoutUserInput | StreamUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StreamCreateManyUserInputEnvelope
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    update?: StreamUpdateWithWhereUniqueWithoutUserInput | StreamUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StreamUpdateManyWithWhereWithoutUserInput | StreamUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[]
  }

  export type UpvoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<UpvoteCreateWithoutUserInput, UpvoteUncheckedCreateWithoutUserInput> | UpvoteCreateWithoutUserInput[] | UpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutUserInput | UpvoteCreateOrConnectWithoutUserInput[]
    upsert?: UpvoteUpsertWithWhereUniqueWithoutUserInput | UpvoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UpvoteCreateManyUserInputEnvelope
    set?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    disconnect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    delete?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    update?: UpvoteUpdateWithWhereUniqueWithoutUserInput | UpvoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UpvoteUpdateManyWithWhereWithoutUserInput | UpvoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UpvoteScalarWhereInput | UpvoteScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<RoomCreateWithoutCreatorInput, RoomUncheckedCreateWithoutCreatorInput> | RoomCreateWithoutCreatorInput[] | RoomUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCreatorInput | RoomCreateOrConnectWithoutCreatorInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutCreatorInput | RoomUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: RoomCreateManyCreatorInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutCreatorInput | RoomUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutCreatorInput | RoomUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomMemberCreateWithoutUserInput, RoomMemberUncheckedCreateWithoutUserInput> | RoomMemberCreateWithoutUserInput[] | RoomMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutUserInput | RoomMemberCreateOrConnectWithoutUserInput[]
    upsert?: RoomMemberUpsertWithWhereUniqueWithoutUserInput | RoomMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomMemberCreateManyUserInputEnvelope
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    update?: RoomMemberUpdateWithWhereUniqueWithoutUserInput | RoomMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomMemberUpdateManyWithWhereWithoutUserInput | RoomMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[]
  }

  export type RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput = {
    create?: XOR<RoomStreamCreateWithoutAddedByInput, RoomStreamUncheckedCreateWithoutAddedByInput> | RoomStreamCreateWithoutAddedByInput[] | RoomStreamUncheckedCreateWithoutAddedByInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutAddedByInput | RoomStreamCreateOrConnectWithoutAddedByInput[]
    upsert?: RoomStreamUpsertWithWhereUniqueWithoutAddedByInput | RoomStreamUpsertWithWhereUniqueWithoutAddedByInput[]
    createMany?: RoomStreamCreateManyAddedByInputEnvelope
    set?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    disconnect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    delete?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    update?: RoomStreamUpdateWithWhereUniqueWithoutAddedByInput | RoomStreamUpdateWithWhereUniqueWithoutAddedByInput[]
    updateMany?: RoomStreamUpdateManyWithWhereWithoutAddedByInput | RoomStreamUpdateManyWithWhereWithoutAddedByInput[]
    deleteMany?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
  }

  export type RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutUserInput, RoomStreamUpvoteUncheckedCreateWithoutUserInput> | RoomStreamUpvoteCreateWithoutUserInput[] | RoomStreamUpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutUserInput | RoomStreamUpvoteCreateOrConnectWithoutUserInput[]
    upsert?: RoomStreamUpvoteUpsertWithWhereUniqueWithoutUserInput | RoomStreamUpvoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RoomStreamUpvoteCreateManyUserInputEnvelope
    set?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    disconnect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    delete?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    update?: RoomStreamUpvoteUpdateWithWhereUniqueWithoutUserInput | RoomStreamUpvoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RoomStreamUpvoteUpdateManyWithWhereWithoutUserInput | RoomStreamUpvoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RoomStreamUpvoteScalarWhereInput | RoomStreamUpvoteScalarWhereInput[]
  }

  export type SkipVoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SkipVoteCreateWithoutUserInput, SkipVoteUncheckedCreateWithoutUserInput> | SkipVoteCreateWithoutUserInput[] | SkipVoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutUserInput | SkipVoteCreateOrConnectWithoutUserInput[]
    upsert?: SkipVoteUpsertWithWhereUniqueWithoutUserInput | SkipVoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SkipVoteCreateManyUserInputEnvelope
    set?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    disconnect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    delete?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    update?: SkipVoteUpdateWithWhereUniqueWithoutUserInput | SkipVoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SkipVoteUpdateManyWithWhereWithoutUserInput | SkipVoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SkipVoteScalarWhereInput | SkipVoteScalarWhereInput[]
  }

  export type StreamUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput> | StreamCreateWithoutUserInput[] | StreamUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutUserInput | StreamCreateOrConnectWithoutUserInput[]
    upsert?: StreamUpsertWithWhereUniqueWithoutUserInput | StreamUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StreamCreateManyUserInputEnvelope
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    update?: StreamUpdateWithWhereUniqueWithoutUserInput | StreamUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StreamUpdateManyWithWhereWithoutUserInput | StreamUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[]
  }

  export type UpvoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UpvoteCreateWithoutUserInput, UpvoteUncheckedCreateWithoutUserInput> | UpvoteCreateWithoutUserInput[] | UpvoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutUserInput | UpvoteCreateOrConnectWithoutUserInput[]
    upsert?: UpvoteUpsertWithWhereUniqueWithoutUserInput | UpvoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UpvoteCreateManyUserInputEnvelope
    set?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    disconnect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    delete?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    update?: UpvoteUpdateWithWhereUniqueWithoutUserInput | UpvoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UpvoteUpdateManyWithWhereWithoutUserInput | UpvoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UpvoteScalarWhereInput | UpvoteScalarWhereInput[]
  }

  export type RoomStreamCreateNestedManyWithoutStreamInput = {
    create?: XOR<RoomStreamCreateWithoutStreamInput, RoomStreamUncheckedCreateWithoutStreamInput> | RoomStreamCreateWithoutStreamInput[] | RoomStreamUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutStreamInput | RoomStreamCreateOrConnectWithoutStreamInput[]
    createMany?: RoomStreamCreateManyStreamInputEnvelope
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutStreamsInput = {
    create?: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamsInput
    connect?: UserWhereUniqueInput
  }

  export type UpvoteCreateNestedManyWithoutStreamInput = {
    create?: XOR<UpvoteCreateWithoutStreamInput, UpvoteUncheckedCreateWithoutStreamInput> | UpvoteCreateWithoutStreamInput[] | UpvoteUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutStreamInput | UpvoteCreateOrConnectWithoutStreamInput[]
    createMany?: UpvoteCreateManyStreamInputEnvelope
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
  }

  export type RoomStreamUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<RoomStreamCreateWithoutStreamInput, RoomStreamUncheckedCreateWithoutStreamInput> | RoomStreamCreateWithoutStreamInput[] | RoomStreamUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutStreamInput | RoomStreamCreateOrConnectWithoutStreamInput[]
    createMany?: RoomStreamCreateManyStreamInputEnvelope
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
  }

  export type UpvoteUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<UpvoteCreateWithoutStreamInput, UpvoteUncheckedCreateWithoutStreamInput> | UpvoteCreateWithoutStreamInput[] | UpvoteUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutStreamInput | UpvoteCreateOrConnectWithoutStreamInput[]
    createMany?: UpvoteCreateManyStreamInputEnvelope
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
  }

  export type EnumStreamTypeFieldUpdateOperationsInput = {
    set?: $Enums.StreamType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RoomStreamUpdateManyWithoutStreamNestedInput = {
    create?: XOR<RoomStreamCreateWithoutStreamInput, RoomStreamUncheckedCreateWithoutStreamInput> | RoomStreamCreateWithoutStreamInput[] | RoomStreamUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutStreamInput | RoomStreamCreateOrConnectWithoutStreamInput[]
    upsert?: RoomStreamUpsertWithWhereUniqueWithoutStreamInput | RoomStreamUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: RoomStreamCreateManyStreamInputEnvelope
    set?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    disconnect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    delete?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    update?: RoomStreamUpdateWithWhereUniqueWithoutStreamInput | RoomStreamUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: RoomStreamUpdateManyWithWhereWithoutStreamInput | RoomStreamUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutStreamsNestedInput = {
    create?: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStreamsInput
    upsert?: UserUpsertWithoutStreamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStreamsInput, UserUpdateWithoutStreamsInput>, UserUncheckedUpdateWithoutStreamsInput>
  }

  export type UpvoteUpdateManyWithoutStreamNestedInput = {
    create?: XOR<UpvoteCreateWithoutStreamInput, UpvoteUncheckedCreateWithoutStreamInput> | UpvoteCreateWithoutStreamInput[] | UpvoteUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutStreamInput | UpvoteCreateOrConnectWithoutStreamInput[]
    upsert?: UpvoteUpsertWithWhereUniqueWithoutStreamInput | UpvoteUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: UpvoteCreateManyStreamInputEnvelope
    set?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    disconnect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    delete?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    update?: UpvoteUpdateWithWhereUniqueWithoutStreamInput | UpvoteUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: UpvoteUpdateManyWithWhereWithoutStreamInput | UpvoteUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: UpvoteScalarWhereInput | UpvoteScalarWhereInput[]
  }

  export type RoomStreamUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<RoomStreamCreateWithoutStreamInput, RoomStreamUncheckedCreateWithoutStreamInput> | RoomStreamCreateWithoutStreamInput[] | RoomStreamUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutStreamInput | RoomStreamCreateOrConnectWithoutStreamInput[]
    upsert?: RoomStreamUpsertWithWhereUniqueWithoutStreamInput | RoomStreamUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: RoomStreamCreateManyStreamInputEnvelope
    set?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    disconnect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    delete?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    update?: RoomStreamUpdateWithWhereUniqueWithoutStreamInput | RoomStreamUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: RoomStreamUpdateManyWithWhereWithoutStreamInput | RoomStreamUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
  }

  export type UpvoteUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<UpvoteCreateWithoutStreamInput, UpvoteUncheckedCreateWithoutStreamInput> | UpvoteCreateWithoutStreamInput[] | UpvoteUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: UpvoteCreateOrConnectWithoutStreamInput | UpvoteCreateOrConnectWithoutStreamInput[]
    upsert?: UpvoteUpsertWithWhereUniqueWithoutStreamInput | UpvoteUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: UpvoteCreateManyStreamInputEnvelope
    set?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    disconnect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    delete?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    connect?: UpvoteWhereUniqueInput | UpvoteWhereUniqueInput[]
    update?: UpvoteUpdateWithWhereUniqueWithoutStreamInput | UpvoteUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: UpvoteUpdateManyWithWhereWithoutStreamInput | UpvoteUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: UpvoteScalarWhereInput | UpvoteScalarWhereInput[]
  }

  export type StreamCreateNestedOneWithoutUpvotesInput = {
    create?: XOR<StreamCreateWithoutUpvotesInput, StreamUncheckedCreateWithoutUpvotesInput>
    connectOrCreate?: StreamCreateOrConnectWithoutUpvotesInput
    connect?: StreamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUpvotesInput = {
    create?: XOR<UserCreateWithoutUpvotesInput, UserUncheckedCreateWithoutUpvotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpvotesInput
    connect?: UserWhereUniqueInput
  }

  export type StreamUpdateOneRequiredWithoutUpvotesNestedInput = {
    create?: XOR<StreamCreateWithoutUpvotesInput, StreamUncheckedCreateWithoutUpvotesInput>
    connectOrCreate?: StreamCreateOrConnectWithoutUpvotesInput
    upsert?: StreamUpsertWithoutUpvotesInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutUpvotesInput, StreamUpdateWithoutUpvotesInput>, StreamUncheckedUpdateWithoutUpvotesInput>
  }

  export type UserUpdateOneRequiredWithoutUpvotesNestedInput = {
    create?: XOR<UserCreateWithoutUpvotesInput, UserUncheckedCreateWithoutUpvotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpvotesInput
    upsert?: UserUpsertWithoutUpvotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUpvotesInput, UserUpdateWithoutUpvotesInput>, UserUncheckedUpdateWithoutUpvotesInput>
  }

  export type UserCreateNestedOneWithoutCreatedRoomsInput = {
    create?: XOR<UserCreateWithoutCreatedRoomsInput, UserUncheckedCreateWithoutCreatedRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomStreamCreateNestedOneWithoutCurrentInRoomsInput = {
    create?: XOR<RoomStreamCreateWithoutCurrentInRoomsInput, RoomStreamUncheckedCreateWithoutCurrentInRoomsInput>
    connectOrCreate?: RoomStreamCreateOrConnectWithoutCurrentInRoomsInput
    connect?: RoomStreamWhereUniqueInput
  }

  export type RoomMemberCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomMemberCreateWithoutRoomInput, RoomMemberUncheckedCreateWithoutRoomInput> | RoomMemberCreateWithoutRoomInput[] | RoomMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutRoomInput | RoomMemberCreateOrConnectWithoutRoomInput[]
    createMany?: RoomMemberCreateManyRoomInputEnvelope
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
  }

  export type RoomStreamCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStreamCreateWithoutRoomInput, RoomStreamUncheckedCreateWithoutRoomInput> | RoomStreamCreateWithoutRoomInput[] | RoomStreamUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutRoomInput | RoomStreamCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStreamCreateManyRoomInputEnvelope
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
  }

  export type RoomMemberUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomMemberCreateWithoutRoomInput, RoomMemberUncheckedCreateWithoutRoomInput> | RoomMemberCreateWithoutRoomInput[] | RoomMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutRoomInput | RoomMemberCreateOrConnectWithoutRoomInput[]
    createMany?: RoomMemberCreateManyRoomInputEnvelope
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
  }

  export type RoomStreamUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStreamCreateWithoutRoomInput, RoomStreamUncheckedCreateWithoutRoomInput> | RoomStreamCreateWithoutRoomInput[] | RoomStreamUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutRoomInput | RoomStreamCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStreamCreateManyRoomInputEnvelope
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCreatedRoomsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedRoomsInput, UserUncheckedCreateWithoutCreatedRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRoomsInput
    upsert?: UserUpsertWithoutCreatedRoomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedRoomsInput, UserUpdateWithoutCreatedRoomsInput>, UserUncheckedUpdateWithoutCreatedRoomsInput>
  }

  export type RoomStreamUpdateOneWithoutCurrentInRoomsNestedInput = {
    create?: XOR<RoomStreamCreateWithoutCurrentInRoomsInput, RoomStreamUncheckedCreateWithoutCurrentInRoomsInput>
    connectOrCreate?: RoomStreamCreateOrConnectWithoutCurrentInRoomsInput
    upsert?: RoomStreamUpsertWithoutCurrentInRoomsInput
    disconnect?: RoomStreamWhereInput | boolean
    delete?: RoomStreamWhereInput | boolean
    connect?: RoomStreamWhereUniqueInput
    update?: XOR<XOR<RoomStreamUpdateToOneWithWhereWithoutCurrentInRoomsInput, RoomStreamUpdateWithoutCurrentInRoomsInput>, RoomStreamUncheckedUpdateWithoutCurrentInRoomsInput>
  }

  export type RoomMemberUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomMemberCreateWithoutRoomInput, RoomMemberUncheckedCreateWithoutRoomInput> | RoomMemberCreateWithoutRoomInput[] | RoomMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutRoomInput | RoomMemberCreateOrConnectWithoutRoomInput[]
    upsert?: RoomMemberUpsertWithWhereUniqueWithoutRoomInput | RoomMemberUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomMemberCreateManyRoomInputEnvelope
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    update?: RoomMemberUpdateWithWhereUniqueWithoutRoomInput | RoomMemberUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomMemberUpdateManyWithWhereWithoutRoomInput | RoomMemberUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[]
  }

  export type RoomStreamUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStreamCreateWithoutRoomInput, RoomStreamUncheckedCreateWithoutRoomInput> | RoomStreamCreateWithoutRoomInput[] | RoomStreamUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutRoomInput | RoomStreamCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStreamUpsertWithWhereUniqueWithoutRoomInput | RoomStreamUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStreamCreateManyRoomInputEnvelope
    set?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    disconnect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    delete?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    update?: RoomStreamUpdateWithWhereUniqueWithoutRoomInput | RoomStreamUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStreamUpdateManyWithWhereWithoutRoomInput | RoomStreamUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
  }

  export type RoomMemberUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomMemberCreateWithoutRoomInput, RoomMemberUncheckedCreateWithoutRoomInput> | RoomMemberCreateWithoutRoomInput[] | RoomMemberUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomMemberCreateOrConnectWithoutRoomInput | RoomMemberCreateOrConnectWithoutRoomInput[]
    upsert?: RoomMemberUpsertWithWhereUniqueWithoutRoomInput | RoomMemberUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomMemberCreateManyRoomInputEnvelope
    set?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    disconnect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    delete?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    connect?: RoomMemberWhereUniqueInput | RoomMemberWhereUniqueInput[]
    update?: RoomMemberUpdateWithWhereUniqueWithoutRoomInput | RoomMemberUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomMemberUpdateManyWithWhereWithoutRoomInput | RoomMemberUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[]
  }

  export type RoomStreamUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStreamCreateWithoutRoomInput, RoomStreamUncheckedCreateWithoutRoomInput> | RoomStreamCreateWithoutRoomInput[] | RoomStreamUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamCreateOrConnectWithoutRoomInput | RoomStreamCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStreamUpsertWithWhereUniqueWithoutRoomInput | RoomStreamUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStreamCreateManyRoomInputEnvelope
    set?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    disconnect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    delete?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    connect?: RoomStreamWhereUniqueInput | RoomStreamWhereUniqueInput[]
    update?: RoomStreamUpdateWithWhereUniqueWithoutRoomInput | RoomStreamUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStreamUpdateManyWithWhereWithoutRoomInput | RoomStreamUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutMembersInput = {
    create?: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMembersInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRoomMembersInput = {
    create?: XOR<UserCreateWithoutRoomMembersInput, UserUncheckedCreateWithoutRoomMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomMembersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRoomMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.RoomMemberRole
  }

  export type RoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
    connectOrCreate?: RoomCreateOrConnectWithoutMembersInput
    upsert?: RoomUpsertWithoutMembersInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutMembersInput, RoomUpdateWithoutMembersInput>, RoomUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutRoomMembersNestedInput = {
    create?: XOR<UserCreateWithoutRoomMembersInput, UserUncheckedCreateWithoutRoomMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomMembersInput
    upsert?: UserUpsertWithoutRoomMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomMembersInput, UserUpdateWithoutRoomMembersInput>, UserUncheckedUpdateWithoutRoomMembersInput>
  }

  export type RoomCreateNestedManyWithoutCurrentStreamInput = {
    create?: XOR<RoomCreateWithoutCurrentStreamInput, RoomUncheckedCreateWithoutCurrentStreamInput> | RoomCreateWithoutCurrentStreamInput[] | RoomUncheckedCreateWithoutCurrentStreamInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCurrentStreamInput | RoomCreateOrConnectWithoutCurrentStreamInput[]
    createMany?: RoomCreateManyCurrentStreamInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutAddedRoomStreamsInput = {
    create?: XOR<UserCreateWithoutAddedRoomStreamsInput, UserUncheckedCreateWithoutAddedRoomStreamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddedRoomStreamsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutStreamsInput = {
    create?: XOR<RoomCreateWithoutStreamsInput, RoomUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStreamsInput
    connect?: RoomWhereUniqueInput
  }

  export type StreamCreateNestedOneWithoutRoomStreamsInput = {
    create?: XOR<StreamCreateWithoutRoomStreamsInput, StreamUncheckedCreateWithoutRoomStreamsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutRoomStreamsInput
    connect?: StreamWhereUniqueInput
  }

  export type RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput> | RoomStreamUpvoteCreateWithoutRoomStreamInput[] | RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput | RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput[]
    createMany?: RoomStreamUpvoteCreateManyRoomStreamInputEnvelope
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
  }

  export type SkipVoteCreateNestedManyWithoutRoomStreamInput = {
    create?: XOR<SkipVoteCreateWithoutRoomStreamInput, SkipVoteUncheckedCreateWithoutRoomStreamInput> | SkipVoteCreateWithoutRoomStreamInput[] | SkipVoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutRoomStreamInput | SkipVoteCreateOrConnectWithoutRoomStreamInput[]
    createMany?: SkipVoteCreateManyRoomStreamInputEnvelope
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutCurrentStreamInput = {
    create?: XOR<RoomCreateWithoutCurrentStreamInput, RoomUncheckedCreateWithoutCurrentStreamInput> | RoomCreateWithoutCurrentStreamInput[] | RoomUncheckedCreateWithoutCurrentStreamInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCurrentStreamInput | RoomCreateOrConnectWithoutCurrentStreamInput[]
    createMany?: RoomCreateManyCurrentStreamInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput> | RoomStreamUpvoteCreateWithoutRoomStreamInput[] | RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput | RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput[]
    createMany?: RoomStreamUpvoteCreateManyRoomStreamInputEnvelope
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
  }

  export type SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput = {
    create?: XOR<SkipVoteCreateWithoutRoomStreamInput, SkipVoteUncheckedCreateWithoutRoomStreamInput> | SkipVoteCreateWithoutRoomStreamInput[] | SkipVoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutRoomStreamInput | SkipVoteCreateOrConnectWithoutRoomStreamInput[]
    createMany?: SkipVoteCreateManyRoomStreamInputEnvelope
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoomUpdateManyWithoutCurrentStreamNestedInput = {
    create?: XOR<RoomCreateWithoutCurrentStreamInput, RoomUncheckedCreateWithoutCurrentStreamInput> | RoomCreateWithoutCurrentStreamInput[] | RoomUncheckedCreateWithoutCurrentStreamInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCurrentStreamInput | RoomCreateOrConnectWithoutCurrentStreamInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutCurrentStreamInput | RoomUpsertWithWhereUniqueWithoutCurrentStreamInput[]
    createMany?: RoomCreateManyCurrentStreamInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutCurrentStreamInput | RoomUpdateWithWhereUniqueWithoutCurrentStreamInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutCurrentStreamInput | RoomUpdateManyWithWhereWithoutCurrentStreamInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput = {
    create?: XOR<UserCreateWithoutAddedRoomStreamsInput, UserUncheckedCreateWithoutAddedRoomStreamsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddedRoomStreamsInput
    upsert?: UserUpsertWithoutAddedRoomStreamsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddedRoomStreamsInput, UserUpdateWithoutAddedRoomStreamsInput>, UserUncheckedUpdateWithoutAddedRoomStreamsInput>
  }

  export type RoomUpdateOneRequiredWithoutStreamsNestedInput = {
    create?: XOR<RoomCreateWithoutStreamsInput, RoomUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStreamsInput
    upsert?: RoomUpsertWithoutStreamsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutStreamsInput, RoomUpdateWithoutStreamsInput>, RoomUncheckedUpdateWithoutStreamsInput>
  }

  export type StreamUpdateOneRequiredWithoutRoomStreamsNestedInput = {
    create?: XOR<StreamCreateWithoutRoomStreamsInput, StreamUncheckedCreateWithoutRoomStreamsInput>
    connectOrCreate?: StreamCreateOrConnectWithoutRoomStreamsInput
    upsert?: StreamUpsertWithoutRoomStreamsInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutRoomStreamsInput, StreamUpdateWithoutRoomStreamsInput>, StreamUncheckedUpdateWithoutRoomStreamsInput>
  }

  export type RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput> | RoomStreamUpvoteCreateWithoutRoomStreamInput[] | RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput | RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput[]
    upsert?: RoomStreamUpvoteUpsertWithWhereUniqueWithoutRoomStreamInput | RoomStreamUpvoteUpsertWithWhereUniqueWithoutRoomStreamInput[]
    createMany?: RoomStreamUpvoteCreateManyRoomStreamInputEnvelope
    set?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    disconnect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    delete?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    update?: RoomStreamUpvoteUpdateWithWhereUniqueWithoutRoomStreamInput | RoomStreamUpvoteUpdateWithWhereUniqueWithoutRoomStreamInput[]
    updateMany?: RoomStreamUpvoteUpdateManyWithWhereWithoutRoomStreamInput | RoomStreamUpvoteUpdateManyWithWhereWithoutRoomStreamInput[]
    deleteMany?: RoomStreamUpvoteScalarWhereInput | RoomStreamUpvoteScalarWhereInput[]
  }

  export type SkipVoteUpdateManyWithoutRoomStreamNestedInput = {
    create?: XOR<SkipVoteCreateWithoutRoomStreamInput, SkipVoteUncheckedCreateWithoutRoomStreamInput> | SkipVoteCreateWithoutRoomStreamInput[] | SkipVoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutRoomStreamInput | SkipVoteCreateOrConnectWithoutRoomStreamInput[]
    upsert?: SkipVoteUpsertWithWhereUniqueWithoutRoomStreamInput | SkipVoteUpsertWithWhereUniqueWithoutRoomStreamInput[]
    createMany?: SkipVoteCreateManyRoomStreamInputEnvelope
    set?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    disconnect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    delete?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    update?: SkipVoteUpdateWithWhereUniqueWithoutRoomStreamInput | SkipVoteUpdateWithWhereUniqueWithoutRoomStreamInput[]
    updateMany?: SkipVoteUpdateManyWithWhereWithoutRoomStreamInput | SkipVoteUpdateManyWithWhereWithoutRoomStreamInput[]
    deleteMany?: SkipVoteScalarWhereInput | SkipVoteScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput = {
    create?: XOR<RoomCreateWithoutCurrentStreamInput, RoomUncheckedCreateWithoutCurrentStreamInput> | RoomCreateWithoutCurrentStreamInput[] | RoomUncheckedCreateWithoutCurrentStreamInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutCurrentStreamInput | RoomCreateOrConnectWithoutCurrentStreamInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutCurrentStreamInput | RoomUpsertWithWhereUniqueWithoutCurrentStreamInput[]
    createMany?: RoomCreateManyCurrentStreamInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutCurrentStreamInput | RoomUpdateWithWhereUniqueWithoutCurrentStreamInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutCurrentStreamInput | RoomUpdateManyWithWhereWithoutCurrentStreamInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput = {
    create?: XOR<RoomStreamUpvoteCreateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput> | RoomStreamUpvoteCreateWithoutRoomStreamInput[] | RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput | RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput[]
    upsert?: RoomStreamUpvoteUpsertWithWhereUniqueWithoutRoomStreamInput | RoomStreamUpvoteUpsertWithWhereUniqueWithoutRoomStreamInput[]
    createMany?: RoomStreamUpvoteCreateManyRoomStreamInputEnvelope
    set?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    disconnect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    delete?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    connect?: RoomStreamUpvoteWhereUniqueInput | RoomStreamUpvoteWhereUniqueInput[]
    update?: RoomStreamUpvoteUpdateWithWhereUniqueWithoutRoomStreamInput | RoomStreamUpvoteUpdateWithWhereUniqueWithoutRoomStreamInput[]
    updateMany?: RoomStreamUpvoteUpdateManyWithWhereWithoutRoomStreamInput | RoomStreamUpvoteUpdateManyWithWhereWithoutRoomStreamInput[]
    deleteMany?: RoomStreamUpvoteScalarWhereInput | RoomStreamUpvoteScalarWhereInput[]
  }

  export type SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput = {
    create?: XOR<SkipVoteCreateWithoutRoomStreamInput, SkipVoteUncheckedCreateWithoutRoomStreamInput> | SkipVoteCreateWithoutRoomStreamInput[] | SkipVoteUncheckedCreateWithoutRoomStreamInput[]
    connectOrCreate?: SkipVoteCreateOrConnectWithoutRoomStreamInput | SkipVoteCreateOrConnectWithoutRoomStreamInput[]
    upsert?: SkipVoteUpsertWithWhereUniqueWithoutRoomStreamInput | SkipVoteUpsertWithWhereUniqueWithoutRoomStreamInput[]
    createMany?: SkipVoteCreateManyRoomStreamInputEnvelope
    set?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    disconnect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    delete?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    connect?: SkipVoteWhereUniqueInput | SkipVoteWhereUniqueInput[]
    update?: SkipVoteUpdateWithWhereUniqueWithoutRoomStreamInput | SkipVoteUpdateWithWhereUniqueWithoutRoomStreamInput[]
    updateMany?: SkipVoteUpdateManyWithWhereWithoutRoomStreamInput | SkipVoteUpdateManyWithWhereWithoutRoomStreamInput[]
    deleteMany?: SkipVoteScalarWhereInput | SkipVoteScalarWhereInput[]
  }

  export type RoomStreamCreateNestedOneWithoutUpvotesInput = {
    create?: XOR<RoomStreamCreateWithoutUpvotesInput, RoomStreamUncheckedCreateWithoutUpvotesInput>
    connectOrCreate?: RoomStreamCreateOrConnectWithoutUpvotesInput
    connect?: RoomStreamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRoomStreamUpvotesInput = {
    create?: XOR<UserCreateWithoutRoomStreamUpvotesInput, UserUncheckedCreateWithoutRoomStreamUpvotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomStreamUpvotesInput
    connect?: UserWhereUniqueInput
  }

  export type RoomStreamUpdateOneRequiredWithoutUpvotesNestedInput = {
    create?: XOR<RoomStreamCreateWithoutUpvotesInput, RoomStreamUncheckedCreateWithoutUpvotesInput>
    connectOrCreate?: RoomStreamCreateOrConnectWithoutUpvotesInput
    upsert?: RoomStreamUpsertWithoutUpvotesInput
    connect?: RoomStreamWhereUniqueInput
    update?: XOR<XOR<RoomStreamUpdateToOneWithWhereWithoutUpvotesInput, RoomStreamUpdateWithoutUpvotesInput>, RoomStreamUncheckedUpdateWithoutUpvotesInput>
  }

  export type UserUpdateOneRequiredWithoutRoomStreamUpvotesNestedInput = {
    create?: XOR<UserCreateWithoutRoomStreamUpvotesInput, UserUncheckedCreateWithoutRoomStreamUpvotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomStreamUpvotesInput
    upsert?: UserUpsertWithoutRoomStreamUpvotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomStreamUpvotesInput, UserUpdateWithoutRoomStreamUpvotesInput>, UserUncheckedUpdateWithoutRoomStreamUpvotesInput>
  }

  export type RoomStreamCreateNestedOneWithoutSkipVotesInput = {
    create?: XOR<RoomStreamCreateWithoutSkipVotesInput, RoomStreamUncheckedCreateWithoutSkipVotesInput>
    connectOrCreate?: RoomStreamCreateOrConnectWithoutSkipVotesInput
    connect?: RoomStreamWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSkipVotesInput = {
    create?: XOR<UserCreateWithoutSkipVotesInput, UserUncheckedCreateWithoutSkipVotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkipVotesInput
    connect?: UserWhereUniqueInput
  }

  export type RoomStreamUpdateOneRequiredWithoutSkipVotesNestedInput = {
    create?: XOR<RoomStreamCreateWithoutSkipVotesInput, RoomStreamUncheckedCreateWithoutSkipVotesInput>
    connectOrCreate?: RoomStreamCreateOrConnectWithoutSkipVotesInput
    upsert?: RoomStreamUpsertWithoutSkipVotesInput
    connect?: RoomStreamWhereUniqueInput
    update?: XOR<XOR<RoomStreamUpdateToOneWithWhereWithoutSkipVotesInput, RoomStreamUpdateWithoutSkipVotesInput>, RoomStreamUncheckedUpdateWithoutSkipVotesInput>
  }

  export type UserUpdateOneRequiredWithoutSkipVotesNestedInput = {
    create?: XOR<UserCreateWithoutSkipVotesInput, UserUncheckedCreateWithoutSkipVotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSkipVotesInput
    upsert?: UserUpsertWithoutSkipVotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSkipVotesInput, UserUpdateWithoutSkipVotesInput>, UserUncheckedUpdateWithoutSkipVotesInput>
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

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
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

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type NestedEnumStreamTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamType | EnumStreamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamTypeFilter<$PrismaModel> | $Enums.StreamType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumStreamTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamType | EnumStreamTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamType[] | ListEnumStreamTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamTypeWithAggregatesFilter<$PrismaModel> | $Enums.StreamType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamTypeFilter<$PrismaModel>
    _max?: NestedEnumStreamTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoomMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomMemberRole | EnumRoomMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomMemberRoleFilter<$PrismaModel> | $Enums.RoomMemberRole
  }

  export type NestedEnumRoomMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomMemberRole | EnumRoomMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomMemberRole[] | ListEnumRoomMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.RoomMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumRoomMemberRoleFilter<$PrismaModel>
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

  export type RoomCreateWithoutCreatorInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    currentStream?: RoomStreamCreateNestedOneWithoutCurrentInRoomsInput
    members?: RoomMemberCreateNestedManyWithoutRoomInput
    streams?: RoomStreamCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutCreatorInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    currentStreamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput
    streams?: RoomStreamUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutCreatorInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutCreatorInput, RoomUncheckedCreateWithoutCreatorInput>
  }

  export type RoomCreateManyCreatorInputEnvelope = {
    data: RoomCreateManyCreatorInput | RoomCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type RoomMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
    room: RoomCreateNestedOneWithoutMembersInput
  }

  export type RoomMemberUncheckedCreateWithoutUserInput = {
    id?: string
    roomId: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
  }

  export type RoomMemberCreateOrConnectWithoutUserInput = {
    where: RoomMemberWhereUniqueInput
    create: XOR<RoomMemberCreateWithoutUserInput, RoomMemberUncheckedCreateWithoutUserInput>
  }

  export type RoomMemberCreateManyUserInputEnvelope = {
    data: RoomMemberCreateManyUserInput | RoomMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoomStreamCreateWithoutAddedByInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomCreateNestedManyWithoutCurrentStreamInput
    room: RoomCreateNestedOneWithoutStreamsInput
    stream: StreamCreateNestedOneWithoutRoomStreamsInput
    upvotes?: RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateWithoutAddedByInput = {
    id?: string
    roomId: string
    streamId: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomUncheckedCreateNestedManyWithoutCurrentStreamInput
    upvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamCreateOrConnectWithoutAddedByInput = {
    where: RoomStreamWhereUniqueInput
    create: XOR<RoomStreamCreateWithoutAddedByInput, RoomStreamUncheckedCreateWithoutAddedByInput>
  }

  export type RoomStreamCreateManyAddedByInputEnvelope = {
    data: RoomStreamCreateManyAddedByInput | RoomStreamCreateManyAddedByInput[]
    skipDuplicates?: boolean
  }

  export type RoomStreamUpvoteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    roomStream: RoomStreamCreateNestedOneWithoutUpvotesInput
  }

  export type RoomStreamUpvoteUncheckedCreateWithoutUserInput = {
    id?: string
    roomStreamId: string
    createdAt?: Date | string
  }

  export type RoomStreamUpvoteCreateOrConnectWithoutUserInput = {
    where: RoomStreamUpvoteWhereUniqueInput
    create: XOR<RoomStreamUpvoteCreateWithoutUserInput, RoomStreamUpvoteUncheckedCreateWithoutUserInput>
  }

  export type RoomStreamUpvoteCreateManyUserInputEnvelope = {
    data: RoomStreamUpvoteCreateManyUserInput | RoomStreamUpvoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SkipVoteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    roomStream: RoomStreamCreateNestedOneWithoutSkipVotesInput
  }

  export type SkipVoteUncheckedCreateWithoutUserInput = {
    id?: string
    roomStreamId: string
    createdAt?: Date | string
  }

  export type SkipVoteCreateOrConnectWithoutUserInput = {
    where: SkipVoteWhereUniqueInput
    create: XOR<SkipVoteCreateWithoutUserInput, SkipVoteUncheckedCreateWithoutUserInput>
  }

  export type SkipVoteCreateManyUserInputEnvelope = {
    data: SkipVoteCreateManyUserInput | SkipVoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StreamCreateWithoutUserInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    roomStreams?: RoomStreamCreateNestedManyWithoutStreamInput
    upvotes?: UpvoteCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    roomStreams?: RoomStreamUncheckedCreateNestedManyWithoutStreamInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutUserInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
  }

  export type StreamCreateManyUserInputEnvelope = {
    data: StreamCreateManyUserInput | StreamCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UpvoteCreateWithoutUserInput = {
    id?: string
    Stream: StreamCreateNestedOneWithoutUpvotesInput
  }

  export type UpvoteUncheckedCreateWithoutUserInput = {
    id?: string
    StreamId: string
  }

  export type UpvoteCreateOrConnectWithoutUserInput = {
    where: UpvoteWhereUniqueInput
    create: XOR<UpvoteCreateWithoutUserInput, UpvoteUncheckedCreateWithoutUserInput>
  }

  export type UpvoteCreateManyUserInputEnvelope = {
    data: UpvoteCreateManyUserInput | UpvoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithWhereUniqueWithoutCreatorInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutCreatorInput, RoomUncheckedUpdateWithoutCreatorInput>
    create: XOR<RoomCreateWithoutCreatorInput, RoomUncheckedCreateWithoutCreatorInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutCreatorInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutCreatorInput, RoomUncheckedUpdateWithoutCreatorInput>
  }

  export type RoomUpdateManyWithWhereWithoutCreatorInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutCreatorInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    isPublic?: BoolFilter<"Room"> | boolean
    creatorId?: StringFilter<"Room"> | string
    currentStreamId?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    isPlaying?: BoolFilter<"Room"> | boolean
    lastSyncTime?: DateTimeNullableFilter<"Room"> | Date | string | null
    playbackTime?: FloatNullableFilter<"Room"> | number | null
  }

  export type RoomMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: RoomMemberWhereUniqueInput
    update: XOR<RoomMemberUpdateWithoutUserInput, RoomMemberUncheckedUpdateWithoutUserInput>
    create: XOR<RoomMemberCreateWithoutUserInput, RoomMemberUncheckedCreateWithoutUserInput>
  }

  export type RoomMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: RoomMemberWhereUniqueInput
    data: XOR<RoomMemberUpdateWithoutUserInput, RoomMemberUncheckedUpdateWithoutUserInput>
  }

  export type RoomMemberUpdateManyWithWhereWithoutUserInput = {
    where: RoomMemberScalarWhereInput
    data: XOR<RoomMemberUpdateManyMutationInput, RoomMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type RoomMemberScalarWhereInput = {
    AND?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[]
    OR?: RoomMemberScalarWhereInput[]
    NOT?: RoomMemberScalarWhereInput | RoomMemberScalarWhereInput[]
    id?: StringFilter<"RoomMember"> | string
    roomId?: StringFilter<"RoomMember"> | string
    userId?: StringFilter<"RoomMember"> | string
    role?: EnumRoomMemberRoleFilter<"RoomMember"> | $Enums.RoomMemberRole
    joinedAt?: DateTimeFilter<"RoomMember"> | Date | string
  }

  export type RoomStreamUpsertWithWhereUniqueWithoutAddedByInput = {
    where: RoomStreamWhereUniqueInput
    update: XOR<RoomStreamUpdateWithoutAddedByInput, RoomStreamUncheckedUpdateWithoutAddedByInput>
    create: XOR<RoomStreamCreateWithoutAddedByInput, RoomStreamUncheckedCreateWithoutAddedByInput>
  }

  export type RoomStreamUpdateWithWhereUniqueWithoutAddedByInput = {
    where: RoomStreamWhereUniqueInput
    data: XOR<RoomStreamUpdateWithoutAddedByInput, RoomStreamUncheckedUpdateWithoutAddedByInput>
  }

  export type RoomStreamUpdateManyWithWhereWithoutAddedByInput = {
    where: RoomStreamScalarWhereInput
    data: XOR<RoomStreamUpdateManyMutationInput, RoomStreamUncheckedUpdateManyWithoutAddedByInput>
  }

  export type RoomStreamScalarWhereInput = {
    AND?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
    OR?: RoomStreamScalarWhereInput[]
    NOT?: RoomStreamScalarWhereInput | RoomStreamScalarWhereInput[]
    id?: StringFilter<"RoomStream"> | string
    roomId?: StringFilter<"RoomStream"> | string
    streamId?: StringFilter<"RoomStream"> | string
    addedById?: StringFilter<"RoomStream"> | string
    addedAt?: DateTimeFilter<"RoomStream"> | Date | string
    order?: IntFilter<"RoomStream"> | number
  }

  export type RoomStreamUpvoteUpsertWithWhereUniqueWithoutUserInput = {
    where: RoomStreamUpvoteWhereUniqueInput
    update: XOR<RoomStreamUpvoteUpdateWithoutUserInput, RoomStreamUpvoteUncheckedUpdateWithoutUserInput>
    create: XOR<RoomStreamUpvoteCreateWithoutUserInput, RoomStreamUpvoteUncheckedCreateWithoutUserInput>
  }

  export type RoomStreamUpvoteUpdateWithWhereUniqueWithoutUserInput = {
    where: RoomStreamUpvoteWhereUniqueInput
    data: XOR<RoomStreamUpvoteUpdateWithoutUserInput, RoomStreamUpvoteUncheckedUpdateWithoutUserInput>
  }

  export type RoomStreamUpvoteUpdateManyWithWhereWithoutUserInput = {
    where: RoomStreamUpvoteScalarWhereInput
    data: XOR<RoomStreamUpvoteUpdateManyMutationInput, RoomStreamUpvoteUncheckedUpdateManyWithoutUserInput>
  }

  export type RoomStreamUpvoteScalarWhereInput = {
    AND?: RoomStreamUpvoteScalarWhereInput | RoomStreamUpvoteScalarWhereInput[]
    OR?: RoomStreamUpvoteScalarWhereInput[]
    NOT?: RoomStreamUpvoteScalarWhereInput | RoomStreamUpvoteScalarWhereInput[]
    id?: StringFilter<"RoomStreamUpvote"> | string
    roomStreamId?: StringFilter<"RoomStreamUpvote"> | string
    userId?: StringFilter<"RoomStreamUpvote"> | string
    createdAt?: DateTimeFilter<"RoomStreamUpvote"> | Date | string
  }

  export type SkipVoteUpsertWithWhereUniqueWithoutUserInput = {
    where: SkipVoteWhereUniqueInput
    update: XOR<SkipVoteUpdateWithoutUserInput, SkipVoteUncheckedUpdateWithoutUserInput>
    create: XOR<SkipVoteCreateWithoutUserInput, SkipVoteUncheckedCreateWithoutUserInput>
  }

  export type SkipVoteUpdateWithWhereUniqueWithoutUserInput = {
    where: SkipVoteWhereUniqueInput
    data: XOR<SkipVoteUpdateWithoutUserInput, SkipVoteUncheckedUpdateWithoutUserInput>
  }

  export type SkipVoteUpdateManyWithWhereWithoutUserInput = {
    where: SkipVoteScalarWhereInput
    data: XOR<SkipVoteUpdateManyMutationInput, SkipVoteUncheckedUpdateManyWithoutUserInput>
  }

  export type SkipVoteScalarWhereInput = {
    AND?: SkipVoteScalarWhereInput | SkipVoteScalarWhereInput[]
    OR?: SkipVoteScalarWhereInput[]
    NOT?: SkipVoteScalarWhereInput | SkipVoteScalarWhereInput[]
    id?: StringFilter<"SkipVote"> | string
    roomStreamId?: StringFilter<"SkipVote"> | string
    userId?: StringFilter<"SkipVote"> | string
    createdAt?: DateTimeFilter<"SkipVote"> | Date | string
  }

  export type StreamUpsertWithWhereUniqueWithoutUserInput = {
    where: StreamWhereUniqueInput
    update: XOR<StreamUpdateWithoutUserInput, StreamUncheckedUpdateWithoutUserInput>
    create: XOR<StreamCreateWithoutUserInput, StreamUncheckedCreateWithoutUserInput>
  }

  export type StreamUpdateWithWhereUniqueWithoutUserInput = {
    where: StreamWhereUniqueInput
    data: XOR<StreamUpdateWithoutUserInput, StreamUncheckedUpdateWithoutUserInput>
  }

  export type StreamUpdateManyWithWhereWithoutUserInput = {
    where: StreamScalarWhereInput
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyWithoutUserInput>
  }

  export type StreamScalarWhereInput = {
    AND?: StreamScalarWhereInput | StreamScalarWhereInput[]
    OR?: StreamScalarWhereInput[]
    NOT?: StreamScalarWhereInput | StreamScalarWhereInput[]
    id?: StringFilter<"Stream"> | string
    type?: EnumStreamTypeFilter<"Stream"> | $Enums.StreamType
    active?: BoolFilter<"Stream"> | boolean
    UserId?: StringFilter<"Stream"> | string
    url?: StringFilter<"Stream"> | string
    extractedId?: StringFilter<"Stream"> | string
    bigImg?: StringFilter<"Stream"> | string
    smallImg?: StringFilter<"Stream"> | string
    title?: StringFilter<"Stream"> | string
  }

  export type UpvoteUpsertWithWhereUniqueWithoutUserInput = {
    where: UpvoteWhereUniqueInput
    update: XOR<UpvoteUpdateWithoutUserInput, UpvoteUncheckedUpdateWithoutUserInput>
    create: XOR<UpvoteCreateWithoutUserInput, UpvoteUncheckedCreateWithoutUserInput>
  }

  export type UpvoteUpdateWithWhereUniqueWithoutUserInput = {
    where: UpvoteWhereUniqueInput
    data: XOR<UpvoteUpdateWithoutUserInput, UpvoteUncheckedUpdateWithoutUserInput>
  }

  export type UpvoteUpdateManyWithWhereWithoutUserInput = {
    where: UpvoteScalarWhereInput
    data: XOR<UpvoteUpdateManyMutationInput, UpvoteUncheckedUpdateManyWithoutUserInput>
  }

  export type UpvoteScalarWhereInput = {
    AND?: UpvoteScalarWhereInput | UpvoteScalarWhereInput[]
    OR?: UpvoteScalarWhereInput[]
    NOT?: UpvoteScalarWhereInput | UpvoteScalarWhereInput[]
    id?: StringFilter<"Upvote"> | string
    UserId?: StringFilter<"Upvote"> | string
    StreamId?: StringFilter<"Upvote"> | string
  }

  export type RoomStreamCreateWithoutStreamInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomCreateNestedManyWithoutCurrentStreamInput
    addedBy: UserCreateNestedOneWithoutAddedRoomStreamsInput
    room: RoomCreateNestedOneWithoutStreamsInput
    upvotes?: RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateWithoutStreamInput = {
    id?: string
    roomId: string
    addedById: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomUncheckedCreateNestedManyWithoutCurrentStreamInput
    upvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamCreateOrConnectWithoutStreamInput = {
    where: RoomStreamWhereUniqueInput
    create: XOR<RoomStreamCreateWithoutStreamInput, RoomStreamUncheckedCreateWithoutStreamInput>
  }

  export type RoomStreamCreateManyStreamInputEnvelope = {
    data: RoomStreamCreateManyStreamInput | RoomStreamCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutStreamsInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStreamsInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStreamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
  }

  export type UpvoteCreateWithoutStreamInput = {
    id?: string
    user: UserCreateNestedOneWithoutUpvotesInput
  }

  export type UpvoteUncheckedCreateWithoutStreamInput = {
    id?: string
    UserId: string
  }

  export type UpvoteCreateOrConnectWithoutStreamInput = {
    where: UpvoteWhereUniqueInput
    create: XOR<UpvoteCreateWithoutStreamInput, UpvoteUncheckedCreateWithoutStreamInput>
  }

  export type UpvoteCreateManyStreamInputEnvelope = {
    data: UpvoteCreateManyStreamInput | UpvoteCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type RoomStreamUpsertWithWhereUniqueWithoutStreamInput = {
    where: RoomStreamWhereUniqueInput
    update: XOR<RoomStreamUpdateWithoutStreamInput, RoomStreamUncheckedUpdateWithoutStreamInput>
    create: XOR<RoomStreamCreateWithoutStreamInput, RoomStreamUncheckedCreateWithoutStreamInput>
  }

  export type RoomStreamUpdateWithWhereUniqueWithoutStreamInput = {
    where: RoomStreamWhereUniqueInput
    data: XOR<RoomStreamUpdateWithoutStreamInput, RoomStreamUncheckedUpdateWithoutStreamInput>
  }

  export type RoomStreamUpdateManyWithWhereWithoutStreamInput = {
    where: RoomStreamScalarWhereInput
    data: XOR<RoomStreamUpdateManyMutationInput, RoomStreamUncheckedUpdateManyWithoutStreamInput>
  }

  export type UserUpsertWithoutStreamsInput = {
    update: XOR<UserUpdateWithoutStreamsInput, UserUncheckedUpdateWithoutStreamsInput>
    create: XOR<UserCreateWithoutStreamsInput, UserUncheckedCreateWithoutStreamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStreamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStreamsInput, UserUncheckedUpdateWithoutStreamsInput>
  }

  export type UserUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UpvoteUpsertWithWhereUniqueWithoutStreamInput = {
    where: UpvoteWhereUniqueInput
    update: XOR<UpvoteUpdateWithoutStreamInput, UpvoteUncheckedUpdateWithoutStreamInput>
    create: XOR<UpvoteCreateWithoutStreamInput, UpvoteUncheckedCreateWithoutStreamInput>
  }

  export type UpvoteUpdateWithWhereUniqueWithoutStreamInput = {
    where: UpvoteWhereUniqueInput
    data: XOR<UpvoteUpdateWithoutStreamInput, UpvoteUncheckedUpdateWithoutStreamInput>
  }

  export type UpvoteUpdateManyWithWhereWithoutStreamInput = {
    where: UpvoteScalarWhereInput
    data: XOR<UpvoteUpdateManyMutationInput, UpvoteUncheckedUpdateManyWithoutStreamInput>
  }

  export type StreamCreateWithoutUpvotesInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    roomStreams?: RoomStreamCreateNestedManyWithoutStreamInput
    user: UserCreateNestedOneWithoutStreamsInput
  }

  export type StreamUncheckedCreateWithoutUpvotesInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    UserId: string
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    roomStreams?: RoomStreamUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutUpvotesInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutUpvotesInput, StreamUncheckedCreateWithoutUpvotesInput>
  }

  export type UserCreateWithoutUpvotesInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUpvotesInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUpvotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpvotesInput, UserUncheckedCreateWithoutUpvotesInput>
  }

  export type StreamUpsertWithoutUpvotesInput = {
    update: XOR<StreamUpdateWithoutUpvotesInput, StreamUncheckedUpdateWithoutUpvotesInput>
    create: XOR<StreamCreateWithoutUpvotesInput, StreamUncheckedCreateWithoutUpvotesInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutUpvotesInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutUpvotesInput, StreamUncheckedUpdateWithoutUpvotesInput>
  }

  export type StreamUpdateWithoutUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roomStreams?: RoomStreamUpdateManyWithoutStreamNestedInput
    user?: UserUpdateOneRequiredWithoutStreamsNestedInput
  }

  export type StreamUncheckedUpdateWithoutUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    UserId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roomStreams?: RoomStreamUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type UserUpsertWithoutUpvotesInput = {
    update: XOR<UserUpdateWithoutUpvotesInput, UserUncheckedUpdateWithoutUpvotesInput>
    create: XOR<UserCreateWithoutUpvotesInput, UserUncheckedCreateWithoutUpvotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUpvotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUpvotesInput, UserUncheckedUpdateWithoutUpvotesInput>
  }

  export type UserUpdateWithoutUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCreatedRoomsInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedRoomsInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedRoomsInput, UserUncheckedCreateWithoutCreatedRoomsInput>
  }

  export type RoomStreamCreateWithoutCurrentInRoomsInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    addedBy: UserCreateNestedOneWithoutAddedRoomStreamsInput
    room: RoomCreateNestedOneWithoutStreamsInput
    stream: StreamCreateNestedOneWithoutRoomStreamsInput
    upvotes?: RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateWithoutCurrentInRoomsInput = {
    id?: string
    roomId: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
    upvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamCreateOrConnectWithoutCurrentInRoomsInput = {
    where: RoomStreamWhereUniqueInput
    create: XOR<RoomStreamCreateWithoutCurrentInRoomsInput, RoomStreamUncheckedCreateWithoutCurrentInRoomsInput>
  }

  export type RoomMemberCreateWithoutRoomInput = {
    id?: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutRoomMembersInput
  }

  export type RoomMemberUncheckedCreateWithoutRoomInput = {
    id?: string
    userId: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
  }

  export type RoomMemberCreateOrConnectWithoutRoomInput = {
    where: RoomMemberWhereUniqueInput
    create: XOR<RoomMemberCreateWithoutRoomInput, RoomMemberUncheckedCreateWithoutRoomInput>
  }

  export type RoomMemberCreateManyRoomInputEnvelope = {
    data: RoomMemberCreateManyRoomInput | RoomMemberCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomStreamCreateWithoutRoomInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomCreateNestedManyWithoutCurrentStreamInput
    addedBy: UserCreateNestedOneWithoutAddedRoomStreamsInput
    stream: StreamCreateNestedOneWithoutRoomStreamsInput
    upvotes?: RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateWithoutRoomInput = {
    id?: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomUncheckedCreateNestedManyWithoutCurrentStreamInput
    upvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamCreateOrConnectWithoutRoomInput = {
    where: RoomStreamWhereUniqueInput
    create: XOR<RoomStreamCreateWithoutRoomInput, RoomStreamUncheckedCreateWithoutRoomInput>
  }

  export type RoomStreamCreateManyRoomInputEnvelope = {
    data: RoomStreamCreateManyRoomInput | RoomStreamCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedRoomsInput = {
    update: XOR<UserUpdateWithoutCreatedRoomsInput, UserUncheckedUpdateWithoutCreatedRoomsInput>
    create: XOR<UserCreateWithoutCreatedRoomsInput, UserUncheckedCreateWithoutCreatedRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedRoomsInput, UserUncheckedUpdateWithoutCreatedRoomsInput>
  }

  export type UserUpdateWithoutCreatedRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomStreamUpsertWithoutCurrentInRoomsInput = {
    update: XOR<RoomStreamUpdateWithoutCurrentInRoomsInput, RoomStreamUncheckedUpdateWithoutCurrentInRoomsInput>
    create: XOR<RoomStreamCreateWithoutCurrentInRoomsInput, RoomStreamUncheckedCreateWithoutCurrentInRoomsInput>
    where?: RoomStreamWhereInput
  }

  export type RoomStreamUpdateToOneWithWhereWithoutCurrentInRoomsInput = {
    where?: RoomStreamWhereInput
    data: XOR<RoomStreamUpdateWithoutCurrentInRoomsInput, RoomStreamUncheckedUpdateWithoutCurrentInRoomsInput>
  }

  export type RoomStreamUpdateWithoutCurrentInRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    addedBy?: UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput
    room?: RoomUpdateOneRequiredWithoutStreamsNestedInput
    stream?: StreamUpdateOneRequiredWithoutRoomStreamsNestedInput
    upvotes?: RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateWithoutCurrentInRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    upvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomMemberUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomMemberWhereUniqueInput
    update: XOR<RoomMemberUpdateWithoutRoomInput, RoomMemberUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomMemberCreateWithoutRoomInput, RoomMemberUncheckedCreateWithoutRoomInput>
  }

  export type RoomMemberUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomMemberWhereUniqueInput
    data: XOR<RoomMemberUpdateWithoutRoomInput, RoomMemberUncheckedUpdateWithoutRoomInput>
  }

  export type RoomMemberUpdateManyWithWhereWithoutRoomInput = {
    where: RoomMemberScalarWhereInput
    data: XOR<RoomMemberUpdateManyMutationInput, RoomMemberUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomStreamUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomStreamWhereUniqueInput
    update: XOR<RoomStreamUpdateWithoutRoomInput, RoomStreamUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomStreamCreateWithoutRoomInput, RoomStreamUncheckedCreateWithoutRoomInput>
  }

  export type RoomStreamUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomStreamWhereUniqueInput
    data: XOR<RoomStreamUpdateWithoutRoomInput, RoomStreamUncheckedUpdateWithoutRoomInput>
  }

  export type RoomStreamUpdateManyWithWhereWithoutRoomInput = {
    where: RoomStreamScalarWhereInput
    data: XOR<RoomStreamUpdateManyMutationInput, RoomStreamUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    creator: UserCreateNestedOneWithoutCreatedRoomsInput
    currentStream?: RoomStreamCreateNestedOneWithoutCurrentInRoomsInput
    streams?: RoomStreamCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    creatorId: string
    currentStreamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    streams?: RoomStreamUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutMembersInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutRoomMembersInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoomMembersInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoomMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomMembersInput, UserUncheckedCreateWithoutRoomMembersInput>
  }

  export type RoomUpsertWithoutMembersInput = {
    update: XOR<RoomUpdateWithoutMembersInput, RoomUncheckedUpdateWithoutMembersInput>
    create: XOR<RoomCreateWithoutMembersInput, RoomUncheckedCreateWithoutMembersInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutMembersInput, RoomUncheckedUpdateWithoutMembersInput>
  }

  export type RoomUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    creator?: UserUpdateOneRequiredWithoutCreatedRoomsNestedInput
    currentStream?: RoomStreamUpdateOneWithoutCurrentInRoomsNestedInput
    streams?: RoomStreamUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    creatorId?: StringFieldUpdateOperationsInput | string
    currentStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    streams?: RoomStreamUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutRoomMembersInput = {
    update: XOR<UserUpdateWithoutRoomMembersInput, UserUncheckedUpdateWithoutRoomMembersInput>
    create: XOR<UserCreateWithoutRoomMembersInput, UserUncheckedCreateWithoutRoomMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomMembersInput, UserUncheckedUpdateWithoutRoomMembersInput>
  }

  export type UserUpdateWithoutRoomMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomCreateWithoutCurrentStreamInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    creator: UserCreateNestedOneWithoutCreatedRoomsInput
    members?: RoomMemberCreateNestedManyWithoutRoomInput
    streams?: RoomStreamCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutCurrentStreamInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput
    streams?: RoomStreamUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutCurrentStreamInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutCurrentStreamInput, RoomUncheckedCreateWithoutCurrentStreamInput>
  }

  export type RoomCreateManyCurrentStreamInputEnvelope = {
    data: RoomCreateManyCurrentStreamInput | RoomCreateManyCurrentStreamInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAddedRoomStreamsInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAddedRoomStreamsInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAddedRoomStreamsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddedRoomStreamsInput, UserUncheckedCreateWithoutAddedRoomStreamsInput>
  }

  export type RoomCreateWithoutStreamsInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    creator: UserCreateNestedOneWithoutCreatedRoomsInput
    currentStream?: RoomStreamCreateNestedOneWithoutCurrentInRoomsInput
    members?: RoomMemberCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutStreamsInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    creatorId: string
    currentStreamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
    members?: RoomMemberUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutStreamsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutStreamsInput, RoomUncheckedCreateWithoutStreamsInput>
  }

  export type StreamCreateWithoutRoomStreamsInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    user: UserCreateNestedOneWithoutStreamsInput
    upvotes?: UpvoteCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateWithoutRoomStreamsInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    UserId: string
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamCreateOrConnectWithoutRoomStreamsInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutRoomStreamsInput, StreamUncheckedCreateWithoutRoomStreamsInput>
  }

  export type RoomStreamUpvoteCreateWithoutRoomStreamInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRoomStreamUpvotesInput
  }

  export type RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type RoomStreamUpvoteCreateOrConnectWithoutRoomStreamInput = {
    where: RoomStreamUpvoteWhereUniqueInput
    create: XOR<RoomStreamUpvoteCreateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput>
  }

  export type RoomStreamUpvoteCreateManyRoomStreamInputEnvelope = {
    data: RoomStreamUpvoteCreateManyRoomStreamInput | RoomStreamUpvoteCreateManyRoomStreamInput[]
    skipDuplicates?: boolean
  }

  export type SkipVoteCreateWithoutRoomStreamInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSkipVotesInput
  }

  export type SkipVoteUncheckedCreateWithoutRoomStreamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type SkipVoteCreateOrConnectWithoutRoomStreamInput = {
    where: SkipVoteWhereUniqueInput
    create: XOR<SkipVoteCreateWithoutRoomStreamInput, SkipVoteUncheckedCreateWithoutRoomStreamInput>
  }

  export type SkipVoteCreateManyRoomStreamInputEnvelope = {
    data: SkipVoteCreateManyRoomStreamInput | SkipVoteCreateManyRoomStreamInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithWhereUniqueWithoutCurrentStreamInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutCurrentStreamInput, RoomUncheckedUpdateWithoutCurrentStreamInput>
    create: XOR<RoomCreateWithoutCurrentStreamInput, RoomUncheckedCreateWithoutCurrentStreamInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutCurrentStreamInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutCurrentStreamInput, RoomUncheckedUpdateWithoutCurrentStreamInput>
  }

  export type RoomUpdateManyWithWhereWithoutCurrentStreamInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutCurrentStreamInput>
  }

  export type UserUpsertWithoutAddedRoomStreamsInput = {
    update: XOR<UserUpdateWithoutAddedRoomStreamsInput, UserUncheckedUpdateWithoutAddedRoomStreamsInput>
    create: XOR<UserCreateWithoutAddedRoomStreamsInput, UserUncheckedCreateWithoutAddedRoomStreamsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddedRoomStreamsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddedRoomStreamsInput, UserUncheckedUpdateWithoutAddedRoomStreamsInput>
  }

  export type UserUpdateWithoutAddedRoomStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAddedRoomStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomUpsertWithoutStreamsInput = {
    update: XOR<RoomUpdateWithoutStreamsInput, RoomUncheckedUpdateWithoutStreamsInput>
    create: XOR<RoomCreateWithoutStreamsInput, RoomUncheckedCreateWithoutStreamsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutStreamsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutStreamsInput, RoomUncheckedUpdateWithoutStreamsInput>
  }

  export type RoomUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    creator?: UserUpdateOneRequiredWithoutCreatedRoomsNestedInput
    currentStream?: RoomStreamUpdateOneWithoutCurrentInRoomsNestedInput
    members?: RoomMemberUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    creatorId?: StringFieldUpdateOperationsInput | string
    currentStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type StreamUpsertWithoutRoomStreamsInput = {
    update: XOR<StreamUpdateWithoutRoomStreamsInput, StreamUncheckedUpdateWithoutRoomStreamsInput>
    create: XOR<StreamCreateWithoutRoomStreamsInput, StreamUncheckedCreateWithoutRoomStreamsInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutRoomStreamsInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutRoomStreamsInput, StreamUncheckedUpdateWithoutRoomStreamsInput>
  }

  export type StreamUpdateWithoutRoomStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutStreamsNestedInput
    upvotes?: UpvoteUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutRoomStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    UserId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    upvotes?: UpvoteUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type RoomStreamUpvoteUpsertWithWhereUniqueWithoutRoomStreamInput = {
    where: RoomStreamUpvoteWhereUniqueInput
    update: XOR<RoomStreamUpvoteUpdateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedUpdateWithoutRoomStreamInput>
    create: XOR<RoomStreamUpvoteCreateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedCreateWithoutRoomStreamInput>
  }

  export type RoomStreamUpvoteUpdateWithWhereUniqueWithoutRoomStreamInput = {
    where: RoomStreamUpvoteWhereUniqueInput
    data: XOR<RoomStreamUpvoteUpdateWithoutRoomStreamInput, RoomStreamUpvoteUncheckedUpdateWithoutRoomStreamInput>
  }

  export type RoomStreamUpvoteUpdateManyWithWhereWithoutRoomStreamInput = {
    where: RoomStreamUpvoteScalarWhereInput
    data: XOR<RoomStreamUpvoteUpdateManyMutationInput, RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamInput>
  }

  export type SkipVoteUpsertWithWhereUniqueWithoutRoomStreamInput = {
    where: SkipVoteWhereUniqueInput
    update: XOR<SkipVoteUpdateWithoutRoomStreamInput, SkipVoteUncheckedUpdateWithoutRoomStreamInput>
    create: XOR<SkipVoteCreateWithoutRoomStreamInput, SkipVoteUncheckedCreateWithoutRoomStreamInput>
  }

  export type SkipVoteUpdateWithWhereUniqueWithoutRoomStreamInput = {
    where: SkipVoteWhereUniqueInput
    data: XOR<SkipVoteUpdateWithoutRoomStreamInput, SkipVoteUncheckedUpdateWithoutRoomStreamInput>
  }

  export type SkipVoteUpdateManyWithWhereWithoutRoomStreamInput = {
    where: SkipVoteScalarWhereInput
    data: XOR<SkipVoteUpdateManyMutationInput, SkipVoteUncheckedUpdateManyWithoutRoomStreamInput>
  }

  export type RoomStreamCreateWithoutUpvotesInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomCreateNestedManyWithoutCurrentStreamInput
    addedBy: UserCreateNestedOneWithoutAddedRoomStreamsInput
    room: RoomCreateNestedOneWithoutStreamsInput
    stream: StreamCreateNestedOneWithoutRoomStreamsInput
    skipVotes?: SkipVoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateWithoutUpvotesInput = {
    id?: string
    roomId: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomUncheckedCreateNestedManyWithoutCurrentStreamInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamCreateOrConnectWithoutUpvotesInput = {
    where: RoomStreamWhereUniqueInput
    create: XOR<RoomStreamCreateWithoutUpvotesInput, RoomStreamUncheckedCreateWithoutUpvotesInput>
  }

  export type UserCreateWithoutRoomStreamUpvotesInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    skipVotes?: SkipVoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoomStreamUpvotesInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    skipVotes?: SkipVoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoomStreamUpvotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomStreamUpvotesInput, UserUncheckedCreateWithoutRoomStreamUpvotesInput>
  }

  export type RoomStreamUpsertWithoutUpvotesInput = {
    update: XOR<RoomStreamUpdateWithoutUpvotesInput, RoomStreamUncheckedUpdateWithoutUpvotesInput>
    create: XOR<RoomStreamCreateWithoutUpvotesInput, RoomStreamUncheckedCreateWithoutUpvotesInput>
    where?: RoomStreamWhereInput
  }

  export type RoomStreamUpdateToOneWithWhereWithoutUpvotesInput = {
    where?: RoomStreamWhereInput
    data: XOR<RoomStreamUpdateWithoutUpvotesInput, RoomStreamUncheckedUpdateWithoutUpvotesInput>
  }

  export type RoomStreamUpdateWithoutUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUpdateManyWithoutCurrentStreamNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput
    room?: RoomUpdateOneRequiredWithoutStreamsNestedInput
    stream?: StreamUpdateOneRequiredWithoutRoomStreamsNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateWithoutUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type UserUpsertWithoutRoomStreamUpvotesInput = {
    update: XOR<UserUpdateWithoutRoomStreamUpvotesInput, UserUncheckedUpdateWithoutRoomStreamUpvotesInput>
    create: XOR<UserCreateWithoutRoomStreamUpvotesInput, UserUncheckedCreateWithoutRoomStreamUpvotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomStreamUpvotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomStreamUpvotesInput, UserUncheckedUpdateWithoutRoomStreamUpvotesInput>
  }

  export type UserUpdateWithoutRoomStreamUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomStreamUpvotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomStreamCreateWithoutSkipVotesInput = {
    id?: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomCreateNestedManyWithoutCurrentStreamInput
    addedBy: UserCreateNestedOneWithoutAddedRoomStreamsInput
    room: RoomCreateNestedOneWithoutStreamsInput
    stream: StreamCreateNestedOneWithoutRoomStreamsInput
    upvotes?: RoomStreamUpvoteCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamUncheckedCreateWithoutSkipVotesInput = {
    id?: string
    roomId: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
    currentInRooms?: RoomUncheckedCreateNestedManyWithoutCurrentStreamInput
    upvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutRoomStreamInput
  }

  export type RoomStreamCreateOrConnectWithoutSkipVotesInput = {
    where: RoomStreamWhereUniqueInput
    create: XOR<RoomStreamCreateWithoutSkipVotesInput, RoomStreamUncheckedCreateWithoutSkipVotesInput>
  }

  export type UserCreateWithoutSkipVotesInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteCreateNestedManyWithoutUserInput
    Streams?: StreamCreateNestedManyWithoutUserInput
    upvotes?: UpvoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSkipVotesInput = {
    id?: string
    email: string
    image?: string | null
    provider: $Enums.Provider
    password?: string | null
    createdRooms?: RoomUncheckedCreateNestedManyWithoutCreatorInput
    roomMembers?: RoomMemberUncheckedCreateNestedManyWithoutUserInput
    addedRoomStreams?: RoomStreamUncheckedCreateNestedManyWithoutAddedByInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedCreateNestedManyWithoutUserInput
    Streams?: StreamUncheckedCreateNestedManyWithoutUserInput
    upvotes?: UpvoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSkipVotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSkipVotesInput, UserUncheckedCreateWithoutSkipVotesInput>
  }

  export type RoomStreamUpsertWithoutSkipVotesInput = {
    update: XOR<RoomStreamUpdateWithoutSkipVotesInput, RoomStreamUncheckedUpdateWithoutSkipVotesInput>
    create: XOR<RoomStreamCreateWithoutSkipVotesInput, RoomStreamUncheckedCreateWithoutSkipVotesInput>
    where?: RoomStreamWhereInput
  }

  export type RoomStreamUpdateToOneWithWhereWithoutSkipVotesInput = {
    where?: RoomStreamWhereInput
    data: XOR<RoomStreamUpdateWithoutSkipVotesInput, RoomStreamUncheckedUpdateWithoutSkipVotesInput>
  }

  export type RoomStreamUpdateWithoutSkipVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUpdateManyWithoutCurrentStreamNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput
    room?: RoomUpdateOneRequiredWithoutStreamsNestedInput
    stream?: StreamUpdateOneRequiredWithoutRoomStreamsNestedInput
    upvotes?: RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateWithoutSkipVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput
    upvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type UserUpsertWithoutSkipVotesInput = {
    update: XOR<UserUpdateWithoutSkipVotesInput, UserUncheckedUpdateWithoutSkipVotesInput>
    create: XOR<UserCreateWithoutSkipVotesInput, UserUncheckedCreateWithoutSkipVotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSkipVotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSkipVotesInput, UserUncheckedUpdateWithoutSkipVotesInput>
  }

  export type UserUpdateWithoutSkipVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUpdateManyWithoutUserNestedInput
    Streams?: StreamUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSkipVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdRooms?: RoomUncheckedUpdateManyWithoutCreatorNestedInput
    roomMembers?: RoomMemberUncheckedUpdateManyWithoutUserNestedInput
    addedRoomStreams?: RoomStreamUncheckedUpdateManyWithoutAddedByNestedInput
    roomStreamUpvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutUserNestedInput
    Streams?: StreamUncheckedUpdateManyWithoutUserNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoomCreateManyCreatorInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    currentStreamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
  }

  export type RoomMemberCreateManyUserInput = {
    id?: string
    roomId: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
  }

  export type RoomStreamCreateManyAddedByInput = {
    id?: string
    roomId: string
    streamId: string
    addedAt?: Date | string
    order?: number
  }

  export type RoomStreamUpvoteCreateManyUserInput = {
    id?: string
    roomStreamId: string
    createdAt?: Date | string
  }

  export type SkipVoteCreateManyUserInput = {
    id?: string
    roomStreamId: string
    createdAt?: Date | string
  }

  export type StreamCreateManyUserInput = {
    id?: string
    type: $Enums.StreamType
    active?: boolean
    url: string
    extractedId: string
    bigImg?: string
    smallImg?: string
    title?: string
  }

  export type UpvoteCreateManyUserInput = {
    id?: string
    StreamId: string
  }

  export type RoomUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    currentStream?: RoomStreamUpdateOneWithoutCurrentInRoomsNestedInput
    members?: RoomMemberUpdateManyWithoutRoomNestedInput
    streams?: RoomStreamUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    currentStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput
    streams?: RoomStreamUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    currentStreamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RoomMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutMembersNestedInput
  }

  export type RoomMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamUpdateWithoutAddedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUpdateManyWithoutCurrentStreamNestedInput
    room?: RoomUpdateOneRequiredWithoutStreamsNestedInput
    stream?: StreamUpdateOneRequiredWithoutRoomStreamsNestedInput
    upvotes?: RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateWithoutAddedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput
    upvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateManyWithoutAddedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStreamUpvoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomStream?: RoomStreamUpdateOneRequiredWithoutUpvotesNestedInput
  }

  export type RoomStreamUpvoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamUpvoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomStream?: RoomStreamUpdateOneRequiredWithoutSkipVotesNestedInput
  }

  export type SkipVoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomStreamId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roomStreams?: RoomStreamUpdateManyWithoutStreamNestedInput
    upvotes?: UpvoteUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    roomStreams?: RoomStreamUncheckedUpdateManyWithoutStreamNestedInput
    upvotes?: UpvoteUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumStreamTypeFieldUpdateOperationsInput | $Enums.StreamType
    active?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    extractedId?: StringFieldUpdateOperationsInput | string
    bigImg?: StringFieldUpdateOperationsInput | string
    smallImg?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
  }

  export type UpvoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    Stream?: StreamUpdateOneRequiredWithoutUpvotesNestedInput
  }

  export type UpvoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    StreamId?: StringFieldUpdateOperationsInput | string
  }

  export type UpvoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    StreamId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomStreamCreateManyStreamInput = {
    id?: string
    roomId: string
    addedById: string
    addedAt?: Date | string
    order?: number
  }

  export type UpvoteCreateManyStreamInput = {
    id?: string
    UserId: string
  }

  export type RoomStreamUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUpdateManyWithoutCurrentStreamNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput
    room?: RoomUpdateOneRequiredWithoutStreamsNestedInput
    upvotes?: RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput
    upvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type UpvoteUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutUpvotesNestedInput
  }

  export type UpvoteUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    UserId?: StringFieldUpdateOperationsInput | string
  }

  export type UpvoteUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    UserId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomMemberCreateManyRoomInput = {
    id?: string
    userId: string
    role?: $Enums.RoomMemberRole
    joinedAt?: Date | string
  }

  export type RoomStreamCreateManyRoomInput = {
    id?: string
    streamId: string
    addedById: string
    addedAt?: Date | string
    order?: number
  }

  export type RoomMemberUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoomMembersNestedInput
  }

  export type RoomMemberUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomMemberUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRoomMemberRoleFieldUpdateOperationsInput | $Enums.RoomMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUpdateManyWithoutCurrentStreamNestedInput
    addedBy?: UserUpdateOneRequiredWithoutAddedRoomStreamsNestedInput
    stream?: StreamUpdateOneRequiredWithoutRoomStreamsNestedInput
    upvotes?: RoomStreamUpvoteUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
    currentInRooms?: RoomUncheckedUpdateManyWithoutCurrentStreamNestedInput
    upvotes?: RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamNestedInput
    skipVotes?: SkipVoteUncheckedUpdateManyWithoutRoomStreamNestedInput
  }

  export type RoomStreamUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    addedById?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type RoomCreateManyCurrentStreamInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPlaying?: boolean
    lastSyncTime?: Date | string | null
    playbackTime?: number | null
  }

  export type RoomStreamUpvoteCreateManyRoomStreamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type SkipVoteCreateManyRoomStreamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type RoomUpdateWithoutCurrentStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    creator?: UserUpdateOneRequiredWithoutCreatedRoomsNestedInput
    members?: RoomMemberUpdateManyWithoutRoomNestedInput
    streams?: RoomStreamUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutCurrentStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
    members?: RoomMemberUncheckedUpdateManyWithoutRoomNestedInput
    streams?: RoomStreamUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutCurrentStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPlaying?: BoolFieldUpdateOperationsInput | boolean
    lastSyncTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playbackTime?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RoomStreamUpvoteUpdateWithoutRoomStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRoomStreamUpvotesNestedInput
  }

  export type RoomStreamUpvoteUncheckedUpdateWithoutRoomStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamUpvoteUncheckedUpdateManyWithoutRoomStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteUpdateWithoutRoomStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSkipVotesNestedInput
  }

  export type SkipVoteUncheckedUpdateWithoutRoomStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkipVoteUncheckedUpdateManyWithoutRoomStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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