import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { PlayerControls } from "./player-controls"
import userEvent from "@testing-library/user-event"
import { usePlayerIsPlayingStore } from "../../stores/player-state"

vi.mock("../../stores/player-state")
vi.mock("../../components/hoverable-button/hoverable-button")

describe("player controls", () => {
    afterEach(cleanup)

    it("should call play clicked when the play button is clicked", async () => {
        const toggleIsPlayingFunction = vi.fn()
        vi.mocked(usePlayerIsPlayingStore).mockReturnValue({
            isPlaying: false,
            toggleIsPlaying: toggleIsPlayingFunction
        })
        render(<PlayerControls />)

        await userEvent.click(screen.getAllByTestId("player-control-button")[1])

        expect(toggleIsPlayingFunction).toHaveBeenCalledOnce()
    })
})