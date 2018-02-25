var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  photo: {
    type: String,
    required: false
  },
  
  scores: Array
 
});

// This creates our model from the above schema, using mongoose's model method
var Friend = mongoose.model("Friend", FriendSchema);

// Export the Article model
module.exports = Friend;
