import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import React from "react"
import { Link } from 'react-router-dom';
import {User} from 'screens/project-list/search-panel';

export interface Project {
    id: string;
    name: string;
    personId:string;
    pin: boolean;
    organization: string;
    created:number;
}
interface ListProps extends TableProps<Project>{
    users:User[];
}
export const List = ({users, ...props}: ListProps) =>{
    // localeCompare可以比较中文字符
    return <Table 
        pagination={false}

        rowKey='id' 
        columns={[
        {
            title:'名称',
            sorter: (a, b)=>a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={`${project.id}`}>{project.name}</Link>
            },
        },
        {
            title:'部门',
            dataIndex:'organization', 
        },
        {
            title:'负责人', 
            render(value, project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>}
        },
        {
            title:'创建时间',
            render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无'}
                </span>
            }
        }
    ]} {...props}></Table>
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