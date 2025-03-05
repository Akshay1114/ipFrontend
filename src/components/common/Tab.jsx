import React from 'react'
import { Tabs } from 'antd';


function Tab(props) {
    const onChange = (key) => {
        console.log(key);
      };
  
  return (
    <div>
      <Tabs defaultActiveKey="1" items={props.items} onChange={onChange} />
    </div>
  )
}

export default Tab
