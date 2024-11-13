import { faFolder as faFolderRegular } from "@fortawesome/free-regular-svg-icons"
import { faFolder as faFolderSolid } from "@fortawesome/free-solid-svg-icons"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { repeat } from "../../utils/loops"
import { PlaylistItem } from "./playlist-item"
import { useState } from "react"

export function Playlist() {
    const [ playlistIsHidden, setPlaylistIsHidden ] = useState(true)

    return (
        <div className="relative">
            <HoverableButton
                icon={faFolderRegular}
                iconOnHover={faFolderSolid}
                size="2x"
                onClick={() => { setPlaylistIsHidden(!playlistIsHidden) }}
            />
            <div
                className="absolute bottom-16 -left-6 w-72 h-96 p-2 bg-gray-800 rounded-xl overflow-y-scroll"
                hidden={playlistIsHidden}
                data-testid="playlist-popup"
            >
                <ul>
                    {repeat(() => (<PlaylistItem />), 5)}
                </ul>
            </div>
        </div>
    )
}