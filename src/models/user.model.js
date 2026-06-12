const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,"Email is required"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,"Invalid email address"],
        unique:[true,"Email already exists"],
    },
    name:{
        type: String,
        required:[true,"Name is required"],

    },
    password:{
        type: String,
        required:[true,"Password is required"],
        minlength:[6,"Password should be at least 6 characters"],
        select: false,
    },
},{
    timestamps:true,
})