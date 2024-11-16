import { usePlayerIsPlayingStore, usePlayerSourceStore } from "../../stores/player-state"
import { AudioStreamPlayer } from "./components/audio-stream-player/audio-stream-player"
import { YouTubePlayer } from "./components/youtube-player/youtube-player"

export function AudioPlayer() {
    const { source } = usePlayerSourceStore()
    const { isPlaying } = usePlayerIsPlayingStore()

    if (source.streamUrl.includes("youtube.com/watch?v=")) {
        return <YouTubePlayer url={source.streamUrl} isPlaying={isPlaying} />
    } else if (source.streamUrl) {
        return <AudioStreamPlayer url={source.streamUrl} isPlaying={isPlaying} />
    }

    return <></>
}
