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
  // const [schedule, setSchedule] = useState([]);
  // const [warnings, setWarnings] = useState([]);

  // const MAX_HOURS_PER_DAY = 8;
  // const MIN_SLEEP_HOURS = 6; // If sleep is less than this, no schedule assigned

  // const pilots = [
  //   { id: "123456", name: "Captain John", experience: "Senior", qualification: ["International", "Night"], availability: ["Monday", "Wednesday", "Friday"], preferredStartHour: 10 },
  //   { id: "111222", name: "Pilot Jane", experience: "Junior", qualification: ["Cargo"], availability: ["Tuesday", "Thursday"], preferredStartHour: 14 },
  //   { id: "222333", name: "Pilot Alex", experience: "Intermediate", qualification: ["Domestic", "Emergency"], availability: ["Monday", "Thursday", "Saturday"], preferredStartHour: 8 },
  // ];

  // // Sample sleep data
  // const sleepData = [
  //   { pilotId: "123456", startTime: "2025-02-16T22:00:00Z", endTime: "2025-02-17T05:00:00Z" }, // 7 hours (OK)
  //   { pilotId: "111222", startTime: "2025-02-16T23:30:00Z", endTime: "2025-02-17T04:30:00Z" }, // 5 hours (Warning, No schedule)
  //   { pilotId: "222333", startTime: "2025-02-16T21:00:00Z", endTime: "2025-02-17T03:00:00Z" }, // 6 hours (OK)
  // ];

  // function generateSchedule() {
  //   let newSchedule = [];
  //   let newWarnings = [];

  //   sleepData.forEach(entry => {
  //     const pilot = pilots.find(p => p.id === entry.pilotId);
  //     if (!pilot) return;

  //     const sleepHours = moment(entry.endTime).diff(moment(entry.startTime), "hours");

  //     if (sleepHours < MIN_SLEEP_HOURS) {
  //       newWarnings.push(`⚠️ Warning: ${pilot.name} had only ${sleepHours} hours of sleep. No flights assigned.`);
  //       return; // Skip scheduling for this pilot
  //     }

  //     const availableDay = pilot.availability[0]; // First available day
  //     const flightStart = moment().day(availableDay).set({ hour: pilot.preferredStartHour });
  //     const flightEnd = flightStart.clone().add(MAX_HOURS_PER_DAY, "hours");

  //     newSchedule.push({
  //       pilotId: pilot.id,
  //       name: pilot.name,
  //       flightStart: flightStart.format(),
  //       flightEnd: flightEnd.format(),
  //       experience: pilot.experience,
  //       qualification: pilot.qualification.join(", "),
  //     });
  //   });

  //   setSchedule(newSchedule);
  //   setWarnings(newWarnings);
  // }

  const [employees, setPilots] = useState([
    {
      employee_ID: "123456",
      name: "Captain John",
      experience: "Senior",
      qualification: "ATPL",
      sleepHours: 7
    },
    {
      employee_ID: "111111",
      name: "Pilot Jane",
      experience: "Junior",
      qualification: "CPL",
      sleepHours: 5
    },
    {
      employee_ID: "222333",
      name: "Pilot Alex",
      experience: "Expert",
      qualification: "PPL",
      sleepHours: 8
    }
  
  ]);
  const [schedules, setSchedules] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState("");

  const fetchSchedules = async () => {
    const response = await axios.get(`${API_URL}/allSchedule`);
    console.log(response.data);
    // let arr = []
    // arr.push(response.data.data)
    setSchedules(response.data.data);
  };

  const trainAI = async () => {
    await axios.post(`${API_URL}/train`);
    toast.success("✅ AI Model Trained!");
  };

  const generateSchedule = async () => {
    if (!weekStartDate) {
      toast.error("❌ Please select a week start date!");
      return;
    }

    await axios.post(API_URL, { employees, weekStartDate });
    toast.success("✅ AI-Generated Schedule Created!");
    fetchSchedules();
  };

  useEffect(() => {
    fetchSchedules();
  }, []);
