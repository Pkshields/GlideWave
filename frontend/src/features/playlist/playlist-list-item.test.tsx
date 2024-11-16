import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { StreamSource } from "../../types/stream-source"
import { LIST_ITEM_ROLE } from "../../test/element-roles"
import userEvent from "@testing-library/user-event"
import { PlaylistListItem } from "./playlist-list-item"

const streamSource: StreamSource = {
    name: "Helluva Stream",
    streamer: "Silence",
    sourceHomepage: "https://paulshields.dev/",
    streamUrl: "https://paulshields.dev/not-an-actual-stream"
}

describe("playlist list item", () => {
    afterEach(cleanup)

    it("should show the name of the stream", () => {
        render(<PlaylistListItem source={streamSource} onClick={vi.fn()} />)

        expect(screen.getByText(streamSource.name)).toBeVisible()
    })

    it("should show the streamer name", () => {
        render(<PlaylistListItem source={streamSource} onClick={vi.fn()} />)

        expect(screen.getByText(streamSource.streamer)).toBeVisible()
    })

    it("should call the onclick function when the playlist list item is clicked", async () => {
        const onClickFunction = vi.fn()

        render(<PlaylistListItem source={streamSource} onClick={onClickFunction} />)
        await userEvent.click(screen.getByRole(LIST_ITEM_ROLE))

        expect(onClickFunction).toHaveBeenCalledOnce()
    })
})