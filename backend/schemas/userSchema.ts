import { SHA256 } from 'crypto-js';
import mongoose, { Document, Schema } from 'mongoose';

interface userModel extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  checkPassword: Function;
}

const userSchema = new Schema<userModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (incomingPassword: string) {
  return SHA256(incomingPassword).toString() === this.password;
};

const User = mongoose.model<userModel>('User', userSchema);

export default User;
