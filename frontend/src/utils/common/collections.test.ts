import { describe, expect, it } from "vitest";
import { partition } from "./collections";

describe("partition", () => {
    it("should partition a number list correctly", () => {
        const list = [1, 2, 3, 4, 5]

        const [oddList, evenList] = partition(list, (item) => item % 2 == 1)

        expect(oddList).toStrictEqual([1, 3, 5])
        expect(evenList).toStrictEqual([2, 4])
    })

    it("should partition a string list correctly", () => {
        const list = ["hello world", "goodbye world", "hello glidewave", "bye bye glidewave"]

        const [helloList, goodbyeList] = partition(list, (item) => item.startsWith("hello"))

        expect(helloList).toStrictEqual(["hello world", "hello glidewave"])
        expect(goodbyeList).toStrictEqual(["goodbye world", "bye bye glidewave"])
    })
})