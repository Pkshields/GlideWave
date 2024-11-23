import { StreamSource } from "../types/stream-source"

export interface GlidewaveState {
    source: StreamSource
    isPlaying: boolean
    volume: number
    setPlayerSource: (source: StreamSource) => void
    toggleIsPlaying: () => void
    setVolume: (volume: number) => void
}