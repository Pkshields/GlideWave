import { usePlayerIsPlayingStore, usePlayerUrlStore } from "../../stores/player-state"
import { AudioStreamPlayer } from "./components/audio-stream-player/audio-stream-player"
import { YouTubePlayer } from "./components/youtube-player/youtube-player"

const audioStreamRegex = new RegExp(/((.ogg)|(.mp3)|(.m3u))((\?|&).*=.*)*$/)

export function AudioPlayer() {
    const { url } = usePlayerUrlStore()
    const { isPlaying } = usePlayerIsPlayingStore()

    if (url.includes("youtube.com/watch?v=")) {
        return <YouTubePlayer url={url} isPlaying={isPlaying} />
    } else if (audioStreamRegex.test(url)) {
        return <AudioStreamPlayer url={url} isPlaying={isPlaying} />
    }

    return <></>
}
