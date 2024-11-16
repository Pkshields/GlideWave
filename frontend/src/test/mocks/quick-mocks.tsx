/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { vi } from "vitest"
import { partition } from "../../utils/collections"

export function quickMockComponent(mockedFunction: (props: any) => JSX.Element) {
    vi.mocked(mockedFunction)
        .mockImplementation((props: any) => (
            <>
                <p>{mockedFunction.name}</p>
                {generateMockComponentFromProps(props)}
            </>
        ))
}

function generateMockComponentFromProps(props: any) {
    const propsAsKeyValues = Object.entries(props)
    const mappedProps = propsAsKeyValues.map(mapPropToButtonOrStringRepresentation)

    const [buttons, textProps] = partition(mappedProps, (item) => React.isValidElement(item))

    return (
        <>
            {buttons}
            <div>
                {textProps.join("\n")}
            </div>
        </>
    )
}

function mapPropToButtonOrStringRepresentation([key, value]: [string, any]) {
    if (isNoParamFunction(value)) {
        return <button key={key} onClick={value}>{key}</button>
    }

    return `${key}: ${value}`
}

function isNoParamFunction(func: any) {
    if (typeof func !== 'function') return false

    if (func.length !== 0) {
        throw TypeError("Function parameter in component requires parameters, Unable to quick mock")
    }

    return true
}