console.log(schedules)

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Flight Day',
    dataIndex: 'flightDay',
    key: 'flightDay',
  },
  {
    title: 'Flight Name',
    dataIndex: 'flightName',
    key: 'flightName',
  },
  {
    title: 'Flight Start Time',
    dataIndex: 'flightStartTime',
    key: 'flightStartTime',
  },
  {
    title: 'Flight End Time',
    dataIndex: 'flightEndTime',
    key: 'flightEndTime',
  },
  {
    title: 'Warning',
    dataIndex: 'warning',
    key: 'warning',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    flightDay: "Monday",
    flightName: 'A-101',
    flightStartTime: '9 AM',
    flightEndTime: '9 APM',
    warning: '',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    flightDay: "Wednesday",
    flightName: 'A-330',
    flightStartTime: '10 AM',
    flightEndTime: '6 APM',
    warning: '',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    flightDay: "",
    flightName: '',
    flightStartTime: '',
    flightEndTime: '',
    warning: '⚠️ Insufficient Sleep',
    tags: ['cool', 'teacher'],
  },
];
  return (
    // <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
    //   <h1>AI Pilot Scheduler</h1>
    //    <ol>
    //       {pilots.map(pilot => (
    //         <li key={pilot.id}>
    //           <p>Pilot Name : <strong>{pilot.name}</strong></p>
    //           {/* <p>Pilot Availabilty : <strong>{pilot.availability.days.join(", ")}</strong></p> */}
    //           <p>Pilot Experience : <strong>{pilot.experience}</strong></p>
    //           {/* <p>Pilot Qualification : <strong>{pilot.qualification.join(", ")}</strong></p> */}
    //         </li>
    //       ))}
    //     </ol>
    //   <button onClick={generateSchedule} style={{ padding: "10px", marginBottom: "20px" }}>
    //     Generate AI Schedule
    //   </button>

    //   {warnings.length > 0 && (
    //     <div style={{ color: "red", marginBottom: "20px" }}>
    //       <h2>⚠️ Warnings</h2>
    //       <ul>
    //         {warnings.map((w, index) => (
    //           <li key={index}>{w}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}

    //   <h2>Schedule</h2>
    //   {schedule.length > 0 ? (
    //     <ul>
    //       {schedule.map((s, index) => (
    //         <li key={index}>
    //           <strong>{s.name} ({s.experience}):</strong> {s.flightStart} → {s.flightEnd}
    //           <br /> <em>Qualification: {s.qualification}</em>
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No schedule generated yet.</p>
    //   )}
    // </div>
    <div>
      <div>
        <h3>All Pilots</h3>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              <strong>{employee.name}</strong> ({employee.experience})
              <br /> <em>Qualification: {employee.qualification}</em>
            </li>
          ))}
        </ul>
      </div>
    <h1>✈️ AI Pilot Scheduling</h1>
    <button onClick={trainAI}>Train AI Model</button>
    <input type="date" onChange={(e) => setWeekStartDate(e.target.value)} />
    <button onClick={generateSchedule}>Generate AI Schedule</button>
    <Table columns={columns} dataSource={schedules} />
    {/* <ul>
          {schedules.map((s, index) => (
            <li key={index}>
              <strong>{s.name} ({s.experience}):</strong> {s.flightStartTime} → {s.flightEndTime}
              <br /> <em>Qualification: {s.qualification}</em>
            </li>
          ))}
        </ul> */}
       
    {/* <ul>
      {schedules?.map((schedule, index) => (
        <li key={index}>
          {schedule.name} -{" "}
          {schedule.flightAssigned ? (
            <>
              <strong>{schedule.flightName}</strong> on {schedule.flightDay} <br />
              ⏰ {schedule.flightStartTime} - {schedule.flightEndTime}
            </>
          ) : (
            <span>{schedule.warning}</span>
          )}
        </li>
      ))}
    </ul> */}

    <ToastContainer />
  </div>
  );
}


export default SleepDataUi
