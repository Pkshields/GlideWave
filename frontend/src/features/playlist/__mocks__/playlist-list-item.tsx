import { PlaylistListItemProps } from "../playlist-list-item"

export function PlaylistListItem({ source, onClick }: PlaylistListItemProps) {
    return (
        <li>
            <p>
                PlaylistListItem
                source: {JSON.stringify(source)}
            </p>
            <button onClick={() => onClick(source)}>PlaylistListItem::onClick</button>
        </li>
    )
}