import { cleanup, render, screen } from "@testing-library/react"
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { YouTubePlayer } from "./youtube-player"
import { mockGetDuration, mockSeekTo } from "../../../../../__mocks__/react-player"
import { act } from "react"

vi.mock('react-player')

describe("youtube player", () => {
    const url = "https://www.videosite.com/"

    beforeAll(() => vi.useFakeTimers())
    afterAll(() => vi.useRealTimers())

    afterEach(() => {
        cleanup()
        vi.restoreAllMocks()
    })

    it("should set playing state of the player based on the prop", () => {
        render(<YouTubePlayer url={url} isPlaying={true} volume={1} />)

        expect(screen.getByText("Playing: true")).toBeInTheDocument()
    })

    it("should start the player using the url prop", () => {
        render(<YouTubePlayer url={url} isPlaying={true} volume={1} />)

        expect(screen.getByText(`URL: ${url}`)).toBeInTheDocument()
    })

    it("should set the video to live", () => {
        mockGetDuration.mockResolvedValue(1)

        render(<YouTubePlayer url={url} isPlaying={true} volume={1} />)

        expect(mockSeekTo).toHaveBeenCalledOnce()
    })

    it("should set volume on the player", () => {
        const volume = 0.5

        render(<YouTubePlayer url={url} isPlaying={true} volume={volume} />)

        expect(screen.getByText(`Volume: ${volume}`)).toBeInTheDocument()
    })

    it("should not toggle playing state immediately", () => {
        const { rerender } = render(<YouTubePlayer url={url} isPlaying={true} volume={1} />)

        rerender(<YouTubePlayer url={url} isPlaying={false} volume={1} />)

        expect(screen.getByText("Playing: true")).toBeInTheDocument()
    })

    it("should toggle playing state after debounce timer finishes", () => {
        const { rerender } = render(<YouTubePlayer url={url} isPlaying={true} volume={1} />)

        rerender(<YouTubePlayer url={url} isPlaying={false} volume={1} />)
        act(() => { vi.advanceTimersByTime(1000) })

        expect(screen.getByText("Playing: false")).toBeInTheDocument()
    })
})
