var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var SoldNotes = require('../models/soldNotes');
var Verify = require('./verify');

var soldNoteRouter = express.Router();
soldNoteRouter.use(bodyParser.json());

soldNoteRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    SoldNotes.find({})
    .exec(function (err, soldNote) {
      if (err) throw err;
      res.json(soldNote);
    });
  })
  .post(Verify.verifyOrdinaryUser, function (req, res, next) {
    console.log(req.body);
    SoldNotes.create(req.body, function (err, soldNote) {
      if (err) throw err;
      console.log('SoldNote created!');
      var id = soldNote._id;
      console.log(soldNote);
      res.json(soldNote);
    });
  });

soldNoteRouter.route('/:soldNoteId')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    SoldNotes.findById(req.params.soldNoteId)
    .exec(function (err, soldNote) {
      if (err) throw err;
      res.json(soldNote);
    });
  });

module.exports = soldNoteRouter;
