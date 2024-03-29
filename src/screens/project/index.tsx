import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { EpicScreen } from 'screens/epic';
import { KanbanScreen } from 'screens/kanban';

export const ProjectScreen = () => {
  return (
    <>
      <h1>Project Screen</h1>
      <Link to={'kanban'} >看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path='kanban'element={<KanbanScreen />}/>
        <Route path='epic' element={<EpicScreen />} />
        <Route index element={<Navigate to={'kanban'}/>}/>
      </Routes>
    </>
  )
}