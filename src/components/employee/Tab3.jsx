import React, { useEffect, useState } from "react";
import { wingWiseApi } from "../../utils/AxiosInstance";

function Tab3() {
    const [ allRequest, setRequest] = useState([])
    useEffect(()=>{
        wingWiseApi.get(`/user/getRequestChangeSchedule?id=123456`)
        .then((res)=>{
            console.log(res.data);
            setRequest(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    console.log("allRequest =>", allRequest);
    return (
        <div className="request-container">
            <div className="request-left">
                <div className="request-summary">
                  <div className="request-card request-card1 animate-card">
                        <h3>12</h3>
                        <p>Total Requests</p>
                    </div>
                    <div className="request-card request-card2 animate-card">
                        <h3>02</h3>
                        <p>Pending Requests</p>
                    </div>
                    <div className="request-card request-card3 animate-card">
                        <h3>07</h3>
                        <p>Approved Requests</p>
                    </div>
                    <div className="request-card request-card4 animate-card">
                        <h3>03</h3>
                        <p>Rejected Requests</p>
                    </div>
                </div>

                <div className="request-list">
                    <h4>All Requests</h4>
               { allRequest.map((ele,index) => <div key={index} className="request-item animate-item">

                        <div className="request-item-header request-item-header1">
                            <p><strong>Type:</strong> Fatigue Leave</p>
                            <span className="request-status request-pending animate-item">{ele.status}</span>
                        </div>
                        <p className="request-item-description request-item-above">
                            I’ve had several long shifts recently, and I need a break to recover from fatigue.
                        </p>
                    </div>)}

                    {/* Fatigue Leave Request Section */}
                    <div className="request-item animate-item">
                        <div className="request-item-header">
                            <p><strong><img src="src/assets/images/🤖 AI Generated Avatars_ Priya Patel.png" alt="" />Fatigue Leave Request</strong> </p>
                        </div>
                        <p><span className="request-name">Nidhi Gandhi</span> | First Officer</p>

                        <p className="request-item-description ">
                            Reason: I am experiencing severe fatigue due to insufficient rest between shifts. To ensure safety and optimal performance, I request fatigue leave for recovery.
                        </p>
                        <div className="request-item-footer">
                            <p className="request-item-description request-item-description2">
                                <strong>Leave Date:</strong> 23 March, 2023
                            </p>
                            <p className="request-item-description request-item-description2">
                                <strong>Flights Assigned:</strong> <a href="#">E2387</a>, <a href="#">M24323</a>
                            </p>
                            <span className="request-status request-pending request-pending2 animate-item">Pending</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="request-right">
                <div className="request-leave-balance animate-card4">
                    <h3>Leave Balance</h3>

                    <div className="request-leave-item animate-item">
                        <div className="request-leave-item-content">
                            <span>Annual Leave </span>
                            <span>12/30 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "40%" }}></div>
                        </div>
                    </div>

                    <div className="request-leave-item animate-item">
                        <div className="request-leave-item-content">
                            <span>Fatigue Leave </span>
                            <span>3/10 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "30%" }}></div>
                        </div>
                    </div>

                    <div className="request-leave-item animate-item">
                        <div className="request-leave-item-content">
                            <span>Sick Leave </span>
                            <span>5/10 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "50%" }}></div>
                        </div>
                    </div>

                    <div className="request-leave-item animate-item">
                        <div className="request-leave-item-content">
                            <span>Maternity/Paternity Leave </span>
                            <span>0/30 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "0%" }}></div>
                        </div>
                    </div>

                    <div className="request-leave-item animate-item">
                        <div className="request-leave-item-content">
                            <span>Emergency Leave </span>
                            <span>3/5 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "60%" }}></div>
                        </div>
                    </div>

                    <div className="request-leave-item animate-item">
                        <div className="request-leave-item-content">
                            <span>Unpaid Leave </span>
                            <span>2 Days Taken</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "100%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tab3;
