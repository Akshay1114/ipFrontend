import React, {useState} from 'react'
import * as tf from "@tensorflow/tfjs";
import moment from "moment";
import _ from "lodash";
import axios from 'axios';

function SleepDataUi() {
  const [schedule, setSchedule] = useState([]);
  const [warnings, setWarnings] = useState([]);

  const MAX_HOURS_PER_DAY = 8;
  const MIN_SLEEP_HOURS = 6; // If sleep is less than this, no schedule assigned

  const pilots = [
    { id: "123456", name: "Captain John", experience: "Senior", qualification: ["International", "Night"], availability: ["Monday", "Wednesday", "Friday"], preferredStartHour: 10 },
    { id: "111111", name: "Pilot Jane", experience: "Junior", qualification: ["Cargo"], availability: ["Tuesday", "Thursday"], preferredStartHour: 14 },
    { id: "222333", name: "Pilot Alex", experience: "Intermediate", qualification: ["Domestic", "Emergency"], availability: ["Monday", "Thursday", "Saturday"], preferredStartHour: 8 },
  ];

  // Sample sleep data
  const sleepData = [
    { employee_ID: "123456", startTime: "2025-02-16T22:00:00Z", endTime: "2025-02-17T05:00:00Z" }, // 7 hours (OK)
    { employee_ID: "111111", startTime: "2025-02-16T23:30:00Z", endTime: "2025-02-17T04:30:00Z" }, // 5 hours (Warning, No schedule)
    { employee_ID: "222333", startTime: "2025-02-16T21:00:00Z", endTime: "2025-02-17T03:00:00Z" }, // 6 hours (OK)
  ];
const getToken = sessionStorage.getItem('token')
  // function saveSchedule({schedule, warnings}) {
  //   axios.post("http://localhost:5001/api/schedule", {
  //     schedule,
  //     warnings
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${getToken}`
  //     }
  //   }
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //   }
  //   )
  //   .catch((err) => {
  //     console.log(err);
  //   } 
  //   );
  // }

  function generateSchedule() {
    let newSchedule = [];
    let newWarnings = [];


    sleepData.forEach(entry => {
      const pilot = pilots.find(p => p.id === entry.employee_ID);
      if (!pilot) return;
      let  flightStart ;
      let  flightEnd ;
      const sleepHours = moment(entry.endTime).diff(moment(entry.startTime), "hours");
      let warningMsg = "";
      if (sleepHours < MIN_SLEEP_HOURS) {
        warningMsg = `⚠️ Warning: ${pilot.name} had only ${sleepHours} hours of sleep. No flights assigned.`;
        newWarnings.push(`⚠️ Warning: ${pilot.name} had only ${sleepHours} hours of sleep. No flights assigned.`);
        
      } else{
        const availableDay = pilot.availability[0]; // First available day
       flightStart = moment().day(availableDay).set({ hour: pilot.preferredStartHour });
       flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");
      }

      

      newSchedule.push({
        employee_ID: pilot.id,
        name: pilot.name,
        flightStart: flightStart? flightStart.format():"No flight alloted",
        flightEnd: flightEnd ? flightEnd.format() : "No flight alloted",
        experience: pilot.experience,
        qualification: pilot.qualification.join(", "),
        warnings: warningMsg,
      });
    });

    setSchedule(newSchedule);
    setWarnings(newWarnings);
    // saveSchedule({schedule: newSchedule, warnings: newWarnings});
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>AI Pilot Scheduler</h1>
       <ol>
          {pilots.map(pilot => (
            <li key={pilot.id}>
              <p>Pilot Name : <strong>{pilot.name}</strong></p>
              {/* <p>Pilot Availabilty : <strong>{pilot.availability.days.join(", ")}</strong></p> */}
              <p>Pilot Experience : <strong>{pilot.experience}</strong></p>
              {/* <p>Pilot Qualification : <strong>{pilot.qualification.join(", ")}</strong></p> */}
            </li>
          ))}
        </ol>
      <button onClick={generateSchedule} style={{ padding: "10px", marginBottom: "20px" }}>
        Generate AI Schedule
      </button>

      {warnings.length > 0 && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          <h2>⚠️ Warnings</h2>
          <ul>
            {warnings.map((w, index) => (
              <li key={index}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <h2>Schedule</h2>
      {schedule.length > 0 ? (
        <ul>
          {schedule.map((s, index) => (
            <li key={index}>
              <strong>{s.name} ({s.experience}):</strong> {s.flightStart} → {s.flightEnd}
              <br /> <em>Qualification: {s.qualification}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedule generated yet.</p>
      )}
    </div>
  );
}


export default SleepDataUi