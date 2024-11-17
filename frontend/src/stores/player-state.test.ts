import { describe, expect, it } from "vitest"
import { usePlayerInfoStore } from "./player-state"
import { renderHook } from "@testing-library/react"
import { StreamSource } from "../types/stream-source"

describe("player info store", () => {
    it("should set url in store", () => {
        const expectedSource: StreamSource = {
            name: "Stream Source",
            streamer: "Streamer",
            sourceHomepage: "https://home.page",
            streamUrl: "https://home.page/stream.ogg"
        }
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerInfoStore())

        playerInfoHook.current.setPlayerSource(expectedSource)
        rerender()

        expect(playerInfoHook.current.source).toBe(expectedSource)
    })

    it("should toggle is playing state", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerInfoStore())
        const initialIsPlaying = playerInfoHook.current.isPlaying

        playerInfoHook.current.toggleIsPlaying()
        rerender()

        expect(playerInfoHook.current.isPlaying).toBe(!initialIsPlaying)
    })
})
