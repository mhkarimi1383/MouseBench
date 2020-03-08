    var clicks = 0
    track = document.querySelectorAll('#track')
    clear = document.querySelectorAll('#clear')
    result = document.getElementById("result")

    track.forEach(function(elem) {
        elem.addEventListener("click", function() {
            clicks++;
            console.clear();
            console.log(clicks);
            result.innerHTML = "Clicks: " + clicks;
        });
    });


    var prevEvent, currentEvent;
    document.documentElement.onmousemove = function(event) {
        currentEvent = event;
    }

    var maxSpeed = 0,
        prevSpeed = 0,
        maxPositiveAcc = 0,
        maxNegativeAcc = 0,
        twoAsSub = "2".sub();
    setInterval(function() {
        if (prevEvent && currentEvent) {
            var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
            var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
            var movement = Math.sqrt(movementX * movementX + movementY * movementY);

            document.getElementById("movementX").innerText = "Movement X: " + movementX;
            document.getElementById("movementY").innerText = "Movement Y: " + movementY;
            document.getElementById("movement").innerText = "Movement: " + Math.round(movement);

            //speed=movement/100ms= movement/0.1s= 10*movement/s
            var speed = 10 * movement; //current speed

            document.getElementById("speed").innerText = "Speed: " + Math.round(speed) + " PX/S";
            document.getElementById("maxSpeed").innerText = "Max Speed: " + Math.round(
                speed > maxSpeed ? (maxSpeed = speed) : maxSpeed
            ) + " PX/S";

            var acceleration = 10 * (speed - prevSpeed);

            document.getElementById("acceleration").innerHTML = "Acceleration: " + Math.round(
                acceleration
            ) + " PX/S" + twoAsSub;

            if (acceleration > 0) {
                document.getElementById("maxPositiveAcceleration").innerHTML = "Max Positive Acceleration: " + Math.round(
                    acceleration > maxPositiveAcc ? (maxPositiveAcc = acceleration) : maxPositiveAcc
                ) + " PX/S" + twoAsSub;
            } else {
                document.getElementById("maxNegativeAcceleration").innerHTML = "Max Negative Acceleration: " + Math.round(
                    acceleration < maxNegativeAcc ? (maxNegativeAcc = acceleration) : maxNegativeAcc
                ) + " PX/S" + twoAsSub;
            }
        }

        prevEvent = currentEvent;
        prevSpeed = speed;
    }, 100);
    clear.forEach(function(elem) {
        elem.addEventListener("click", function() {
            console.clear();
            clicks = -1;
            maxSpeed = 0;
            result.innerHTML = "Clicks: " + clicks;
        });
    });