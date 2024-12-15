import { QueryClient, QueryClientProvider, UseQueryResult } from "@tanstack/react-query"
import { ReactNode } from "react"

export function reactQueryWrapper() {
    const queryClient = new QueryClient()
    const componentToWrapHookWith = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    return { wrapper: componentToWrapHookWith }
}

export function mockReactQueryResult<T>(data: T, isPending = false) {
    return {
        data: data,
        isPending: isPending
    } as UseQueryResult<T>
}