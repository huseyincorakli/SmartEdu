const express = require('express');
const mongoose= require('mongoose');
require("dotenv").config();
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute= require("./routes/userRoute")

const port = 3000;
const app = express();

//Connect to Db
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.USERNAME_ID}:${process.env.USER_PASSWORD}@pcatapp.h8qnibt.mongodb.net/test2`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("db connected");
}).catch((err)=>{
  console.log(err);
})

//Template Engine
app.set('view engine','ejs')

//Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);


app.listen(port, () => {
  console.log('port active');
});
