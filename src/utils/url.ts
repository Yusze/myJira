import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils';

/**
 * 返回页面URL中指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () => keys.reduce((prev, key)=>{
        // 每一次调用都返回一个新的对象
          return {...prev, [key]:searchParams.get(key) || ''}; 
        }, {} as {[k in K]: string}),
     [searchParams]
    ),
    (params:Partial<{[key in K]:unknown}>)=> {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParams(o);
    }
  ] as const;
}