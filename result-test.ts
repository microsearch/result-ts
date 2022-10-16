import {
  assert,
  assertFalse,
  assertEquals,
} from "https://deno.land/std@0.159.0/testing/asserts.ts";

import { newOk, newErr, isOk, isErr, mapResult, Result } from "./mod.ts";

Deno.test("construct Ok", () => {
  const ok = newOk(null);
  assert(isOk(ok));
  assertFalse(isErr(ok));
});

Deno.test("construct Err", () => {
  const err = newErr(null);
  assert(isErr(err));
  assertFalse(isOk(err));
});

Deno.test("mapResult Ok", () => {
  const result: Result<null, Error> = newOk(null);
  assertEquals(
    mapResult(
      result,
      (_value) => "ok",
      (_value) => "err"
    ),
    "ok"
  );
});

Deno.test("mapResult Err", () => {
  const result: Result<null, Error> = newErr(new Error());
  assertEquals(
    mapResult(
      result,
      (_value) => "ok",
      (_value) => "err"
    ),
    "err"
  );
});
