import mongoose from "mongoose"

const siteSchema = new mongoose.Schema({
    siteUrl: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.Types.String, ref: `User` }

}, { timestamps: true });

// it will loockup for *"sites"* collections
export const Site = mongoose.model('Site', siteSchema);
