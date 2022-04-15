const Mood = require("../models/mood");

module.exports = {
  index,
  new: newMood,
  create,
  update,
  edit
}


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

function update(req, res) {
      console.log("Am I even running?!")
  // Mood.findOne({'notes._id': req.params.id}, function(err, mood) {
      // const noteSubdoc = mood.notes.id(req.params.id); //subdoc makes a variable that stores the notes
      // if (!noteSubdoc.userId.equals(req.user._id)) return res.redirect(`/moods/${mood_.id}`);
      // noteSubdoc.text = req.body.text;
  Mood.findById(req.params.id, function (err, mood) { //put
      //update here then save
      mood.rating = req.body.rating
      console.log(mood.rating)
      console.log("This is my updated mood!")
      mood.save(function(err) {
          console.log("This is my saved mood!")
          console.log(mood);
          res.redirect("/");

      });
  });
}
// function update(req, res) {
//     Skill.update(req.params.id, req.body);
//     res.redirect("/skills");
//   }

function edit(req, res) { //req.query = sending it out
  const moodId = req.params.id
  console.log(moodId)
  res.render('moods/update', {moodId});
  
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


