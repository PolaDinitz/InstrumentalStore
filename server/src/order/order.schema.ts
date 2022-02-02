import * as mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
    userEmail: {type: String, required: true},
    date: {type: String, required: true},
    itemList: {type: Array,required: true}
});