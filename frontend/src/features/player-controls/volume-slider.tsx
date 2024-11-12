import { useState } from "react"
import { repeat } from "../../utils/loops"

export function VolumeSlider() {
    const [volume, setVolume] = useState(10)
    const [hoverOverNotch, setHoverOverNotch] = useState(-1)

    function generateSliderNotchClasses(index: number): string {
        const styleClassNames = "py-3 px-1 mx-0.5 border-2 rounded border-white scale-75"

        const effectiveVolume = hoverOverNotch == -1 ? volume : hoverOverNotch
        if (index <= effectiveVolume - 1) {
            return `${styleClassNames} bg-white`
        }

        return styleClassNames
    }

    return (
        <div className="flex space-x-0 items-center">
            {repeat(
                index => (
                    <div
                        data-testid={`volume-notch-${index}`}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoverOverNotch(index + 1)}
                        onMouseLeave={() => setHoverOverNotch(-1)}
                        onClick={() => setVolume(index + 1)}
                    >
                        <div className={generateSliderNotchClasses(index)} />
                    </div>
                ),
                10
            )}
        </div>
    )
}