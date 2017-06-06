var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var StockItems = require('../models/stockItems');
var Verify = require('./verify');

var stockItemRouter = express.Router();
stockItemRouter.use(bodyParser.json());

stockItemRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    StockItems.find({})
    // .populate('good')
    .exec(function (err, stockItem) {
      if (err) throw err;
      res.json(stockItem);
    });
  })
  .post(Verify.verifyOrdinaryUser, Verify.verifyStockAdmin, function (req, res, next) {
    console.log(req.body);
    StockItems.create(req.body, function (err, stockItem) {
      if (err) throw err;
      console.log('StockItem created!');
      var id = stockItem._id;
      // res.writeHead(200, {
      //   'Content-Type': 'text/plain'
      // });
      // res.end('Added the stockItem with id: ' + id);
      console.log(stockItem);
      res.json(stockItem);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    StockItems.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

stockItemRouter.route('/:stockItemId')
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    StockItems.findById(req.params.stockItemId)
    // .populate('good')
    .exec(function (err, stockItem) {
      if (err) throw err;
      res.json(stockItem);
    });
  })
  .put(Verify.verifyOrdinaryUser, Verify.verifyStockAdmin, function (req, res, next) {
    StockItems.findByIdAndUpdate(req.params.stockItemId, {
      $set: req.body
    }, {
      new: true
    }, function (err, stockItem) {
      if (err) throw err;
      res.json(stockItem);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyStockAdmin, function (req, res, next) {
    StockItems.findByIdAndRemove(req.params.stockItemId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = stockItemRouter;
