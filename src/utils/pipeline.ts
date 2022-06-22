type PromiseFn = (...args: any[]) => Promise<any[]>
type PromiseFnReturn<Fn> = Fn extends (..._: any[]) => Promise<infer R> ? R : never
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ArrayLast<T extends PromiseFn[]> = T extends [...infer _, infer Last] ? Last : never
type ArrayReturn<T extends PromiseFn[]> = T extends [infer Head, ...infer Tail]
  ? Head extends PromiseFn
    ? PromiseFnReturn<Head> | (Tail extends PromiseFn[]
      ? ArrayReturn<Tail>
      : never)
    : Tail extends PromiseFn[]
      ? ArrayReturn<Tail>
      : never
  : never

export async function pipeline<
  F extends PromiseFn[],
  A,
  R = PromiseFnReturn<ArrayLast<F>>,
>(args: A, ...fns: F): Promise<R> {
  let result: A | R | ArrayReturn<F> = args
  for (const fn of fns) {
    if (Array.isArray(result))
      result = await fn(...result as unknown[]) as ArrayReturn<F>
  }

  return result as R
}
