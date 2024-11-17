import { create } from "zustand"
import { StreamSource } from "../types/stream-source"
import { GlidewaveState } from "./player-state-types"
import { useShallow } from "zustand/react/shallow"

const useGlidewaveStore = create<GlidewaveState>((set) => ({
    source: {
        name: "SELECT A SOURCE",
        streamer: "PLEASE",
        sourceHomepage: "https://paulshields.dev",
        streamUrl: "rtsp://localhost:8080"
    },
    isPlaying: false,
    setPlayerSource: (source: StreamSource) => set(() => ({ source })),
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying }))
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

export function useSetPlayerSource() {
    return useGlidewaveStore((state) => state.setPlayerSource)
}