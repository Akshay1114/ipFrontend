import React, { useEffect, useState } from 'react';
import SleepDataUi from '../pages/SleepDataUi';
import CommonTable from './CommonTable';
import { wingWiseApi } from "../utils/AxiosInstance"; 


function AdminDashboard() {
    const [flightOverview, setFlightOverview] = useState([]);
    const [crewRoasters, setCrewRoasters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setLoading(true); 
    
        const fetchFlightOverview = () => {
            return wingWiseApi.get(`/user?page=${page}${searchQuery ? `&search=${searchQuery}` : ''}`)
                .then((res) => {
                    console.log("Flight Overview API Response:", res.data);
                    setFlightOverview(res.data?.data || []);  
                })
                .catch((err) => {
                    console.error("Error fetching flight overview:", err);
                    setError("Failed to fetch flight overview.");
                });
        };
    
        const fetchCrewRoasters = () => {
            return wingWiseApi.get(`/user?page=${page}${searchQuery ? `&search=${searchQuery}` : ''}`)
                .then((res) => {
                    console.log("Crew Roasters API Response:", res.data);
                    setCrewRoasters(res.data?.data || []);  
                })
                .catch((err) => {
                    console.error("Error fetching crew roasters:", err);
                    setError("Failed to fetch crew roasters.");
                });
        };
    
        Promise.all([fetchFlightOverview(), fetchCrewRoasters()]).finally(() => {
            setLoading(false);
        });
    
    }, [page, searchQuery]);  
    

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
                                    {flightOverview.map((flight, index) => (
                                        <tr key={index}>
                                            <td>{flight.email}</td>
                                            <td>{flight.name}</td>
                                            <td></td>
                                            <td>{flight.role}</td>
                                            <td>{flight.aircraft}</td>
                                            <td>{flight.captain}</td>
                                            <td>{flight.status}</td>
                                            <td>{flight.gate}</td>
                                        </tr>
                                    ))}
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
                                {crewRoasters.map((crew, index) => (
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
