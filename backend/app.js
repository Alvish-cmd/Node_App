const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const multer = require('multer');
const cors = require('cors');



const indexRouter = require('./routes/index.routes');
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

mongoose.connect(MONGODB_URI)
  .then(() => {
    // console.log("Database Connected");
    app.listen(PORT,()=>{
      console.log(`App is Running On : http://localhost:${PORT}`)
    })
  })
  .catch(err => console.log(err))
module.exports = app;
