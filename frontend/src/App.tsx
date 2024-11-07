import { useState } from "react"
import { PlayerControls } from "./features/player-controls/player-controls"
import { YouTubePlayer } from "./features/youtube-player/youtube-player"

function App() {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <>
            <div className="bg-sky-700 h-screen w-screen">
                <PlayerControls onPlayClicked={() => setIsPlaying(!isPlaying)} />
                <YouTubePlayer url="https://www.youtube.com/watch?v=7NOSDKb0HlU" isPlaying={isPlaying} />
            </div>
        </>
    )
}

export default App
