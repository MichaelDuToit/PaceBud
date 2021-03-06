import './styles.scss';

const units = {
    meter: 1,
    kilometer: 1000,
    yard: 0.9144,
    mile: 1609.344
}

const button = {
    time: document.getElementById('time-button'),
    pace: document.getElementById('pace-button'),
    distance: document.getElementById('dist-button')
}

var timeHH, timeMM, timeSS, dist, paceMM, paceSS, paceUnit, paceOption, distUnit, distOption;
const inputElements = document.querySelectorAll("input");

function updateValues(){
    return (
        timeHH = document.getElementById("time-hh"),
        timeMM = document.getElementById("time-mm"),
        timeSS = document.getElementById("time-ss"),
        dist = document.getElementById("dist"),
        paceMM = document.getElementById("pace-mm"),
        paceSS = document.getElementById("pace-ss"),
        paceUnit = document.getElementById('pace-option'),
        paceOption = paceUnit.options[paceUnit.selectedIndex].value.toLowerCase(),
        distUnit = document.getElementById('dist-option'),
        distOption = distUnit.options[distUnit.selectedIndex].value.toLowerCase()
    )
}

function inputCheck(event){
    const regex = new RegExp('^[0-9]*\.*[0-9]*$');
    let regexTest = regex.test(event.target.value);
    if(!regexTest){
        this.classList.add('invalidFormat');
    }
    else {
        this.classList.remove('invalidFormat');
    }
}

function convertToMeters(value, unit){
    value = Number(value);
    if (unit == "kilometer" || unit == "km" || unit == "kilometers"){
        return (value * units.kilometer);
    }
    if (unit == "mile" || unit == "mi" || unit == "miles"){
        return (value * units.mile);
    }
    if (unit == "yards" || unit == "y" || unit == "yard"){
        return (value * units.yard);
    }
    if (unit == "meter" || unit == "m" || unit == "meters"){
        return value;
    }
    else {
        return console.log("Measure unit not defined");
    }
}

function convertToSeconds(hh, mm, ss){
    let int_ss = Number(ss);
    let int_mm = Number(mm) * 60;
    let int_hh = Number(hh) * 60 * 60;
    return (int_ss + int_mm + int_hh);
}

function formatToTwoDigits(input){
    if (input.toString().length < 2){
        let f_input = '0' + input.toString();
        return f_input;
    } else {
        return input;
    }
}

function paceCalculator(){
    updateValues();
    let toSecondsPerMeter = convertToSeconds(timeHH.value, timeMM.value, timeSS.value) / convertToMeters(dist.value, distOption);  
    let pace_min = Math.floor((toSecondsPerMeter * units[paceOption]) / 60);
    let pace_sec = ((toSecondsPerMeter * units[paceOption]) % 60);
    return (
        paceMM.value = formatToTwoDigits(pace_min),
        paceSS.value = formatToTwoDigits(pace_sec)
    );
}

function distanceCalculator(){
    updateValues();
    let time = convertToSeconds(timeHH.value, timeMM.value, timeSS.value);
    let pacePerSecond = (convertToSeconds(0, paceMM.value, paceSS.value) / units[paceOption]);
    let distance = ((time / pacePerSecond) / units[distOption]);
    return (
        dist.value = distance
    );
}

function timeCalculator(){
    updateValues();
    let pace = convertToSeconds(0, paceMM.value, paceSS.value) / units[paceOption];
    let time = pace * convertToMeters(dist.value, distOption);
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60);
    let seconds = (time % 60);
    if (hours > 0){
        minutes = minutes - (hours * 60);
    }
    return (
        timeHH.value = formatToTwoDigits(hours),
        timeMM.value = formatToTwoDigits(minutes),
        timeSS.value = formatToTwoDigits(seconds)
    );
}

inputElements.forEach(element => {
    element.addEventListener('keyup', inputCheck);
});

button.time.addEventListener('click', timeCalculator);
button.pace.addEventListener('click', paceCalculator);
button.distance.addEventListener('click', distanceCalculator)

//Service Worker Stuff
let newServiceWorker;

document.getElementById('update-button').addEventListener('click', ()=>{
    newServiceWorker.postMessage({ action: 'skipWaiting' });
});

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("/sw.js", {scope: '/'}).then(
        reg => {
            reg.addEventListener('updatefound', ()=>{
                newServiceWorker = reg.installing;
                newServiceWorker.addEventListener('statechange', ()=>{
                    switch(newServiceWorker.state){
                        case 'installed':
                        if (navigator.serviceWorker.controller){
                            let updateNotification = document.getElementById('update-available');
                            updateNotification.className = 'show';
                        }
                        break;
                    }
                });
            });
        }
    );
}

let refresh;
navigator.serviceWorker.addEventListener('controllerchange', ()=>{
    if (refresh) return;
    window.location.reload();
    refresh = true;
});