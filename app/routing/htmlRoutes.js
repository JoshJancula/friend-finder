// require path 
var path = require("path");

module.exports = function(app) {
  // Basic route that sends the user first to the home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
// takes user to the survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

};


