import { create } from "zustand"
import { StreamSource } from "../types/stream-source"
import { useShallow } from "zustand/react/shallow"
import { DEFAULT_PLAYLIST } from "../config/constants"
import { clamp } from "../utils/maths"

export interface GlidewaveState {
    isPlaying: boolean
    isBuffering: boolean
    source: StreamSource
    volume: number
    toggleIsPlaying: () => void
    setIsBuffering: (isBuffering: boolean) => void
    setPlayerSource: (source: StreamSource) => void
    setVolume: (volume: number) => void
}

const useStore = create<GlidewaveState>((set) => ({
    isPlaying: false,
    toggleIsPlaying: () => set((state) => ({
        isPlaying: !state.isPlaying,
        isBuffering: !state.isPlaying ? true : state.isBuffering
    })),

    isBuffering: false,
    setIsBuffering: (isBuffering: boolean) => set(() => ({ isBuffering })),

    source: DEFAULT_PLAYLIST[0],
    setPlayerSource: (source: StreamSource) => set(() => ({
        source,
        isPlaying: true,
        isBuffering: true
    })),

    volume: 1,
    setVolume: (volume: number) => set(() => ({ volume: clamp(volume, 0, 1) }))
}))

export function usePlayerStore<T>(selector: (state: GlidewaveState) => T) {
    return useStore(useShallow(selector))
}
