var express = require('express');
var router = express.Router();
var exceptions = require("../data/exceptions");
var data = require("../data/config");

var getTrainingTimes = function(){
  
  var days = ["So","Mo","Di", "Mi", "Do", "Fr", "Sa"];
  var res = [];
  
  for( var i in data.trainingDays) {
    if(data.trainingDays[i].length > 0) res.push("" + days[i] + ": " + data.trainingDays[i][0] + " - " + data.trainingDays[i][1]);
  }
  
  return res;
};

var getIsTrainingToday = function() {
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  if(data.trainingDays[today.getDay()]) {
    for(var i in exceptions) {
      if(exceptions[i] == today.getTime()) return false;
    }
  } else {
    return false;
  }

  return true;
};


router.get("/", function(req, res, next) {
  res.json({ error: "no request set" });
  //next();
});

router.get("/:action", function(req, res, next) {
  
  var json = {};
  
  if(req.params.action == "training")
  {
    json.training = getTrainingTimes();
  }

  else if (req.params.action == "istraining")
  {
    var isTraining = getIsTrainingToday();
    if(isTraining) res.json({istHeuteTraining: "ja", res:isTraining});
    else res.json({istHeuteTraining:"nein", res: isTraining});
  }
  
  else
  
  {
    json.error = "Action not found"
  }
  
  res.json(json);

});

router.post("/", function(req, res, next) {
    console.log(req.body);

    res.send("no support for post data");
});

module.exports = router;