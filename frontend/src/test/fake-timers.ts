import { vi } from "vitest";

export function withFakeTimers(testFunction: () => void) {
    return () => {
        vi.useFakeTimers()
        testFunction()
        vi.useRealTimers()
    }
}