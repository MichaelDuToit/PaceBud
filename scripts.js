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