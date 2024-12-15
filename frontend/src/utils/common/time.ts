export const ONE_HOUR_MS = minutesToMilliseconds(60)

export function minutesToMilliseconds(minutes: number) {
    return minutes * 60 * 1000
}