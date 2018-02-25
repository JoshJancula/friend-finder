


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

  //do you have postman? yea
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
  
 
 
 
 
 
 
 
 
 

// db.friends.insert({name: 'Steve', photo: 'http://www.qygjxz.com/data/out/226/5918314-trippy-pictures.jpg', scores:[2, 3, 4, 2, 5, 2, 2, 2, 4, 2] })

// db.friends.insert({name: 'James', photo: 'https://i.imgur.com/y3uRmCE.jpg', scores:['4', '5', '2', '2', '4', '2', '1', '2', '4', '4'] })

// // db.friends.insert({name: 'Hilary', photo: 'https://static.politico.com/dims4/default/909cd31/2147483647/resize/1160x%3E/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fd9%2F2a%2F3b5ef8784b3ebc1fd916ee151882%2Fgettyimages-493755608.jpg', scores:['2', '2', '2', '2', '2', '2', '2', '2', '2', '2'] })
