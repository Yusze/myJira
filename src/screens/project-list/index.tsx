import React from "react"
import {useEffect, useState} from 'react'
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{

    const [param, setParam] = useState({
        name:'', // 项目名称
        personId:'' // 项目负责人id
    });
    const debounceParam = useDebounce(param, 200);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const client = useHttp();

    // 当param变化时获取要展示的列表
    useEffect(() => {

        client('projects', {data: cleanObject(debounceParam)}).then(setList);

        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
        //     if (response.ok) {
        //         setList(await response.json());
        //     }
        // })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParam])

    useMount(()=>{
        client('users').then(setUsers);
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json());
        //     }
        // })
    })
     return (
     <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}/>
     </Container>)
}

const Container = styled.div`
    padding: 3.2rem;
`