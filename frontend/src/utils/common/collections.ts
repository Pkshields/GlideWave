export function partition<T>(input: T[], comparator: (input: T) => boolean) {
    return input.reduce(
        ([trueList, falseList], item) => {
            if (comparator(item)) {
                trueList.push(item)
            } else {
                falseList.push(item)
            }
            return [trueList, falseList]
        },
        [[] as T[], [] as T[]]
    )
}