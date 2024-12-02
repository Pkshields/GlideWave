import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { AudioStreamPlayer } from "./audio-stream-player"
import { mockAudioElementFunctions } from "../../../../test/mocks/mock-audio-element"

describe("audio stream player", () => {
    const url = "https://www.videosite.com/"

    afterEach(cleanup)

    it("should start the stream with the correct url when is playing prop is true", () => {
        const { play } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={url} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(play).toHaveBeenCalledOnce()
        expect(audioElement.src).toBe(url)
    })

    it("should pause the stream when is playing prop is false", () => {
        const { pause } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={url} isPlaying={false} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(pause).toHaveBeenCalledOnce()
    })

    it("should set the volume of the player", () => {
        render(<AudioStreamPlayer url={url} isPlaying={true} volume={0.5} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(audioElement.volume).toBe(0.5)
    })

    it("should call on buffering if the audio element is not ready to play yet", () => {
        const onBuffering = vi.fn()
        render(<AudioStreamPlayer url={url} isPlaying={true} volume={0.5} onBuffering={onBuffering} onBufferingFinished={vi.fn()} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        fireEvent.waiting(audioElement)

        expect(onBuffering).toHaveBeenCalledOnce()
    })

    it("should call on buffering if the audio element is not ready to play yet", () => {
        const onBufferingFinished = vi.fn()
        render(<AudioStreamPlayer url={url} isPlaying={true} volume={0.5} onBuffering={vi.fn()} onBufferingFinished={onBufferingFinished} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        fireEvent.canPlayThrough(audioElement)

        expect(onBufferingFinished).toHaveBeenCalledOnce()
    })
})
