const Note = require("../models/note");
const Mood = require("../models/mood");

module.exports = {
    create,
    new: newNote,
    delete: deleteNote
}

function create(req, res) {
    Mood.findById(req.params.id, function (err, mood) {
        console.log(mood, 'mood')
        console.log(req.body, '< - req.body')
        // req.body.user = req.user._id;
        // req.body.userName = req.user.name;
        mood.notes.push(req.body); //mutating a document
        //we have to tell mongodb we changed the document, 
        mood.save(function (err) {
            console.log(mood);
            //then we want to respond to the client!
            //redirect them to a page, what page makes sense to redirect? 
            res.redirect("/");
        })
    })
}

function newNote(req,res) {
    Mood.findById(req.params.id, function (err, mood) {
        res.render('notes/new', {
            title: 'Notes',
            mood
        });
    });
}

function deleteNote(req, res, next){
    // Find the mood with the note!
    Mood.findOne({'notes._id': req.params.id}, function(err, moodDocument){
        // find the subdocument itself, find the note in the moodDocument, that has the same id as our req.params.id
        const note = moodDocument.notes.id(req.params.id);
        // If the review wasn't made by the user redirect them back to the same page
        if(!note.user.equals(req.user._id)) return res.redirect(`/moods/${moodDocument._id}`);
        // remove the note
        // 1 way find the note then call remove method
        note.remove()
        // remove the note
        // moodDocument.notes.remove(req.params.id)
        moodDocument.save(function(err){
        if(err) next(err); 
        // next(err) passes it to the express generator err handler
        res.redirect(`/moods/${moodDocument._id}`)
    })

    })

}

