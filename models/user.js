import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  passwordResetToken: {
    type: String, 
    default: ""
  },
  passwordResetExpires: {
    type: Date,
    default: Date("2020/10/31")
  },
});

export default mongoose.model('User', UserSchema);