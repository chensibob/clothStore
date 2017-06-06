var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var CashNotes = require('../models/cashNotes');
var Verify = require('./verify');

var cashNoteRouter = express.Router();
cashNoteRouter.use(bodyParser.json());

cashNoteRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    CashNotes.find({})
    .exec(function (err, cashNote) {
      if (err) throw err;
      res.json(cashNote);
    });
  })
  .post(Verify.verifyOrdinaryUser, Verify.verifySpotAdmin, function (req, res, next) {
    console.log(req.body);
    CashNotes.create(req.body, function (err, cashNote) {
      if (err) throw err;
      console.log('CashNote created!');
      var id = cashNote._id;
      console.log(cashNote);
      res.json(cashNote);
    });
  });

cashNoteRouter.route('/:cashNoteId')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    CashNotes.findById(req.params.cashNoteId)
    .exec(function (err, cashNote) {
      if (err) throw err;
      res.json(cashNote);
    });
  });

module.exports = cashNoteRouter;
