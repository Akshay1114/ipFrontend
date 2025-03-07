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
                <div className='CrewRoastersHeading'>
                  <h2>Today’s Flight Overview</h2>
                  <div class="round-container">
                      <i class="fa fa-arrow-up"></i>
                  </div>
                </div>
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

          <div className='card'>
            <div className='CrewRoastersHeading'>
                <h2>Crew Roasters</h2>
                <div class="round-container">
                    <i class="fa fa-arrow-up"></i>
                </div>
            </div>
          <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Crew Name</th>
                                <th>Employee ID</th>
                                <th>Role</th>
                                <th>Fatigue Level</th>
                                <th>Duty Status</th>
                                <th>Last Rest Hours</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="employee-image-container">
                                    <div className="employee-image"></div>
                                </td>
                                <td>John Reynolds</td>
                                <td>CAP-4521</td>
                                <td>Captain</td>
                                <td className="fatigue-level-style">
                                    <div className="oval-border">
                                    <i class="fa fa-circle">  &nbsp; Low </i>
                                    </div>
                                </td>
                                <td className="duty-status-style">
                                    <p className="oval-border">Standby</p>
                                </td>
                                
                                <td>8 hours</td>
                                <td>Modify</td>
                            </tr>

                            <tr>
                                <td className="employee-image-container">
                                    <div className="employee-image"></div>
                                </td>
                                <td>John Reynolds</td>
                                <td>363549</td>
                                <td>Flight Attendant</td>
                                <td className="fatigue-level-style">
                                    <div className="oval-border">
                                    <i class="fa fa-circle">  &nbsp; high </i>
                                    </div>
                                </td>
                                <td className="duty-status-style">
                                    <p className="oval-border">Available</p>
                                </td>
                                
                                <td>6 hours</td>
                                <td>Modify</td>
                            </tr>

                            <tr>
                                <td className="employee-image-container">
                                    <div className="employee-image"></div>
                                </td>
                                <td>John Reynolds</td>
                                <td>456787</td>
                                <td>First Officer</td>
                                <td className="fatigue-level-style">
                                    <div className="oval-border">
                                    <i class="fa fa-circle">  &nbsp; High </i>
                                    </div>
                                </td>
                                <td className="duty-status-style">
                                    <p className="oval-border">OFF Duty</p>
                                </td>
                                
                                <td>4 hours</td>
                                <td>Modify</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
