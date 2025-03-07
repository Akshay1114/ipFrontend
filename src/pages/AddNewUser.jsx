import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { wingWiseApi } from "../utils/AxiosInstance";


function AddNewUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "360234",
    dob: "",
    qualificationFile: null,
    profilePicture: null,
    role: "",
    hireDate: "",
    jobTitle: "",
    assignManager: "",
    maxWeeklyHours: "",
    availableStart: "",
    preferredShifts: "",
    availableEnd: "",
    sendInvitation: false,
  });

  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };
  

  const handleSignup = () => {
    wingWiseApi.post("/user/signup", {
        name: `${formData.firstName} ${formData.lastName}`,
        mobile: formData.phone,
        address: formData.address,
        email: formData.email,
        isDeleted: false,
        qualification: formData.qualification,
      })

      
      .then((res) => {
        console.log("Signup Successful:", res.data);
        navigate("/reset-password", { replace: true });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            setError("User already exists. Try a different email or phone number.");
          } else {
            setError(`Signup failed: ${err.response.data.message || "Unknown error"}`);
          }
        } else {
          setError("Network error. Please try again.");
        }
        console.error("Signup Error:", err);
      });
  };
  

  return (
    <div className="add-new-user-container">
      {/* Navigation Bar */}
      {/* <div className="add-new-user-nav">
        <h1 className="add-new-user-title">WingWise</h1>
        <div className="add-new-user-menu">
          <button>Overview</button>
          <button>Schedule</button>
          <button>Health Insights</button>
          <button>Fatigue & Duty Limits</button>
        </div>
        <div className="add-new-user-icons">
          <span className="add-new-user-icon">Notification-Icon</span>
          <span className="add-new-user-icon">User-Icon</span>
        </div>
      </div>
 */}

      {/* Form Section */}
      <div className="add-new-user-form-container">
        <h2>Add Employee / Manager</h2>

        {/* General Information */}
        <div className="add-new-user-section">
          <h3>General Information</h3>
          <div className="add-new-user-grid">
            <div className="add-new-user-field">
              <label>First Name *</label>
              <input type="text" name="firstName" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Last Name *</label>
              <input type="text" name="lastName" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Email Address *</label>
              <input type="email" name="email" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Phone No *</label>
              <input type="text" name="phone" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Employee ID</label>
              <input type="text" name="employeeId" value={formData.employeeId} disabled />
            </div>
            <div className="add-new-user-field">
              <label>Date of Birth</label>
              <input type="date" name="dob" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Qualification*</label>
              <select name="qualification" onChange={handleChange}>
                <option value="">Select Qualification</option>
                <option value="APTL">ATPL</option>
                <option value="CPL">CPL</option>
                <option value="PPL">PPL</option>
              </select>
            </div>
            <div className="add-new-user-field">
              <label>Qualification Certificates *</label>
              <input type="file" name="qualificationFile" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Profile Picture *</label>
              <input type="file" name="profilePicture" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Define Role */}
        <div className="add-new-user-section">
          <h3>Define Role</h3>
          <div className="add-new-user-grid">
            <div className="add-new-user-field">
              <label>Role *</label>
              <select name="role" onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="pilot">Pilot</option>
                {/* <option value="manager">Manager</option> */}
              </select>
            </div>
            <div className="add-new-user-field">
              <label>Hire Date *</label>
              <input type="date" name="hireDate" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Job Title</label>
              <input type="text" name="jobTitle" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Assign Manager *</label>
              <input type="text" name="assignManager" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="add-new-user-section">
          <h3>Schedule</h3>
          <div className="add-new-user-grid">
            <div className="add-new-user-field">
              <label>Max Weekly Hours *</label>
              <input type="number" name="maxWeeklyHours" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Available Start Time</label>
              <input type="time" name="availableStart" onChange={handleChange} />
            </div>
            <div className="add-new-user-field">
              <label>Preferred Shifts</label>
              <select name="preferredShifts" onChange={handleChange}>
                <option value="">Select Shift</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div className="add-new-user-field">
              <label>Available End Time</label>
              <input type="time" name="availableEnd" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="add-new-user-checkbox">
          <input type="checkbox" name="sendInvitation" onChange={handleChange} />
          <label>Send Invitation and One Time Password to login</label>
        </div>

        {/* Buttons */}
        <div className="add-new-user-buttons">
          <button className="add-new-user-cancel">Cancel</button>
          <button className="add-new-user-submit" onClick={handleSignup}>Add New User</button>
        </div>
      </div>
    </div>
  );
}

export default AddNewUser;