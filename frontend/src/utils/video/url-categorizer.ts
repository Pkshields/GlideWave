export function urlIsYouTubeStream(url: string) {
    return url.includes("youtube.com/watch?v=")
}

export function urlIsAudioStream(url: string) {
    return url && !urlIsYouTubeStream(url)
}