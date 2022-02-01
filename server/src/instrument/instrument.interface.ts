import { Document } from "mongoose";


export interface Instrument extends Document {
    instumentName: string,
    description: string,
    photoUrl: string,
    category: string,
    price: number
}