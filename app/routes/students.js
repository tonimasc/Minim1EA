/**
 * Created by tonim on 22/11/2016.
 */
var express = require('express');
var router = express.Router();
var Student = require('../models/studentmodel');

// Create a student
router.post('/', function(req, res) {
    Student.create({
        name: req.body.name,
        address: req.body.address,
        phones: {
            contact: req.body.contact,
            number: req.body.number
        }
    }, function(err, student) {
        if (err)
            res.send(err);
        // get and return all the students after you create another
        Student.find(function(err, students) {
            if (err)
                res.send(err)
            res.send(students);
        });
    });
});
// Get a student
router.get('/:student_id', function(req, res) {
    var id = req.params.student_id;
    Student.findById(id, function(err, student) {
        if (err)
            res.send(err)
        res.send(student);
    });
});

// Get all the students
router.get('/', function(req, res) {
    Student.find(function(err, students) {
        if (err)
            res.send(err)
        res.send(students);
    });
});

//Delete a student
router.delete('/:student_id', function(req, res) {
    Student.remove({
        _id : req.params.student_id
    }, function(err, subject) {
        if (err)
            res.send(err);
        // get and return all the students after you delete this one
        Student.find(function(err, students) {
            if (err)
                res.send(err)
            res.send(students);
        });
    });
});

router.post('/addphone/:student_id', function(req, res) {
    var query = {_id: req.params.student_id};
    var update = {$addToSet : {"phones" :{contact: req.body.contact, number: req.body.number}}};
    var options = {};
    Student.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
            res.send(err);
        }
        if(student){
            Student.findById(student._id).populate('phones').exec().then(function(err, student) {
                if (err)
                    res.send(err)
                res.send(student);
            });
        }
    });
});

router.delete('/deletephone/:student_id/:phone_id', function(req, res) {
    var query = {_id: req.params.student_id};
    var update = {$pull : {"phones":{ _id: req.params.phone_id}}};
    var options = {};
    Student.findOneAndUpdate(query, update, options, function(err, student) {
        if (err) {
            res.send(err);
        }
        if(student){
            Student.findById(student._id).populate('phones').exec().then(function(err, student) {
                if (err)
                    res.send(err)
                res.send(student);
            });
        }
    });
});




module.exports = router;