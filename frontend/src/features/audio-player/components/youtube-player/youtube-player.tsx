import { useEffect, useRef } from "react"
import ReactPlayer from "react-player"

export interface YouTubePlayerProps {
    url: string
    isPlaying: boolean
    volume: number
}

export function YouTubePlayer({ url, isPlaying, volume }: YouTubePlayerProps) {
    const playerRef = useRef<ReactPlayer>(null)

    useEffect(() => {
        if (isPlaying) {
            const liveVideoDuration = playerRef.current?.getDuration() ?? 0
            playerRef.current?.seekTo(liveVideoDuration, 'seconds')
        }
    }, [isPlaying])

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            playing={isPlaying}
            volume={volume}
            controls
            data-testid="react-player"
        />
    )
}