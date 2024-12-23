import { faCirclePlay as faCirclePlayRegular, faCircleStop as faCircleStopRegular } from "@fortawesome/free-regular-svg-icons"
import { faCirclePlay as faCirclePlaySolid, faCircleStop as faCircleStopSolid } from "@fortawesome/free-solid-svg-icons"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { VolumeSlider } from "./volume-slider"
import { usePlayerStore } from "../../stores/player-state"
import { Playlist } from "../playlist/playlist"

export function PlayerControls() {
    const [source, isPlaying, isBuffering, toggleIsPlaying] = usePlayerStore(
        (s) => [s.source, s.isPlaying, s.isBuffering, s.toggleIsPlaying]
    )

    return (
        <div className="fixed bottom-0 left-0 w-full
                        px-10 py-8
                        text-gray-100
                        bg-gradient-to-t from-gray-800/50 to-gray-800/0">
            <div className="flex space-x-14 items-center">
                <Playlist />
                <div className="w-52 whitespace-nowrap">
                    <p className="pb-3 text-lg overflow-hidden text-ellipsis">{source.name}</p>
                    <p className="text-gray-300 overflow-hidden text-ellipsis">{source.streamer}</p>
                </div>
                <HoverableButton
                    icon={isPlaying ? faCircleStopRegular : faCirclePlayRegular}
                    iconOnHover={isPlaying ? faCircleStopSolid : faCirclePlaySolid}
                    size="2x"
                    onClick={toggleIsPlaying}
                    fadeAnimation={isBuffering}
                />
                <VolumeSlider />
            </div>
        </div>
    )
}