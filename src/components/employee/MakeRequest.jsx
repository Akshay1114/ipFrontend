import React from 'react'
// import CommonInput from '../commonInput'
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
import { Input, Radio } from 'antd';
import Button from '../Button';
import CommonModal from '../CommonModal';
import { io } from "socket.io-client";

const socket = io("http://localhost:5001/");
const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};
function MakeRequest({setMakeRequest}) {
  const [date, setDate] = React.useState("");
  const [flight, setFlight] = React.useState("");
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleCancel = () => {
    console.log('Cancel',date,value,flight);
    // setMakeRequest(false);
  }
  const handelRequest = () => {

    console.log('Request Sent');
    console.log("Sending notification...");
    const message = `Request for Schedule Change for Flight Number ${flight} on ${date} due to ${value}`;
    socket.emit("send_notification", { message, recipient:'admin' });
  
  }
  return (
    <div>
      <h3>
      Request Schedule Change
      </h3>
      <Typography.Title level={5}>Select Flight Number:</Typography.Title>
      <Input label="Select Flight Number: "  placeholder= "Enter Flight Number" onChange={(e)=>setFlight(e.target.value)} value={flight}  />
      <Typography.Title level={5}>Current Flight Date:</Typography.Title>
      <DatePicker
      onChange={(value, dateString) => setDate(dateString)}
    defaultValue={dayjs('2019-09-03', dateFormat)}
    minDate={dayjs('2019-08-01', dateFormat)}
    maxDate={dayjs('2020-10-31', dateFormat)}
  /> 
      <Typography.Title level={5}>Reason for Change:</Typography.Title>
      <Radio.Group
      style={style}
      onChange={onChange}
      value={value}
      options={[
        {
          value: 'Fatigue/ Health Issue',
          label: 'Fatigue/ Health Issue',
        },
        {
          value: 'Flight Disruption or Delay',
          label: 'Flight Disruption or Delay',
        },
        {
          value: 'Regulatory Rest Compliance',
          label: 'Regulatory Rest Compliance',
        },
        {
          value: 'Crew Swap Request',
          label: 'Crew Swap Request',
        },
        {
          value: 'Operational or Training Conflict',
          label: 'Operational or Training Conflict',
        },
        {
          value: 6,
          label: (
            <>
              Other...
              {value === 6 && (
                <Input
                  variant="filled"
                  placeholder="please input"
                  onChange={(e)=>setValue(e.target.value)}
                  value={value}
                  style={{
                    width: 120,
                    marginInlineStart: 12,
                  }}
                />
              )}
            </>
          ),
        },
      ]}
    />
    <div className='buttonRequest'>
    <Button classname="cancelBtn" onclick={handleCancel}>
      Cancel
    </Button>
    {/* <Button classname="sendBtn" onclick={handelRequest}>
      Send Request
    </Button> */}
    <CommonModal handleOk={handelRequest} btnText="Send Request" title="Sent Request!">
      <p>
      You Have successfully sent the request.
      </p>
    </CommonModal>
    </div>
  
    </div>
  )
}

export default MakeRequest
