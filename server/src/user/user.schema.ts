import * as mongoose from 'mongoose';


export enum UserRole {
  User,
  Admin
}

export const UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  role: { type: String, enum: UserRole, required: true}
});
