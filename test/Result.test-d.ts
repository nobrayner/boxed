import { expectTypeOf, test } from "vitest";
import { Result } from "../src/OptionResult";

test("Result.flatMap", () => {
  expectTypeOf(
    Result.Ok(1).flatMap((x) => {
      if (x < 1) {
        return Result.Error("TOO_LOW" as const);
      }
      if (x > 1) {
        return Result.Error(new Error("TOO_HIGH"));
      }
      if (x === 0) {
        return Result.Error({
          code: "ZERO" as const,
        });
      }
      return Result.Ok("ALL_IS_WELL" as const);
    }),
  ).toMatchTypeOf<
    Result<number | "ALL_IS_WELL", "TOO_LOW" | Error | { code: "ZERO" }>
  >();
});

test("Result.flatMapError", () => {
  expectTypeOf(
    Result.Error(1).flatMapError((x) => {
      if (x < 1) {
        return Result.Ok({
          op: "DIVIDE" as const,
        });
      }
      if (x > 1) {
        return Result.Ok({
          op: "MULTIPLY" as const,
        });
      }
      if (x === 0) {
        return Result.Error({
          op: "NOOP" as const,
        });
      }
      return Result.Error(new Error("TOO_BAD"));
    }),
  ).toMatchTypeOf<
    Result<{ op: "DIVIDE" } | { op: "MULTIPLY" }, Error | { op: "NOOP" }>
  >();
});
