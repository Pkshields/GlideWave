import { useEffect, useRef } from "react"
import ReactPlayer from "react-player"

export interface YouTubePlayerProps {
    url: string
    isPlaying: boolean
}

export function YouTubePlayer({ url, isPlaying }: YouTubePlayerProps) {
    const playerRef = useRef<ReactPlayer>(null)

    useEffect(() => {
        if (isPlaying) {
            console.log(playerRef.current)
            const liveVideoDuration = playerRef.current?.getDuration() ?? 0
            playerRef.current?.seekTo(liveVideoDuration, 'seconds')
        }
    }, [isPlaying])

    return (
        <ReactPlayer ref={playerRef} url={url} playing={isPlaying} controls data-testid="react-player" />
    )
}