import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { AudioStreamPlayer } from "./audio-stream-player"
import { mockAudioElementFunctions } from "../../../../test/mocks/mock-audio-element"

describe("audio stream player", () => {
    const url = "https://www.videosite.com/"

    afterEach(cleanup)

    it("should start the stream with the correct url when is playing prop is true", () => {
        const { play } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={url} isPlaying={true} volume={1} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(play).toHaveBeenCalledOnce()
        expect(audioElement.src).toBe(url)
    })

    it("should pause the stream when is playing prop is false", () => {
        const { pause } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={url} isPlaying={false} volume={1} />)

        expect(pause).toHaveBeenCalledOnce()
    })

    it("should set the volume of the player", () => {
        render(<AudioStreamPlayer url={url} isPlaying={true} volume={0.5} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(audioElement.volume).toBe(0.5)
    })
})
