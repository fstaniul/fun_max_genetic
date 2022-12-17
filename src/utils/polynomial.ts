import { FittingFunction } from "./genetic_algorithm";

export function polynomialFittingFunctionFactory(
    coefficients: number[]
): FittingFunction {
    return function (x: number): number {
        let y = 0;
        for (let i = 0; i < coefficients.length; i++) {
            y += coefficients[i] * (x ** (coefficients.length - i - 1));
        }
        return y;
    };
}
