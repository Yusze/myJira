import { useEffect, useState } from "react";

export const isFalsy = (value:unknown) => value === 0? false: !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''; 

// 在一个函数中改变传入的对象是不好的!
// 因为返回object的除了真正的对象 还有函数或者正则表达式对象 但对后者进行结构是没有意义的 所以此处是空对象
// 此处的类型就不能用object 而应该指明
export const cleanObject = (object:{[key: string]: unknown}) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key]; 
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    
    useEffect(()=>{
        // 依赖项里加上callback会造成无限循环 与useCallback和useMemo有关
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export function useDebounce<V>(value: V, delay ?: number) {

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