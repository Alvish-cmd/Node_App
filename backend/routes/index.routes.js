const express = require('express');
const { check } = require('express-validator');
const indexController = require('../controllers/index.controller');
const multer = require('multer');
const auth = require('../middlewere/isauth')
const Userdb = require('../models/model');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("🚀 ~ file: index.routes.js:21 ~ file:", file)
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, 'public/upload')
        }
        else {
            cb(null, 'public/files')
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split('.')[0] + "_" + Date.now() + "." + file.originalname.split('.')[1])
    }
});
const upload = multer({ storage: storage }).fields([{ name: 'document', maxCount: 1 }, { name: 'image', maxCount: 1 }])

/* GET home page. */

router.post('/signup', upload,
    check('firstName', 'First Name should not be empty')
        .notEmpty(),
    check('lastName', 'Last Name should not be empty')
        .notEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail()
        .notEmpty()
        .custom(async (value, { req }) => {
            const userData = await Userdb.findOne({ email: value.toLowerCase() })
            if (userData) {
                return Promise.reject('Email already exists, please pick a different one.');
            }
        }),
    check('password', "Password must be in 7 digit or greater")
        .isLength({ min: 7 })
        .isAlphanumeric()
        .notEmpty()
    // check('Dob', 'Dob should not be empty')
    //     .notEmpty()
    , indexController.signup);

router.post("/login", check('email', 'Please enter a valid email')
    .isEmail()
    .notEmpty()
    .custom(async (value, { req }) => {
        const userData = await Userdb.findOne({ email: value.toLowerCase() })
        if (!userData) {
            return Promise.reject('Email does not exists');
        }
    }), check('password', "Password must be in 7 digit or greater")
        .isLength({ min: 7 })
        .isAlphanumeric()
        .notEmpty(), indexController.login)


router.post("/otp", auth, indexController.postOtp)

router.post("/sendpasswordlink", indexController.sendlink)

router.post("/forgetpassword/:id/:token", indexController.resetpassword)


// Service Routes
router.get("/getServiceList", indexController.getServiceList)

// For add Service Getting a user list in DropDown
router.get("/getuser", indexController.getService)

// For add a Serice 
router.post("/addService",indexController.addService);

// For edit service use this data 
router.get("/getservice/:id",indexController.getedit);

// For update a service data 
router.post("/postservice",indexController.postedit);

// For deleate a service data
router.get("/getdelete",indexController.getdelete);



// 
router.get("/getCustomerServiceList", indexController.getCustomerServiceList)

module.exports = router;
