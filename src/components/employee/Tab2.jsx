import React from 'react';
import { useSelector } from 'react-redux';


function Tab2() {
    const value = useSelector((state) => state.auth);
    console.log("value", value);
  return (
    <div className="dutylimits-container">
      
      {/* Left Section - Employee Details */}
      
      <div className="dutylimits-employee">
        <div className="dutylimits-employee-img">
          <img src="placeholder.jpg" alt="Profile" />
        </div>
        <div className="dutylimits-employee-info">
          <h3>{value.user.name}</h3>
          <p>Position: {value.user.designation}</p>
          <p>Employee ID: {value.user.employee_ID}</p>
        </div>
      </div>

      {/* Right Section - Duty Limits */}
      <div className="dutylimits-content">
        <div className="dutylimits-header">
          <h2>Duty Limits</h2>
          <ul>
            <li>Max Hours per Shift: 8 hours</li>
            <li>Max Hours per Week: 40 hours</li>
            <li>Mandatory Break: 30 minutes after 5 hours</li>
            <li className="dutylimits-alert">Alert: Exceeded weekly hours!</li>
          </ul>
        </div>

        <div className="dutylimits-recent">
          <h3>Recent activities</h3>
          <table className="dutylimits-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Shift length</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sam</td>
                <td>7:00 AM</td>
                <td>7:00 PM</td>
                <td>8 Hrs</td>
                <td className="dutylimits-status">Complaint</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Tab2;
