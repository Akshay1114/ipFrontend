// import React, { useEffect, useState } from 'react';
// import SleepDataUi from '../pages/SleepDataUi';
// import CommonTable from './CommonTable';

// function AdminDashboard() {
//     console.log('AdminDashboard');

//     const [crewData, setCrewData] = useState([]);

//     useEffect(() => {
//         // Replace with your API endpoint
//         fetch("https://api.example.com/crew-data")
//             .then(response => response.json())
//             .then(data => setCrewData(data))
//             .catch(error => console.error("Error fetching data:", error));
//     }, []);

//     return (
//         <div>
//             <div className='adminDashboard'>
//                 <div className='AD-section1'>
//                     <div>
//                         <div id='Manager-dashboard-column1'>
//                             <div className='d-flex jc-between card MD-C1-card'>
//                                 <h3>52</h3>
//                                 <p>Total Employee</p>
//                             </div>

//                             <div className='d-flex jc-between card MD-C1-card'>
//                                 <div className='general-inline-text'>
//                                     <h3>22</h3>
//                                     <button className='MD-C1-btn'>View &gt;</button>
//                                 </div>
//                                 <p>On Duty</p>
//                             </div>

//                             <div className='d-flex jc-between card MD-C1-card'>
//                                 <div className='general-inline-text'>
//                                     <h3>2</h3>
//                                     <button className='MD-C1-btn'>View &gt;</button>
//                                 </div>
//                                 <p>High Fatigue Risk</p>
//                             </div>

//                             <div className='d-flex jc-between card MD-C1-card'>
//                                 <div className='general-inline-text'>
//                                     <h3>4</h3>
//                                     <button className='MD-C1-btn'>View &gt;</button>
//                                 </div>
//                                 <p>Pending Requests</p>
//                             </div>
//                         </div>

//                         <div className='card'>
//                             <div className='CrewRoastersHeading'>
//                                 <h2>Today’s Flight Overview</h2>
//                                 <div className="round-container">
//                                     <i className="fa fa-arrow-up"></i>
//                                 </div>
//                             </div>
//                             {/* <CommonTable
//                                 data={[{ flightNumber: '05042024', fleet: 'A320neo', departure: '9:20 AM', arrival: '2:15 PM' }]}
//                                 columns={[
//                                     { title: 'Flight Number', dataIndex: 'flightNumber' },
//                                     { title: 'Fleet', dataIndex: 'fleet' },
//                                     { title: 'Departure', dataIndex: 'departure' },
//                                     { title: 'Arrival', dataIndex: 'arrival' }
//                                 ]}
//                             /> */}
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Flight No.</th>
//                                         <th>Departure</th>
//                                         <th></th>
//                                         <th>Arrival</th>
//                                         <th>Aircraft</th>
//                                         <th>Captain</th>
//                                         <th>Status</th>
//                                         <th>Gate</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             AC135
//                                         </td>
//                                         <td>9:30 am </td>
//                                         <td></td>
//                                         <td>2:15pm</td>
//                                         <td>
//                                           Boeing567 
//                                         </td>
//                                         <td>
//                                             Sarahg williams 
//                                         </td>
                                        
//                                         <td>On-time</td>
//                                         <td>D23</td>
//                                     </tr>
//                                   </tbody>
//                             </table>
//                         </div>
//                     </div>
                    
//                     <div className='MD-C3 card'>
//                         <h3>Urgent Look-Over</h3>
//                         <div className='MD-C3-UrgentLookOver'></div>
//                     </div>
//                 </div>

//                 <div className='card'>
//                     <div className='CrewRoastersHeading'>
//                         <h2>Crew Roasters</h2>
//                         <div className="round-container">
//                             <i className="fa fa-arrow-up"></i>
//                         </div>
//                     </div>

