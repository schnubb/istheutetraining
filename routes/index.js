var express = require('express');
var router = express.Router();
var exceptions = require("../data/exceptions.js");
var data = require("../data/config");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('templates/index', { title: 'Ist heute Training?' });
});

router.get('/imprint', function(req, res, next) {
    res.render('templates/imprint', { title: 'Impressum' })
});

module.exports = router;

module.exports.sockets = function(io) {
    var nsp = io.of("/");

    nsp.on("connection", function(socket){

        socket.join("iht");

        socket.on("join", function() {
            nsp.emit("hello", {days:data.trainingDays, except: exceptions});
        });
        socket.on("debug", function(mode) {
            nsp.emit("hello", {days:data.trainingDays, except: exceptions, debug:mode})
        })
    });
};
