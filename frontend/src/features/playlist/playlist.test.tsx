import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { Playlist } from "./playlist"
import userEvent from "@testing-library/user-event"
import { BUTTON_ROLE, LIST_ITEM_ROLE, LIST_ROLE } from "../../test/element-roles"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { usePlayerSourceStore } from "../../stores/player-state"

vi.mock("../../components/hoverable-button/hoverable-button")
vi.mock("./playlist-list-item")

describe("playlist", () => {
    beforeAll(() => {
        usePlayerSourceStore.setState({ setPlayerSource: vi.fn() })
        quickMockComponent(HoverableButton)
    })

    afterEach(cleanup)

    it("should be hidden by default", () => {
        render(<Playlist />)

        expect(screen.getByTestId("playlist-popup")).not.toBeVisible()
    })

    it("should show playlist popup when button is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getAllByRole(BUTTON_ROLE)[0])

        expect(screen.getByTestId("playlist-popup")).toBeVisible()
    })

    it("should hide playlist popup when it is showing and the button is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getAllByRole(BUTTON_ROLE)[0])
        await userEvent.click(screen.getAllByRole(BUTTON_ROLE)[0])

        expect(screen.getByTestId("playlist-popup")).not.toBeVisible()
    })

    it("should populate playlist when popup is open", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getAllByRole(BUTTON_ROLE)[0])

        const playlistList = screen.getByRole(LIST_ROLE)
        expect(within(playlistList).getAllByRole(LIST_ITEM_ROLE).length).toBeGreaterThan(0)
    })

    it("should send source to ...", async () => {
        const setSourceFunction = vi.fn()
        usePlayerSourceStore.setState({ setPlayerSource: setSourceFunction })

        render(<Playlist />)
        await userEvent.click(screen.getAllByRole(BUTTON_ROLE)[0])
        await userEvent.click(screen.getAllByRole(BUTTON_ROLE)[1])

        expect(setSourceFunction).toHaveBeenCalledOnce()
    })
})