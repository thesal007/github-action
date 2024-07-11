import { Schema, model } from 'mongoose';
export interface IUser {
  id:string;
  name: string;
  age:number;
  gender:string;
  category:String;
  email: string;
}

export interface UserCreationParams {
  id:string;
  name: string;
  age:number;
  gender:string;
  category:string;
  email: string;
}
// Defind user schema
const userSchema = new Schema<IUser>({
  id: {type:String, required: true},
  name: { type: String, required: true },
  age: {type: Number, required:true},
  gender: {type: String, required:true},
  category: {type: String, required:true},
  email: { type: String, required: true, unique: true },
});
// Create A mongoose model
const User = model<IUser>('User', userSchema);

export default User;
