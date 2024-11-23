import { describe, expect, it, vi } from "vitest"
import { usePlayerInfoStore, usePlayerVolumeStore } from "./player-state"
import { renderHook } from "@testing-library/react"
import { StreamSource } from "../types/stream-source"

vi.mock("zustand")

describe("player info store", () => {
    const expectedSource: StreamSource = {
        name: "Stream Source",
        streamer: "Streamer",
        sourceHomepage: "https://home.page",
        streamUrl: "https://home.page/stream.ogg"
    }

    it("should set stream source in store", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerInfoStore())

        playerInfoHook.current.setPlayerSource(expectedSource)
        rerender()

        expect(playerInfoHook.current.source).toBe(expectedSource)
    })

    it("should toggle is playing to true when stream source is set", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerInfoStore())
        expect(playerInfoHook.current.isPlaying).toBe(false)

        playerInfoHook.current.setPlayerSource(expectedSource)
        rerender()

        expect(playerInfoHook.current.isPlaying).toBe(true)
    })

    it("should toggle is playing state", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerInfoStore())
        const initialIsPlaying = playerInfoHook.current.isPlaying

        playerInfoHook.current.toggleIsPlaying()
        rerender()

        expect(playerInfoHook.current.isPlaying).toBe(!initialIsPlaying)
    })
})

describe("player volume store", () => {
    it("should set volume level in store", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerVolumeStore())

        playerInfoHook.current.setVolume(0.2)
        rerender()

        expect(playerInfoHook.current.volume).toBe(0.2)
    })

    it("should set not allow the volume to go above 1", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerVolumeStore())

        playerInfoHook.current.setVolume(6)
        rerender()

        expect(playerInfoHook.current.volume).toBe(1)
    })

    it("should set not allow the volume to drop below 0", () => {
        const { result: playerInfoHook, rerender } = renderHook(() => usePlayerVolumeStore())

        playerInfoHook.current.setVolume(-6)
        rerender()

        expect(playerInfoHook.current.volume).toBe(0)
    })
})
