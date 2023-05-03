import React, { useState } from "react";
// import ResendOTP from "./ResendOTP";
// import OTPInput from './Hooks/OTPRender'
// import Swal from "sweetalert2";
// import './Otp.css'
import authService from "../../service/authService";
import { useHistory } from "react-router-dom";

// const OtpInputCard = ({ title, resendOTP, ...rest }, props) => {
//     const history = useHistory()    
//     const [OTPS, setOTP] = useState("");
//     const getToken = localStorage.getItem('token')

//     if (authService.isLoggedIn()) {
//         props.history.push("./home");
//     }
//     const handleSubmit = async () => {
        
//         try {

//             const config = {
//                 otp: OTPS,

//             }
//             console.log("🚀 ~ file: Otp.js:20 ~ handleSubmit ~ config:", config)

//             if (OTPS.length <= 5) {
//                 Swal.fire({
//                     icon: 'error',
//                     text: 'Please Fill all the Filed of Otp ',
//                 })
//             }
//             if (OTPS.length === 6) {
//                 const response = await fetch('http://localhost:8000/otp',
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             "Authorization": `Bearer ${getToken}`
//                         },
//                         body: JSON.stringify(config)
//                     });
//                 const Response = await response.json()
//                 if (response.status === 200) {
//                     history.push("/home");
//                 }
//                 if (response.status === 404) {
//                     history.push('/otp')
//                 }
//                 if (response.status === 211) {
//                     console.log(response);
//                 }

//             }
//         }
//         catch (error) { console.log(error) };
//     }
//     return (
//         <div
//             style={{
//                 padding: 19,

//             }}
//         >
//             <div style={{ marginBottom: 19 }}>{title}</div>
//             <OTPInput value={OTPS} onChange={setOTP} {...rest} />
//             <div className="box-1">
//                 <div className="btn btn-one" onClick={handleSubmit}>
//                     <span>Continue</span>
//                 </div>
//             </div>
//             <div  >
//                 <ResendOTP />
//             </div>
//         </div>
//     );
// };

// function Otp() {

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexDirection: "column",
//             }}>
//             <h2>OTP</h2>
//             <div className="container">
//                 <OtpInputCard
//                     autoFocus
//                     OTPLength={6}
//                     otpType="number"
//                     disabled={false}
//                     resendOTP={{}}
//                 />

//             </div>
//         </div>
//     );
// }

// export default Otp;


const Otp = (props) => {
    const history = useHistory()    
        const [OTPS, setOTP] = useState("");
        const getToken = localStorage.getItem('token')
    
        if (authService.doLogIn()) {
            props.history.push("./home");
        }
        const handleSubmit = async () => {
            
            try {
    
                const config = {
                    otp: OTPS,
    
                }
                console.log("🚀 ~ file: Otp.js:20 ~ handleSubmit ~ config:", config)
    
                if (OTPS.length <= 5) {
                    alert("somthing went wrong")
                }
                if (OTPS.length === 6) {
                    const response = await fetch('http://localhost:8000/otp',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `Bearer ${getToken}`
                            },
                            body: JSON.stringify(config)
                        });
                    const Response = await response.json()
                    if (response.status === 200) {
                        props.history.push("/home");
                    }
                    if (response.status === 404) {
                        props.history.push('/otp')
                    }
                    if (response.status === 211) {
                        console.log(response);
                    }
    
                }
            }
            catch (error) { console.log(error) };
        }
    return (
        <>
        <div><input type="number" value={OTPS} onChange={(e) => { setOTP(e.target.value) }}></input>
        <button type="submit" onClick={handleSubmit}>submit</button></div>

        {/* <div><input type="button">submit</input></div> */}
        </>
    )
}

export default Otp;