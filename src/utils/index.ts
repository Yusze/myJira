import { useEffect, useRef, useState } from "react";

export const isFalsy = (value:unknown) => value === 0? false: !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''; 

// 在一个函数中改变传入的对象是不好的!
// 因为TS的object类型表示除了基础类型之外的其他非原始类型
// 因此 除了真正的对象 还可能是函数或者正则表达式对象 但对后者进行结构是没有意义的 所以TS此处返回空对象
// 此处的类型就不能用object 而应该指明确切需要键值对形式的对象{[key:string]: unknown}
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

export const useDocumentTitle = (title:string, keepOnUnmout:boolean = true) => {
    let oldTitle = useRef(document.title).current
    useEffect(()=>{
        document.title = title
    }, [title])

    useEffect(()=>{
        return () => {
            if (!keepOnUnmout) {
                document.title = oldTitle;
            }
        }
    },[keepOnUnmout, oldTitle])
}

export const resetRoute = () => {
    window.location.href = window.location.origin;
}

export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(()=>{
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    })
    return mountedRef;
}