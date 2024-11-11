import { PlayerControls } from "./features/player-controls/player-controls"
import { AudioPlayer } from "./features/audio-player/audio-player"

function App() {
    return (
        <div className="bg-sky-700 h-screen w-screen">
            <PlayerControls />
            <AudioPlayer />
        </div>
    )
}

export default App
