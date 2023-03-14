import React from 'react'
import { useHttp } from './http';
import {useEffect} from 'react'
import {useAsync} from './use-async'
import {Project} from '../screens/project-list/list'
import { cleanObject } from "utils"

export const useProject = (param ?: Partial<Project>) => {
  const client = useHttp();
  const {run, ...result} = useAsync<Project[]>();

  const fetchProjects = () => client('projects', {data: cleanObject(param || {})});
  // 当param变化时获取要展示的列表
  useEffect(() => {
      run(fetchProjects(), {retry: fetchProjects});
  }, [param])
  return result;
}

export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();

  const mutate = (params:Partial<Project>) => {
    // console.log(params, '***params***')
    return run(client(`projects/${params.id}`, {
      data:params,
      method:'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();

  const mutate = (params:Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data:params,
      method:'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
