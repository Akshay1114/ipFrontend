import React from "react";

function Tab3() {
    return (
        
        <div className="request-container">

            {/* Left Section: Request Summary + All Requests */}
            <div className="request-left">

                
                {/* Request Summary */}
                <div className="request-summary">
                    <div className="request-card request-card1">
                        <h3>12</h3>
                        <p>Total Requests</p>
                    </div>
                    <div className="request-card">
                        <h3>02</h3>
                        <p>Pending Requests</p>
                    </div>
                    <div className="request-card">
                        <h3>07</h3>
                        <p>Approved Requests</p>
                    </div>
                    <div className="request-card">
                        <h3>03</h3>
                        <p>Rejected Requests</p>
                    </div>
                </div>

                {/* Requests List */}
                <div className="request-list">
                    <h4>All Requests</h4>
                    <div className="request-item">
                        <div className="request-item-header">
                            <p><strong>Type:</strong> Fatigue Leave</p>
                            <span className="request-status request-pending">Pending</span>
                        </div>
                        <p className="request-item-description">
                            I’ve had several long shifts recently, and I need a break to recover from fatigue.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section: Leave Balance */}
            <div className="request-right">
                <div className="request-leave-balance">
                    <h3>Leave Balance</h3>

                    {/* Annual Leave */}
                    <div className="request-leave-item">
                        <div className="request-leave-item-content">
                            <span>Annual Leave</span>
                            <span>12/30 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "40%" }}></div>
                        </div>
                    </div>

                    {/* Fatigue Leave */}
                    <div className="request-leave-item">
                        <div className="request-leave-item-content">
                            <span>Fatigue Leave</span>
                            <span>3/10 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "30%" }}></div>
                        </div>
                    </div>

                    {/* Sick Leave */}
                    <div className="request-leave-item">
                        <div className="request-leave-item-content">
                            <span>Sick Leave</span>
                            <span>5/10 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "50%" }}></div>
                        </div>
                    </div>

                    {/* Maternity/Paternity Leave */}
                    <div className="request-leave-item">
                        <div className="request-leave-item-content">
                            <span>Maternity/Paternity Leave</span>
                            <span>0/30 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "0%" }}></div>
                        </div>
                    </div>

                    {/* Emergency Leave */}
                    <div className="request-leave-item">
                        <div className="request-leave-item-content">
                            <span>Emergency Leave</span>
                            <span>3/5 Days</span>
                        </div>
                        <div className="request-leave-bar">
                            <div style={{ width: "60%" }}></div>
                        </div>
                    </div>

                    {/* Unpaid Leave */}
                    <div className="request-leave-item">
                        <div className="request-leave-item-content">
                            <span>Unpaid Leave</span>
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
