import { useCallback, useState } from 'react';
import { useMountedRef } from 'utils';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat:'idle' | 'loading' | 'error' | 'success';
}

const defaultInittialState: State<null> = {
  stat:'idle',
  data:null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}
 
export const useAsync = <D>(initialState?: State<D>, initialConfig?:typeof defaultConfig) => { 
  const config = {...defaultConfig, ...initialConfig};

  const [state, setState] = useState<State<D>>({
    ...defaultInittialState,
    ...initialState
  });
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => ()=>{})
  const setData = useCallback((data: D) => setState({
    data,
    stat: 'success',
    error:null
  }), []);

  const setError = useCallback((error:Error) => setState({
    error,
    stat: 'error',
    data:null
  }), []);

  const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
    if (!promise || !promise.then) {
      throw new Error("请输入promise类型数据");
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    })
    setState(prevState => ({...prevState, stat:'loading'}))

    return promise.then(data => {
      if (mountedRef.current)
        setData(data);
      return data;
    }).catch(error => {
      // 如果不再继续抛出异常 该异常到这里就会终止了
      setError(error)
      if (config.throwOnError) {
        return Promise.reject(error); }
      return error;
    })
  }, [config.throwOnError, mountedRef, setData, setError]) 

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run, 
    retry,
    setData,
    setError,
    ...state
  }
}