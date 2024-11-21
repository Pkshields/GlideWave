import { usePlayerSourceStore } from "../../../stores/player-state"
import { StreamSource } from "../../../types/stream-source"
import { DEFAULT_PLAYLIST } from "../../../config/constants"
import { PlaylistListItem } from "./playlist-list-item"

export function PlaylistList() {
    const { source, setPlayerSource } = usePlayerSourceStore()

    function streamSelected(source: StreamSource) {
        setPlayerSource(source)
    }

    return (
        <div className="w-72 h-96 p-2 bg-gray-800 rounded-xl overflow-y-scroll">
            <ul>
                {DEFAULT_PLAYLIST.map((element, index) => (
                    <PlaylistListItem
                        key={`playlist-list-item-${index}`}
                        source={element}
                        isPlaying={element === source}
                        onClick={streamSelected}
                    />
                ))}
            </ul>
        </div>
    )
}
