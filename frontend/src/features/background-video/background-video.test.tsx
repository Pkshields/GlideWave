import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { BackgroundVideo } from "./background-video"

describe("background video", () => {

    afterEach(cleanup)

    it("should display an autoplaying video", () => {
        render(<BackgroundVideo />)

        const videoTag = screen.getByTestId<HTMLVideoElement>("backgroundVideo")

        expect(videoTag instanceof HTMLVideoElement).toBeTruthy()
        expect(videoTag.autoplay).toBeTruthy()
        expect(videoTag.muted).toBeTruthy()
    })

    it("should display an looping video", () => {
        render(<BackgroundVideo />)

        const videoTag = screen.getByTestId<HTMLVideoElement>("backgroundVideo")

        expect(videoTag instanceof HTMLVideoElement).toBeTruthy()
        expect(videoTag.loop).toBeTruthy()
    })
})
