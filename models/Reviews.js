var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewsSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  storeID: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
});

// Links the object post with Post Schema
mongoose.model('Reviews', ReviewsSchema);

//var Reviews = mongoose.model('Reviews', ReviewsSchema);

// make this available to our users in our Node applications
//module.exports = Reviews;
