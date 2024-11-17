import { StreamSource } from "../types/stream-source"

export interface GlidewaveState {
    source: StreamSource
    isPlaying: boolean
    setPlayerSource: (source: StreamSource) => void
    toggleIsPlaying: () => void
}