import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import WeatherCard from './WeatherCard';
import './EmployeeDashboard.css';
import BarGraph from './charts/BarGraph';
import PiGraph from './charts/PiGraph';
import Loader from './loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { wingWiseApi } from '../utils/AxiosInstance';
import { fetchData } from '../features/api/escheduleSlice';

const socket = io("http://localhost:5001/", { transports: ["websocket", "polling"] });
// const socket = io("wss://rsinnovates.com/", { transports: ["websocket", "polling"] });

function EmployeeDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [userID, setUserID] = useState(sessionStorage.getItem("employee_ID") || "");
  const [sleepData, setSleepData] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const { flightSchedule, status, error } = useSelector((state) => state.employeeSchedule);

  useEffect(() => {
    dispatch(fetchData()); // Fetch employee schedule on component mount
  }, [dispatch]);
  console.log("flightSchedule =>", flightSchedule);
  let getToken = sessionStorage.getItem('token');
  let getUser = sessionStorage.getItem('employee_ID');

  useEffect(() => {
    console.log('EmployeeDashboard', getUser);
    function getScheduleData() {
      axios.get(`http://localhost:5001/api/sleepData?id=${getUser}`, {
        headers: {
          Authorization: `Bearer ${getToken}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setSleepData(res.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
    }
    getScheduleData();
  }, []);


  console.log("notifications =>", notifications);
  return (
    <div className="employee-deshboard-grid-container">
      {loading && <Loader />} {/* Show loader when loading */}
      {/* EMPLOYEE DASHBOARD */}
      {/* Schedule Card */}
      <div className="employee-dashboard-schedule-card">
        <div className="main-container">
          <div className="main-card">
            <div className="layout-grid">
              <div className="flight-list">
                <h1>My Schedule</h1>
                <p className="subtitle">Upcoming Flights (3)</p>

                <div className="flight-item">
                  <div className="date-box">
                    <p>FEB</p>
                    <h2>23</h2>
                  </div>
                  <div className="flight-details">
                    <div className="flight-header">
                      <span>Flight <strong>#AFO374</strong></span>
                      <span>Fleet <strong>A320Neo</strong></span>
                    </div>
                    <div className="timeline">
                      <div className="time-block">
                        <h3>15:05</h3>
                        <p>YVR</p>
                      </div>
                      <div className="duration-block">
                        <p>4h 55m</p>
                        <FontAwesomeIcon icon={faPlane} />
                      </div>
                      <div className="time-block">
                        <h3>21:00</h3>
                        <p>NYC</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flight-item">
                  <div className="date-box">
                    <p>FEB</p>
                    <h2>23</h2>
                  </div>
                  <div className="flight-details">
                    <div className="flight-header">
                      <span>Flight <strong>#AFO374</strong></span>
                      <span>Fleet <strong>A320Neo</strong></span>
                    </div>
                    <div className="timeline">
                      <div className="time-block">
                        <h3>15:05</h3>
                        <p>YVR</p>
                      </div>
                      <div className="duration-block">
                        <p>4h 55m</p>
                        <FontAwesomeIcon icon={faPlane} />
                      </div>
                      <div className="time-block">
                        <h3>21:00</h3>
                        <p>NYC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="metrics-panel">
                <div>
                  <div className="metrics-header">
                    <span>Flight Duty Time Limit <FontAwesomeIcon icon={faInfoCircle}/></span>
                    <i className="fas fa-expand-alt"></i>
                  </div>
                  <div className="percentage">90%</div>
                </div>

                <div>
                  <div className="progress-container">
                    <p>Flight Duty Hours :</p>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <p>9h/12h Duty</p>
                  </div>

                  <div className="progress-container">
                    <p>Rest Periods :</p>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <p>10h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="employee-dashboard-weather-card">
        <WeatherCard />
      </div>
      <div className="employee-dashboard-fatigue-card">
        <div className="header">
          <h2>Fatigue Risk Indicator</h2>
        </div>
        <div className="percentage">25%</div>
        <div className="risk-level">
          <div className="level">Low</div>
          <div className="level">Moderate</div>
          <div className="level">High</div>
        </div>
        <div className="risk-bar">
          <div className="risk-indicator"></div>
        </div>
        <div className="status">Good Well-rested!</div>
        <button className="details-button">See Details</button>
      </div>
      <div className="employee-dashboard-sleep-card">
        <div className="header">
          <h2>Sleep Data</h2>
        </div>
        <div className="sleep-time">{sleepData?.deep_sleep}</div>
        <BarGraph title ="Sleep Data"/>
      </div>
      <div className="employee-dashboard-health-card">
        <div className="header">
          <h2>Health Insights</h2>
        </div>
        <div className="insights-grid">
          <div className="insight">
            <div className="value">72 bpm</div>
            <div className="label">Heart Rate</div>
          </div>
          <div className="insight">
            {/* <div className="value">32%</div>
            <div className="label">Stress Level</div> */}
             <PiGraph/>
          </div>
        </div>
      </div>
      <div className="employee-dashboard-recommendation-card">
        <div className="header">
          <h2>Recommendation</h2>
        </div>
        <div className="message">
          “ Your Next Shift is in 12 hours, Take Good rest before it! “
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
