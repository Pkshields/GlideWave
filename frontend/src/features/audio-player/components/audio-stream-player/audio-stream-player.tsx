import { useCallback, useEffect, useRef } from "react"

export interface AudioStreamPlayerProps {
    url: string
    isPlaying: boolean
    volume: number
}

export function AudioStreamPlayer({ url, isPlaying, volume }: AudioStreamPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)

    const play = useCallback(async () => {
        if (!audioRef.current) {
            return
        }

        audioRef.current.volume = volume

        if (audioRef.current.src != url) {
            audioRef.current.src = url
        }

        await audioRef.current.play()
    }, [audioRef, url, volume])

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
