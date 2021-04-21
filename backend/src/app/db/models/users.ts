import db from "../config/db";

const UserSchema = new db.Schema({
    name: {
      type: String,
      index: true
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    token: {
      type: String,
    },
    password: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
});
  
const User = db.model('User', UserSchema);

export { User };