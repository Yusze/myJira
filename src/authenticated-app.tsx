import React from 'react'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import styled from '@emotion/styled'
import { Row } from 'components/lib';
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ProjectScreen } from 'screens/project';
import { resetRoute } from 'utils';


export const AuthenticatedApp = () => {

  return (
  <Container>
    <PageHeader />
    <Main>
      <Router>
        <Routes>
          <Route path='projects' element={<ProjectListScreen/>} />
          <Route path='projects/:projectId/*' element={<ProjectScreen/>} />
          <Route path='/' element={<Navigate to={'projects'}/>}/>
        </Routes>
      </Router>
    </Main>
  </Container>);
};

const PageHeader = () => {
  const {user, logout} = useAuth();
  return (<Header between={true}> 
    <HeaderLeft gap={true}>
      <Button type='link' onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        {/* <img src={softwareLogo}/> */}
      </Button>
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            {/* 使用a标签需要提供href 所以此处使用button组件 并设置type为link */}
            <Button type={'link'} onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      }>
        <Button type={'link'}  onClick={e => e.preventDefault()}>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    </HeaderRight>
  </Header>)
}

const Container = styled.div`
  display:grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding:3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``; 

const HeaderRight = styled.div``;
const Main = styled.main``
