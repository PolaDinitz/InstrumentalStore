import { Document } from "mongoose";

export interface Instrument extends Document {
    instrumentName: string,
    description: string,
    photoUrl: string,
    category: string,
    price: number
}