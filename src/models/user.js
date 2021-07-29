import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;
const schemaTemplate = {
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};
const options = { timestamps: true, skipVersioning: { dontVersionMe: true } };
const UserSchema = new Schema(schemaTemplate, options);
UserSchema.statics.login = function (email) {
  return this.findOne({ email: email});
};
const User = Mongoose.model('user', UserSchema);

export default User;
