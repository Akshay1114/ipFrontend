import React from 'react'
import Wrapper from './common/Wrapper'
import Tab from './common/Tab'
import Tab1 from './employee/Tab1';
import Tab3 from './employee/Tab3';

function EmployeeSchedule() {


  
    const items = [
        {
          key: '1',
          label: 'Flight',
          children: <Tab1/>,
        },
        {
          key: '2',
          label: 'Duty Limits',
          children: 'Duty Limits',
        },
        {
          key: '3',
          label: 'Requests',
          children: <Tab3/>,
        },
      ];


  return (
    <div>
      <Wrapper classname="emplyeeSchedule">
        <Tab items={items}/>
      </Wrapper>
    </div>
  )
}

export default EmployeeSchedule
