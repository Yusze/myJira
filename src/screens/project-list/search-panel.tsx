

import React from "react" 
import {Form, Input, Select} from 'antd'
export interface User {
    id:string;
    name:string;
    email: string;
    title: string;
    organization: string;
    token:string;
}
interface SearchPanelProps {
    users: User[],
    param: {
        name:string;
        personId: string;
    },
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({param, setParam, users}:SearchPanelProps) => {

    return (
    <Form layout={"inline"} className={'myForm'} style={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input type="text" placeholder='项目名' value={param.name} onChange={event =>setParam({
                ...param,
                name:event.target.value
            })} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={ value => setParam({
                    ...param,
                    personId:value
                })}>
                    <Select.Option value={''}>负责人</Select.Option>
                    {
                        users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                    }
            </Select>
        </Form.Item>
    </Form>)
}