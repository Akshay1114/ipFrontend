import React, {useState} from 'react'
import * as tf from "@tensorflow/tfjs";
import moment from "moment";
import _ from "lodash";

function SleepDataUi() {
  const [schedule, setSchedule] = useState([]);

  const MAX_HOURS_PER_DAY = 8;
  const MIN_REST_HOURS = 10;
  const WEEKLY_LIMIT = 40;

  // Pilots with availability preferences
  const pilots = [
    {
      id: "101",
      name: "Captain John",
      experience: "Senior",
      qualification: ["International", "Night"],
      availability: { days: ["Monday", "Wednesday", "Friday"], preferredStartHour: 10 },
    },
    {
      id: "202",
      name: "Pilot Jane",
      experience: "Junior",
      qualification: ["Cargo"],
      availability: { days: ["Tuesday", "Thursday"], preferredStartHour: 14 },
    },
  ];

  // Sample sleep data
  const sleepData = [
    { pilotId: "101", startTime: "2025-02-16T22:00:00Z", endTime: "2025-02-17T06:00:00Z" },
    { pilotId: "202", startTime: "2025-02-16T23:00:00Z", endTime: "2025-02-17T07:00:00Z" },
  ];

  async function trainModel(pilotSleepData) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "linear" }));
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    const xs = pilotSleepData.map(entry => [
      moment(entry.endTime).diff(moment(entry.startTime), "hours"),
      moment(entry.endTime).hour()
    ]);

    const ys = pilotSleepData.map(entry => [
      moment(entry.endTime).add(MAX_HOURS_PER_DAY, "hours").hour()
    ]);

    await model.fit(tf.tensor2d(xs), tf.tensor2d(ys), { epochs: 100 });
    return model;
  }

  async function generateSchedule() {
    let newSchedule = [];
    const groupedByPilot = _.groupBy(sleepData, "pilotId");

    for (let pilotId in groupedByPilot) {
      const pilotSleepData = groupedByPilot[pilotId];
      const model = await trainModel(pilotSleepData);
      const pilotInfo = pilots.find(p => p.id === pilotId);

      let lastWakeTime = null;
      let weeklyHours = 0;
      let assignedFlight = false; // New flag to ensure at least one flight is scheduled

      console.log(`Processing pilot: ${pilotInfo?.name}`);

      for (let entry of pilotSleepData) {
        const sleepHours = moment(entry.endTime).diff(moment(entry.startTime), "hours");
        const wakeTime = moment(entry.endTime).hour();
        const prediction = model.predict(tf.tensor2d([[sleepHours, wakeTime]])).dataSync();

        let flightStart = moment(entry.endTime).set({ hour: Math.round(prediction[0]) });
        let flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");

        console.log(`Pilot: ${pilotInfo.name}, Predicted Flight Time: ${flightStart.format()}`);

        // Ensure minimum rest & FDTL compliance
        if (lastWakeTime && flightStart.diff(lastWakeTime, "hours") < MIN_REST_HOURS) {
          flightStart = lastWakeTime.clone().add(MIN_REST_HOURS, "hours");
          flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");
        }

        if (weeklyHours + MAX_HOURS_PER_DAY > WEEKLY_LIMIT) {
          console.warn(`${pilotInfo.name} exceeded weekly limit.`);
          continue;
        }

        // Check crew availability preference
        const flightDay = flightStart.format("dddd"); // Get day name (Monday, Tuesday...)
        if (!pilotInfo.availability.days.includes(flightDay)) {
          console.warn(`${pilotInfo.name} is not available on ${flightDay}.`);
          continue;
        }

        // Adjust to preferred start hour
        if (flightStart.hour() < pilotInfo.availability.preferredStartHour) {
          flightStart = flightStart.set({ hour: pilotInfo.availability.preferredStartHour });
          flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");
        }

        newSchedule.push({
          pilotId,
          name: pilotInfo?.name || "Unknown",
          flightStart: flightStart.format(),
          flightEnd: flightEnd.format(),
          experience: pilotInfo?.experience || "Unknown",
          qualification: pilotInfo?.qualification || [],
        });

        console.log(`Assigned flight: ${flightStart.format()} → ${flightEnd.format()}`);
        lastWakeTime = flightStart;
        weeklyHours += MAX_HOURS_PER_DAY;
        assignedFlight = true;
      }

      // If no flight was assigned, create a default flight within preferred hours
      if (!assignedFlight) {
        const preferredDay = pilotInfo.availability.days[0]; // Use the first available day
        const flightStart = moment().day(preferredDay).set({ hour: pilotInfo.availability.preferredStartHour });
        const flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");

        newSchedule.push({
          pilotId,
          name: pilotInfo?.name || "Unknown",
          flightStart: flightStart.format(),
          flightEnd: flightEnd.format(),
          experience: pilotInfo?.experience || "Unknown",
          qualification: pilotInfo?.qualification || [],
        });

        console.log(`Default flight assigned for ${pilotInfo.name}: ${flightStart.format()} → ${flightEnd.format()}`);
      }
    }

    setSchedule(newSchedule);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>AI Pilot Scheduler</h1>
      <div>
        <h2>Pilots</h2>
        <ol>
          {pilots.map(pilot => (
            <li key={pilot.id}>
              <p>Pilot Name : <strong>{pilot.name}</strong></p>
              <p>Pilot Availabilty : <strong>{pilot.availability.days.join(", ")}</strong></p>
              <p>Pilot Experience : <strong>{pilot.experience}</strong></p>
              <p>Pilot Qualification : <strong>{pilot.qualification.join(", ")}</strong></p>
            </li>
          ))}
        </ol>
      </div>
      <button onClick={generateSchedule} style={{ padding: "10px", marginBottom: "20px" }}>
        Generate AI Schedule
      </button>

      <h2>Schedule</h2>
      {schedule.length > 0 ? (
        <ul>
          {schedule.map((s, index) => (
            <li key={index}>
              <strong>{s.name} ({s.experience}):</strong> {s.flightStart} → {s.flightEnd}
              <br /> <em>Qualification: {s.qualification.join(", ")}</em>
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