//                     <div className="table-container">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th></th>
//                                     <th>Crew Name</th>
//                                     <th>Employee ID</th>
//                                     <th>Role</th>
//                                     <th>Fatigue Level</th>
//                                     <th>Duty Status</th>
//                                     <th>Last Rest Hours</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {crewData.length > 0 ? (
//                                     crewData.map((crew, index) => (
//                                         <tr key={index}>
//                                             <td className="employee-image-container">
//                                                 <div className="employee-image"></div>
//                                             </td>
//                                             <td>{crew.name}</td>
//                                             <td>{crew.employeeId}</td>
//                                             <td>{crew.role}</td>
//                                             <td className="fatigue-level-style">
//                                                 <div className="oval-border">
//                                                     <i className="fa fa-circle"> &nbsp; {crew.fatigueLevel} </i>
//                                                 </div>
//                                             </td>
//                                             <td className="duty-status-style">
//                                                 <p className="oval-border">{crew.dutyStatus}</p>
//                                             </td>
//                                             <td>{crew.lastRestHours}</td>
//                                             <td>Modify</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8">Loading crew data...</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import SleepDataUi from '../pages/SleepDataUi';
import CommonTable from './CommonTable';

function AdminDashboard() {
    console.log('AdminDashboard');

    // const [crewData, setCrewData] = useState([]);
    const [flightData, setFlightData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const [crewData, setCrewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [crewResponse, flightResponse] = await Promise.all([
                    fetch(`/user?page=${page}&search=${searchQuery}`), 
                    fetch("https://api.example.com/flights")  // Replace with actual API
                ]);

                if (!crewResponse.ok || !flightResponse.ok) {
                    throw new Error("Error fetching data");
                }

                const crewData = await crewResponse.json();
                const flightData = await flightResponse.json();

                setCrewData(crewData);
                setFlightData(flightData);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='adminDashboard'>
                <div className='AD-section1'>
                    <div>
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
                                <p>Pending Requests</p>
                            </div>
                        </div>

                        {/* Flight Overview Section */}
                        <div className='card'>
                            <div className='CrewRoastersHeading'>
                                <h2>Today’s Flight Overview</h2>
                                <div className="round-container">
                                    <i className="fa fa-arrow-up"></i>
                                </div>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Flight No.</th>
                                        <th>Departure</th>
                                        <th></th>
                                        <th>Arrival</th>
                                        <th>Aircraft</th>
                                        <th>Captain</th>
                                        <th>Status</th>
                                        <th>Gate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="8">Loading flight data...</td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="8">Error: {error}</td>
                                        </tr>
                                    ) : flightData.length > 0 ? (
                                        flightData.map((flight, index) => (
                                            <tr key={index}>
                                                <td>{flight.flightNumber}</td>
                                                <td>{flight.departureTime}</td>
                                                <td></td>
                                                <td>{flight.arrivalTime}</td>
                                                <td>{flight.aircraftType}</td>
                                                <td>{flight.captain}</td>
                                                <td>{flight.status}</td>
                                                <td>{flight.gate}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8">No flights available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='MD-C3 card'>
                        <h3>Urgent Look-Over</h3>
                        <div className='MD-C3-UrgentLookOver'></div>
                    </div>
                </div>

                {/* Crew Roasters Section */}
                <div className='card'>
                    <div className='CrewRoastersHeading'>
                        <h2>Crew Roasters</h2>
                        <div className="round-container">
                            <i className="fa fa-arrow-up"></i>
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
                                {loading ? (
                                    <tr>
                                        <td colSpan="8">Loading crew data...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="8">Error: {error}</td>
                                    </tr>
                                ) : crewData.length > 0 ? (
                                    crewData.map((crew, index) => (
                                        <tr key={index}>
                                            <td className="employee-image-container">
                                                <div className="employee-image"></div>
                                            </td>
                                            <td>{crew.name}</td>
                                            <td>{crew.employeeId}</td>
                                            <td>{crew.role}</td>
                                            <td className="fatigue-level-style">
                                                <div className="oval-border">
                                                    <i className="fa fa-circle"> &nbsp; {crew.fatigueLevel} </i>
                                                </div>
                                            </td>
                                            <td className="duty-status-style">
                                                <p className="oval-border">{crew.dutyStatus}</p>
                                            </td>
                                            <td>{crew.lastRestHours}</td>
                                            <td>Modify</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No crew data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
