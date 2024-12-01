import { PlayerControls } from "./features/player-controls/player-controls"
import { AudioPlayer } from "./features/audio-player/audio-player"
import { BackgroundVideo } from "./features/background-video/background-video"

function App() {
    return (
        <div className="bg-sky-700 h-screen w-screen">
            <BackgroundVideo />
            <PlayerControls />
            <AudioPlayer />
        </div>
    )
}

export default App
