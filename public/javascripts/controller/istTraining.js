app.controller('istTraining', function($scope, Socket) {
    $scope.trainings = [];
    $scope.exceptions = [];

    $scope.debug = false;

    $scope.content = {
        answer: "",
        class: "",
        timeFromTo: "",
        nextDay: {}
    };

    exceptThisDate = function (checkdate) {
        checkdate = new Date(checkdate);
        var checkstring = checkdate.getDate() + "." + checkdate.getMonth() + '.' + checkdate.getFullYear();

        if($scope.debug) console.log($scope.exceptions, checkstring);

        if($scope.exceptions.length == 0) return false;

        for(var i in $scope.exceptions) {
            var exceptDate = new Date($scope.exceptions[i]);
            var exceptstring = exceptDate.getDate() + "." + exceptDate.getMonth() + '.' + exceptDate.getFullYear();

            if($scope.debug) console.log(checkstring, exceptstring);

            if(checkstring == exceptstring) {
                return true;
            }
        }

        return false;
    };

    isTraining = function (tDays) {

        var curWDay = new Date().getDay();

        if($scope.debug) console.log(curWDay);

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
        cur.setSeconds(1);

        while (tDays[cur.getDay()].length === 0 || exceptThisDate(cur.getTime())) {
            cur.setTime( cur.getTime() + 86400000 );
            if($scope.debug) console.log(cur, cur.getTime(), exceptThisDate(cur.getTime()));
        }

        if($scope.debug) console.log( tDays[cur.getDay()] );


        // Correct time
        var startHour = tDays[cur.getDay()][0].split(":")[0];
        var startMin = tDays[cur.getDay()][0].split(":")[1];
        cur.setHours(parseInt(startHour));
        cur.setMinutes(parseInt(startMin));

        if($scope.debug) console.log(cur);

        return cur.getTime();
    };

    Socket.on("hello", function(t){
        $scope.trainings = t.days;
        $scope.exceptions = t.except;
        $scope.debug = t.debug || false;
        if($scope.debug) console.log(t);
        isTraining(t.days);
    });

});