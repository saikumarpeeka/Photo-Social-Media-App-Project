const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A user must have a username"],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        index: true,   
    },
    email: {
        type: String,
        required: [true,"A user must have an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true,"A user must have a password"],
        minlength: 8,
        select: false,  
    },
    passwordConfirm: {
        type: String,
        required: [true,"Please confirm your password"],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            message: "Passwords are not the same",
        },
    },
    profilePicture: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 150,
        default: "Hey there! I am using Gojira",
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    resetPasswordOTP: {
        type: String,
        default: null,
    },
    resetPasswordOTPExpires: {
        type: Date,
        default: null,
    },
},{
    timestamps: true,
}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (userPassword, databasePassword) {
    return await bcrypt.compare(userPassword, databasePassword);
};

const User = mongoose.model("User",userSchema);
module.exports = User;