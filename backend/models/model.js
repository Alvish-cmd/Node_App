const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { verify } = require('jsonwebtoken');

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    dob:{
        type:Date,
    },
    image:{
        type: String,
    },
    verifytoken:{
        type:String,
    }
})



const Userdb = mongoose.model('users',schema)

module.exports = Userdb