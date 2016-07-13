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
}


router.get("/", function(req, res, next) {
  res.json({ error: "no request set" });
  next();
});

router.get("/:action", function(req, res, next) {
  
  var json = {};
  
  if(req.params.action == "training")
  {
    json.training = getTrainingTimes();
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