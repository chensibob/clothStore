var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
  User.find({}, function (err, user) {
    if (err) throw err;
    res.json(user);
  });
});

router.route('/:userId')
  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    User.findByIdAndUpdate(req.params.userId, {
      $set: req.body
    }, {
      new: true
    }, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    User.findByIdAndRemove(req.params.userId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

router.post('/register', function (req, res) {
  console.log('registering!', req)
  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    // console.log('NEW USER', user)
    if (err) {
      return res.status(500).json({err: err});
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    user.save(function (err, user) {
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration Successful!'});
      });
    });
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
       return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req, res, next);
});

router.get('/logout', Verify.verifyOrdinaryUser, function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/facebook', passport.authenticate('facebook'), function (req, res) {});

router.get('/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req, res, next);
});

module.exports = router;
