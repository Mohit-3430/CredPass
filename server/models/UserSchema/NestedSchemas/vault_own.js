import mongoose from "mongoose";

export const VaultOwnSchema = new mongoose.Schema({
    // WEBSITE || CARD 
    item_type: { type: String },
    website_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
    card_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' }
}, { _id: false })