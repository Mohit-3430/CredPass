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
    },
    two_fa_status :{
        type : Boolean,
        default : false
    },
    qrCode : {
        type: String,
    },
    base32:{
        type: String
    }
    
}, { timestamps: true });

// it will look up for *"users"* collections
export const User = mongoose.model('User', userSchema);
