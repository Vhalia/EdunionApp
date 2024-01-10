
function getElement<T>(elements: T | T[], index? : number) : T {
    if (index != undefined && Array.isArray(elements))
        return elements[index]

    return elements as T;
}

function map<U>(
    elements : U | U[],
    callback : (value: U, index: number, array: U[]) => any): any[] {
        if (Array.isArray(elements))
            return elements.map(callback)

        let element : U = elements as U;
        return [callback(element, 0, [element])]
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max))
}

function round(value: number, precision: number) {
    const multiplier = Math.pow(10, precision)
    return Math.round(value * multiplier) / multiplier
}
 
export {getElement, map, clamp, round}