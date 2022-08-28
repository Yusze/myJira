import { useEffect, useState } from "react";

export const isFalsy = (value:unknown) => value === 0? false: !value

// 在一个函数中改变传入的对象是不好的!
export const cleanObject = (object:object) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key];
        // 排除value为0的情况
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key];
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(()=>{
        callback();
    }, []);
}

export const useDebounce = (value:unknown, delay ?: number) : any => {

    const [debounceValue, setDebounceValue] = useState(value);
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])

    return debounceValue;
}