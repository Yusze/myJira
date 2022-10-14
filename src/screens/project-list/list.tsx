import { render } from '@testing-library/react';
import { Table } from 'antd';
import React from "react"
import {User} from 'screens/project-list/search-panel';

interface Project {
    id: string;
    name: string;
    personId:string;
    pin: boolean;
    organization: string;
}
interface ListProps {
    list:Project[];
    users:User[];
}
export const List = ({list, users}:ListProps) =>{
    // localeCompare可以比较中文字符
    return <Table pagination={false} columns={[{title:'名称',dataIndex:'name',sorter: (a, b)=>a.name.localeCompare(b.name)}, {title:'负责人', render(value, project) {
        return <span>
            {users.find(user => user.id === project.personId)?.name || '未知'}
        </span>
    }}]} dataSource={list}></Table>
    // return (<table>
    //     <thead>
    //         <tr>
    //             <th>名称</th>
    //             <th>负责人</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             list.map(project => <tr key={project.id}>
    //                 <td>{project.name}</td>
    //                 {/* find函数有可能会返回undefined 此时需要使用?. 
    //                     亦即如果前面的表达式结果为undefined 则涵盖.name的整个表达式结果为undefined
    //                     就不会出现undefined.name报错的情况
    //                 */}
    //                 <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
    //             </tr>)
    //         }
    //     </tbody>
    // </table>)
}