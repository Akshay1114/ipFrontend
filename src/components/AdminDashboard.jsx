import React from 'react'
import SleepDataUi from '../pages/SleepDataUi'
import CommonTable from './CommonTable'

function AdminDashboard() {
    console.log('AdminDashboard')
  return (
    <div>
      <div>
        <div className='adminDashboard'>
          <div className='d-flex jc-between'>
        {   Array.apply(null, Array(5)).map((k, index)=><div key={index} className='card'>
              <h3>
                52
              </h3>
              <p>
                Total Employees
              </p>
            </div>)}
          </div>
          <div className='card'>
            <h3>
            Today’s Flight Overview
            </h3>
            <CommonTable
            data={[{flightNumber: '05042024', fleet: 'A320neo', departure: '9:20 AM', arrival: '2:15 PM'}]}
            columns={[{title: 'Flight Number', dataIndex: 'flightNumber'}, {title: 'Fleet', dataIndex: 'fleet'}, {title: 'Departure', dataIndex: 'departure'}, {title: 'Arrival', dataIndex: 'arrival'}]}
            />
          </div>
          <div>
            <h4>
            Urgent Look-Over
            </h4>
            
          </div>
        </div>
        <div>

        </div>
      </div>
      <SleepDataUi/>
    </div>
  )
}

export default AdminDashboard
