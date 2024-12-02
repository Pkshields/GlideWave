import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PlayerControls } from "./player-controls"
import userEvent from "@testing-library/user-event"
import { usePlayerStore } from "../../stores/player-state"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { BUTTON_ROLE } from "../../test/element-roles"

vi.mock("../../components/hoverable-button/hoverable-button")
vi.mock("./volume-slider")
vi.mock("../playlist/playlist")
vi.mock("../../stores/player-state")

function mockPlayerStoreToReturn(name: string, streamer: string, isBuffering: boolean, toggleIsPlaying = vi.fn()) {
    const source = {
        name: name,
        streamer: streamer,
        sourceHomepage: "",
        streamUrl: ""
    }

    vi.mocked(usePlayerStore).mockReturnValue([source, false, isBuffering, toggleIsPlaying])
}

describe("player controls", () => {
    beforeEach(() => {
        quickMockComponent(HoverableButton)
    })

    afterEach(cleanup)

    it("should display the name of the stream source loaded into the player", () => {
        const name = "Chillhop"
        mockPlayerStoreToReturn(name, "", false)

        render(<PlayerControls />)

        expect(screen.getByText(name)).toBeInTheDocument()
    })

    it("should display the streamer of the stream source loaded into the player", () => {
        const streamer = "Big Mike"
        mockPlayerStoreToReturn("", streamer, false)

        render(<PlayerControls />)

        expect(screen.getByText(streamer)).toBeInTheDocument()
    })

    it("should call play clicked when the play button is clicked", async () => {
        const toggleIsPlayingFunction = vi.fn()
        mockPlayerStoreToReturn("", "", false, toggleIsPlayingFunction)

        render(<PlayerControls />)
        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: /HoverableButton/ }))

        expect(toggleIsPlayingFunction).toHaveBeenCalledOnce()
    })

    it.each([true, false])("should fade animate if buffering", (isBuffering: boolean) => {
        mockPlayerStoreToReturn("", "", isBuffering)

        render(<PlayerControls />)

        expect(screen.getByText(new RegExp(`fadeAnimation: ${isBuffering}`))).toBeInTheDocument()
    })
})