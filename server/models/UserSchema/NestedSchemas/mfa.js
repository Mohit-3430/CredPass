import mongoose from "mongoose"

export const MFASchema = new mongoose.Schema({
    // TOTP
    mfa_type: { type: String, default: null },
    mfa_status: { type: Boolean, default: false },
    mfa_qr: { type: String, default: null },
    mfa_secret: { type: String, default: null }
}, { _id: false })