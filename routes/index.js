var express = require('express');
var router = express.Router();

var date = new Date();
var exceptions = [];
var trainingDays = [
    [],                         // Sonntag
    ["17:00","20:00"],          // Montag
    [],                         // Dienstag
    ["18:00", "20:00"],         // Mittwoch
    [],                         // Donnerstag
    [],                         // Freitag
    ["12:00","16:00"]           // Samstag
];
var weekdays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
]

function nextTrainingDay() {
    var cur = date.getDay();
    while (trainingDays[cur].length === 0) {
        cur++;
        if(cur > 6) cur = 0;
    }

    return {
        time : trainingDays[cur][0],
        day  : weekdays[cur]
    };
}

function isTraining () {

    var data = {};
    var next = [];
    var curWDay = date.getDay();

    if(trainingDays[curWDay].length > 0) {
        data.answer = "ja";
        data.class = "h1";
    } else {
        data.answer = "nope. heute nicht";
        data.class = "";
        data.nextDay = nextTrainingDay();
    }

    return data;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('templates/index', { title: 'Ist heute Training?', data:isTraining(), times:trainingDays[date.getDay()]});
});

module.exports = router;
