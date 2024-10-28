import { afterEach, describe, expect, it } from "vitest"
import { VolumeSlider } from "./volume-slider"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("volume slider ui tests", () => {
    afterEach(cleanup)

    it("should start with all notches highlighted", () => {
        const component = render(<VolumeSlider />)

        expect(component.container).toMatchSnapshot()
    })

    it("should show current volume level after volume is changed", async () => {
        const component = render(<VolumeSlider />)

        await userEvent.click(screen.getByTestId('volume-notch-5'))

        expect(component.container).toMatchSnapshot()
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