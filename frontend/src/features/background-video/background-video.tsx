import fallbackBackground from "../../assets/fallback-background.mp4"

export function BackgroundVideo() {
    return (
        <>
            <video
                className="fixed w-full h-full object-cover"
                autoPlay={true}
                loop={true}
                muted={true}
                data-testid="backgroundVideo"
            >
                <source src={fallbackBackground} type="video/mp4" />
            </video>
            <div className="fixed w-full h-full bg-black/10"/>
        </>
    )
}