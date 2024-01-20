const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const  generateToken  = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter All The Feilds");
    }
    const userExists = await User.findOne({ email });
             
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        });
    }
    else {
        res.status(500);
        throw new Error("Failed");
    }

});


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// /api/user?search=fatima => this will give the results from the db
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    //anyof the statement in the braces can be true
    $or: [
      { "name": { "$regex": req.query.search, "$options": "i" } },// i is due to case insensitivity many other options available
      { "email": { "$regex": req.query.search, "$options": "i" } }// regex helps in pattern matching in mongodb
    ]
  }
    : {};
  const users = await User.find(keyword).find({_id: { $ne: req.user._id }});
  res.send(users);
});

module.exports = {registerUser, authUser, allUsers}