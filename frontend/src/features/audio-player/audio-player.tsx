import { usePlayerStore } from "../../stores/player-state"
import { urlIsAudioStream, urlIsYouTubeStream } from "../../utils/video/url-categorizer"
import { AudioStreamPlayer } from "./components/audio-stream-player/audio-stream-player"
import { YouTubePlayer } from "./components/youtube-player/youtube-player"

export function AudioPlayer() {
    const [source, isPlaying, volume, setIsBuffering] = usePlayerStore(
        (s) => [s.source, s.isPlaying, s.volume, s.setIsBuffering]
    )

    if (urlIsYouTubeStream(source.streamUrl)) {
        return <YouTubePlayer
            url={source.streamUrl}
            isPlaying={isPlaying}
            volume={volume}
            onBuffering={() => setIsBuffering(true)}
            onBufferingFinished={() => setIsBuffering(false)}
        />
    } else if (urlIsAudioStream(source.streamUrl)) {
        return <AudioStreamPlayer
            url={source.streamUrl}
            isPlaying={isPlaying}
            volume={volume}
            onBuffering={() => setIsBuffering(true)}
            onBufferingFinished={() => setIsBuffering(false)}
        />
    }

    return <></>
}
