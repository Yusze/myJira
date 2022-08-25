import React from "react"
import {useEffect, useState} from 'react'
import { cleanObject } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{

    const [param, setParam] = useState({
        name:'', // 项目名称
        personId:'' // 项目负责人id
    });
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    // 当param变化时获取要展示的列表
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (response.ok) {
                setList(await response.json());
            }
        })
    }, [param])

    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        })
    }, [])

     return (
     <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}/>
     </div>)
}