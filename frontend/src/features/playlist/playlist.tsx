import { faFolder as faFolderRegular } from "@fortawesome/free-regular-svg-icons"
import { faFolder as faFolderSolid } from "@fortawesome/free-solid-svg-icons"
import { HoverableButton } from "../../components/hoverable-button/hoverable-button"
import { useCallback, useRef, useState } from "react"
import { PlaylistList } from "./components/playlist-list"
import { useClickOutsideElement } from "../../hooks/use-click-outside-element"

export function Playlist() {
    const [playlistIsHidden, setPlaylistIsHidden] = useState(true)
    const playlistRef = useRef<HTMLDivElement>(null)

    const hidePlaylist = useCallback(() => {
        setPlaylistIsHidden(true)
    }, [setPlaylistIsHidden])
    useClickOutsideElement(playlistRef, hidePlaylist, !playlistIsHidden)

    function togglePlaylist() {
        setPlaylistIsHidden(!playlistIsHidden)
    }

    return (
        <div ref={playlistRef} className="relative">
            <HoverableButton
                icon={faFolderRegular}
                iconOnHover={faFolderSolid}
                size="2x"
                onClick={togglePlaylist}
            />
            <div className="absolute bottom-16 -left-6" hidden={playlistIsHidden}>
                <PlaylistList />
            </div>
        </div>
    )
}
