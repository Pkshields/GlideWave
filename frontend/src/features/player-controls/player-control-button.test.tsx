import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { PlayerControlButton } from "./player-control-button"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

describe("player control button", () => {
    afterEach(cleanup)

    it("should not call play clicked without any interaction", () => {
        const onClickFunction = vi.fn()
        render(<PlayerControlButton icon={faHouse} iconOnHover={faHouse} onClick={onClickFunction} />)

        expect(onClickFunction).toHaveBeenCalledTimes(0)
    })

    it("should call play clicked when the play button is clicked", async () => {
        const onClickFunction = vi.fn()
        render(<PlayerControlButton icon={faHouse} iconOnHover={faHouse} onClick={onClickFunction} />)

        await userEvent.click(screen.getByRole("button"))

        expect(onClickFunction).toHaveBeenCalledOnce()
    })
})