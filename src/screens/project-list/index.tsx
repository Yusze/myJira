import React from "react"
import {useEffect, useState} from 'react'
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{

    const [param, setParam] = useState({
        name:'', // 项目名称
        personId:'' // 项目负责人id
    });
    const debounceParam = useDebounce(param, 200);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    // 当param变化时获取要展示的列表
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json());
            }
        })
    }, [debounceParam])

    useMount(()=>{
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        })
    })

     return (
     <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}/>
     </div>)
}