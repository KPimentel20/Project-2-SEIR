const Mood = require("../models/mood");

function index(req, res) {
  
console.log(req.user, '< - req.user')
  Mood.find({}, function (err, moods) {
    console.log(moods, 'moods')
    res.render("index", {

    // <-  this refers to the view folder, to find the page we want to send
    // back to the client
      moods: moods,
      title: "Rate your mood:"
    })
  })
}

function newMood(req, res){
  res.render('moods/new')
}

function create(req, res) {
  console.log(req.body, '< - req.body')
  console.log(req.user, '< - req.user')
  const mood =  new Mood(req.body);
  // mood.user = req.user._id
  //need to find a way to assign value to mood.user and the value should be the user whos logged in
  mood.save(function (err) {
    if (err) return console.log(err, 'This is the error message from the create function in the moodsController')
    res.redirect("/")
  });
}

module.exports = {
    index,
    new: newMood,
    create
}
