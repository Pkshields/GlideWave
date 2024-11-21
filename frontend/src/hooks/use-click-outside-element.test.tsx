import { useRef } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { useClickOutsideElement } from "./use-click-outside-element"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

function HookTestComponent({ triggered, enableHook }: { triggered: () => void, enableHook: boolean }) {
    const elementUnderTest = useRef<HTMLDivElement>(null)
    useClickOutsideElement(elementUnderTest, triggered, enableHook)

    return (
        <>
            <div ref={elementUnderTest} data-testid="element-under-test">
                <div data-testid="inner-element" />
            </div>
            <div data-testid="outer-element" />
        </>
    )
}

describe("use click outside element", () => {
    const clickOutsideFunction = vi.fn()

    afterEach(() => {
        cleanup()
        clickOutsideFunction.mockReset()
    })

    it("should trigger click outside function when any unrelated element is clicked", async () => {
        render(<HookTestComponent triggered={clickOutsideFunction} enableHook={true} />)

        await userEvent.click(screen.getByTestId("outer-element"))

        expect(clickOutsideFunction).toHaveBeenCalledOnce()
    })

    it("should not trigger click outside function when element linked to hook is clicked", async () => {
        render(<HookTestComponent triggered={clickOutsideFunction} enableHook={true} />)

        await userEvent.click(screen.getByTestId("element-under-test"))

        expect(clickOutsideFunction).not.toHaveBeenCalled()
    })

    it("should not trigger click outside function when element inside element linked to hook is clicked", async () => {
        render(<HookTestComponent triggered={clickOutsideFunction} enableHook={true} />)

        await userEvent.click(screen.getByTestId("inner-element"))

        expect(clickOutsideFunction).not.toHaveBeenCalled()
    })

    it("should not trigger click outside function when hook is disabled", async () => {
        render(<HookTestComponent triggered={clickOutsideFunction} enableHook={false} />)

        await userEvent.click(screen.getByTestId("outer-element"))

        expect(clickOutsideFunction).not.toHaveBeenCalled()
    })

})