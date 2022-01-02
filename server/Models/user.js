import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    
   emailId: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    regMobile: {
        type: Number
    },
    uname : {
        type : String,
        required : true,
        unique : true,
    }
    
}, { timestamps: true });

// it will look up for *"users"* collections
export const User = mongoose.model('User', userSchema);
