import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { YouTubePlayer } from "./youtube-player"
import { mockGetDuration, mockSeekTo } from "../../../__mocks__/react-player"
import { DIV_ROLE } from "../../test/element-roles"

vi.mock('react-player')

describe("youtube player", () => {
    const url = "https://www.videosite.com/"

    afterEach(() => {
        cleanup()
        vi.restoreAllMocks()
    })

    it("should set playing state of the player based on the prop", () => {
        render(<YouTubePlayer url={url} isPlaying={true} />)

        expect(screen.getByText("Playing: true")).toBeInTheDocument()
    })

    it("should start the player using the url prop", () => {
        render(<YouTubePlayer url={url} isPlaying={true} />)

        expect(screen.getByText(`URL: ${url}`)).toBeInTheDocument()
    })

    it("should set the video to live", async () => {
        mockGetDuration.mockResolvedValue(1)
        render(<YouTubePlayer url={url} isPlaying={true} />)

        await waitFor(() => {
            expect(screen.getByRole(DIV_ROLE)).toBeInTheDocument()
        })

        expect(mockSeekTo).toHaveBeenCalledOnce()
    })
})
