/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest"
import { partition } from "../../utils/common/collections"

export function quickMockComponent(mockedFunction: (props: any) => JSX.Element) {
    vi.mocked(mockedFunction)
        .mockImplementation((props: any) => (
            <>
                <p>{mockedFunction.name}</p>
                {generateMockComponentFromProps(mockedFunction.name, props)}
            </>
        ))
}

function generateMockComponentFromProps(componentName: string, props: any) {
    const propsAsKeyValues = Object.entries(props)
    const [buttonPropPairs, textPropPairs] = partition(propsAsKeyValues, ([, value]) => isNoParamFunction(value))
    const buttons = buttonPropPairs.map((pair) => propToButton(componentName, pair))
    const textProps = textPropPairs.map(propToStringRepresentation)

    return (
        <>
            {buttons}
            <div>
                {textProps.join("\n")}
            </div>
        </>
    )
}

function isNoParamFunction(func: any) {
    if (typeof func !== 'function') return false

    if (func.length !== 0) {
        throw TypeError("Function parameter in component requires parameters, Unable to quick mock")
    }

    return true
}

function propToButton(componentName: string, [key, value]: [string, any]) {
    return <button key={key} onClick={value}>{componentName}::{key}</button>
}

function propToStringRepresentation([key, value]: [string, any]) {
    return `${key}: ${value}`
}
