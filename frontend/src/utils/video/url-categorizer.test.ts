import { describe, expect, it } from "vitest";
import { urlIsAudioStream, urlIsYouTubeStream } from "./url-categorizer";

describe("url categorizer", () => {
    describe("url is youtube stream", () => {
        it("should correctly detect a youtube stream", () => {
            const result = urlIsYouTubeStream("https://www.youtube.com/watch?v=PzIgRklZOxw")

            expect(result).toBeTruthy()
        })

        it("should return false if not a youtube stream", () => {
            const result = urlIsYouTubeStream("https://paulshields.dev/not-a-stream")

            expect(result).toBeFalsy()
        })

        it("should return false if url is invalid", () => {
            const result = urlIsYouTubeStream("")

            expect(result).toBeFalsy()
        })
    })

    describe("url is audio stream", () => {
        it("should correctly detect an audio stream", () => {
            const result = urlIsAudioStream("https://paulshields.dev/not-a-stream")

            expect(result).toBeTruthy()
        })

        it("should return false if is a youtube stream", () => {
            const result = urlIsAudioStream("https://www.youtube.com/watch?v=PzIgRklZOxw")

            expect(result).toBeFalsy()
        })

        it("should return false if url is invalid", () => {
            const result = urlIsAudioStream("")

            expect(result).toBeFalsy()
        })
    })
})