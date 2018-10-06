var units = {
    meter: 1,
    kilometer: 1000,
    yard: 0.9144,
    mile: 1609.344
}

var timeHH = Number(document.getElementById("time-hh").value),
    timeMM = Number(document.getElementById("time-mm").value),
    timeSS = Number(document.getElementById("time-ss").value),
    distance = Number(document.getElementById("dist").value),
    paceMM = Number(document.getElementById("pace-mm").value),
    paceSS = Number(document.getElementById("pace-ss").value);


/*
function calculatePace(time, distance){
    return time / distance;
}

function calculateTime(pace, distance){
    return pace * distance;
}

function calculateDistance(time, pace){
    return time / pace;
}
*/

function convertToMeters(value, unit){
     if(unit == "kilometer" || unit == "km"){
        return (value * units.kilometer);
     }
     if(unit == "mile" || unit == "mi"){
         return (value * units.mile);
     }
     if(unit == "yards" || unit == "y"){
         return (value * units.yard);
     }
     if(unit == "meter" || unit == "m"){
         return value;
     }
     else {
        return console.log("Measure unit not defined");
    }
}

function convertToSeconds(hh, mm, ss){
    var int_ss = ss;
    var int_mm = mm * 60;
    var int_hh = hh * 60 * 60;
    return (int_ss + int_mm + int_hh);
}

function paceCalculator(hh, mm, ss, dist, unit){
    var seconds = convertToSeconds(hh, mm, ss);
    var distance = convertToMeters(dist, unit);
    var toSecondsPerMeter = seconds / distance;
    var pace_min = Math.floor((toSecondsPerMeter * units.kilometer) / 60);
    var pace_sec = Math.floor((toSecondsPerMeter * units.kilometer) % 60);
    if (pace_sec < 9){
        pace_sec = "0" + pace_sec;
    }
    return pace_min + ":" + pace_sec + "/km";
}

function distanceCalculator(p_mm, p_ss, t_hh, t_mm, t_ss){
    var time = convertToSeconds(t_hh, t_mm, t_ss);
    var pace = convertToSeconds(0, p_mm, p_ss);
    var distance = time / pace;
    return distance;
}