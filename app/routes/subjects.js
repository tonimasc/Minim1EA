var express = require('express');
var router = express.Router();
var Subject = require('../models/subjectmodel');
var Student = require('../models/studentmodel');

//Create a subject
router.post('/', function(req, res) {

  Subject.findOne({name: req.body.name}, function (err, exsistingsubject) {
    if(exsistingsubject){
      res.status(400).send('This subject already exist')
    }
    else{
      Subject.create({name:req.body.name, when: req.body.when}, function(err, subject) {
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
      var query = {_id: req.body.student_id};
      var update = {$addToSet : {"subjects" : req.params.subject_id }};
      var options = {};
      Student.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
          res.send(err);
        }
        if(student){
          Subject.findById(subject._id).populate('students').exec().then(function(err, subject) {
            if (err)
              res.send(err)
            res.send(subject);
          });
        }
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

//Get a subject by name
router.get('/search/:name', function(req, res) {
    console.log(req.params.name);
  Subject.findOne({name: req.params.name}, function (err, exsistingsubject) {
    if(exsistingsubject){
      res.send(exsistingsubject);
    }
    else{
      res.status(400).send(err);
    }
  });
});

//Create a subject
router.get('/search/when/:season', function(req, res) {
    console.log(req.params.season);
    Subject.find({when: req.params.season}, function (err, exsistingsubjects) {
        if(exsistingsubjects){
            res.send(exsistingsubjects);
        }
        else{
            res.status(400).send(err);
        }
    });
});

//Create a subject
router.get('/search/studentsnumber/', function(req, res) {
    Subject.find().sort({"students": -1}).exec(function(err, subjects) {
        if (err)
            res.send(err)
        res.send(subjects);
    });
});
module.exports = router;
