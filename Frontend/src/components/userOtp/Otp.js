import React, { useState } from "react";
import ResendOTP from "./ResendOTP";
import OTPInput from './Hooks/OTPRender'
import Swal from "sweetalert2";
import './Otp.css'

const OtpInputCard = ({ title, resendOTP, ...rest }) => {

    const [OTPS, setOTP] = useState("");
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRmNmVjZDU2MzA0ZGEwMzliNzVmZWYiLCJpYXQiOjE2ODMwMjc0MjAsImV4cCI6MTY4MzA0MTgyMH0.-sQVS5DI9mQFW9Fw072M5AZ5gu8pj_FRECSkkdAOVIA'
    const config = {
        otp: OTPS
      }
    const handleSubmit = (props) => {
        if (OTPS.length <= 5) {
            Swal.fire({
                icon: 'error',
                text: 'Please Fill all the Filed of Otp ',
            })
        }
        if (OTPS.length === 6) 
        fetch('http://localhost:8000/otp', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      })
        .then((response) => 
        {
          if (response.status === 200) {
            
            props.history.push("/home"); 
          }
          if (response.status === 404) {
            props.history.push("/login");
          }
          if (response.status === 211) {
            console.log(response);
          }
          return response.json()
        })
        .catch((error) => console.error(error));
    }
    function handleResend() {
    }
    return (
        <div
            style={{
                padding: 19,

            }}
        >
            <div style={{ marginBottom: 19 }}>{title}</div>
            <OTPInput value={OTPS} onChange={setOTP} {...rest} />
            <div className="box-1">
                <div className="btn btn-one" onClick={handleSubmit}>
                    <span>Continue</span>
                </div>
            </div>
            <div onClick={handleResend} >
                <ResendOTP />
            </div>
        </div>
    );
};

function Otp() {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}>
            <h2>OTP</h2>
            <div className="container">
                <OtpInputCard
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    resendOTP={{}}
                />

            </div>
        </div>
    );
}

export default Otp;
