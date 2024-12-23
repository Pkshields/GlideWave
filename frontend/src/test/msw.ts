import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll } from "vitest"

export function wireUpMsw() {
    const server = setupServer()

    beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    return server
}