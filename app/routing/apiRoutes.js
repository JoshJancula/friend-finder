

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    
 // get the friends data 
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

 // post to friends 
  app.post("/api/friends", function(req, res) {
    
      friendData.push(req.body);
      res.json(true);
    
   
  });
  
  
}
  
 