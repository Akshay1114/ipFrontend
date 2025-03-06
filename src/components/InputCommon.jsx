import React from 'react'
import { Input, Typography } from 'antd';

function InputCommon() {
  return (
    <>
       <Typography.Title level={5}>{props.label}</Typography.Title>
    <Input {...props.fields} />
    </>
  )
}

export default InputCommon
