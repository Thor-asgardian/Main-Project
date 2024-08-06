function getLocation() {
    const x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const x = document.getElementById("demo");
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br> Longitude: " + position.coords.longitude;
}

function showError(error) {
    const x = document.getElementById("demo");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

function getSpeed() {
    const speedDisplay = document.getElementById("speed");

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showSpeed, showError, {
            enableHighAccuracy: true
        });
    } else {
        speedDisplay.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showSpeed(position) {
    const speedDisplay = document.getElementById("speed");
    if (position.coords.speed !== null) {
        const speedInMps = position.coords.speed;
        const speedInKmph = (speedInMps * 3.6).toFixed(2); // Convert m/s to km/h
        speedDisplay.innerHTML = "Your speed is: " + speedInKmph + " km/h";
    } else {
        speedDisplay.innerHTML = "Speed information is not available.";
    }
}

function showError(error) {
    const speedDisplay = document.getElementById("speed");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            speedDisplay.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            speedDisplay.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            speedDisplay.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            speedDisplay.innerHTML = "An unknown error occurred.";
            break;
    }
}