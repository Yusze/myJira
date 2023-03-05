import React from "react" 
import {Form, Input, Select} from 'antd'
import { Project } from './list';
import { UserSelect } from 'components/user-select';
export interface User {
    id:number;
    name:string;
    email: string;
    title: string;
    organization: string;
    token:string;
}
interface SearchPanelProps {
    users: User[],
    param:Partial<Pick<Project, 'personId' | 'name'>>,
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({param, setParam, users}:SearchPanelProps) => {
    if (users.length !== 0) {
        console.log(users[1].id, typeof users[1].id);
    }
    return (
    <Form layout={"inline"} className={'myForm'} style={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input type="text" placeholder='项目名' value={param.name} onChange={event =>setParam({
                ...param,
                name:event.target.value
            })} />
        </Form.Item>
        <Form.Item>
            <UserSelect 
                defaultOptionName='负责人'
                value={param.personId} 
                onChange={ (value:number | undefined) => setParam({
                    ...param,
                    personId:value
                })} />
        </Form.Item>
    </Form>)
}