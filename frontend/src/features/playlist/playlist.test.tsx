import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { Playlist } from "./playlist"
import userEvent from "@testing-library/user-event"
import { BUTTON_ROLE } from "../../test/element-roles"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { PlaylistList } from "./components/playlist-list"

vi.mock("../../components/hoverable-button/hoverable-button")
vi.mock("./components/playlist-list")

describe("playlist", () => {
    beforeAll(() => {
        quickMockComponent(HoverableButton)
        quickMockComponent(PlaylistList)
    })

    afterEach(cleanup)

    it("should be hidden by default", () => {
        render(<Playlist />)

        expect(screen.getByText(/PlaylistList/)).not.toBeVisible()
    })

    it("should show playlist popup when button is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: /HoverableButton/}))

        expect(screen.getByText(/PlaylistList/)).toBeVisible()
    })

    it("should hide playlist popup when it is showing and the button is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: /HoverableButton/ }))
        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: /HoverableButton/ }))

        expect(screen.getByText(/PlaylistList/)).not.toBeVisible()
    })

    it("should hide playlist popup when any element outside of the component is clicked", async () => {
        render(<>
            <Playlist />
            <p data-testid="outside-component" />
        </>)

        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: /HoverableButton/ }))
        await userEvent.click(screen.getByTestId("outside-component"))

        expect(screen.getByText(/PlaylistList/)).not.toBeVisible()
    })

    it("should not hide playlist popup when the list itself is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: /HoverableButton/ }))
        await userEvent.click(screen.getByText(/PlaylistList/))

        expect(screen.getByText(/PlaylistList/)).toBeVisible()
    })
})