import React, { useEffect, useState } from 'react'
import { wingWiseApi } from '../../../utils/AxiosInstance'
import { ToastContainer, toast } from 'react-toastify';

function Tab3() {
    const [ allRequest, setRequest] = useState([])
    const [isLoading, setIsLoading] = useState(true);
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

    const handleApprove = (id) => {
        // Logic to approve the request
        console.log("Request Approved", id);
        wingWiseApi.post(`/user/changeSchedule`, { id, status: "Approved" })
        .then((res)=>{
            console.log(res.data);
            toast.success("Request Approved successfully");
            setRequest((prev) => prev.map((ele) => ele._id === id ? { ...ele, status: "Approved" } : ele));
            setIsLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setIsLoading(false);
        })
    }
    const handleReject = (id) => {
        // Logic to reject the request
        console.log("Request Rejected", id);
        wingWiseApi.post(`/user/changeSchedule`, { id, status: "Rejected" })
        .then((res)=>{
            console.log(res.data);
            toast.success("Request Rejected successfully");
            setRequest((prev) => prev.map((ele) => ele._id === id ? { ...ele, status: "Rejected" } : ele));
            setIsLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setIsLoading(false);
        })
    }

  return (
    <div>
          <ToastContainer />
      {
        allRequest
        .filter((ele) => ele.status === "Pending")
        .map((ele, index) => <div key={index} className="request-item animate-item">
            <div className="request-item-header request-item-header1">
                <p><strong>Type:</strong> Fatigue Leave</p>
                {/* <span className="request-status request-pending animate-item">{ele.status}</span> */}
                <div className='adminScheduleReq'>
                    <button className='requestAdminApprove' onClick={()=>handleApprove(ele._id)}>
                        Approve
                    </button>
                    <button className='requestAdminReject' onClick={()=>handleReject(ele._id)}>
                        Reject
                    </button>
                    </div>
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
