import React, {useState} from 'react'
import * as tf from "@tensorflow/tfjs";
import moment from "moment";
import _ from "lodash";

function SleepDataUi() {
  const [schedule, setSchedule] = useState([]);
  const [warnings, setWarnings] = useState([]);

  const MAX_HOURS_PER_DAY = 8;
  const MIN_SLEEP_HOURS = 6; // If sleep is less than this, no schedule assigned

  const pilots = [
    { id: "123456", name: "Captain John", experience: "Senior", qualification: ["International", "Night"], availability: ["Monday", "Wednesday", "Friday"], preferredStartHour: 10 },
    { id: "111222", name: "Pilot Jane", experience: "Junior", qualification: ["Cargo"], availability: ["Tuesday", "Thursday"], preferredStartHour: 14 },
    { id: "222333", name: "Pilot Alex", experience: "Intermediate", qualification: ["Domestic", "Emergency"], availability: ["Monday", "Thursday", "Saturday"], preferredStartHour: 8 },
  ];

  // Sample sleep data
  const sleepData = [
    { pilotId: "123456", startTime: "2025-02-16T22:00:00Z", endTime: "2025-02-17T05:00:00Z" }, // 7 hours (OK)
    { pilotId: "111222", startTime: "2025-02-16T23:30:00Z", endTime: "2025-02-17T04:30:00Z" }, // 5 hours (Warning, No schedule)
    { pilotId: "222333", startTime: "2025-02-16T21:00:00Z", endTime: "2025-02-17T03:00:00Z" }, // 6 hours (OK)
  ];

  function generateSchedule() {
    let newSchedule = [];
    let newWarnings = [];

    sleepData.forEach(entry => {
      const pilot = pilots.find(p => p.id === entry.pilotId);
      if (!pilot) return;

      const sleepHours = moment(entry.endTime).diff(moment(entry.startTime), "hours");

      if (sleepHours < MIN_SLEEP_HOURS) {
        newWarnings.push(`⚠️ Warning: ${pilot.name} had only ${sleepHours} hours of sleep. No flights assigned.`);
        return; // Skip scheduling for this pilot
      }

      const availableDay = pilot.availability[0]; // First available day
      const flightStart = moment().day(availableDay).set({ hour: pilot.preferredStartHour });
      const flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");

      newSchedule.push({
        pilotId: pilot.id,
        name: pilot.name,
        flightStart: flightStart.format(),
        flightEnd: flightEnd.format(),
        experience: pilot.experience,
        qualification: pilot.qualification.join(", "),
      });
    });

    setSchedule(newSchedule);
    setWarnings(newWarnings);
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
