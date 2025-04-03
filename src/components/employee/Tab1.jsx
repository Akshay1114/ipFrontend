import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CommonModal from "../CommonModal";
import CommonTable from "../CommonTable";
import MakeRequest from "./MakeRequest";
function Tab1({flightSchedule}) {
  const [value, onChange] = useState(new Date());
  const [makeRequest, setMakeRequest] = useState(false);
  const [flightSelected, setFlightSelected] = useState({});

  console.log("flightSchedule =>", flightSchedule.mergedFlights);
  const handleCrewInfo = () => {
    console.log("Crew Info");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "ID",
      dataIndex: "flight",
      key: "flight",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
  ];

  // Get today's date
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  function getTime (dateString){
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }

  return makeRequest ? (
    <MakeRequest flightSelected={flightSelected} flightSchedule={flightSchedule} setMakeRequest={setMakeRequest} />
  ) : (
    <div className="tab1-container">
      <div className="tab1-left-panel">
        <h2>Schedule</h2>

        <div className="tab1-important-updates">
          <h3>
            <strong>Important Updates</strong>
          </h3>
          <p>
            Flight <strong>#05042024 (YVR → JFK)</strong> is <strong><span>delayed by 2 hours</span></strong> due to severe weather. The new departure time is <strong>11:20 AM</strong>. We apologize for the inconvenience and appreciate your patience
          </p>
          <CommonModal title="Schedule Updates" btnText="Details" oktext="OK">
            <p>Flight #05042024 (YVR → JFK) is delayed by 2 hours due to severe weather. The new departure time is 11:20 AM.</p>
          </CommonModal>
        </div>

        <div className="tab1-flight-schedule">
          <h3>Flight Schedule</h3>
          {flightSchedule ?flightSchedule?.mergedFlights?.map((el, index) => {
            const pilotData = el?.flightSchedule?.pilots?.map((pilot, idx) => ({
              key: `pilot-${idx}`,
              role: "Pilot", // Assign "Pilot" as role
              name: pilot,
              flight: el?.flightSchedule?.flightId, // Use flight ID
              startTime: "N/A", // If no time is provided
            })) || [];
          
            // Transform cabin crew objects (assuming they have role, name, flightId, startTime)
            const cabinCrewData = el?.flightSchedule?.cabinCrew?.map((crew, idx) => ({
              key: `crew-${idx}`,
              role: crew.role || "Cabin Crew",
              name: crew.name,
              flight: crew.flightId || el?.flightData?.flightId, 
              startTime: crew.startTime || "N/A",
            })) || [];
            if (cabinCrewData.length === 0) {
              cabinCrewData.push({
                key: "no-crew",
                role: "More staff needed",
                name: "---",
                flight: "---",
                startTime: "---",
              });
            }
            const tableData = [...pilotData, ...cabinCrewData];
            console.log("tableData =>", tableData); 
           return( <div key={index} className="tab1-schedule-wrapper">
              <div className="tab1-date-label"> {new Date(el?.flightData?.departure).toLocaleDateString("en-US", { day: "numeric", month: "long" })}</div>
              <div className="tab1-schedule-card">
                <div className="tab1-card-header">
                  <span>Flight <strong> {el?.flightData.flightId}</strong></span>
                  <span>Fleet: <strong>A320neo</strong></span>
                </div>
                <div className="tab1-card-time">
                  <span>{getTime(el.flightData.departure)}</span>
                  <span>→</span>
                  <span>{getTime(el.flightData.arrival)}</span>
                </div>
                <p>{el?.flightData.departureLocation} - - - - - - - - - ✈ - - - - - - - - - {el?.flightData.arrivalLocation} ({el?.flightData.duration} hrs)</p>
                <CommonModal handleOk={() => setMakeRequest(true)} title="Flight Details" btnText="Details" oktext="Make a Request" openModalClick ={
            ()=>setFlightSelected(el)
          }>
                  <CommonTable data={tableData} columns={columns} />
                </CommonModal>
              </div>
            </div>
          )}):"NO DATA"}
        </div>
      </div>

      <div className="tab1-right-panel">
        <p className="tab1-date">Today's Date</p>
        <h1>{`${day} ${month}`}</h1>
        <p>{year}</p>

        <div className="tab1-calendar-wrapper">
          <h3>Calendar</h3>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
}

export default Tab1;
