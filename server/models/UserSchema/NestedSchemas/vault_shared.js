import mongoose from "mongoose"

export const VaultSharedSchema = new mongoose.Schema({
    item_type: { type: String, required: true },
    _item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    item_shared_by: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    }
}, { _id: false })