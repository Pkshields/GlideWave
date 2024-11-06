import React from "react"
import { ReactPlayerProps } from "react-player"
import { vi } from "vitest"

export const mockSeekTo = vi.fn()
export const mockGetDuration = vi.fn()

const ReactPlayer = React.forwardRef((props: ReactPlayerProps, ref) => {
    React.useImperativeHandle(ref, () => ({
        seekTo: mockSeekTo,
        getDuration: mockGetDuration,
    }))

    return (
        <>
            <p>URL: {props.url?.toString()}</p>
            <p>Playing: {props.playing?.toString()}</p>
        </>
    )
})
ReactPlayer.displayName = "ReactPlayer"

export default ReactPlayer