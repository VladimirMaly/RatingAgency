var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoresSchema = new mongoose.Schema({
  storename: { type: String, required: true },
  category: { type: String, default: "" },
  address: { type: String, default: "" }
});

// StoresSchema.pre('find', function(next) {
//   console.log("called 'find' on model!");
// });

// Links the object post with Post Schema
mongoose.model('Stores', StoresSchema);

//var Stores = mongoose.model('Stores', StoresSchema);

// make this available to our users in our Node applications
//module.exports = Stores;