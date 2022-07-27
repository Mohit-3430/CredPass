import mongoose from "mongoose"
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail.js';
import { VaultOwnSchema, MFASchema, VaultSharedSchema } from "./NestedSchemas/index.js";

const userSchema = new mongoose.Schema({

    emailId: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Minimum lenght of password should be 6 characters']
    },
    regMobile: {
        type: Number
    },
    uname: {
        type: String,
        required: [true, 'Please enter a user name'],
        unique: true,
    },
    mfa_details: { type: MFASchema, default: {} },
    vault_own: [VaultOwnSchema],
    vault_shared: [VaultSharedSchema]

}, { timestamps: true });

// If we use arrow function "this" is not accessible
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// it will look up for *"users"* collections
export const User = mongoose.models.User || mongoose.model("User", userSchema);
