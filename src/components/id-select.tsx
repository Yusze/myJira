import { Select } from 'antd';
import React from 'react'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined,
  onChange:(value?:number) => void,
  defaultOptionName?:string,
  options?:{name:string, id:number}[]
}

/**
 * value可以传入多种类型的值 onChange的回调只会在value为number | undefined时执行回调
 * 当isNaN(Number(value))为true 表示选择了默认类型 onChange的回调 传入undefined进行执行
 * Number(undefined)=NaN Number(null)=0
 */
export const IdSelect = (props:IdSelectProps) => {
  const {value, onChange, defaultOptionName, options, ...restProps} = props;
  return <Select value = {options?.length ? toNumber(value) : 0 }
    onChange={value => onChange(toNumber(value) || undefined)}
    {...restProps}
  >
    {
      defaultOptionName ? < Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map((option)=>{
        return <Select.Option key={option.id} value ={option.id}>{option.name}</Select.Option>
      })
    }
  </Select>
}

const toNumber = (value:unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
}