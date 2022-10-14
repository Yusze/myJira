// 在真实环境中 如果使用firebase等第三方auth服务 本文件不需要开发者开发
// 此文件中定义了一些函数用于操作jwt的token 模拟第三方服务的auth

import {User} from "screens/project-list/search-panel"
const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

export const getToekn  = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({user}:{user:User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user;
}

export const login = (data: {username:string, password:string}) => {
    return fetch(`${apiUrl}/login`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    }).then(async (response:Response) =>{
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(data);
        }
    })
}

export const register = (data: {username:string, password:string}) => {
    return fetch(`${apiUrl}/register`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    }).then(async (response:Response) =>{
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(data);
        }
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey);