import React from "react";
import "./styles.css";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/Register/SignUp";
import  ForgetPassword  from "./components/password_reset/ForgetPassword";
import  PasswordReset  from "./components/password_reset/PasswordReset";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Dashboard/Home";
import Otp from './components/userOtp/Otp'




export default function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/Signup" component={SignUp} />
      <Route path="/password-reset" component={PasswordReset} />
      <Route path="/forgetpassword" component={ForgetPassword} />
      <Route
        path="/home"
        render={(props) => <Home display={true} {...props} />}
      />
      <Route
        path="/otp"
        render={(props) => <Otp display={true} {...props} />}
      />
      {/* <Redirect to="/login" /> */}
    </Switch>
  );
}
