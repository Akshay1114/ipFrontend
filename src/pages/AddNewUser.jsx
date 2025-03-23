import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { wingWiseApi } from "../utils/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';

function AddNewUser() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    employeeId: "3847956V",
    dob: "",
    resume: null,
    profilePicture: null,
    role: "",
    hireDate: "",
    jobTitle: "",
    assignManager: "",
    weeklyHours: "",
    agreeTerms: false,
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
    const requiredFields = ['fullName', 'age', 'email', 'phone', 'dob', 'resume', 'profilePicture', 'role', 'hireDate', 'jobTitle', 'assignManager', 'weeklyHours'];
    let missingFields = [];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      toast.error(`The following fields are required: ${missingFields.join(', ')}`);
      return;
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to the Terms and Conditions.");
      return;
    }

    wingWiseApi.post("/user/signup", formData)
      .then((res) => {
        toast.success("User added successfully");
      })
      .catch((err) => {
        setError("Failed to add user.");
      });
  };

  return (
    <div className="add-new-user-container">
      <ToastContainer />
      <h2>Add New Employee / Manager</h2>

      {/* General Information */}
      <div className="add-new-user-section">
        <h3>General Information</h3>
        <div className="add-new-user-grid">
          <div className="add-new-user-field">
            <label>Full Name <span className="required">*</span></label>
            <input type="text" name="fullName" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Age <span className="required">*</span></label>
            <input type="number" name="age" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Email Address <span className="required">*</span></label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Phone Number <span className="required">*</span></label>
            <input type="text" name="phone" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Employee ID</label>
            <input type="text" name="employeeId" />
          </div>
          <div className="add-new-user-field">
            <label>Date Of Birth <span className="required">*</span></label>
            <input type="date" name="dob" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Resume/ CV <span className="required">*</span></label>
            <input type="file" name="resume" accept=".jpg, .jpeg" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Profile Picture <span className="required">*</span></label>
            <input type="file" name="profilePicture" accept=".jpg, .jpeg" onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Define Role */}
      <div className="add-new-user-section">
        <h3>Define Role</h3>
        <div className="add-new-user-grid">
          <div className="add-new-user-field">
            <label>Role <span className="required">*</span></label>
            <select name="role" onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="add-new-user-field">
            <label>Joining Date <span className="required">*</span></label>
            <input type="date" name="hireDate" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Job Title <span className="required">*</span></label>
            <input type="text" name="jobTitle" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Assign Manager <span className="required">*</span></label>
            <input type="text" name="assignManager" onChange={handleChange} />
          </div>
          <div className="add-new-user-field">
            <label>Weekly hours <span className="required">*</span></label>
            <input type="number" name="weeklyHours" onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="add-new-user-checkbox">
        <input type="checkbox" name="agreeTerms" onChange={handleChange} />
        <label>I agree to the Terms and Conditions and confirm the accuracy of the user information.</label>
      </div>
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
  );
}

export default AddNewUser;
