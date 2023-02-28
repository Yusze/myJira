import { useAuth } from 'context/auth-context'
import React, { FormEvent } from 'react'
import {Form, Input, Button} from 'antd'
import {LongButton} from './index'
import { useAsync } from 'utils/use-async'

const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = ({onError}:{onError:(error: Error)=>void}) => {

    const {login, user} = useAuth();
    const {run, isLoading} = useAsync(undefined, {throwOnError: true});

    const handleSubmit = async (values:{username:string, password:string}) =>{
        try{
            await run(login(values));
        }catch(e:any) {
            onError(e);
        } 
    }

    return (<Form onFinish={handleSubmit}>

        <Form.Item name={'username'} rules={[{required : true, message:'请输入用户名'}]}>
            <Input type="text" placeholder={'用户名'} id={'username'}></Input>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required : true, message:'请输入密码'}]}>
            <Input type="password" placeholder={'密码'} id={"password"}></Input>
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登陆</LongButton>
        </Form.Item>  
    </Form>)
}