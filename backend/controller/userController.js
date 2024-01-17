const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.statusCode(400);
        throw new Error("Please Enter All The Feilds");
    }
    const userExists = await User.findOne({ email });
             
    if (userExists) {
        res.statusCode(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    if (user) {
        res.statusCode(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        });
    }
    else {
        res.status(500);
        throw new Error("Failed");
    }

});


module.exports = {registerUser}