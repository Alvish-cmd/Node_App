const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const OTP = require('../models/otp')

const Userdb = require('../models/model')

// For Mail sent main section

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "dtest6654@gmail.com",
    pass: "sjpypyxxbgeksnvu",
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

exports.otp = async(req,res)=> {
  const userData = await Userdb.findOne({
    email: req.body.email.toLowerCase(),
  })
  if (userData) {
    let generateOtp = Math.floor(100000 + Math.random() * 900000);
    const message = {
      from: "dtest6654@gmail.com",
      to: req.body.email,
      subject: "OTP",
      html: `<p>Your Login OTP is : <b>${generateOtp}</b>. It's valid upto 5 minutes.</p>`,
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
    res.status(201).json({
      "success": true,
      "message": "Otp sent Sucessfully",
      "data": {}
    })
  }
  else {
    res.status(211).json({
      "success": false,
      "message": "Otp not Sent Sucessfully"
    })
  }
}

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
        let generateOtp = Math.floor(100000 + Math.random() * 900000);
        const message = {
          from: "dtest6654@gmail.com",
          to: req.body.email,
          subject: "OTP",
          html: `<p>Your Login OTP is : <b>${generateOtp}</b>. It's valid upto 5 minutes.</p>`,
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


        res.status(201).json({
          "success": true,
          "message": "Login success",
          "data": {}
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