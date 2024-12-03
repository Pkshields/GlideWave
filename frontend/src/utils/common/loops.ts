export function repeat<ReturnType>(callback: (index: number) => ReturnType, times: number): ReturnType[] {
    return Array.from({ length: times }).map((_, index) => callback(index))
}