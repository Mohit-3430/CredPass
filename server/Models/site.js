import mongoose from "mongoose"

const siteSchema = new mongoose.Schema({
    siteName : {
        type : String,
        required : true
    },
    uname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    user : { type : mongoose.Schema.Types.String, ref:`User`}

}, { timestamps: true });

// it will loockup for *"sites"* collections
export const Site = mongoose.model('Site', siteSchema);
