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

        <h2><span className="request-name">{ele.name}</span>{ele.leaveType}</h2>
            {/* <p className="request-item-description request-item-above">
                {ele.reason}
            </p> */}
            {/* <div className="request-item-header request-item-header1">
                <p> Flight : {ele.flightId} | Date: {ele.start_date} </p> */}
                {/* <span className="request-status request-pending animate-item">{ele.status}</span> */}
                
            {/* </div> */}
            <p className="request-item-description request-item-above">
                                {ele.reason}
                </p>
                <div className='adminScheduleReq'>
                    <p> Flight : {ele.flightId} | Date: {ele.start_date} </p>


                        <div className='requestAdminBtn'>
                            <button className='requestAdminApprove' onClick={()=>handleApprove(ele._id)}>
                                Approve
                            </button>
                            <button className='requestAdminReject' onClick={()=>handleReject(ele._id)}>
                                Reject
                            </button>
                        </div>
                        
                    </div>

            {/* <div className="request-item-header request-item-header1">

                
                <p><strong>Type:</strong> {ele.leaveType}</p> */}
                {/* <span className="request-status request-pending animate-item">{ele.status}</span> */}
                
            {/* </div> */}
            {/* <div>
                <p className="request-item-description request-item-above">
                                {ele.reason}
                </p>
            </div>
                    <div className='adminScheduleReq'>
                    <p><span className="request-name">Name : {ele.name}</span> | Flight : {ele.flightId} | Date: {ele.start_date} </p>


                        <div className='requestAdminBtn'>
                            <button className='requestAdminApprove' onClick={()=>handleApprove(ele._id)}>
                                Approve
                            </button>
                            <button className='requestAdminReject' onClick={()=>handleReject(ele._id)}>
                                Reject
                            </button>
                        </div>
                        
                    </div> */}
            
            
        </div>)
      }
      
    </div>
  )
}

export default Tab3
