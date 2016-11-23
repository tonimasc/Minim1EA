var express = require('express');
var router = express.Router();
var Subject = require('../models/subjectmodel');

//Create a subject
router.post('/', function(req, res) {

  Subject.findOne({name: req.body.name}, function (err, exsistingsubject) {
    if(exsistingsubject){
      res.status(400).send('This subject already exist')
    }
    else{
      Subject.create({name:req.body.name}, function(err, subject) {
        if (err)
          res.send(err);
        // get and return all the subjects after you create another
        Subject.find(function(err, subjects) {
          if (err)
            res.send(err)
          res.send(subjects);
        });
      });
    }
  });
});

// Get one subject
router.get('/:subject_id', function(req, res) {
  var id = req.params.subject_id;
  Subject.findById(id).populate('students').exec().then(function(err, subject) {
    if (err)
      res.send(err)
    res.send(subject);
  });
});

// Delete one subject
router.delete('/:subject_id', function(req, res) {
  Subject.remove({
    _id : req.params.subject_id
  }, function(err, subject) {
    if (err)
      res.send(err);
    // get and return all the subjects after you delete this one
    Subject.find(function(err, subjects) {
      if (err)
        res.send(err)
      res.send(subjects);
    });
  });
});

// Get all the subjects
router.get('/', function(req, res) {
  Subject.find(function(err, subjects) {
    if (err)
      res.send(err)
    res.send(subjects);
  });
});

//Add a new student in the subject
router.post('/addstudent/:subject_id', function(req, res) {
  console.log(req.body.student_id);
  var query = {_id: req.params.subject_id};
  var update = {$addToSet : {"students" : req.body.student_id}};
  var options = {};
  Subject.findOneAndUpdate(query, update, options, function(err, subject) {
    if (err) {
      res.send(err);
    }
    if(subject){
      Subject.findById(subject._id).populate('students').exec().then(function(err, subject) {
        if (err)
          res.send(err)
        res.send(subject);
      });
    }
  });
});

//Delete a student in the subject
router.delete('/deletestudent/:subject_id/:student_id', function(req, res) {
  var query = {_id: req.params.subject_id};
  var update = {$pull : {"students" : req.params.student_id}};
  var options = {};
  Subject.findOneAndUpdate(query, update, options, function(err, subject) {
    if (err) {
      res.send(err);
    }
    if(subject){
      Subject.findById(subject._id).populate('students').exec().then(function(err, subject) {
        if (err)
          res.send(err)
        res.send(subject);
      });
    }
  });
});



module.exports = router;
