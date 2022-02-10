import * as mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
    userEmail: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    itemList: {type: Array,required: true},
    orderAddress: {type: String, required: true}
});