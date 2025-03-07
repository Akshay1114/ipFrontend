import React from 'react'
import Wrapper from './common/Wrapper'
import Tab from './common/Tab'
import Tab1 from './Admin/Tab1';

function CrewInsights() {

    const items = [
      {
        key: '1',
        label: 'Monitoring',
        children: <Tab1/>,
      },
      {
        key: '2',
        label: 'Crew Details',
        children: 'Crew Details',
      },
      {
        key: '3',
        label: 'Reports',
        children: 'Reports',
      },
    ];

  return (
    <div>
      <Wrapper classname="Crew-Insights">
        <Tab items={items}/>
      </Wrapper>
    </div>
  )
}

export default CrewInsights
