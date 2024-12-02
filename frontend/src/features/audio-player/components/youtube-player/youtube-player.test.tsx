import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { YouTubePlayer } from "./youtube-player"
import { mockGetDuration, mockSeekTo } from "../../../../../__mocks__/react-player"
import { act } from "react"
import userEvent from "@testing-library/user-event"
import { withFakeTimers } from "../../../../test/fake-timers"

vi.mock('react-player')

describe("youtube player", () => {
    const url = "https://www.videosite.com/"

    afterEach(() => {
        cleanup()
        vi.restoreAllMocks()
    })

    it("should set playing state of the player based on the prop", () => {
        render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(screen.getByText("Playing: true")).toBeInTheDocument()
    })

    it("should start the player using the url prop", () => {
        render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(screen.getByText(`URL: ${url}`)).toBeInTheDocument()
    })

    it("should set the video to live", () => {
        mockGetDuration.mockResolvedValue(1)

        render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(mockSeekTo).toHaveBeenCalledOnce()
    })

    it("should set volume on the player", () => {
        const volume = 0.5

        render(<YouTubePlayer url={url} isPlaying={true} volume={volume} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(screen.getByText(`Volume: ${volume}`)).toBeInTheDocument()
    })

    it("should not toggle playing state immediately", () => {
        const { rerender } = render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        rerender(<YouTubePlayer url={url} isPlaying={false} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(screen.getByText("Playing: true")).toBeInTheDocument()
    })

    it("should toggle playing state after debounce timer finishes", withFakeTimers(() => {
        const { rerender } = render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        rerender(<YouTubePlayer url={url} isPlaying={false} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)
        act(() => { vi.advanceTimersByTime(1000) })

        expect(screen.getByText("Playing: false")).toBeInTheDocument()
    }))

    it("should trigger on buffering when player is buffering", async () => {
        const onBuffering = vi.fn()
        render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={onBuffering} onBufferingFinished={vi.fn()} />)

        await userEvent.click(screen.getByText("onBuffer"))

        expect(onBuffering).toHaveBeenCalledOnce()
    })

    it("should trigger on buffering finished when player has buffered enough data to play", async () => {
        const onBufferingFinished = vi.fn()
        render(<YouTubePlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={onBufferingFinished} />)

        await userEvent.click(screen.getByText("onBufferEnd"))

        expect(onBufferingFinished).toHaveBeenCalledOnce()
    })
})
