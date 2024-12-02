import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { AudioPlayer } from "./audio-player"
import { YouTubePlayer } from "./components/youtube-player/youtube-player"
import { AudioStreamPlayer } from "./components/audio-stream-player/audio-stream-player"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { usePlayerStore } from "../../stores/player-state"
import userEvent from "@testing-library/user-event"

vi.mock("./components/youtube-player/youtube-player")
vi.mock("./components/audio-stream-player/audio-stream-player")
vi.mock("../../stores/player-state")

function mockPlayerStoreToReturn(streamUrl: string, setIsBuffering = vi.fn()) {
    const source = {
        name: "",
        streamer: "",
        sourceHomepage: "",
        streamUrl: streamUrl
    }

    vi.mocked(usePlayerStore).mockReturnValue([source, false, 1.0, setIsBuffering])
}

describe("audio player", () => {
    beforeAll(() => {
        quickMockComponent(YouTubePlayer)
        quickMockComponent(AudioStreamPlayer)
    })

    afterEach(cleanup)

    describe("youtube", () => {
        const setIsBuffering = vi.fn()

        beforeAll(() => mockPlayerStoreToReturn("https://www.youtube.com/watch?v=5yx6BWlEVcY", setIsBuffering))

        it("should start youtube player if youtube url is provided", () => {
            render(<AudioPlayer />)

            expect(screen.getByText(YouTubePlayer.name)).toBeInTheDocument()
        })

        it("should set is buffering to true if youtube player is buffering", async () => {
            render(<AudioPlayer />)

            await userEvent.click(screen.getByText(`${YouTubePlayer.name}::onBuffering`))

            expect(setIsBuffering).toBeCalledWith(true)
        })

        it("should set is buffering to false if youtube player has stopped buffering", async () => {
            render(<AudioPlayer />)

            await userEvent.click(screen.getByText(`${YouTubePlayer.name}::onBufferingFinished`))

            expect(setIsBuffering).toBeCalledWith(false)
        })
    })

    describe("audio stream player", () => {
        const setIsBuffering = vi.fn()

        beforeAll(() => mockPlayerStoreToReturn("https://paulshields.dev/stream", setIsBuffering))

        it("should start audio player if any other url is provided", () => {
            render(<AudioPlayer />)

            expect(screen.getByText(AudioStreamPlayer.name)).toBeInTheDocument()
        })

        it("should set is buffering to true if audio stream player is buffering", async () => {
            render(<AudioPlayer />)

            await userEvent.click(screen.getByText(`${AudioStreamPlayer.name}::onBuffering`))

            expect(setIsBuffering).toBeCalledWith(true)
        })

        it("should set is buffering to false if audio stream player has stopped buffering", async () => {
            render(<AudioPlayer />)

            await userEvent.click(screen.getByText(`${AudioStreamPlayer.name}::onBufferingFinished`))

            expect(setIsBuffering).toBeCalledWith(false)
        })
    })

    describe("error handling", () => {
        it("should not start any player if no url is provided", () => {
            mockPlayerStoreToReturn("")

            render(<AudioPlayer />)

            expect(screen.queryByText(/(YouTubePlayer)|(AudioStreamPlayer)/)).not.toBeInTheDocument()
        })
    })
})
