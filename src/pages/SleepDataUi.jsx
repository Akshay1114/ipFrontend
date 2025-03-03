import React, {useState, useEffect} from 'react'
import * as tf from "@tensorflow/tfjs";
import moment from "moment";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Space, Table, Tag } from 'antd';

function SleepDataUi() {
  const API_URL = "http://localhost:5001/api/schedule";

  const [schedule, setSchedule] = useState(null);

  const generateSchedule = async () => {
      const response = await axios.post(API_URL);
      console.log(response);
  };
 
  return (
    <div>
    <h2>Pilot Schedule</h2>
    <button onClick={generateSchedule}>Generate Schedule</button>
    {schedule && schedule.map((pilot, index) => (
        <div key={index}>
            <h3>{pilot.name} ({pilot.qualification})</h3>
            <ul>
                {pilot.flights.map((flight, idx) => (
                    <li key={idx}>{flight.flightName} - {new Date(flight.startTime).toLocaleString()} to {new Date(flight.endTime).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    ))}
</div>
  );
}


export default SleepDataUi
