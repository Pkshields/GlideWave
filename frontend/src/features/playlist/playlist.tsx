import { faFolder as faFolderRegular } from "@fortawesome/free-regular-svg-icons"
import { faFolder as faFolderSolid } from "@fortawesome/free-solid-svg-icons"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { useState } from "react"
import { StreamSource } from "../../types/stream-source"
import { useSetPlayerSource } from "../../stores/player-state"
import { PlaylistListItem } from "./playlist-list-item"
import { DEFAULT_PLAYLIST } from "../../config/constants"

export function Playlist() {
    const setPlayerSource = useSetPlayerSource()
    const [playlistIsHidden, setPlaylistIsHidden] = useState(true)

    function togglePlaylist() {
        setPlaylistIsHidden(!playlistIsHidden)
    }

    function streamSelected(source: StreamSource) {
        setPlayerSource(source)
    }

    return (
        <div className="relative">
            <HoverableButton
                icon={faFolderRegular}
                iconOnHover={faFolderSolid}
                size="2x"
                onClick={togglePlaylist}
            />
            <div
                className="absolute bottom-16 -left-6 w-72 h-96 p-2 bg-gray-800 rounded-xl overflow-y-scroll"
                hidden={playlistIsHidden}
                data-testid="playlist-popup"
            >
                <ul>
                    {DEFAULT_PLAYLIST.map((element, index) => (
                        <PlaylistListItem
                            key={`playlist-list-item-${index}`}
                            source={element}
                            onClick={streamSelected}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}