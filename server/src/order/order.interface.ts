import { Document, Types } from "mongoose";



export interface Order extends Document {
    userEmail: string;
    date: string;
    itemList: Types.Array<{instumentName: string,qountity:number}>;
}