require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/model');

const authenticateToken = async (req, res, next) => {
    const token = await req.cookies.token;
    console.log("🚀 ~ file: isauth.js:7 ~ authenticateToken ~ token:", token)
    try {
            if (token) {
                const bearerToken = await jwt.verify(token,'this is secret key');
                if (bearerToken) {
                    const user = await User.findById({ _id: bearerToken.userId });
                        if (user) {
                            email = user.email;
                            userName = user.name;
                            role = user.role;
                            userId = user._id;
                            next();
                        }
                    
                }
                else {
                    res.status(404).json("invalid data");
                }
            }
            else {
                res.status(404).json('invalid data');
            }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = authenticateToken;
