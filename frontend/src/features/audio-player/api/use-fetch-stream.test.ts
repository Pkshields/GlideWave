import { describe, expect, it } from "vitest";
import { wireUpMsw } from "../../../test/msw";
import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchStreams } from "./use-fetch-streams";
import { reactQueryWrapper } from "../../../test/mocks/react-query";

describe("use fetch stream", () => {
    const url = "https://stream.stream/stream"
    const audioStreamOne = "https://stream.stream/audiostream1.mp3"
    const audioStreamTwo = "https://stream.stream/audiostream2.mp3"
    const audioStreamThree = "https://stream.stream/audiostream3.mp3"
    const audioStreamContentType = "audio/mpeg"
    const playlistContentType = "application/x-mpegurl"

    const server = wireUpMsw()

    function headRequest(contentType: string) {
        return http.head(url, () => {
            return new Response(null, {
                status: 200,
                headers: {
                    "Content-Type": contentType
                },
            })
        })
    }

    it("should return input url if not a playlist", async () => {
        server.use(headRequest(audioStreamContentType))

        const { result } = renderHook(() => useFetchStreams(url), reactQueryWrapper())
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        expect(result.current.data).toStrictEqual([url])
    })

    it("should return all audio streams in a playlist", async () => {
        server.use(
            headRequest(playlistContentType),
            http.get(url, () =>
                HttpResponse.text(`
                    ${audioStreamOne}
                    ${audioStreamTwo}
                    ${audioStreamThree}
                `)
            )
        )

        const { result } = renderHook(() => useFetchStreams(url), reactQueryWrapper())
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        expect(result.current.data?.length).toBe(3)
        expect(result.current.data).toContainEqual(audioStreamOne)
        expect(result.current.data).toContainEqual(audioStreamTwo)
        expect(result.current.data).toContainEqual(audioStreamThree)
    })

    it("should remove comments from the playlist", async () => {
        server.use(
            headRequest(playlistContentType),
            http.get(url, () =>
                HttpResponse.text(`
                    # This comment should be removed
                    ${audioStreamOne}
                `)
            )
        )

        const { result } = renderHook(() => useFetchStreams(url), reactQueryWrapper())
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        expect(result.current.data?.some(line => line.includes("#"))).toBeFalsy()
    })

    it("should remove empty lines from the playlist", async () => {
        server.use(
            headRequest(playlistContentType),
            http.get(url, () =>
                HttpResponse.text(`

                    ${audioStreamOne}

                    ${audioStreamTwo}



                    ${audioStreamThree}
                `)
            )
        )

        const { result } = renderHook(() => useFetchStreams(url), reactQueryWrapper())
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        expect(result.current.data?.some(line => line.length <= 0)).toBeFalsy()
    })

    it("should correctly handle relative url playlist entries", async () => {
        const relativeUrl = "/streamer.ogg"
        const fullUrl = "https://stream.stream/streamer.ogg"
        server.use(
            headRequest(playlistContentType),
            http.get(url, () => HttpResponse.text(`${relativeUrl}`))
        )

        const { result } = renderHook(() => useFetchStreams(url), reactQueryWrapper())
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        expect(result.current.data?.[0]).toBe(fullUrl)
    })
})