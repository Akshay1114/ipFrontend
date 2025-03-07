import React from 'react'
import SleepDataUi from '../pages/SleepDataUi'
import CommonTable from './CommonTable'

function AdminDashboard() {
    console.log('AdminDashboard')
  return (
    <div>
      <div>
        <div className='adminDashboard'>
          
          <div className='AD-section1'>
              <div >
              <div id='Manager-dashboard-column1'>
                  <div className='d-flex jc-between card MD-C1-card'>
                    <h3>52</h3>
                    <p>Total Employee</p>
                  </div>

                  <div className='d-flex jc-between card MD-C1-card'>
                    <div className='general-inline-text'>
                      <h3>22</h3>
                      <button className='MD-C1-btn'>View &gt;</button>
                    </div>
                    <p>On Duty</p>
                  </div>

                  <div className='d-flex jc-between card MD-C1-card'>
                    <div className='general-inline-text'>
                      <h3>2</h3>
                      <button className='MD-C1-btn'>View &gt;</button>
                    </div>
                    <p>High Fatigue Risk</p>
                  </div>

                  <div className='d-flex jc-between card MD-C1-card'>
                    <div className='general-inline-text'>
                      <h3>4</h3>
                      <button className='MD-C1-btn'>View &gt;</button>
                    </div>
                    <p>Pending Requets</p>
                  </div>

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
              </div>
              <div className='MD-C3 card'>
                <h3>Urgent Look-Over</h3>
                <div className='MD-C3-UrgentLookOver'>

                </div>
              </div>
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
