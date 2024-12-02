import { describe, expect, it, vi } from "vitest"
import { usePlayerStore } from "./player-state"
import { renderHook } from "@testing-library/react"
import { StreamSource } from "../types/stream-source"

vi.mock("zustand")

const expectedSource: StreamSource = {
    name: "Stream Source",
    streamer: "Streamer",
    sourceHomepage: "https://home.page",
    streamUrl: "https://home.page/stream.ogg"
}

describe("is playing", () => {
    it("should toggle is playing state", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))
        const initialIsPlaying = playerInfoHook.current.isPlaying

        playerInfoHook.current.toggleIsPlaying()
        rerender()

        expect(playerInfoHook.current.isPlaying).toBe(!initialIsPlaying)
    })

    it("should set buffering state to true when is playing is toggled to true", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))
        playerInfoHook.current.isPlaying = false

        playerInfoHook.current.toggleIsPlaying()
        rerender()

        expect(playerInfoHook.current.isBuffering).toBeTruthy()
    })

    it("should not change buffering state when is playing is toggled to false", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))
        playerInfoHook.current.isBuffering = false
        playerInfoHook.current.isPlaying = true

        playerInfoHook.current.toggleIsPlaying()
        rerender()

        expect(playerInfoHook.current.isBuffering).toBeFalsy()
    })
})

describe("is buffering", () => {
    it.each([true, false])("should set is buffering in store", (isBuffering: boolean) => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))

        playerInfoHook.current.setIsBuffering(isBuffering)
        rerender()

        expect(playerInfoHook.current.isBuffering).toBe(isBuffering)
    })
})

describe("player source store", () => {
    it("should set stream source in store", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))

        playerInfoHook.current.setPlayerSource(expectedSource)
        rerender()

        expect(playerInfoHook.current.source).toBe(expectedSource)
    })

    it("should toggle is playing & is buffering to true when stream source is set", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))
        expect(playerInfoHook.current.isPlaying).toBe(false)
        expect(playerInfoHook.current.isBuffering).toBe(false)

        playerInfoHook.current.setPlayerSource(expectedSource)
        rerender()

        expect(playerInfoHook.current.isPlaying).toBe(true)
        expect(playerInfoHook.current.isBuffering).toBe(true)
    })
})

describe("player volume store", () => {
    it("should set volume level in store", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))

        playerInfoHook.current.setVolume(0.2)
        rerender()

        expect(playerInfoHook.current.volume).toBe(0.2)
    })

    it("should set not allow the volume to go above 1", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))

        playerInfoHook.current.setVolume(6)
        rerender()

        expect(playerInfoHook.current.volume).toBe(1)
    })

    it("should set not allow the volume to drop below 0", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerStore((s) => s))

        playerInfoHook.current.setVolume(-6)
        rerender()

        expect(playerInfoHook.current.volume).toBe(0)
    })
})
