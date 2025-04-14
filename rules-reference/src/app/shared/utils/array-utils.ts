export function takeEveryNthElement<Type>(arr: Type[], n: number, startElement = 0): Type[] {
    if (n == 1) {
        return arr;
    } else if (n < 1) {
        return [];
    }

    let newArr: Type[] = [];
    for(let i = startElement; i < arr.length; i += n) {
        newArr.push(arr[i]);
    }

    return newArr;
}

export function halveArray<Type>(arr: Type[] | undefined): [Type[], Type[]] {
    if (arr == undefined) {
        return [[], []];
    } 
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half, arr.length)];
}