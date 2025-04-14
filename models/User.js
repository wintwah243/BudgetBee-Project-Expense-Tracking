const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password:{
        type: String,
        required: function () {
            return !this.googleId; 
        },
    },
    profileImageUrl: {
        type: String, default: null
    },
    verifytoken:{
        type: String,
    },
},
{timestamps: true}
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log("Hashed Password: ", hashedPassword); 
    this.password = hashedPassword;
    next();
});
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
