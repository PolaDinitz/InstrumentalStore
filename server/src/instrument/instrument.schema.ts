import * as mongoose from 'mongoose';
import { Category } from '../category/category.enum';

export const InstrumentSchema = new mongoose.Schema({
  instrumentName: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  category: { type: String, enum: Category, required: true },
  price: { type: Number, required: true },
});
