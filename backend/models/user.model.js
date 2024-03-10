import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      min: 3,
      max: 20
    },
    lastname: {
        type: String,
        require: true,
        min: 3,
        max: 20
      },
    mobile: {
        type:Number,
        require: true
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
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    profilePicture: {
        type: String,
        default:'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
      },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;