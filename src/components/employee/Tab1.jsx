import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CommonModal from "../CommonModal";
import CommonTable from "../CommonTable";
import MakeRequest from "./MakeRequest";

function Tab1() {
  const [value, onChange] = useState(new Date());
  const [makeRequest, setMakeRequest] = useState(false);

  const columns = [
    {
      title: "Crew Info",
      dataIndex: "info",
      key: "info",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Flight",
      dataIndex: "flight",
      key: "flight",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
  ];

  const data = [
    {
      key: "1",
      info: "Captain",
      name: "John Brown",
      flight: "CAP-4521",
      startTime: "8:00 AM",
    },
    {
      key: "2",
      info: "First Officer",
      name: "Jim Green",
      flight: "CAP-4521",
      startTime: "8:00 AM",
    },
    {
      key: "3",
      info: "Flight Attendants",
      name: (
        <ul>
          <li>Robert Brown</li>
          <li>David Black</li>
          <li>Lisa White</li>
        </ul>
      ),
      flight: (
        <ul>
          <li>FA-5832</li>
          <li>FA-5832</li>
          <li>FA-5832</li>
        </ul>
      ),
      startTime: (
        <ul>
          <li>7:30 AM</li>
          <li>7:30 AM</li>
          <li>7:30 AM</li>
        </ul>
      ),
    },
  ];

  // Get today's date
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  return makeRequest ? (
    <MakeRequest setMakeRequest={setMakeRequest} />
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
          {[1, 2].map((_, index) => (
            <div key={index} className="tab1-schedule-wrapper">
              <div className="tab1-date-label">FEB 23</div>
              <div className="tab1-schedule-card">
                <div className="tab1-card-header">
                  <span>Flight <strong> #AF0374</strong></span>
                  <span>Fleet: <strong>A320neo</strong></span>
                </div>
                <div className="tab1-card-time">
                  <span>15:05</span>
                  <span>→</span>
                  <span>21:00</span>
                </div>
                <p>YVR - - - - - - - - - ✈ - - - - - - - - - NYC (4h 55m)</p>
                <CommonModal handleOk={() => setMakeRequest(true)} title="Flight Details" btnText="Crew Info" oktext="Make a Request">
                  <CommonTable data={data} columns={columns} />
                </CommonModal>
              </div>
            </div>
          ))}
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
