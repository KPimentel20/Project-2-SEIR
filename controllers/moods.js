const Mood = require("../models/mood");

function index(req, res) {
  
console.log(req.user, '< - req.user')
  Mood.find({}, function (err, moods) {
    res.render("index", {
    // <-  this refers to the view folder, to find the page we want to send
    // back to the client
      moods,
      title: "Rate your mood:",
    });

  });

}

  module.exports = {
    index
}
