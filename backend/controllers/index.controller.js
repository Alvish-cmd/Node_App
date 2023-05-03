require('dotenv').config();
const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTP = require('../models/otp')

const Userdb = require('../models/model')

// For Mail sent main section

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "alvishpatel786@gmail.com",
    pass: "hyfdrwgqdjgnupry"
    // pass: "sjpypyxxbgeksnvu",
  },
});

exports.getUser = async (req, res) => {
  const data = await Userdb.find()
  try {
    res.json(data)
  } catch (error) {
    console.log(error);
  }
}


exports.signup = async (req, res) => {
  const errors = validationResult(req);
  const file = req.file;
  try {
    if (!errors.isEmpty()) {
      const alert = errors.array()[0].msg;
      res.status(211).json({
        "success": false,
        "message": "somthing went wrong",
        "data": { "alert": alert }
      })
    }
    else {
      // const hashPassword = await bcrypt.hash(req.body.password,12)
      const user = new Userdb({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        image: req.body.image
      })
      await user.save()
      res.status(201).json({
        "success": true,
        "message": "register success",
        "data": {}
      })
    }
  } catch (error) {
    console.log(error);
  }
}

exports.postOtp = async (req, res, next) => {
  const otp = req.body.otp
  const otps = await OTP.findOne({ userId: userId });

  if (!otps) {
    console.log("otp is expired");
    res.status(404).json("otp expire");
  } else {
    if (otps.otp == otp) {

      const result = await OTP.findOneAndDelete({ userId });
      res.status(200).json("sucessfully otp verify")
    } else {
      res.status(404).json("otp invalid");
    }
  }
};



exports.login = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const alert = errors.array()[0].msg;
      const error = res.status(211).json({
        "success": false,
        "message": "somthing went wrong",
        "data": { "alert": alert },
      })
    }
    else {
      const userData = await Userdb.findOne({
        email: req.body.email.toLowerCase(),
        password: req.body.password
      })
      if (userData) {
        const token = jwt.sign(
          { userId: userData._id },
          'this is secret key',
          { expiresIn: "4h" }
        );
        res.setHeader("token", token, { httpOnly: false });
        let generateOtp = Math.floor(100000 + Math.random() * 900000);
        const message = {
          from: "dtest6654@gmail.com",
          to: req.body.email,
          subject: "OTP",
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Service Management Team</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Our Website. Use the following OTP to complete your Log in procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${generateOtp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Service Management Team</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Service Management Team Inc</p>
          <p>Ahemdabad</p>
          <p>Gujrat,India</p>
        </div>
      </div>
    </div>`,
        };
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent ...", info.response);
          }
        });
        const otpModel = new OTP({
          userId: userData._id,
          otp: generateOtp,
        });
        const savedOtp = await OTP.findOneAndDelete({
          userId: userData._id,
        });
        await otpModel.save();
        return res.status(200).json({
          "success": true,
          "message": "Otp sent Sucessfully",
          "data": { "token": token }
        })
      }
      else {
        res.status(211).json({
          "success": false,
          "message": "password not match",
          "data": {}
        })
      }
    }


  } catch (error) {
    console.log(error);
  }
}

exports.sendlink = async (req, res) => {

  const email = req.body.email.toLowerCase()
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" })
  }
  try {
    const user = await Userdb.findOne({ email: email })
    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        'this is secret key',
        { expiresIn: "300s" }
      );
      const setusertoken = await Userdb.findByIdAndUpdate({ _id: user._id }, { verifytoken: token }, { new: true })
      console.log("🚀 ~ file: index.controller.js:180 ~ exports.sendlink=async ~ setusertoken:", setusertoken)
    }
    if (setusertoken) 
    {

      const message = 
      {
        from: "dtest6654@gmail.com",
        to: req.body.email,
        subject: "Forget Password Link",
        html: `'<p>Click <a href="http://localhost:3000/forgetpassword/${user._id}/${setusertoken.verifytoken}'">click here</a> to reset your password</p>'`,
      };
      transporter.sendMail(message, (error, info) => 
      {
        if (error) {
          console.log(error);
          res.status(401).json({ status: 401, message: "email not sent" })
        } else {
          console.log("Email sent ...", info.response);
          res.status(201).json({ status: 201, message: "email sent Succsfully" })
        }
      });
    }
  }
  catch(error){
    res.status(401).json({status:401,message:"invalid user"})
  }
  
}