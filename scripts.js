var units = {
    meter: 1,
    kilometer: 1000,
    yard: 0.9144,
    mile: 1609.344
}

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
var timeHH, timeMM, timeSS, dist, paceMM, paceSS, pace_unit, paceOption, dist_unit, distOption;

function assignValues(){
    return (
        timeHH = document.getElementById("time-hh"),
        timeMM = document.getElementById("time-mm"),
        timeSS = document.getElementById("time-ss"),
        dist = document.getElementById("dist"),
        paceMM = document.getElementById("pace-mm"),
        paceSS = document.getElementById("pace-ss"),
        pace_unit = document.getElementById('pace_option'),
        paceOption = pace_unit.options[pace_unit.selectedIndex].value.toLowerCase(),
        dist_unit = document.getElementById('dist_option'),
        distOption = dist_unit.options[dist_unit.selectedIndex].value.toLowerCase()
    )
}

function convertToMeters(value, unit){
    value = Number(value);
    if(unit == "kilometer" || unit == "km" || unit == "kilometers"){
    return (value * units.kilometer);
    }
    if(unit == "mile" || unit == "mi" || unit == "miles"){
        return (value * units.mile);
    }
    if(unit == "yards" || unit == "y" || unit == "yard"){
        return (value * units.yard);
    }
    if(unit == "meter" || unit == "m" || unit == "meters"){
        return value;
    }
    else {
        return console.log("Measure unit not defined");
    }
}

function convertToSeconds(hh, mm, ss){
    var int_ss = Number(ss);
    var int_mm = Number(mm) * 60;
    var int_hh = Number(hh) * 60 * 60;
    return (int_ss + int_mm + int_hh);
}

function paceCalculator(){
    assignValues();
    var seconds = convertToSeconds(timeHH.value, timeMM.value, timeSS.value);
    var distance = convertToMeters(dist.value, distOption);
    var toSecondsPerMeter = seconds / distance;
    var pace_min = Math.floor((toSecondsPerMeter * units[paceOption]) / 60);
    var pace_sec = ((toSecondsPerMeter * units[paceOption]) % 60);
    if (pace_sec < 9){
        pace_sec = "0" + pace_sec;
    }
    return (
        paceMM.value = pace_min,
        paceSS.value = pace_sec
    );
}

function distanceCalculator(){
    assignValues();
    var time = convertToSeconds(timeHH.value, timeMM.value, timeSS.value);
    var pacePerSecond = (convertToSeconds(0, paceMM.value, paceSS.value) / units[paceOption]);
    var distance = ((time / pacePerSecond) / units[distOption]);
    return (
        dist.value = distance
    );
}

function timeCalculator(){
    assignValues();
    var seconds = convertToSeconds(0, paceMM.value, paceSS.value);
    var distance = convertToMeters(dist.value, distOption);
    var pace = seconds / units[paceOption];
    var time = pace * distance;
    var hours = Math.floor(time / 60 / 60);
    var minutes = Math.floor(time / 60);
    var seconds = (time % 60);
    if (hours > 0){
        minutes = minutes - (hours * 60);
    }
    return (
        timeHH.value = hours,
        timeMM.value = minutes,
        timeSS.value = seconds
    );
}