const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
        isAdmin: { type: Boolean, required: true, default: false }
    
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
//save krne se pehle
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);// the higher the no the stronger the encryption
    this.password = await bcrypt.hash(this.password, salt);
    //db mai save krne se pehle it'll encrypt
})
const User = mongoose.model("User", userSchema);

module.exports = User;