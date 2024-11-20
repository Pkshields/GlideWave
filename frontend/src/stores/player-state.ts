import { create } from "zustand"
import { StreamSource } from "../types/stream-source"
import { GlidewaveState } from "./player-state-types"
import { useShallow } from "zustand/react/shallow"
import { DEFAULT_PLAYLIST } from "../config/constants"

const useGlidewaveStore = create<GlidewaveState>((set) => ({
    isPlaying: false,
    source: DEFAULT_PLAYLIST[0],
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setPlayerSource: (source: StreamSource) => set(() => ({
        source,
        isPlaying: true
    })),
}))

export function usePlayerInfo() {
    return useGlidewaveStore(
        useShallow((state) => ({
            source: state.source,
            isPlaying: state.isPlaying
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