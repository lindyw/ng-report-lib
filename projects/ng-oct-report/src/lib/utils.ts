export function groupBy(arr: Array<any>, key: string) {
    return arr.reduce((acc, obj) => {
        const _key = obj[key];
        if (!acc.hasOwnProperty(_key)) {
            acc[_key] = [];
        }
        console.log('_key', _key);
        console.log('acc', acc);
        
        acc[_key].push(obj);
        return acc;
    }, {});
}