import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    validate: {
    validator: v => validator.isEmail(v),
      message: props => `${props.value} n'est pas un email valide`
    }
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
