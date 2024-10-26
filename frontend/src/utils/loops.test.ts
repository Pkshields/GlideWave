import { describe, expect, it, test } from "vitest";
import { repeat } from "./loops";

describe('repeat', () => {
    test.each([1, 3, 5, 10])(
        'should repeat provided function %i times',
        (numberOfTimesToRepeat) => {
            let count = 0

            repeat(() => ++count, numberOfTimesToRepeat)

            expect(count).toBe(numberOfTimesToRepeat)
        }
    )

    it("should provide correct index for each repetition", () => {
        let count = 0

        repeat((index) => {
            expect(index).toBe(count++)
        }, 10)
    })
})
