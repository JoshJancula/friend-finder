


var Friend = require("../../models/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    

 // Route for getting all Friends
app.get("/friends", function(req, res) {
  // find all the friends
  Friend.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

 
    // Route to create a new friend
app.post("/friends", function(req, res) {
  // Create a new friend
  Friend.create(req.body)
    .then(function(dbFriend) {
      // If saved successfully, send the the new Friend document to the client
      res.json(dbFriend);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

}
  
 
