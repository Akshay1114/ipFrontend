import React, { useState } from 'react';
import { DatePicker, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import CommonModal from '../CommonModal';
import Button from '../Button';
import { io } from "socket.io-client";
import axios from 'axios';
import { data } from 'react-router-dom';
import { wingWiseApi } from '../../utils/AxiosInstance';


const { Dragger } = Upload;

const socket = io("http://localhost:5001/", { transports: ["websocket", "polling"] });

const dateFormat = 'YYYY-MM-DD';

function MakeRequest({ setMakeRequest, flightSchedule, flightSelected }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [flight, setFlight] = useState(flightSelected?.flightId||"");
  const [value, setValue] = useState('');
  const [reason, setReason] = useState("");
console.log("flightSelected ============>", flightSelected);
  const handleCancel = () => {
    setMakeRequest(false);
  }

  const handleRequest = () => {
    const employee_ID = sessionStorage.getItem('employee_ID');
    const name = sessionStorage.getItem("user");
    const message = `Request for Schedule Change for Flight Number ${flight} on ${dateFrom} due to ${value}`;
     socket.emit("send_notification_to_admin", { message, recipient: 'admin', senderName: "john", senderID: employee_ID, scheduleID: "Schedule ID" });
    console.log(
   
      "reason =>", value
    )
   const user = JSON.parse(name)
    const data = {
      employee_ID: employee_ID,
      name:user.name,
      start_date: dateFrom,
      end_date: dateTo,
      reason: reason,
      flightId: flight,
      leaveType: value,
      status: "Pending"
    }

    // axios.post("http://localhost:5001/api/user/requestChangeSchedule", data)
    wingWiseApi.post("user/requestChangeSchedule", data)
      .then((res) => {
        console.log(res.data);
        setMakeRequest(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
  };

  return (
    <div className="makeRequest-container">
      <h3 className="makeRequest-title">New Request</h3>
      <div className="makeRequest-breadcrumb">Requests &gt; <span>New Request</span></div>


      <div className="makeRequest-formGroup">
        <label>Dates</label>
        <div className="makeRequest-dateRange">
          <DatePicker
            onChange={(value, dateString) => setDateFrom(dateString)}
            placeholder="From"
            format={dateFormat}
          />
          <DatePicker
            onChange={(value, dateString) => setDateTo(dateString)}
            placeholder="To"
            format={dateFormat}
          />
        </div>
      </div>

      <div className="makeRequest-formGroup make-Request-inputField">
        <label>Flight Number</label>
        <Input value={flight} onChange={(e) => setFlight(e.target.value)} placeholder="Enter Flight Number" />
      </div>

      <div className="makeRequest-formGroup make-Request-inputField">
        <label>Leave Type</label>
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Select Leave Type" />
      </div>

      <div className="makeRequest-formGroup  makeRequest-textField">
        <label>Reason</label>
        <Input.TextArea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Type Reason of leave" />
      </div>

      <div className="makeRequest-formGroup makeRequest-textField">
        {/* <label>Attachments (Optional)</label> */}
        <Dragger {...uploadProps}>
          {/* <label>Attachments (Optional)</label> */}
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Drag your file(s) or <span className="makeRequest-browse">browse</span></p>
          <p className="ant-upload-hint">Max 10 MB files are allowed</p>
        </Dragger>
      </div>

      <div className="makeRequest-buttonSection">
        <Button classname="makeRequest-cancelBtn" onclick={handleCancel}>
          Cancel
        </Button>

        <CommonModal handleOk={handleRequest} btnText="Send Request" title="Sent Request!" className="makeRequest-submitBtn">
          <p>You have successfully sent the request.</p>
        </CommonModal>
      </div>
    </div>
  )
}

export default MakeRequest;
