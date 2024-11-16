import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { AudioStreamPlayer } from "./audio-stream-player"
import { mockAudioElementFunctions } from "../../../../test/mocks/mock-audio-element"

describe("audio stream player", () => {
    const url = "https://www.videosite.com/"

    afterEach(cleanup)

    it("should start the stream with the correct url when is playing prop is true", () => {
        const { play } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={url} isPlaying={true} />)

        const audioElement: HTMLAudioElement = screen.getByTestId('audio-player')
        expect(play).toHaveBeenCalledOnce()
        expect(audioElement.src).toBe(url)
    })

    it("should pause the stream when is playing prop is false", () => {
        const { pause } = mockAudioElementFunctions()

        render(<AudioStreamPlayer url={url} isPlaying={false} />)

        expect(pause).toHaveBeenCalledOnce()
    })
})
