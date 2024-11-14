import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { PlaylistListItem } from "./playlist-list-item"
import { StreamSource } from "../../types/stream-source"

const streamSource: StreamSource = {
    name: "Helluva Stream",
    streamer: "Silence",
    sourceHomepage: "https://paulshields.dev/",
    streamUrl: "https://paulshields.dev/not-an-actual-stream"
}

describe("playlist list item", () => {
    afterEach(cleanup)

    it("should show the name of the stream", () => {
        render(<PlaylistListItem source={streamSource}/>)

        expect(screen.getByText(streamSource.name)).toBeVisible()
    })

    it("should show the streamer name", () => {
        render(<PlaylistListItem source={streamSource} />)

        expect(screen.getByText(streamSource.streamer)).toBeVisible()
    })
})