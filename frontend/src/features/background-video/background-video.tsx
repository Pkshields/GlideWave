import { useState } from "react"
import fallbackBackground from "../../assets/fallback-background.mp4"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export function BackgroundVideo() {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <div className="fixed w-full h-full bg-gray-900 flex items-center justify-center">
            <video
                className="w-full h-full object-cover"
                autoPlay={true}
                loop={true}
                muted={true}
                data-testid="backgroundVideo"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={fallbackBackground} type="video/mp4" />
            </video>
            {!isPlaying && <FontAwesomeIcon icon={faSpinner} color="white" size="2x" spinPulse data-testid="loadingIcon" />}
        </div>
    )
}