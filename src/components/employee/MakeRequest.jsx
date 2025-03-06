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
const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};
function MakeRequest({setMakeRequest}) {
  const [date, setDate] = React.useState("");
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleCancel = () => {
    console.log('Cancel');
    setMakeRequest(false);
  }
  const handelRequest = () => {
    console.log('Request Sent');
    // API CODE HERE
  }
  return (
    <div>
      <h3>
      Request Schedule Change
      </h3>
      <Typography.Title level={5}>Select Flight Number:</Typography.Title>
      <Input label="Select Flight Number: "  placeholder= "Enter Date" onChange={(e)=>setDate(e.target.value)} value={date}  />
      <Typography.Title level={5}>Current Flight Date:</Typography.Title>
      <DatePicker
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
          value: 1,
          label: 'Fatigue/ Health Issue',
        },
        {
          value: 2,
          label: 'Flight Disruption or Delay',
        },
        {
          value: 3,
          label: 'Regulatory Rest Compliance',
        },
        {
          value: 4,
          label: 'Crew Swap Request',
        },
        {
          value: 5,
          label: 'Operational or Training Conflict',
        },
        {
          value: 6,
          label: (
            <>
              Other...
              {value === 4 && (
                <Input
                  variant="filled"
                  placeholder="please input"
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
