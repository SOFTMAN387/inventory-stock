import User from '../models/user.model.js';
import { errorHandler } from '../middleware/error.js';
import bcrypt from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

//create User

export const createUser = async(req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //create new user
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          mobile: req.body.mobile,
          profile: req.body.profile,
          role: req.body.role,
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.profilePicture,
        });
    
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  };


// update user

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, 'You can update only your account!'));
//   }
//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//           profilePicture: req.body.profilePicture,
//         },
//       },
//       { new: true }
//     );
//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };


// delete user


// export const deleteUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, 'You can delete only your account!'));
//   }
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json('User has been deleted...');
//   } catch (error) {
//     next(error);
//   }

// }