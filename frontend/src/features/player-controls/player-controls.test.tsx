import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { PlayerControls } from "./player-controls"
import userEvent from "@testing-library/user-event"
import { PlayerControlButtonProps } from "./player-control-button"

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
        const playFunction = vi.fn()
        render(<PlayerControls onPlayClicked={playFunction} />)

        await userEvent.click(screen.getAllByTestId("player-control-button")[1])

        expect(playFunction).toHaveBeenCalledOnce()
    })
})