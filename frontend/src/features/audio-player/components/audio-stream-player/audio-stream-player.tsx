import { useCallback, useEffect, useRef } from "react"
import { useFetchStreams } from "../../api/use-fetch-streams"

export interface AudioStreamPlayerProps {
    url: string
    isPlaying: boolean
    volume: number
    onBuffering: () => void
    onBufferingFinished: () => void
}

export function AudioStreamPlayer(
    { url: initialUrl, isPlaying, volume, onBuffering, onBufferingFinished }: AudioStreamPlayerProps
) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const { isPending, data: streamUrls } = useFetchStreams(initialUrl)

    const play = useCallback(async () => {
        if (!audioRef.current) {
            return
        }

        audioRef.current.volume = volume

        if (audioRef.current.src != streamUrls?.[0]) {
            audioRef.current.src = streamUrls?.[0] ?? ""
        }

        await audioRef.current.play()
    }, [streamUrls, volume])

    function stop() {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.src = ''
            audioRef.current.load()
        }
    }

    useEffect(() => {
        if (!isPlaying || isPending) {
            stop()
        } else {
            play().catch(console.error)
        }
    }, [isPlaying, play, isPending])

    return (
        <audio
            ref={audioRef}
            className="absolute -z-50"
            onWaiting={onBuffering}
            onCanPlayThrough={onBufferingFinished}
            data-testid="audio-player"
        ></audio>
    )
}
