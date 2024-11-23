import { create } from "zustand"
import { StreamSource } from "../types/stream-source"
import { GlidewaveState } from "./player-state-types"
import { useShallow } from "zustand/react/shallow"
import { DEFAULT_PLAYLIST } from "../config/constants"
import { clamp } from "../utils/maths"

const useGlidewaveStore = create<GlidewaveState>((set) => ({
    isPlaying: false,
    source: DEFAULT_PLAYLIST[0],
    volume: 1,
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setPlayerSource: (source: StreamSource) => set(() => ({
        source,
        isPlaying: true
    })),
    setVolume: (volume: number) => set(() => ({ volume: clamp(volume, 0, 1) }))
}))

export function usePlayerInfo() {
    return useGlidewaveStore(
        useShallow((state) => ({
            source: state.source,
            isPlaying: state.isPlaying,
            volume: state.volume
        }))
    )
}

export function usePlayerInfoStore() {
    return useGlidewaveStore()
}

export function usePlayerSourceStore() {
    return useGlidewaveStore(
        useShallow((state) => ({
            source: state.source,
            setPlayerSource: state.setPlayerSource,
        }))
    )
}

export function usePlayerVolumeStore() {
    return useGlidewaveStore(
        useShallow((state) => ({
            volume: state.volume,
            setVolume: state.setVolume,
        }))
    )
}
