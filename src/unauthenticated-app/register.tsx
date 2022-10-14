import { useAuth } from 'context/auth-context'
import React, { FormEvent } from 'react'
import {Form, Button, Input} from 'antd';
import {LongButton} from './index'

const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreen = () => {
 
    const {register, user} = useAuth();
    const handleSubmit = (values:{username:string, password:string}) =>{
        register(values);
    }
    return (<Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true, message:'请输入用户名'}]}>
            <Input type="text" placeholder={'用户名'} id={'username'}></Input>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message:'请输入密码'}]}>
            <Input type="password" placeholder={'密码'} id={"password"}></Input>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={"primary"}>注册</LongButton>
        </Form.Item>

    </Form>)
}