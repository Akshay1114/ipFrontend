import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
import WeatherCard from './WeatherCard';
import './EmployeeDashboard.css';
import BarGraph from './charts/BarGraph';
import PiGraph from './charts/PiGraph';

const socket = io("http://localhost:5001/", { transports: ["websocket", "polling"] });
// const socket = io("wss://rsinnovates.com/",  { transports: ["websocket", "polling"] });

function EmployeeDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [userID, setUserID] = useState(sessionStorage.getItem("employee_ID") || "");
  const [sleepData, setSleepData] = useState({});
  let getToken = sessionStorage.getItem('token')
  let getUser = sessionStorage.getItem('employee_ID')
  // useEffect(() => {
  //   console.log("userID USEEFFECT ==>", userID);
  //   if (!userID) return; // Prevent emitting if userID is empty

  //   // Register user with backend
  //   socket.emit("register", userID);

  //   // Listen for real-time notifications
  //   socket.on("receive_notification", (message) => {
  //     setNotifications((prev) => [...prev, { message }]);
  //   })
  //   return () => {
  //     socket.off("receive_notification");
  //   };
  // }, [userID]);
  useEffect(() => {

    console.log('EmployeeDashboard', getUser)
    function getScheduleData() {
      axios.get(`http://localhost:5001/api/sleepData?id=${getUser}`, {
        headers: {
          Authorization: `Bearer ${getToken}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setSleepData(res.data.data)
        }
        )
        .catch((err) => {
          console.log(err);
        }
        );

    }
    getScheduleData();
  }, []);

  console.log("notifications =>", notifications)
  return (
    <div className="employee-deshboard-grid-container">
      {/* EMPLOYEE DASHBOARD */}
      {/* Schedule Card */}
      {/* <div className="schedule-card grid-span-2">
      <div className="header">
        <h2>Schedule</h2>
        <i className="fas fa-arrow-up-right"></i>
      </div>
      <div className="upcoming">Upcoming(3)</div>
      <div className="item">
        <div className="date">
          <div className="month">FEB</div>
          <div className="day">23</div>
        </div>
        <div className="details">
          <div className="details-header">
            <div className="flight">Flight #05042024</div>
            <div className="fleet">Fleet: A320neo</div>
          </div>
          <div className="times">
            <div className="time">9:20 AM</div>
            <div className="duration">4h 55m</div>
            <div className="time">2:15 PM</div>
          </div>
          <div className="airport">YVR</div>
          <div className="airport">NYC</div>
        </div>
      </div>
      <div className="item">
        <div className="date">
          <div className="month">FEB</div>
          <div className="day">25</div>
        </div>
        <div className="details">
          <div className="details-header">
            <div className="flight">Flight #05042024</div>
            <div className="fleet">Fleet: A220-300</div>
          </div>
          <div className="times">
            <div className="time">9:20 AM</div>
            <div className="duration">4h 55m</div>
            <div className="time">2:15 PM</div>
          </div>
          <div className="airport">NYC</div>
          <div className="airport">SEA</div>
        </div>
      </div>
    </div> */}

      {/* Weather Card */}
      {/* <WeatherCard /> */}

      {/* Fatigue Risk Indicator Card */}
      {/* <div className="fatigue-card">
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
        <div className="risk-indicator" style={{ width: "25%" }}></div>
      </div>
      <div className="status">Good Well-rested!</div>
      <button className="details-button">See Details</button>
    </div> */}

      {/* Sleep Data Card */}
      {/* <div className="sleep-card">
      <div className="header">
        <h2>Sleep Data</h2>
        <i className="fas fa-arrow-up-right"></i>
      </div>
      <div className="sleep-time">{sleepData?.deep_sleep}</div>
      <div className="date">Today</div>
      <div className="hours">
        <div className="hour">11 AM</div>
        <div className="hour">12 PM</div>
        <div className="hour">1 PM</div>
        <div className="hour">2 PM</div>
        <div className="hour">3 PM</div>
      </div>
      <div className="sleep-bar">
        <div className="sleep-indicator" style={{ width: "50%" }}></div>
      </div>
    </div> */}

      {/* Health Insights Card */}
      {/* <div className="health-card">
      <div className="header">
        <h2>Health Insights</h2>
      </div>
      <div className="insights-grid">
        <div className="insight">
          <div className="value">72 bpm</div>
          <div className="label">Heart Rate</div>
        </div>
        <div className="insight">
          <div className="value">32%</div>
          <div className="label">Stress Level</div>
        </div>
      </div>
    </div> */}

      {/* Recommendation Card */}
      {/* <div className="recommendation-card">
      <div className="header">
        <h2>Recommendation</h2>
      </div>
      <div className="message">
        “ Your Next Shift is in 12 hours, Take Good rest before it! “
      </div>
    </div> */}


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
                        <i className="fas fa-plane"></i>
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
                        <i className="fas fa-plane"></i>
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
                    <span>Flight Duty Time Limit <i class="fas fa-info-circle"></i></span>
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
            <div className="value">32%</div>
            <div className="label">Stress Level</div>
          </div>
          <PiGraph/>
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
  )
}

export default EmployeeDashboard
