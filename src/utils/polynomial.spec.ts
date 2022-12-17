import { test, expect } from "vitest";
import { polynomialFittingFunctionFactory } from "./polynomial";

test("Should create polynomial fitting function", () => {
    const fn = polynomialFittingFunctionFactory([1, 2]);

    expect(fn(0)).toEqual(2);
})