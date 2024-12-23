import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { PlaylistListItem } from "./playlist-list-item"
import { StreamSource } from "../../../types/stream-source"
import { LIST_ITEM_ROLE } from "../../../test/element-roles"

const streamSource: StreamSource = {
    name: "Helluva Stream",
    streamer: "Silence",
    sourceHomepage: "https://paulshields.dev/",
    streamUrl: "https://paulshields.dev/not-an-actual-stream"
}

describe("playlist list item", () => {
    afterEach(cleanup)

    it("should show the name of the stream", () => {
        render(<PlaylistListItem source={streamSource} isPlaying={false} onClick={vi.fn()} />)

        expect(screen.getByText(streamSource.name)).toBeVisible()
    })

    it("should show the streamer name", () => {
        render(<PlaylistListItem source={streamSource} isPlaying={false} onClick={vi.fn()} />)

        expect(screen.getByText(streamSource.streamer)).toBeVisible()
    })

    it("should call the onclick function when the playlist list item is clicked", async () => {
        const onClickFunction = vi.fn()

        render(<PlaylistListItem source={streamSource} isPlaying={false} onClick={onClickFunction} />)
        await userEvent.click(screen.getByRole(LIST_ITEM_ROLE))

        expect(onClickFunction).toHaveBeenCalledOnce()
    })

    it("should indicate that an item has been selected", () => {
        render(<>
            <PlaylistListItem source={streamSource} isPlaying={true} onClick={vi.fn()} />
            <PlaylistListItem source={streamSource} isPlaying={false} onClick={vi.fn()} />
        </>)

        const listItems = screen.getAllByRole(LIST_ITEM_ROLE)
        expect(listItems[0]).not.toStrictEqual(listItems[1])
    })
})