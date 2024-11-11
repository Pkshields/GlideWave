import { describe, expect, it } from "vitest"
import { usePlayerIsPlayingStore, usePlayerUrlStore } from "./player-state"
import { renderHook } from "@testing-library/react"

describe("player url store", () => {
    it("should set url in store", () => {
        const expectedUrl = "https://paulshields.dev"
        const { result: playerUrlHook, rerender } = renderHook(() => usePlayerUrlStore())

        playerUrlHook.current.setUrl(expectedUrl)
        rerender()

        expect(playerUrlHook.current.url).toBe(expectedUrl)
    })
})

describe("player is playing store", () => {
    it("should toggle is playing state", () => {
        const { result: isPlayingHook, rerender } = renderHook(() => usePlayerIsPlayingStore())
        const initialIsPlaying = isPlayingHook.current.isPlaying

        isPlayingHook.current.toggleIsPlaying()
        rerender()

        expect(isPlayingHook.current.isPlaying).toBe(!initialIsPlaying)
    })
})