
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
 
export {getElement, map}