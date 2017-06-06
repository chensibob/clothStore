var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var SpotItems = require('../models/spotItems');
var Verify = require('./verify');

var spotItemRouter = express.Router();
spotItemRouter.use(bodyParser.json());

spotItemRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    SpotItems.find({})
    // .populate('good')
    .exec(function (err, spotItem) {
      if (err) throw err;
      res.json(spotItem);
    });
  })
  .post(Verify.verifyOrdinaryUser, Verify.verifySpotAdmin, function (req, res, next) {
    console.log(req.body);
    SpotItems.create(req.body, function (err, spotItem) {
      if (err) throw err;
      console.log('SpotItem created!');
      var id = spotItem._id;
      // res.writeHead(200, {
      //   'Content-Type': 'text/plain'
      // });
      // res.end('Added the spotItem with id: ' + id);
      console.log(spotItem);
      res.json(spotItem);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    SpotItems.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

spotItemRouter.route('/:spotItemId')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    SpotItems.findById(req.params.spotItemId)
    // .populate('good')
    .exec(function (err, spotItem) {
      if (err) throw err;
      res.json(spotItem);
    });
  })
  .put(Verify.verifyOrdinaryUser, Verify.verifySpotAdmin, function (req, res, next) {
    SpotItems.findByIdAndUpdate(req.params.spotItemId, {
      $set: req.body
    }, {
      new: true
    }, function (err, spotItem) {
      if (err) throw err;
      res.json(spotItem);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifySpotAdmin, function (req, res, next) {
    SpotItems.findByIdAndRemove(req.params.spotItemId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = spotItemRouter;
