// front end js interact with html and backend
console.log("Sanity Check: JS is working!");

// access DOM contents
let lat = document.getElementById("latitude");
let lon = document.getElementById("longitude");
let bac = document.getElementById("backResponse");
let wea = document.getElementById("weather");
let tem = document.getElementById("temperature");
let cit = document.getElementById("city");
let cou = document.getElementById("country");

let backendRoute = new URL("http://localhost:8000/api");

// 1). Front end request geolocation
// get geolocation latitude longitude
// need to enable browser location setting
const getCurLocation = () => {
    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        lat.innerHTML += latitude;
        lon.innerHTML += longitude;
        // attach query-string, either way works, I like second one is more dynamic
        // getWeather(`http://localhost:8000/api?latitude=${latitude}&longitude=${longitude}`);
        params = {latitude:latitude, longitude:longitude};
        Object.keys(params).forEach(key => backendRoute.searchParams.append(key, params[key]));
        getWeather(backendRoute);
    }
    const error = () => {
        lat.innerHTML += 'Unable to retrieve your location';
        lon.innerHTML += 'Unable to retrieve your location';
    }

    // request for geolocation, 
    // if success
    //      extract latitude and longitude from response
    //          append latitude and longitude to html
    //      call getWeather(backendRoute) and pass in latitude and longitude
    //      I use GET request pass data by query-string, 
    //      If you use POST request you can change the given codes.
    // if error 
    //      append error message to latitude and longitude to html
    
    navigator.geolocation.getCurrentPosition(success, error);
}

// 2). Front end request to back end
// 3). Back end request Weather API
// get weather forecast of local city
// front end I send GET request to back end, if you use POST request you can change given codes
// if native fetch not working try to install / use node-fetch or ajax or axios
// backend should already allowed CORS, if not then install / use CORS
const getWeather = async (backendRoute) => {
    // request the backend route, pass in latitude and longitude
    // if request success
    //      append a backend response success message to html
    //      parse backend response
    //      append weather data to html
    //  if error
    //      append a backend response error message to html
    //      append error message to weather data to html

    try {
        const response = await fetch(backendRoute);
        if(response){
            bac.innerHTML += ' backend response success';
        }
        const json = await response.json();
        let weather = json.weather[0].main;
        let temperature = json.main.temp;
        let city = json.name;
        let country = json.sys.country;
        wea.innerHTML += weather;
        tem.innerHTML += temperature + ' &#176;C';
        cit.innerHTML += city;
        cou.innerHTML += country;
    }catch (error) {
        bac.innerHTML += ' backend response fail';  // when wrong url
        wea.innerHTML += error;
        tem.innerHTML += error;
        cit.innerHTML += error;
        cou.innerHTML += error;
    }
}

// start the request
getCurLocation();