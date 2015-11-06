var express = require('express');
var router = express.Router();

var exceptions = [];
var trainingDays = [
    [],                         // Sonntag
    ["17:00","19:00"],          // Montag
    [],                         // Dienstag
    ["18:00", "20:00"],         // Mittwoch
    [],                         // Donnerstag
    [],                         // Freitag
    ["12:00","15:00"]           // Samstag
];

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
            nsp.emit("hello", {days:trainingDays});
        });
    });
};
