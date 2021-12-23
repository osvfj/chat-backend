const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/dy3nyscgi/image/upload/v1639250403/profile-pictures/default_profile_400x400_vnlui7.png',
      },
      public_id: {
        type: String,
        default: 'profile-pictures/default_profile_400x400_vnlui7',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);
