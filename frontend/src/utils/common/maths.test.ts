import { describe, expect, it } from "vitest";
import { clamp } from "./maths";

describe("clamp", () => {
    it.each([
        [14, 5, 30],
        [72, 60, 90],
        [-5, -10, -2],
    ])('should return input %i when it is between %i and %i', (input, min, max) => {
        const result = clamp(input, min, max)

        expect(result).toBe(input)
    })

    it.each([
        [1, 5, 30],
        [23, 60, 90],
        [-15, -10, -2],
    ])('should return min value when %i is below floor)', (input, min, max) => {
        const result = clamp(input, min, max)

        expect(result).toBe(min)
    })

    it.each([
        [45, 5, 30],
        [98, 60, 90],
        [1, -10, -2],
    ])('should return max value when %i is above ceiling)', (input, min, max) => {
        const result = clamp(input, min, max)

        expect(result).toBe(max)
    })
})