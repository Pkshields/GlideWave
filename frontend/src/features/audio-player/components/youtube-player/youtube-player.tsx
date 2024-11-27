import { useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import { useDebounce } from "../../../../hooks/use-debounce"

export interface YouTubePlayerProps {
    url: string
    isPlaying: boolean
    volume: number
}

export function YouTubePlayer({ url, isPlaying, volume }: YouTubePlayerProps) {
    const playerRef = useRef<ReactPlayer>(null)
    const debouncedIsPlaying = useDebounce(isPlaying, 150)

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
            playing={debouncedIsPlaying}
            volume={volume}
            controls
            className="absolute -z-50"
            data-testid="react-player"
        />
    )
}