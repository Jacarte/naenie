
export type ReturningType={
    base: string,
    ntype:string,
    priority: number
}

export function sortTypes(types:ReturningType[]){
    return types.sort((a, b) => -a.priority + b.priority)
}

export function isInt(n) {
    return n % 1 === 0;
}

export function getType(value):ReturningType{
    let type: any = typeof(value);

    const result = {
        base: typeof(value),
        priority: 0,
        ntype: type
    }

    if(type === 'number'){

        result.priority = 0;

        if(!isInt(value)){
            type = 'float';
            result.priority = 2;
        }
        
        //https://github.com/dcodeIO/webassembly/issues/26 
        if(value > 2**32 - 1 && type !== 'number'){
            type = "l" + type;
            result.priority++;
        }

    }

    if(type === 'boolean'){
        type = 'number'
    }

    result.ntype = type;

    return result;
}

export default function deepCopy(obj: any, exclude?: (prop: string) => boolean) {
    
    let cache = []; // Preventing cycles

    function deepCopyAux(obj: any, exclude?: (prop: string) => boolean){
    
        if(cache.indexOf(obj) !== -1)
            return obj;
        
        cache.push(obj);

        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                copy[i] = deepCopyAux(obj[i], exclude);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (const attr in obj) {
                if (exclude && exclude(attr))
                    continue;
                if (obj.hasOwnProperty(attr)) copy[attr] = deepCopyAux(obj[attr], exclude);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    const result = deepCopyAux(obj, exclude);

    cache = null;

    return result;
}