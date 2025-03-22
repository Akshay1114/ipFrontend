import React from 'react'
import Wrapper from '../common/Wrapper'
import Tab from '../common/Tab'

function HealthInsights() {
  return (
    <div className={`AdminSchedule`}>
    <Wrapper>
      <div className="schedule-header">
        <h2>Health Insights</h2>
        {/* <button type="submit" className="search-Schedule"><i class="fa fa-plus"></i><input type="text" placeholder="Add Crew Member" className="search-bar"/></button> */}
      </div>
      

        {/* <Tab items={items} onChange={(key) => setActiveTab(items.find(i => i.key === key).label)} /> */}
    </Wrapper>
</div>
  )
}

export default HealthInsights