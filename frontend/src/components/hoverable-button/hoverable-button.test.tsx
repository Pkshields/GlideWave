import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { HoverableButton } from "./hoverable-button"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { BUTTON_ROLE } from "../../test/element-roles"

describe("hoverable button", () => {
    afterEach(cleanup)

    it("should not call play clicked without any interaction", () => {
        const onClickFunction = vi.fn()
        render(<HoverableButton icon={faHouse} iconOnHover={faHouse} onClick={onClickFunction} />)

        expect(onClickFunction).toHaveBeenCalledTimes(0)
    })

    it("should call play clicked when the play button is clicked", async () => {
        const onClickFunction = vi.fn()
        render(<HoverableButton icon={faHouse} iconOnHover={faHouse} onClick={onClickFunction} />)

        await userEvent.click(screen.getByRole(BUTTON_ROLE))

        expect(onClickFunction).toHaveBeenCalledOnce()
    })
})