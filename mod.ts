type Err<E> = { error: Readonly<E>; value?: never };
type Ok<T> = { error?: never; value: Readonly<T> };

export type Result<T, E> = Ok<T> | Err<E>;

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
  result.error !== undefined;
export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
  result.value !== undefined;

export const newErr = <E>(error: E): Err<E> => ({ error });
export const newOk = <T>(value: T): Ok<T> => ({ value });

export const mapResult = <T, E, V>(
  result: Result<T, E>,
  okHandler: (value: T) => V,
  errHandler: (error: E) => V
): V => {
  if (isErr(result)) return errHandler(result.error);
  if (isOk(result)) return okHandler(result.value);
  throw new Error("mapResult: invalid Result object");
};

export const matchResult = <T, E>(
  result: Result<T, E>,
  okHandler: (value: T) => void,
  errHandler: (error: E) => void
) => mapResult<T, E, void>(result, okHandler, errHandler);
