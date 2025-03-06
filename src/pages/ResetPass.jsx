import React, { useEffect, useState } from 'react'
// import CommonInput from '../components/commonInput'
import { Button, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { wingWiseApi } from '../utils/AxiosInstance';
import { useLocation } from 'react-router-dom';
import CommonInput from '../components/commonInput';

function ResetPass() {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [userEmail, setEmail] = useState("");
    const location = useLocation();
    useEffect(() => {
        // Parse the query parameters to get the email
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        if (emailParam) {
            setEmail(decodeURIComponent(emailParam));
        console.log(emailParam)
        }
      }, [location]);
    const handleConfirmPass = () => {
        if(newPass == confirmPass){
            console.log("Password matched ==>")
            wingWiseApi.post("/user/changePassword", {
                email:userEmail,
                oldPassword: oldPass,
                password: newPass
            }).then((res) => {
                console.log(res)
                toast.success("Password changed successfully")
            }   
            ).catch((err) => {
                console.log(err)
                toast.error(err, "ERROR")
            })
        }
        else{
            console.log("Password not matched")
            toast.error("Password not matched")
        }
    }
  return (
    <div>
        <ToastContainer />
        <CommonInput
            label="Old Password"
            fields={{
                placeholder: "Old Password",
                type: "password",
                value: oldPass,
                onChange: (e) => setOldPass(e.target.value)
            }}
        />
        <CommonInput
            label="New Password"
            fields={{
                placeholder: "Enter New Password",
                type: "password",
                value: newPass,
                onChange: (e) => setNewPass(e.target.value)
            }}
        />
        <CommonInput
            label="Confirm Password"
            fields={{
                placeholder: "Confirm Password",
                type: "password",
                value: confirmPass,
                onChange: (e) => setConfirmPass(e.target.value),
            }}
        />
        <Button type="primary" onClick={handleConfirmPass}>Submit</Button>
    </div>
  )
}

export default ResetPass
