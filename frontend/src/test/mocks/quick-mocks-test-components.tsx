interface QuickMocksComponentProps {
    aString: string
    aBoolean: boolean
    aFunction: () => void
}

export function QuickMocksComponent(props: QuickMocksComponentProps) {
    return <div>This will be immediately replaced {JSON.stringify(props)}</div>
}

interface ComponentWithUnsupportedFunctionPropsProps {
    aFunctionWithParameters: (numberParameter: number) => void
}

export function ComponentWithUnsupportedFunctionProps(props: ComponentWithUnsupportedFunctionPropsProps) {
    return <div>This will be immediately replaced {JSON.stringify(props)}</div>
}