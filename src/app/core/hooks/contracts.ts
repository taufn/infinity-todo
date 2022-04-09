export type FetcherResult<T> =
  | { state: "loading" }
  | { state: "success"; data: T }
  | { state: "error"; errors: Error[] };
