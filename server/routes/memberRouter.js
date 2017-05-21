var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Members = require('../models/members');
var Verify = require('./verify');

var memberRouter = express.Router();
memberRouter.use(bodyParser.json());

memberRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    console.log('Member!', req);
    Members.find({}, function (err, member) {
      if (err) throw err;
      res.json(member);
    });
  })
  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Members.create(req.body, function (err, member) {
      if (err) throw err;
      console.log('Member created!');
      var id = member._id;
      // res.writeHead(200, {
      //   'Content-Type': 'text/plain'
      // });
      // res.end('Added the member with id: ' + id);
      // console.log(res.body);
      console.log(member);
      res.json(member);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Members.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

memberRouter.route('/:memberId')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Members.findById(req.params.memberId, function (err, member) {
      if (err) throw err;
      res.json(member);
    });
  })
  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Members.findByIdAndUpdate(req.params.memberId, {
      $set: req.body
    }, {
      new: true
    }, function (err, member) {
      if (err) throw err;
      res.json(member);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Members.findByIdAndRemove(req.params.memberId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = memberRouter;
