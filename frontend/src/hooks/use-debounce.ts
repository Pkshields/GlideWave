import { useEffect, useState } from "react";

export function useDebounce<InputType>(input: InputType, timeout: number) {
    const [debouncedValue, setDebouncedValue] = useState(input)

    useEffect(() => {
        const timoutReference = setTimeout(() => {
            setDebouncedValue(input)
        }, timeout)

        return () => clearTimeout(timoutReference)
    }, [input, timeout])

    return debouncedValue
}