import { describe, expect, it } from "vitest"
import { usePlayerIsPlayingStore, usePlayerSourceStore } from "./player-state"
import { renderHook } from "@testing-library/react"
import { StreamSource } from "../types/stream-source"

describe("player url store", () => {
    it("should set url in store", () => {
        const expectedSource: StreamSource = {
            name: "Stream Source",
            streamer: "Streamer",
            sourceHomepage: "https://home.page",
            streamUrl: "https://home.page/stream.ogg"
        }
        const { result: playerUrlHook, rerender } = renderHook(() => usePlayerSourceStore())

        playerUrlHook.current.setPlayerSource(expectedSource)
        rerender()

        expect(playerUrlHook.current.source).toBe(expectedSource)
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