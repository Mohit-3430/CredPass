import mongoose from "mongoose"
import { encrypt } from "../../configs/EncryptionHandler.js";

/* //TODO : After changing the encryption mech change the datatypes
    since Cryptr only works for strings
*/
export const CardSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: true
    },
    cardHolderName: {
        type: String,
        required: true
    },
    cardBrand: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cardExpirationDate: {
        type: Date,
        required: true,
    },
    cardCVV: {
        type: String,
        requried: true
    },
    cardDocExpireAt: {
        type: Date,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: `User` }

}, { timestamps: true })

CardSchema.index({ cardDocExpireAt: 1 }, { expireAfterSeconds: 0 });

CardSchema.pre("save", async function (next) {
    this.cardNumber = encrypt(this.cardNumber);
    this.cardCVV = encrypt(this.cardCVV)
    next();
});

export const Card = mongoose.models.Card || mongoose.model('Card', CardSchema);