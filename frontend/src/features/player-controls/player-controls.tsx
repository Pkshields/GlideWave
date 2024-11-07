import { faCirclePlay as faCirclePlayRegular, faFolder as faFolderRegular } from "@fortawesome/free-regular-svg-icons"
import { faCirclePlay as faCirclePlaySolid, faFolder as faFolderSolid } from "@fortawesome/free-solid-svg-icons"
import { PlayerControlButton } from "./player-control-button"
import { VolumeSlider } from "./volume-slider"

export interface PlayerControlsProps {
    onPlayClicked: () => void,
}

export function PlayerControls({ onPlayClicked }: PlayerControlsProps) {
    return (
        <div className="fixed bottom-0 left-0 w-full p-8 text-gray-100">
            <div className="flex space-x-14 items-center">
                <PlayerControlButton
                    icon={faFolderRegular}
                    iconOnHover={faFolderSolid}
                    size="2x"
                    onClick={() => { console.log("Playlist button clicked")}}
                />
                <div>
                    <p className="text-lg pb-3">Stream Name</p>
                    <p className="text-gray-300">Stream Description</p>
                </div>
                <PlayerControlButton
                    icon={faCirclePlayRegular}
                    iconOnHover={faCirclePlaySolid}
                    size="2x"
                    onClick={onPlayClicked}
                />
                <VolumeSlider />
            </div>
        </div>
    )
}