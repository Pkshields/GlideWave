import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PlayerControls } from "./player-controls"
import userEvent from "@testing-library/user-event"
import { usePlayerIsPlayingStore, usePlayerSourceStore } from "../../stores/player-state"
import { quickMockComponent } from "../../test/mocks/quick-mocks"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { BUTTON_ROLE } from "../../test/element-roles"

vi.mock("../../components/hoverable-button/hoverable-button")

function setPlayerSourceStore(name: string, streamer: string) {
    usePlayerSourceStore.setState({
        source: {
            name: name,
            streamer: streamer,
            sourceHomepage: "",
            streamUrl: ""
        }
    })
}

describe("player controls", () => {
    beforeEach(() => {
        quickMockComponent(HoverableButton)
    })

    afterEach(cleanup)

    it("should display the name of the stream source loaded into the player", () => {
        const name = "Chillhop"
        setPlayerSourceStore(name, "")

        render(<PlayerControls />)

        expect(screen.getByText(name)).toBeInTheDocument()
    })

    it("should display the streamer of the stream source loaded into the player", () => {
        const streamer = "Big Mike"
        setPlayerSourceStore("", streamer)

        render(<PlayerControls />)

        expect(screen.getByText(streamer)).toBeInTheDocument()
    })

    it("should call play clicked when the play button is clicked", async () => {
        const toggleIsPlayingFunction = vi.fn()
        usePlayerIsPlayingStore.setState({ toggleIsPlaying: toggleIsPlayingFunction })

        render(<PlayerControls />)
        await userEvent.click(screen.getAllByRole(BUTTON_ROLE, { name: "onClick" })[1])

        expect(toggleIsPlayingFunction).toHaveBeenCalledOnce()
    })
})