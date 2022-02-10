import { Document, Types } from "mongoose";

export interface Order extends Document {
    userEmail: string;
    date: Date;
    itemList: Types.Array<{instrumentName: string,quantity:number}>;
}