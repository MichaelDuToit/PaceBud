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

function convertToMeters(value, unit){
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
    var int_ss = ss;
    var int_mm = mm * 60;
    var int_hh = hh * 60 * 60;
    return (int_ss + int_mm + int_hh);
}

function paceCalculator(){
    var timeHH = Number(document.getElementById("time-hh").value);
    var timeMM = Number(document.getElementById("time-mm").value);
    var timeSS = Number(document.getElementById("time-ss").value);
    var dist = Number(document.getElementById("dist").value);
    var paceMM = document.getElementById("pace-mm");
    var paceSS = document.getElementById("pace-ss");
    var pace_unit = document.getElementById('pace_option');
    var paceOption = pace_unit.options[pace_unit.selectedIndex].value.toLowerCase();
    var dist_unit = document.getElementById('dist_option');
    var distOption = dist_unit.options[dist_unit.selectedIndex].value.toLowerCase();
    
    var seconds = convertToSeconds(timeHH, timeMM, timeSS);
    var distance = convertToMeters(Number(dist), distOption);
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

function distanceCalculator(p_mm, p_ss, p_dist, t_hh, t_mm, t_ss){
    var time = convertToSeconds(t_hh, t_mm, t_ss);
    var pace = convertToSeconds(0, p_mm, p_ss, p_dist);
    var distance = time / pace;
    return convertToMeters(distance, p_dist) + 'm';
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