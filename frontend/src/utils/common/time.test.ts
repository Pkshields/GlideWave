import { describe, expect, it } from "vitest";
import { minutesToMilliseconds } from "./time";

describe("minutes to milliseconds", () => {
    it.each([
        [1, 60000],
        [5, 300000],
        [60, 3600000],
    ])("should correctly calculate %i minutes in milliseconds", (minutes: number, expectedResult: number) => {
        expect(minutesToMilliseconds(minutes)).toBe(expectedResult)
    })
})