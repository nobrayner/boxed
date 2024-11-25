import { expectTypeOf, test } from "vitest";
import { Future } from "../src/Future";
import { Result } from "../src/OptionResult";

test("Future.mapOkToResult", () => {
  expectTypeOf(
    Future.value(Result.Ok(1)).mapOkToResult((x) => {
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
    Future<Result<"ALL_IS_WELL", "TOO_LOW" | Error | { code: "ZERO" }>>
  >();
});

test("Future.mapOk", () => {
  expectTypeOf(
    Future.value(Result.Ok(1)).mapOk((x) => {
      if (x < 1) {
        return "TOO_LOW" as const;
      }
      if (x > 1) {
        return new Error("TOO_HIGH");
      }
      if (x === 0) {
        return {
          code: "ZERO" as const,
        };
      }
      return "ALL_IS_WELL" as const;
    }),
  ).toMatchTypeOf<
    Future<Result<"ALL_IS_WELL" | "TOO_LOW" | Error | { code: "ZERO" }, never>>
  >();
});

test("Future.mapErrorToResult", () => {
  expectTypeOf(
    Future.value(Result.Error(1)).mapErrorToResult((x) => {
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
    Future<
      Result<{ op: "DIVIDE" } | { op: "MULTIPLY" }, Error | { op: "NOOP" }>
    >
  >();
});
