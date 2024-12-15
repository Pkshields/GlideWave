import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { AudioStreamPlayer } from "./audio-stream-player"
import { mockAudioElementFunctions } from "../../../../test/mocks/mock-audio-element"
import { useFetchStreams } from "../../api/use-fetch-streams"
import { mockReactQueryResult } from "../../../../test/mocks/react-query"

vi.mock("../../api/use-fetch-streams")

describe("audio stream player", () => {
    const initialUrl = "https://www.videosite.com/"
    const streamUrl = "https://www.videosite.com/streams.ogg"

    beforeEach(() => {
        vi.mocked(useFetchStreams).mockReturnValue(mockReactQueryResult([streamUrl]))
    })

    afterEach(cleanup)

    it("should start the stream with the correct url when is playing prop is true", () => {
        const { play } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={initialUrl} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(play).toHaveBeenCalledOnce()
        expect(audioElement.src).toBe(streamUrl)
    })

    it("should pause the stream when is playing prop is false", () => {
        const { pause } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={initialUrl} isPlaying={false} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(pause).toHaveBeenCalledOnce()
    })

    it("should set the volume of the player", () => {
        render(<AudioStreamPlayer url={initialUrl} isPlaying={true} volume={0.5} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(audioElement.volume).toBe(0.5)
    })

    it("should call on buffering if the audio element is not ready to play yet", () => {
        const onBuffering = vi.fn()
        render(<AudioStreamPlayer url={initialUrl} isPlaying={true} volume={0.5} onBuffering={onBuffering} onBufferingFinished={vi.fn()} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        fireEvent.waiting(audioElement)

        expect(onBuffering).toHaveBeenCalledOnce()
    })

    it("should call on buffering if the audio element is not ready to play yet", () => {
        const onBufferingFinished = vi.fn()
        render(<AudioStreamPlayer url={initialUrl} isPlaying={true} volume={0.5} onBuffering={vi.fn()} onBufferingFinished={onBufferingFinished} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        fireEvent.canPlayThrough(audioElement)

        expect(onBufferingFinished).toHaveBeenCalledOnce()
    })

    it("should wait for stream url to be fetched before attempting to start stream", () => {
        const { play } = mockAudioElementFunctions()
        vi.mocked(useFetchStreams).mockReturnValue(mockReactQueryResult([streamUrl], true))

        render(<AudioStreamPlayer url={initialUrl} isPlaying={true} volume={1} onBuffering={vi.fn()} onBufferingFinished={vi.fn()} />)

        expect(play).not.toHaveBeenCalled()
    })
})
