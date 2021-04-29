const
const APL_KEY ="eb5a31d35b13abdda1f8301e3e983617";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APL_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json);
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(Position){
    const latitude = Position.coords.latitude;
    const longitude = Position.coords.longitude;
    const coordsPObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}

function handleGeoError(){
    consolee.log("Cant access geo localtion");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();  
}

init();