timeLabel = document.getElementById("timeLabel");
startButton = document.getElementById("startButton");
stopButton = document.getElementById("stopButton");
resetButton = document.getElementById("resetButton");
lapButton = document.getElementById("lapButton");
lapsDisplayContainer = document.getElementById("lapsDisplayContainer");

let milliseconds = 0, seconds = 0, minutes = 0, hours = 0, lapCounter = 1;
let timerStarted = false;
lapsDisplayContainer.innerHTML = "";
lapsDisplayContainer.style.opacity = 0;

const zeroPad = (num, places) => String(num).padStart(places, '0')

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.4;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.3;
    }, 10);
}

function timerTicker() {
    milliseconds += 10;

    if (milliseconds >= 990) {
        seconds++;
        milliseconds = 0;
    }
    if (seconds >= 59) {
        minutes++;
        seconds = 0;
        milliseconds = 0;
    }
    if (minutes >= 60) {
        hours++;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
    }
    timeLabel.textContent = (`${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}.${zeroPad(milliseconds, 3)}`);
}

function timerTickerInterval() {
    timerStarted = true;
    setIntervalId = setInterval(timerTicker, 10);
}

startButton.onclick = function () {
    if (!timerStarted) timerTickerInterval();
}

stopButton.onclick = function () {
    clearInterval(setIntervalId);
    timerStarted = false;
}

resetButton.onclick = function () {
    if (timerStarted) clearInterval(setIntervalId);
    timerStarted = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    timeLabel.textContent = (`${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}.${zeroPad(milliseconds, 3)}`);
    fade(lapsDisplayContainer);
}

lapButton.onclick = function () {
    if (lapCounter === 1) {
        lapsDisplayContainer.innerHTML = "<p id=\"lapsDisplayTitle\">Laps:</p><p>" + lapCounter +
            ".&emsp;&emsp;&emsp;" + zeroPad(hours, 2) +
            ":" + zeroPad(minutes, 2) +
            ":" + zeroPad(seconds, 2) +
            "." + zeroPad(milliseconds, 3) + "</p>";
        unfade(lapsDisplayContainer);
    }
    else {
        lapsDisplayContainer.innerHTML += "<p>" + lapCounter +
            ".&emsp;&emsp;&emsp;" + zeroPad(hours, 2) +
            ":" + zeroPad(minutes, 2) +
            ":" + zeroPad(seconds, 2) +
            "." + zeroPad(milliseconds, 3) + "</p>";
    }
    lapCounter++;
}
