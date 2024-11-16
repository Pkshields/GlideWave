import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PlayerControls } from "./player-controls"
import userEvent from "@testing-library/user-event"
import { usePlayerIsPlayingStore } from "../../stores/player-state"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { BUTTON_ROLE } from "../../test/element-roles"

vi.mock("../../stores/player-state")
vi.mock("../../components/hoverable-button/hoverable-button")

describe("player controls", () => {
    beforeEach(() => {
        quickMockComponent(HoverableButton)
    })

    afterEach(cleanup)

    it("should call play clicked when the play button is clicked", async () => {
        const toggleIsPlayingFunction = vi.fn()
        vi.mocked(usePlayerIsPlayingStore).mockReturnValue({
            isPlaying: false,
            toggleIsPlaying: toggleIsPlayingFunction
        })

        render(<PlayerControls />)
        await userEvent.click(screen.getAllByRole(BUTTON_ROLE, { name: "onClick" })[1])

        expect(toggleIsPlayingFunction).toHaveBeenCalledOnce()
    })
})