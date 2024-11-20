import type { StateCreator } from 'zustand'
import { beforeEach, vi } from 'vitest'

// NOTE: This is not a real mock. This re-exports all Zustand's function, then replaces
// `create` with an intercepted version that tracks all created stores before resetting
// them when each test in the suite runs.

export * from 'zustand'

const resetFunctions: (() => void)[] = []

const { create: actualCreate } = await vi.importActual<typeof import('zustand')>('zustand')

export const create = <T>(createState: StateCreator<T>) => {
    const store = actualCreate(createState)
    const initialState = store.getState()
    resetFunctions.push(() => {
        store.setState(initialState)
    })
    return store
}

beforeEach(() => {
    resetFunctions.forEach((resetFunction) => {
        resetFunction()
    })
})
