import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match : [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  rsvps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RSVP',
  }],

  hostedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEvent',
  }]
}, {
  timestamps: true,
});


  userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

  userSchema.methods.comparePassword = async function (p) {
  return bcrypt.compare(p, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
