import mongoose from "mongoose"
import { encrypt } from "../../configs/EncryptionHandler.js";

export const WebsiteSchema = new mongoose.Schema({
    websiteName: {
        type: String,
        required: true
    },
    websiteUrl: {
        type: String,
        required: true
    },
    websiteUname: {
        type: String,
        required: true
    },
    websitePassword: {
        type: String,
        required: true,
    },
    websiteFavorite: {
        type: Boolean,
        default: false
    },
    websiteDeleted: {
        type: Boolean,
        default: false
    },
    websiteDocExpireAt: {
        type: Date,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: `User` }

}, { timestamps: true })

WebsiteSchema.index({ websiteDocExpireAt: 1 }, { expireAfterSeconds: 0 });

WebsiteSchema.pre("save", async function (next) {
    this.websitePassword = encrypt(this.websitePassword);
    next();
});

export const Website = mongoose.models.Website || mongoose.model('Website', WebsiteSchema);
