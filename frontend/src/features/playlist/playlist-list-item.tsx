import { faMusic, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StreamSource } from "../../types/stream-source"

export interface PlaylistListItemProps {
    source: StreamSource
    onClick: (source: StreamSource) => void
}

export function PlaylistListItem({ source, onClick }: PlaylistListItemProps) {
    return (
        <li
            className="group m-1 p-3 flex items-center cursor-pointer rounded-lg hover:bg-gray-700"
            onClick={() => onClick(source)}
        >
            <FontAwesomeIcon icon={faMusic} size="lg" fixedWidth className="group-hover:hidden" />
            <FontAwesomeIcon icon={faPlay} size="lg" fixedWidth className="hidden group-hover:block" />
            <div className="ml-5">
                <p className="pb-2">{source.name}</p>
                <p className="text-sm text-gray-400">{source.streamer}</p>
            </div>
        </li>
    )
}