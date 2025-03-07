import React, { useState } from "react";
import Button from "../Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CommonModal from "../CommonModal";
import CommonTable from "../CommonTable";
import MakeRequest from "./MakeRequest";
function Tab1() {
  const [value, onChange] = useState(new Date());
  const [makeRequest, setMakeRequest] = useState(false);
  const handleCrewInfo = () => {
    console.log("Crew Info");
  };
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
      flight: "z| CAP-4521",
      startTime: "8:00 AM",
    },
    {
      key: "2",
      info: "First Officer",
      name: "Jim Green",
      flight: "z| CAP-4521",
      startTime: "8:00 AM",
    },
    {
      key: "3",
      info: "Flight Attendants",
      name: (
        <ul style={{ listStyle: "none" }}>
          <li>Robert Brown</li>
          <li>David Black</li>
          <li>David Black</li>
        </ul>
      ),
      flight: (
        <ul style={{ listStyle: "none" }}>
          <li>| FA-5832</li>
          <li>| FA-5832</li>
          <li>| FA-5832</li>
        </ul>
      ),
      startTime: (
        <ul style={{ listStyle: "none" }}>
          <li>7:30 AM</li>
          <li>7:30 AM</li>
          <li>7:30 AM</li>
        </ul>
      ),
    },
  ];
  return makeRequest ? (
    <MakeRequest setMakeRequest={setMakeRequest} />
  ) : (
    <div className="tab1Content">
      <div>
        <div className="scheduleUpdate">
          <h3>Schedule Updates:</h3>
          <p>
            “Flight #05042024 (YVR → JFK) is delayed by 2 hours due to severe
            weather, with a new departure time of 11:20 AM.”
          </p>
          {/* <Button>
            Details
        </Button> */}

          <CommonModal title="Schedule Updates:" btnText="Details" oktext="ok">
            <div>
              <p>
                “Flight #05042024 (YVR → JFK) is delayed by 2 hours due to
                severe weather, with a new departure time of 11:20 AM.”
              </p>
            </div>
          </CommonModal>
        </div>
        <div className="scheduleList">
          <h3>Schedule</h3>
          <div className="scheduleListCard">
            <div className="d-flex jc-between">
              <span>Flight #05042024</span>
              <span>Fleet: A320neo</span>
            </div>
            <div className="d-flex jc-between">
              <span>9:20 Am</span>
              <div></div>
              <span>2:15 PM</span>
            </div>
            <div>
              {/* <Button onclick = {handleCrewInfo}>
                    Crew Info
                </Button> */}
              <CommonModal
                handleOk={() => setMakeRequest(true)}
                title="Flight Details"
                btnText="Crew Info"
                oktext="Make a Request"
              >
                <div className="scheduleListCard">
                  <div className="d-flex jc-between">
                    <span>Flight #05042024</span>
                    <span>Fleet: A320neo</span>
                  </div>
                  <div className="d-flex jc-between">
                    <span>9:20 Am</span>
                    <div></div>
                    <span>2:15 PM</span>
                  </div>
                </div>
                <div>
                  <CommonTable data={data} columns={columns} />
                </div>
              </CommonModal>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
}

export default Tab1;
