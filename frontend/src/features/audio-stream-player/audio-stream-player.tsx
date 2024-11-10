import { useCallback, useEffect, useRef } from "react"

export interface AudioStreamPlayerProps {
    url: string
    isPlaying: boolean
}

export function AudioStreamPlayer({ url, isPlaying}: AudioStreamPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)

    const play = useCallback(async () => {
        if (audioRef.current) {
            audioRef.current.src = url
            await audioRef.current.play()
        }
    }, [audioRef, url])

    function stop() {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.src = ''
            audioRef.current.load()
        }
    }

    useEffect(() => {
        if (isPlaying) {
            play().catch(console.error)
        } else {
            stop()
        }
    }, [url, isPlaying, play])

    return (
        <audio data-testid="audio-player" ref={audioRef}></audio>
    )
}
