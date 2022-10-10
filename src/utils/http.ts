import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;


interface Config extends RequestInit {
  token?:string,
  data?:object
}
export const http = async (endpoint:string, {data, token, headers, ...customConfig}:Config = {}) => {
  
  const config = {
    method:'GET',
    headers: {
      Authorization : token ? `Bearer ${token}` : '',
      'Content-Type' : data? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({message:'请重新登陆'})
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      /* 
        fetch当服务端返回非200类的状态码时并不会抛出异常
        跟在fetch之后的catch只会在网络断开时会抛出异常
        所以需要手动抛出一个异常
        axios在状态码不为200类时抛出异常
      */
      return Promise.reject(data);
    }
  })
}

export const useHttp = () => {
  const {user} = useAuth();
  
  /* 
    联合类型 用或 | 连接基本类型而组成的 例如string | number
    类型别名type favoriteNumber = string | number 就像使用基本类型创建了一个新的类型
    类型别名在很多情况下可以和interface互换

    TS utility types -> Parameters是其中一种
    用泛型传入一个其他类型 然后utility type对这个类型进行某种操作
    Partial<某个类型> 可以允许不传入任何对应的数据
    Omit<any, any> 第二个参数是允许从第一个参数中删除的某属性(如果有多个属性可以使用|连接) 即不用填入
  */
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token});

}