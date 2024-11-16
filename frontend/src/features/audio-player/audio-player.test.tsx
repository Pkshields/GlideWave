import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { AudioPlayer } from "./audio-player"
import { YouTubePlayer } from "./components/youtube-player/youtube-player"
import { AudioStreamPlayer } from "./components/audio-stream-player/audio-stream-player"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { usePlayerSourceStore } from "../../stores/player-state"

vi.mock("./components/youtube-player/youtube-player")
vi.mock("./components/audio-stream-player/audio-stream-player")

function setSourceStoreToReturn(streamUrl: string) {
    usePlayerSourceStore.setState({
        source: {
            name: "",
            streamer: "",
            sourceHomepage: "",
            streamUrl: streamUrl
        }
    })
}

describe("audio player", () => {
    beforeAll(() => {
        quickMockComponent(YouTubePlayer)
        quickMockComponent(AudioStreamPlayer)
    })

    afterEach(cleanup)

    it("should start youtube player if youtube url is provided", () => {
        setSourceStoreToReturn("https://www.youtube.com/watch?v=5yx6BWlEVcY")

        render(<AudioPlayer />)

        expect(screen.getByText(/YouTubePlayer/)).toBeInTheDocument()
    })

    it("should start audio player if any other url is provided", () => {
        setSourceStoreToReturn("https://paulshields.dev/stream")

        render(<AudioPlayer />)

        expect(screen.getByText(/AudioStreamPlayer/)).toBeInTheDocument()
    })

    it("should not start any player if no url is provided", () => {
        setSourceStoreToReturn("")

        render(<AudioPlayer />)

        expect(screen.queryByText(/(YouTubePlayer)|(AudioStreamPlayer)/)).not.toBeInTheDocument()
    })
})
