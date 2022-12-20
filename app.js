const express = require('express');
const mongoose= require('mongoose');
const session = require('express-session')
const mongoStore = require('connect-mongo');
require("dotenv").config();
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute= require("./routes/userRoute")

const port = 3000;
const app = express();

//Connect to Db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("db connected");
}).catch((err)=>{
  console.log(err);
})
//Global Var
global.userIN=null;

//Template Engine
app.set('view engine','ejs')

//Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'black cat',
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({ mongoUrl: process.env.DB_URL })
}))


//Routes
app.use('*',(req,res,next)=>{
  userIN=req.session.userID;
  next();
})
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);


app.listen(port, () => {
  console.log(`port ${port} active`);
});
