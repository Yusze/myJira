import React from 'react'
import { useHttp } from './http';
import {useEffect} from 'react'
import {useAsync} from './use-async'
import {Project} from '../screens/project-list/list'
import { cleanObject } from "utils"
export const useProject = (param ?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();

  // 当param变化时获取要展示的列表
  useEffect(() => {
      run(client('projects', {data: cleanObject(param || {})}))
  }, [param])
  return result;
}