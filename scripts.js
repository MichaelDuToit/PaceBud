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
        timeHH = document.getElementById("time-hh").value,
        timeMM = document.getElementById("time-mm").value,
        timeSS = document.getElementById("time-ss").value,
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
    var seconds = convertToSeconds(timeHH, timeMM, timeSS);
    var distance = convertToMeters(dist.value, distOption);
    var toSecondsPerMeter = seconds / distance;
    var pace_min = Math.floor((toSecondsPerMeter * units[paceOption]) / 60);
    var pace_sec = ((toSecondsPerMeter * units[paceOption]) % 60);
    if (pace_sec < 9){
        pace_sec = "0" + pace_sec;
    }
    return (
        paceMM.value = pace_min,
        paceSS.value = pace_sec,
        console.log(pace_min + ":" + pace_sec + "/" + paceOption)
    );
}

function distanceCalculator(){
    assignValues();
    var time = convertToSeconds(timeHH, timeMM, timeSS);
    var pace = (convertToSeconds(0, paceMM.value, paceSS.value));
    var distance = time / pace;
    return (
        dist.value = (distance / units[distOption])
    );
}

function timeCalculator(p_mm, p_ss, p_dist, p_unit, dist, unit){
    var seconds = convertToSeconds(0, p_mm, p_ss);
    var pace_distance = convertToMeters(p_dist, p_unit);
    var distance = convertToMeters(dist, unit);
    var result = (seconds / pace_distance) * distance;
    var f = {
        min: Math.floor(result / 60),
        sec: Math.floor(result % 60),
    }
    if(f.min < 9){
        f.min = "0" + f.min;
    }
    if (f.sec < 9){
        f.sec = "0" + f.sec;
    }
    return f.min + ':' + f.sec;
}