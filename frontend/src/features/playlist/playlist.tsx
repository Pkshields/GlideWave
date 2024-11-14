import { faFolder as faFolderRegular } from "@fortawesome/free-regular-svg-icons"
import { faFolder as faFolderSolid } from "@fortawesome/free-solid-svg-icons"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { PlaylistListItem } from "./playlist-list-item"
import { useState } from "react"
import { StreamSource } from "../../types/stream-source"
import untypedDefaultPlaylist from "../../config/default-playlist.json"

export function Playlist() {
    const [ playlistIsHidden, setPlaylistIsHidden ] = useState(true)

    const defaultPlaylist: StreamSource[] = untypedDefaultPlaylist

    return (
        <div className="relative">
            <HoverableButton
                icon={faFolderRegular}
                iconOnHover={faFolderSolid}
                size="2x"
                onClick={() => {setPlaylistIsHidden(!playlistIsHidden)}}
            />
            <div
                className="absolute bottom-16 -left-6 w-72 h-96 p-2 bg-gray-800 rounded-xl overflow-y-scroll"
                hidden={playlistIsHidden}
                data-testid="playlist-popup"
            >
                <ul>
                    {defaultPlaylist.map((element, index) => (
                        <PlaylistListItem key={`playlist-list-item-${index}`} source={element} />
                    ))}
                </ul>
            </div>
        </div>
    )
}