import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { PlayerControls } from "./player-controls"
import userEvent from "@testing-library/user-event"
import { PlayerControlButtonProps } from "./player-control-button"
import { usePlayerIsPlayingStore } from "../../stores/player-state"

vi.mock("../../stores/player-state")

describe("player controls", () => {
    beforeAll(() => {
        vi.mock("./player-control-button", () => ({
            PlayerControlButton: ({ onClick }: PlayerControlButtonProps) => (
              <button data-testid="player-control-button" onClick={onClick}>Mocked Button</button>
            )
        }))
    })

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