var mongoose = require("mongoose");
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

var Friend = mongoose.model("Friend", FriendSchema);

// Export the Article model
module.exports = Friend;
