import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest"
import { VolumeSlider } from "./volume-slider"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { usePlayerVolumeStore } from "../../stores/player-state"

vi.mock("../../stores/player-state")

function mockUsePlayerVolumeStore(volume: number, setVolume: Mock) {
    vi.mocked(usePlayerVolumeStore).mockReturnValue({ volume, setVolume })
}

describe("volume slider ui tests", () => {
    const setVolume = vi.fn()

    beforeEach(() => {
        mockUsePlayerVolumeStore(1, setVolume)
    })

    afterEach(cleanup)

    it("should start with all notches highlighted", () => {
        const component = render(<VolumeSlider />)

        expect(component.container).toMatchSnapshot()
    })

    it("should have half the notches highlighted", () => {
        mockUsePlayerVolumeStore(0.5, setVolume)

        const component = render(<VolumeSlider />)

        expect(component.container).toMatchSnapshot()
    })

    it("should trigger volume change on click", async () => {
        render(<VolumeSlider />)

        await userEvent.click(screen.getByTestId('volume-notch-5'))

        expect(setVolume).toBeCalledWith(0.6)
    })

    it("should show potential volume if notch is highlighted", async () => {
        const component = render(<VolumeSlider />)

        await userEvent.hover(screen.getByTestId('volume-notch-6'))

        expect(component.container).toMatchSnapshot()
    })

    it("should show current volume when notch is unhighlighted", async () => {
        const component = render(<VolumeSlider />)

        await userEvent.hover(screen.getByTestId('volume-notch-3'))
        await userEvent.unhover(screen.getByTestId('volume-notch-3'))

        expect(component.container).toMatchSnapshot()
    })
})