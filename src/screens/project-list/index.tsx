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
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = () =>{

    useDocumentTitle('项目列表', false);

    const [param, setParam] = useProjectsSearchParams();
    const {isLoading, error, data:list, retry} = useProject(useDebounce(param, 200))
    const {data:users} = useUsers();

     return (
     <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []}/>
     </Container>)
}

const Container = styled.div`
    padding: 3.2rem;
`