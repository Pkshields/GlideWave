import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { BackgroundVideo } from "./background-video"

describe("background video", () => {

    afterEach(cleanup)

    it("should display an autoplaying video", () => {
        render(<BackgroundVideo />)

        const videoElement = screen.getByTestId<HTMLVideoElement>("backgroundVideo")
        expect(videoElement instanceof HTMLVideoElement).toBeTruthy()
        expect(videoElement.autoplay).toBeTruthy()
        expect(videoElement.muted).toBeTruthy()
    })

    it("should display an looping video", () => {
        render(<BackgroundVideo />)

        const videoElement = screen.getByTestId<HTMLVideoElement>("backgroundVideo")
        expect(videoElement instanceof HTMLVideoElement).toBeTruthy()
        expect(videoElement.loop).toBeTruthy()
    })

    it("should show a loading icon if video is not loaded", () => {
        render(<BackgroundVideo />)

        expect(screen.queryByTestId("loadingIcon")).toBeInTheDocument()
    })

    it("should not show a loading icon if video is playing", () => {
        render(<BackgroundVideo />)

        const videoElement = screen.getByTestId<HTMLVideoElement>("backgroundVideo")
        fireEvent.play(videoElement)

        expect(screen.queryByTestId("loadingIcon")).not.toBeInTheDocument()
    })

    it("should show a loading icon if video is no longer playing", () => {
        render(<BackgroundVideo />)

        const videoElement = screen.getByTestId<HTMLVideoElement>("backgroundVideo")
        fireEvent.play(videoElement)
        fireEvent.pause(videoElement)

        expect(screen.queryByTestId("loadingIcon")).toBeInTheDocument()
    })
})
