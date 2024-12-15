import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ONE_HOUR_MS } from "../../../utils/common/time";

function parsePlaylist(input: string, initialUrl: string) {
    return input
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => !line.startsWith("#") && line !== "")
        .map((line) => new URL(line, initialUrl).href)
}

async function isAPlaylistUrl(initialUrl: string) {
    try {
        const { headers } = await axios.head(initialUrl)
        return headers["content-type"] == "application/x-mpegurl"
            || headers["content-type"] == "audio/x-mpegurl"
    } catch {
        console.warn("Failed to fetch content type from provided stream URL. Assuming it is an audio stream")
        return false
    }
}

async function fetchStreams(initialUrl: string) {
    console.debug("Requesting stream urls")
    if (!await isAPlaylistUrl(initialUrl)) {
        console.debug("Not a playlist, returning initial URL")
        return [initialUrl]
    }

    const { data } = await axios.get<string>(initialUrl)
    const urls = parsePlaylist(data, initialUrl)
    console.debug(`${urls.length} fetched from playlist`)

    if (urls.length <= 0) {
        console.error(`No URLs found in playlist fetched from ${initialUrl}`)
    }

    return urls
}

export function useFetchStreams(initialUrl: string) {
    return useQuery({
        queryKey: [initialUrl],
        queryFn: () => fetchStreams(initialUrl),
        staleTime: ONE_HOUR_MS
    })
}