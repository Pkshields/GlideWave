import { RefObject, useEffect } from "react"

export function useClickOutsideElement(
    element: RefObject<HTMLElement>,
    onClickOutside: () => void,
    listenerEnabled = true
) {
    useEffect(() => {
        if (!listenerEnabled) {
            document.removeEventListener("mousedown", handleClickOutside)
            return
        }

        function handleClickOutside(event: MouseEvent) {
            if (!element.current?.contains(event.target as Node)) {
                onClickOutside()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [element, onClickOutside, listenerEnabled])
}