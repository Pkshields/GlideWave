import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Playlist } from "./playlist"
import userEvent from "@testing-library/user-event"
import { BUTTON_ROLE } from "../../test/element-roles"

vi.mock("../../components/hoverable-button/hoverable-button")

describe("playlist", () => {

    afterEach(cleanup)

    it("should be hidden by default", () => {
        render(<Playlist />)

        expect(screen.getByTestId("playlist-popup")).not.toBeVisible()
    })

    it("should show playlist popup when button is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getByRole(BUTTON_ROLE))

        expect(screen.getByTestId("playlist-popup")).toBeVisible()
    })

    it("should hide playlist popup when it is showing and the button is clicked", async () => {
        render(<Playlist />)

        await userEvent.click(screen.getByRole(BUTTON_ROLE))
        await userEvent.click(screen.getByRole(BUTTON_ROLE))

        expect(screen.getByTestId("playlist-popup")).not.toBeVisible()
    })
})