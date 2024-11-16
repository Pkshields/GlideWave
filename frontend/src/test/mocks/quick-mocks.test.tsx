import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeAll, beforeEach, describe, expect, it, MockInstance, vi } from "vitest"
import { quickMockComponent } from "./quick-mocks"
import { ComponentWithUnsupportedFunctionProps, QuickMocksComponent } from "./quick-mocks-test-components"
import { BUTTON_ROLE } from "../element-roles"
import userEvent from "@testing-library/user-event"

vi.mock("./quick-mocks-test-components")

describe("quick mocks from supported components", () => {
    beforeAll(() => {
        quickMockComponent(QuickMocksComponent)
    })

    afterEach(cleanup)

    it("should include the name of the component in the mocked component text", () => {
        render(<QuickMocksComponent aString="" aBoolean={true} aFunction={vi.fn()} />)

        expect(screen.getByText(/QuickMocksComponent/)).toBeInTheDocument()
    })

    it("should include all non-function props in the mocked component text", () => {
        const stringText = "This better be in the document somewhere"

        render(<QuickMocksComponent aString={stringText} aBoolean={true} aFunction={vi.fn()} />)

        expect(screen.getByText(new RegExp(`aString: ${stringText}`))).toBeInTheDocument()
        expect(screen.getByText(/aBoolean: true/)).toBeInTheDocument()
    })

    it("should include a button for all function props in the mocked component", () => {
        render(<QuickMocksComponent aString="" aBoolean={true} aFunction={vi.fn()} />)

        expect(screen.getByRole(BUTTON_ROLE, { name: "aFunction" })).toBeInTheDocument()
    })

    it("should call the function prop when the asspciated button is clicked", async () => {
        const aFunction = vi.fn()

        render(<QuickMocksComponent aString="" aBoolean={true} aFunction={aFunction} />)
        await userEvent.click(screen.getByRole(BUTTON_ROLE, { name: "aFunction" }))

        expect(aFunction).toHaveBeenCalledOnce()
    })
})

describe("quick mocks from unsupported components", () => {
    let mockedConsoleError: MockInstance

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        mockedConsoleError = vi.spyOn(console, 'error').mockImplementation(() => { })
    })

    afterEach(() => {
        mockedConsoleError.mockClear()
        cleanup()
    })

    it("should throw an error when attempting to quick mock a component which includes a function prop that requires parameters", () => {
        const testFunction = (numberParameter: number) => { console.log(numberParameter) }
        quickMockComponent(ComponentWithUnsupportedFunctionProps)

        expect(() => {
            render(<ComponentWithUnsupportedFunctionProps aFunctionWithParameters={testFunction}/>)
        }).toThrowError()
    })
})
