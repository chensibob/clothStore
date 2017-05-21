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
  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
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
  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    StockItems.findByIdAndUpdate(req.params.stockItemId, {
      $set: req.body
    }, {
      new: true
    }, function (err, stockItem) {
      if (err) throw err;
      res.json(stockItem);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    StockItems.findByIdAndRemove(req.params.stockItemId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

// stockItemRouter.route('/:stockItemId/comments')
//   .all(Verify.verifyOrdinaryUser)
//   .get(function (req, res, next) {
//     StockItems.findById(req.params.stockItemId)
//     .populate('comments.postedBy')
//     .exec(function (err, stockItem) {
//       if (err) throw err;
//       res.json(stockItem.comments);
//     });
//   })
//   .post(function (req, res, next) {
//     StockItems.findById(req.params.stockItemId, function (err, stockItem) {
//       if (err) throw err;
//       req.body.postedBy = req.decoded._doc._id;
//       stockItem.comments.push(req.body);
//       stockItem.save(function (err, stockItem) {
//         if (err) throw err;
//         console.log('Updated Comments!');
//         res.json(stockItem);
//       });
//     });
//   })
//   .delete(Verify.verifyAdmin, function (req, res, next) {
//     StockItems.findById(req.params.stockItemId, function (err, stockItem) {
//       if (err) throw err;
//       for (var i = (stockItem.comments.length - 1); i >= 0; i--) {
//         stockItem.comments.id(stockItem.comments[i]._id).remove();
//       }
//       stockItem.save(function (err, result) {
//         if (err) throw err;
//         res.writeHead(200, {
//           'Content-Type': 'text/plain'
//         });
//         res.end('Delete all comments!');
//       });
//     });
//   });

// stockItemRouter.route('/:stockItemId/comments/:commentId')
//   .all(Verify.verifyOrdinaryUser)
//   .get(function (req, res, next) {
//     StockItems.findById(req.params.stockItemId)
//     .populate('comments.postedBy')
//     .exec(function (err, stockItem) {
//       if (err) throw err;
//       res.json(stockItem.comments.id(req.params.commentId));
//     });
//   })
//   .put(function (req, res, next) {
//     // We delete the existing commment and insert the updated
//     // comment as a new comment
//     StockItems.findById(req.params.stockItemId, function (err, stockItem) {
//       if (err) throw err;
//       stockItem.comments.id(req.params.commentId).remove();
//       req.body.postedBy = req.decoded._doc._id;
//       stockItem.comments.push(req.body);
//       stockItem.save(function (err, stockItem) {
//         if (err) throw err;
//         console.log('Updated Comments!');
//         res.json(stockItem);
//       });
//     });
//   })
//   .delete(function (req, res, next) {
//     StockItems.findById(req.params.stockItemId, function (err, stockItem) {
//       if (stockItem.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
//         var err = new Error('You are not authorized to perform this operation!');
//         err.status = 403;
//         next(err);
//       }
//       stockItem.comments.id(req.params.commentId).remove();
//       stockItem.save(function (err, resp) {
//         if (err) throw err;
//         res.json(resp);
//       });
//     });
//   });

module.exports = stockItemRouter;
