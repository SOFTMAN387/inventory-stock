import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      min: 3,
      max: 20
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 20
      },
    mobile: {
        type:Number,
        required: true
      },
    profile: {
        type: String,
        default:'Frontend'
      },
    role: {
        type: String,
        default:'user'
      },
    email: {
      type: String,
      requiredd: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      requiredd: true,
      min: 6
    },
    profilePicture: {
        type: Object,
       required:true,
      },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;