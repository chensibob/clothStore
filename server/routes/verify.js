var User = require('../models/user');
var jwt = require('jsonwebtoken');  //used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function (req, res, next) {
  //check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  var token = req.headers['authorization'];
  if(token && token.split(' ')[0] == 'Token') {
    token = token.split(' ')[1];
  } else {
    token = '';
  }
  // console.log('TOKEN:', token);
  //decode token
  if (token) {
    //verifies secret and checks exp
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
      } else {
        //if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error('No token provided!');
    err.status = 403;
    next(err);
  }
};

exports.verifyMemberAdmin = function (req, res, next) {
  console.log('DOC', req.decoded._doc)
  if (req.decoded._doc.admin || req.decoded._doc.role == 'memberAdmin') {
    next();
  } else {
    // if user is not admin or memberAdmin
    // return an error
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
};

exports.verifySpotAdmin = function (req, res, next) {
  console.log('DOC', req.decoded._doc)
  if (req.decoded._doc.admin || req.decoded._doc.role == 'spotAdmin') {
    next();
  } else {
    // if user is not admin or spotAdmin
    // return an error
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
};

exports.verifyStockAdmin = function (req, res, next) {
  console.log('DOC', req.decoded._doc)
  if (req.decoded._doc.admin || req.decoded._doc.role == 'stockAdmin') {
    next();
  } else {
    // if user is not admin or stockAdmin
    // return an error
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
};

exports.verifyAdmin = function (req, res, next) {
  console.log('DOC', req.decoded._doc)
  if (req.decoded._doc.admin) {
    next();
  } else {
    // if user is not admin
    // return an error
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
};
