import { create } from "zustand"
import { StreamSource } from "../types/stream-source"
import { GlidewaveState } from "./player-state-types"
import { useShallow } from "zustand/react/shallow"
import { DEFAULT_PLAYLIST } from "../config/constants"
import { clamp } from "../utils/maths"

const useStore = create<GlidewaveState>((set) => ({
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

export function usePlayerStore<T>(selector: (state: GlidewaveState) => T) {
    return useStore(useShallow(selector))
}
