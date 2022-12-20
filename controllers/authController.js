const bcrypt = require("bcrypt");

const User = require("../models/User");


exports.createUser = async (req, res) => {
   try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "succcess",
      user,
    });
  } catch(error) {
    res.status(400).json({
      status: "bad request",
      error,
    });
  }
};
exports.userLogin = async (req, res) => {
  try {
    const {email,password}= req.body;
    let user= await User.findOne({email:email});
    let isSame=await bcrypt.compare(password,user.password);
    if (isSame) {
      req.session.userID=user._id;
      res.status(200).redirect('/');
    }
    else{
      send("err")
    }
 } catch(error) {
   res.status(400).json({
     status: "bad request",
     error,
   });
 }
};

exports.userLogout= async (req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}
