var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  sex: { type: String, default: "" },
  age: { type: Number, default: 0 }
});

// UserSchema.pre('save', function(next) {
//   console.log('Tried to save user!');
// });

// Links the object post with Post Schema
mongoose.model('Users', UserSchema);

//var User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
//module.exports = User;
