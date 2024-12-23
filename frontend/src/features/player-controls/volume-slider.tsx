import { useState } from "react"
import { usePlayerStore } from "../../stores/player-state"
import { repeat } from "../../utils/common/loops"

export function VolumeSlider() {
    const [volume, setVolume] = usePlayerStore(((s) => [s.volume, s.setVolume]))
    const [hoverOverNotch, setHoverOverNotch] = useState(-1)

    function indexFromVolume() {
        return (volume * 10) - 1
    }

    function setVolumeFromIndex(index: number) {
        setVolume((index + 1) / 10)
    }

    function generateSliderNotchStyleClasses(index: number): string {
        const styleClassNames = "py-3 px-1 mx-0.5 border-2 rounded border-white scale-75"

        const effectiveVolume = hoverOverNotch == -1 ? indexFromVolume() : hoverOverNotch
        if (index <= effectiveVolume) {
            return `${styleClassNames} bg-white`
        }

        return styleClassNames
    }

    return (
        <div className="flex space-x-0 items-center">
            {
                repeat(index => (
                    <div
                        key={index}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoverOverNotch(index)}
                        onMouseLeave={() => setHoverOverNotch(-1)}
                        onClick={() => setVolumeFromIndex(index)}
                        data-testid={`volume-notch-${index}`}
                    >
                        <div className={generateSliderNotchStyleClasses(index)} />
                    </div>
                ), 10)
            }
        </div>
    )
}