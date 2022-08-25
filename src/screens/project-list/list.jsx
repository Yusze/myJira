import React from "react"
export const List = ({list, users}) =>{
    return (<table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    {/* find函数有可能会返回undefined 此时需要使用?. 
                        亦即如果前面的表达式结果为undefined 则涵盖.name的整个表达式结果为undefined
                        就不会出现undefined.name报错的情况
                    */}
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>)
}