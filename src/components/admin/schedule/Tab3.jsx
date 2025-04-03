import React, { useEffect, useState } from 'react'
import { wingWiseApi } from '../../../utils/AxiosInstance'

function Tab3() {
    const [ allRequest, setRequest] = useState([])
    useEffect(()=>{
        wingWiseApi.get(`/user/getRequestChangeSchedule?id=admin`)
        .then((res)=>{
            console.log(res.data);
            setRequest(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    ,[])
  return (
    <div>
      {
        allRequest.map((ele,index) => <div key={index} className="request-item animate-item">
            <div className="request-item-header request-item-header1">
                <p><strong>Type:</strong> Fatigue Leave</p>
                <span className="request-status request-pending animate-item">{ele.status}</span>
            </div>
            <p className="request-item-description request-item-above">
                I’ve had several long shifts recently, and I need a break to recover from fatigue.
            </p>
        </div>)
      }
    </div>
  )
}

export default Tab3
