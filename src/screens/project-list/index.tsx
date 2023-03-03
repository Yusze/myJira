import React from "react"
import { useState} from 'react'
import {useDebounce, useDocumentTitle, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () =>{

    const [param,  setParam] = useUrlQueryParam(['name', 'personId']);
    console.log(param);
    const debounceParam = useDebounce(param, 200);
    const {isLoading, error, data:list} = useProject(debounceParam)

    const {data:users} = useUsers();

    useDocumentTitle('项目列表', false);

     return (
     <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} dataSource={list || []} users={users || []}/>
     </Container>)
}

const Container = styled.div`
    padding: 3.2rem;
`