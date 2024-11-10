import { vi } from "vitest"

// Workaround as jsdom doesn't support the audio element: https://github.com/jsdom/jsdom/issues/2155
export function mockAudioElementFunctions() {
    const playFunction = vi.fn().mockResolvedValue(Promise.resolve())
    const pauseFunction = vi.fn()
    const loadFunction = vi.fn()

    window.HTMLMediaElement.prototype.play = playFunction
    window.HTMLMediaElement.prototype.pause = pauseFunction
    window.HTMLMediaElement.prototype.load = loadFunction

    return {
        play: playFunction,
        pause: pauseFunction,
        load: loadFunction,
    }
}