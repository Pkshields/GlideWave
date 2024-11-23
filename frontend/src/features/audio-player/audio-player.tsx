import { usePlayerInfo } from "../../stores/player-state"
import { AudioStreamPlayer } from "./components/audio-stream-player/audio-stream-player"
import { YouTubePlayer } from "./components/youtube-player/youtube-player"

export function AudioPlayer() {
    const { source, isPlaying, volume } = usePlayerInfo()

    if (source.streamUrl.includes("youtube.com/watch?v=")) {
        return <YouTubePlayer url={source.streamUrl} isPlaying={isPlaying} volume={volume} />
    } else if (source.streamUrl) {
        return <AudioStreamPlayer url={source.streamUrl} isPlaying={isPlaying} volume={volume} />
    }

    return <></>
}
