import React, { useEffect, useState } from 'react';
import SleepDataUi from '../pages/SleepDataUi';
import CommonTable from './CommonTable';
import { wingWiseApi } from "../utils/AxiosInstance"; 
import axios from "axios";
import WeatherCard from './WeatherCard';
import Loader from './loader/Loader';
// import WeatherCloud from "../assets/logo/weather-cloud.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import CommonModal from './CommonModal';
import SendNotification from '../pages/SendNotification';


function AdminDashboard() {

    const [flightOverview, setFlightOverview] = useState([]);
    const [crewRoasters, setCrewRoasters] = useState([]);
    const [weather, setWeather] = useState(null);
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

    const [data, setData] = useState({
        celcius: 10, name: 'London', humidity: 10, speed: 2,
        })

        useEffect(() => {

        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=SURREY&APPID=2d37f5bfa51262a1d9cceee1baf22e26&&units=metric';
        axios.get(apiUrl)
        .then (res => {
                setData({...data, celcius: res.data.main.temp, name: res.data.name, type: res.data.weather.main, speed: res.data.wind.speed})
                })
        .catch(err => console. log(err));
        }, [])
    
        console.log(flightOverview,"<<<<<<<<")
    return (
        <div>
             {loading && <Loader />}
            <div className='adminDashboard'>
                <div className='AD-section1'>
                    <div>
                        <div id='Manager-dashboard-column1'>
                            <div className='d-flex jc-between card cardUp MD-C1-card'>
                                <div className='general-inline-text'>
                                    <h3>52</h3>
                                    <button className='MD-C1-btn'>View &gt;</button>
                                </div>
                                <p>Total Employee</p>
                            </div>
                            <div className='d-flex jc-between card cardUp MD-C1-card'>
                                <div className='general-inline-text'>
                                    <h3>22</h3>
                                    <button className='MD-C1-btn'>View &gt;</button>
                                </div>
                                <p>On Duty</p>
                            </div>
                            <div className='d-flex jc-between card  cardUp MD-C1-card'>
                                <div className='general-inline-text'>
                                    <h3>2</h3>
                                    <button className='MD-C1-btn'>View &gt;</button>
                                </div>
                                <p>High Fatigue Risk</p>
                            </div>
                            <div className='d-flex jc-between card cardUp MD-C1-card'>
                                <div className='general-inline-text'>
                                    <h3>4</h3>
                                    <button className='MD-C1-btn'>View &gt;</button>
                                </div>
                                <p>Pending Requests</p>
                            </div>
                        </div>

                        {/* Flight Overview Section */}
                        <div className='card MD-C2'>
                            <h2 id='Flight-overview'>Today’s Flight</h2>

                            <table id='Flight-overview-table'>
                                <thead>
                                    <tr >
                                        <th>Flight</th>
                                        <th>Departure</th>
                                        <th></th>
                                        <th>Arrival</th>
                                        <th>Aircraft</th>
                                        <th>Status</th>
                                        <th>Gate</th>
                                        <hr />
                                    </tr>
                                </thead>
                                <tbody className='flight-overview-table-body'>
                                    {[
  {
    flight: "AA123",
    departure: "2025-04-01 08:30",
    arrival: "2025-04-01 12:15",
    aircraft: "Boeing 737",
    status: "On Time",
    gate: "A12"
  },
  {
    flight: "BA456",
    departure: "2025-04-01 09:45",
    arrival: "2025-04-01 13:30",
    aircraft: "Airbus A320",
    status: "Delayed",
    gate: "B5"
  },
  {
    flight: "DL789",
    departure: "2025-04-01 10:15",
    arrival: "2025-04-01 14:00",
    aircraft: "Boeing 777",
    status: "Boarding",
    gate: "C8"
  },
  {
    flight: "UA321",
    departure: "2025-04-01 11:00",
    arrival: "2025-04-01 15:10",
    aircraft: "Embraer E190",
    status: "Cancelled",
    gate: "D3"
  },
  {
    flight: "LH654",
    departure: "2025-04-01 12:45",
    arrival: "2025-04-01 16:20",
    aircraft: "Airbus A380",
    status: "On Time",
    gate: "E7"
  }
].map((flight, index) => (
                                        <>
                                        <tr key={index} id='overviewFlight'>
                                            {/* <td>{flight.employee_ID}</td>
                                            <td>{flight.name}</td>
                                            <td>- - - - <FontAwesomeIcon icon={faPlane} /> - - - -</td>
                                            <td>{flight.role}</td>
                                            <td>{flight.aircraft}</td>
                                            <td className='fatigue-level-style'>
                                                <div className="oval-border">
                                                    <i className="fa fa-circle"><span> &nbsp; {flight.gate} </span></i>
                                                </div>
                                            </td>
                                            <td>{flight.gate}</td> */}
                                            <td>{flight.flight}</td>
                                            <td>{flight.departure} <div className="subscript-text">YVR</div></td>
                                            <td className="tight-plane-cell" >- - - - <FontAwesomeIcon icon={faPlane} /> - - - -</td>
                                            <td>{flight.arrival} <div className="subscript-text">YVZ</div></td>
                                            <td>{flight.aircraft}</td>
                                            <td className='fatigue-level-style'>
                                                <div className="oval-border">
                                                    {
                                                        flight.status === "On Time" ? <i className="fa fa-circle" style={{ color: 'green' }}><span> &nbsp; {flight.status}</span></i> :
                                                        flight.status
                                                    
                                                    }
                                                    {/* <i className="fa fa-circle"><span> &nbsp; {flight.status}</span></i> */}
                                                </div>
                                            </td>
                                            <td>{flight.gate}</td>
                                                
                                        </tr>
                                        <tr key={`line-${index}`}>
                                        <td colSpan="7">
                                            <hr style={{ margin: '5px 0', border: '1px solid #ddd' }} />
                                        </td>
                                    </tr>
                                    </>  
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='MD-C3'>
                        {/* <div className='Live-weather'>
                                {loading ? (
                                <p>Loading weather...</p>
                            ) : error ? (
                                <p>Error: {error}</p>
                            ) : (
                                <div className='weather-container'>
                                    <div className='weather-row1'>
                                        <h2>Today's</h2>
                                        <img src="/Weather_cloud.svg" alt="weather" width="70" height="70" />
                                    </div>
                                    <div className='weather-row1 row2'>
                                        <div>
                                            <h2>{data.name}</h2>
                                        </div>
                                        <div>
                                            <h3>{data.celcius}°C</h3>
                                            <p>{data.type}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div> */}
                        <WeatherCard />
                        <div className='MD-C3-UrgentLookOver cardUp'>
                            <h2>Urgent Look-Over &nbsp; <CommonModal
                            btnText="Annoucement" title="" btnClassName="details-btn announcemnet-btn"
                            >
                                <SendNotification/>
                                </CommonModal></h2>
                            <div className='UrgentLookOver'>
                                <div className="employee-image-container">
                                     <div className="employee-image">
                                     <img 
                                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                                        alt="Employee" 
                                        />
                                    </div>    
                                </div>
                                <div>
                                    <h4>Crew Member: Mark Evans - FDTL Alert</h4>
                                    <p>Wed 12:25</p>
                                    <h5>Exceeds FDTL limits for today. Urgent Shift Adjustment needed for compliance.</h5>
                                </div>
                            </div>
                            <hr />
                            <div className='UrgentLookOver'>
                                <div className="employee-image-container">
                                     <div className="employee-image">
                                     <img 
                                        src="https://randomuser.me/api/portraits/men/30.jpg" 
                                        alt="Employee" 
                                        />
                                    </div>    
                                </div>
                                <div>
                                    <h4>Crew Pilot: Sarah Taylor - FDTL Alert</h4>
                                    <p>Wed 14:40</p>
                                    <h5>Has exceeded maximum duty hours. Immediate shift reassignment required.</h5>
                                </div>
                            </div>
                            <hr />
                            <div className='UrgentLookOver'>
                                <div className="employee-image-container">
                                     <div className="employee-image">
                                     <img 
                                        src="https://randomuser.me/api/portraits/women/23.jpg" 
                                        alt="Employee" 
                                        />
                                    </div>    
                                </div>
                                <div>
                                    <h4>Manager: John Doe - FDTL Alert</h4>
                                    <p>Wed 16:10</p>
                                    <h5>Approaching maximum duty limits for the day. Immediate action needed.</h5>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>

                {/* Crew Roasters Section */}
                <div className='card '>
                    <div className='CrewRoastersHeading'>
                        <h2>Crew Roasters</h2>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Crew Name</th>
                                    <th>Role</th>
                                    <th>Fatigue Level</th>
                                    <th>Duty Status</th>
                                    <th>Last Rest Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {crewRoasters.map((crew, index) => (
                                    <>
                                        <tr key={index}>
                                            <td className="employee-image-container">
                                                <div className="employee-image"></div>
                                            </td>
                                            <td>{crew.name}</td>
                                            <td>{crew.role}</td>
                                            <td className="fatigue-level-style">
                                                <div >
                                                    <i className="fa fa-circle"><span> &nbsp; {crew.healthMetrics.fatigueLevel} </span></i>
                                                </div>
                                            </td>
                                            <td className="duty-status-style">
                                                {/* <p className="oval-border">{crew.designation}</p> */}
                                                <p className="oval-border">On Duty</p>
                                            </td>
                                            <td>{crew.healthMetrics.sleepHours} hours</td>
                                        </tr>
                                        <td colSpan="7">
                                        <hr style={{ margin: '5px 0', border: '1px solid #ddd' }} />
                                    </td>
                                </>
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
