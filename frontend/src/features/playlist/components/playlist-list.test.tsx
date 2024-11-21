import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, Mock, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { usePlayerSourceStore } from "../../../stores/player-state"
import { PlaylistList } from "./playlist-list"
import { BUTTON_ROLE, LIST_ITEM_ROLE, LIST_ROLE } from "../../../test/element-roles"

vi.mock("./playlist-list-item")
vi.mock("../../../stores/player-state")

function setPlayerSourceStore(setPlayerSource: Mock) {
    vi.mocked(usePlayerSourceStore).mockReturnValue({
        source: {
            name: "",
            streamer: "",
            sourceHomepage: "",
            streamUrl: ""
        },
        setPlayerSource: setPlayerSource
    })
}

describe("playlist list", () => {
    beforeAll(() => {
        setPlayerSourceStore(vi.fn())
    })

    afterEach(cleanup)

    it("should populate playlist", () => {
        render(<PlaylistList />)

        const playlistList = screen.getByRole(LIST_ROLE)
        expect(within(playlistList).getAllByRole(LIST_ITEM_ROLE).length).toBeGreaterThan(0)
    })

    it("should send source to the global store", async () => {
        const setSourceFunction = vi.fn()
        setPlayerSourceStore(setSourceFunction)

        render(<PlaylistList />)
        await userEvent.click(screen.getAllByRole(BUTTON_ROLE, { name: /PlaylistListItem/ })[0])

        expect(setSourceFunction).toHaveBeenCalledOnce()
    })
})