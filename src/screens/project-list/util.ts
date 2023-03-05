import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url'

// 不会包含模板代码 所以ts
// 项目列表的搜索参数
export const useProjectsSearchParams = () => {
  const [param,  setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    useMemo(()=>({...param, personId:Number(param.personId) || undefined}), [param]),
    setParam
  ] as const;
}