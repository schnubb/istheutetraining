app.controller('istTraining', function($scope, Socket) {
    $scope.trainings = [];

    $scope.content = {
        answer: "",
        class: "",
        timeFromTo: "",
        nextDay: {}
    };


    isTraining = function (tDays) {

        var curWDay = new Date().getDay();

        if(tDays[curWDay].length > 0) {

            $scope.content.answer = "ja";
            $scope.content.class = "h1";
            $scope.content.timeFromTo = tDays[curWDay][0] + " - " + tDays[curWDay][1];

            $(".is-training").removeClass("hidden");

        } else {

            $scope.content.answer = "nope. heute nicht";
            $scope.content.nextDay = getNextTraining(tDays);

            $(".no-training").removeClass("hidden");

        }
    };

    getNextTraining = function(tDays){
        var cur = new Date();
        cur.setHours(0);
        cur.setMinutes(0);
        cur.setSeconds(0);

        console.log(tDays, cur);

        while (tDays[cur.getDay()].length === 0) {
            nextDay = Date.parse(cur) + 86400000;
            cur.setMilliseconds( nextDay );
            console.log(cur);
        }

        // Correct time
        var startHour = tDays[cur.getDay()][0].split(":")[0];
        var startMin = tDays[cur.getDay()][0].split(":")[1];
        cur.setHours(parseInt(startHour));
        cur.setMinutes(parseInt(startMin));

        return Date.parse(cur);
    };

    Socket.on("hello", function(t){
        console.log(t);
        $scope.trainings = t.days;
        isTraining(t.days);
    });

});