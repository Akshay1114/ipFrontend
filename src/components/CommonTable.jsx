import React from 'react'
import { Table } from 'antd';

function CommonTable(props) {
  return (
    <Table columns={props.columns} dataSource={props.data} />
  )
}

export default CommonTable
