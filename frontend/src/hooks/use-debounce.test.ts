import { act, renderHook } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./use-debounce";

describe("use debounce", () => {
    const initialValue = "initial"
    const valueDestinedToBeDebounced = "always destined to be debounced"
    const finalValue = "final result after debouncing"

    beforeAll(() => vi.useFakeTimers())
    afterAll(() => vi.useRealTimers())

    it("should change value after the timeout period expires", () => {
        const { result, rerender } = renderHook(
            ({ input }) => useDebounce(input, 100),
            { initialProps: { input: initialValue } }
        )

        rerender({ input: finalValue })
        act(() => { vi.advanceTimersByTime(110) })

        expect(result.current).toBe(finalValue)
    })

    it("should not change value before the timeout period expires", () => {
        const { result, rerender } = renderHook(
            ({ input }) => useDebounce(input, 100),
            { initialProps: { input: initialValue } }
        )

        rerender({ input: finalValue })
        act(() => { vi.advanceTimersByTime(90) })

        expect(result.current).toBe(initialValue)
    })

    it("should never change to a value that is set before the timeout period expires", () => {
        const { result, rerender } = renderHook(
            ({ input }) => useDebounce(input, 100),
            { initialProps: { input: initialValue } }
        )

        rerender({ input: valueDestinedToBeDebounced })
        act(() => { vi.advanceTimersByTime(50) })
        rerender({ input: finalValue })
        act(() => { vi.advanceTimersByTime(60) })

        expect(result.current).not.toBe(valueDestinedToBeDebounced)
    })
})