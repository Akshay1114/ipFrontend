import React, { useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import moment from "moment";
import _ from "lodash";
import { wingWiseApi } from "../utils/AxiosInstance"; 


function SleepDataUi() {
  const [schedule, setSchedule] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MAX_HOURS_PER_DAY = 8;
  const MIN_SLEEP_HOURS = 6; // If sleep is less than this, no schedule assigned

  const pilots = [
    { id: "123456", name: "Captain John", experience: "Senior", qualification: ["International", "Night"], availability: ["Monday", "Wednesday", "Friday"], preferredStartHour: 10 },
    { id: "111111", name: "Pilot Jane", experience: "Junior", qualification: ["Cargo"], availability: ["Tuesday", "Thursday"], preferredStartHour: 14 },
    { id: "222333", name: "Pilot Alex", experience: "Intermediate", qualification: ["Domestic", "Emergency"], availability: ["Monday", "Thursday", "Saturday"], preferredStartHour: 8 },
  ];

    // Sample sleep data
    // const sleep_Data = [
    //   { employee_ID: "123456", startTime: "2025-02-16T22:00:00Z", endTime: "2025-02-17T05:00:00Z" }, // 7 hours (OK)
    //   { employee_ID: "111111", startTime: "2025-02-16T23:30:00Z", endTime: "2025-02-17T04:30:00Z" }, // 5 hours (Warning, No schedule)
    //   { employee_ID: "222333", startTime: "2025-02-16T21:00:00Z", endTime: "2025-02-17T03:00:00Z" }, // 6 hours (OK)
    // ];
  

  // Fetch sleep data from the API
  useEffect(() => {
    const fetchSleepData = () => {
      setLoading(true);
      setError("");
  
      console.log("Fetching sleep data..."); 
      const id = sessionStorage.getItem("employee_ID"); // Get ID from session storage
      
      if (!id) {
        console.error("Employee ID not found in session storage");
        setError("Employee ID not found.");
        setLoading(false);
        return;
      }
  // const test1 = "any text" + id
  // const test2 = `any text ${id}`
      wingWiseApi.get(`/sleepData?id=${id}`) 
        .then((res) => {
          console.log("API Response:", res.data); 
  
          if (res.data && res.data.length > 0) {
            setSleepData(res.data);
          } else {
            setSleepData([]);
            console.log("No sleep data found."); 
          }
        })
        .catch((err) => {
          console.error("Error fetching sleep data:", err);
          setError("Failed to fetch sleep data.");
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    fetchSleepData();
  }, []);
  

  function generateSchedule() {
    let newSchedule = [];
    let newWarnings = [];

    sleepData.forEach(entry => {

      if (!entry.employee_ID || !entry.startTime || !entry.endTime) {
        console.warn("Invalid entry:", entry);
        return;
      }
      const pilot = pilots.find(p => p.id === entry.employee_ID);
      if (!pilot) return;
      let flightStart;
      let flightEnd;
      const sleepHours = moment(entry.endTime).diff(moment(entry.startTime), "hours");
      let warningMsg = "";

      if (sleepHours < MIN_SLEEP_HOURS) {
        warningMsg = `⚠️ Warning: ${pilot.name} had only ${sleepHours} hours of sleep. No flights assigned.`;
        newWarnings.push(warningMsg);
      } else {
        const availableDay = pilot.availability[0]; // First available day
        flightStart = moment().day(availableDay).set({ hour: pilot.preferredStartHour });
        flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");
      }

      newSchedule.push({
        employee_ID: pilot.id,
        name: pilot.name,
        flightStart: flightStart ? flightStart.format() : "No flight allotted",
        flightEnd: flightEnd ? flightEnd.format() : "No flight allotted",
        experience: pilot.experience,
        qualification: pilot.qualification.join(", "),
        warnings: warningMsg,
      });
    });

    setSchedule(newSchedule);
    setWarnings(newWarnings);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>AI Pilot Scheduler</h1>

      <button onClick={generateSchedule} style={{ padding: "10px", marginBottom: "20px" }} disabled={loading}>
        {loading ? "Loading..." : "Generate AI Schedule"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

export default SleepDataUi;
