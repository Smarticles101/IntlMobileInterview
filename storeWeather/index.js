const fs = require('fs');
const STORES = JSON.parse(fs.readFileSync('stores.json', 'utf8'));
const fetch = require('isomorphic-fetch');

const MQ_KEY = 'nvYJyjPk3QZR1GbITAogyOeAzDMMNRvB';
const ROUTE_MATRIX_URL = `http://www.mapquestapi.com/directions/v2/routematrix?key=${MQ_KEY}`;

const APIXU_KEY = '95aa1018d56b4885886191116192802';
const FORECAST_URL = `http://api.apixu.com/v1/forecast.json?key=${APIXU_KEY}`;

const main = async() => {
    let stores = await getStoreRouteMatrix()

    stores.sort(timeSort)
    console.log(`Closest store to ${stores[0].storeNbr} by drive time :: ${stores[1].storeNbr}`);

    stores.sort(distanceSort)
    console.log(`Closest store to ${stores[0].storeNbr} by distance :: ${stores[1].storeNbr}`);

    stores = await Promise.all(stores.map(getStoreWithWeather))
    
    console.log(`Store ${stores[0].storeNbr} is ${stores[0].temp} Degrees Fahrenheit and ${stores[0].condition}`)
    console.log(`Store ${stores[1].storeNbr} is ${stores[1].temp} Degrees Fahrenheit and ${stores[1].condition}`)

    stores.sort(idealWeatherSort)

    console.log(`Store ${stores[0].storeNbr} has nicest weather ${stores[0].temp} Degrees Fahrenheit and ${stores[0].condition}`)
}

const IDEAL_DEGREES_F = 67;
const distanceSort = (a, b) => a.distance - b.distance
const timeSort = (a, b) => a.time - b.time
const idealWeatherSort = (a, b) => Math.abs(a.temp - IDEAL_DEGREES_F) - Math.abs(b.temp - IDEAL_DEGREES_F)

const getStoreRouteMatrix = async () => {
    let resp = await fetch(ROUTE_MATRIX_URL, {
        method: 'POST',
        body: JSON.stringify({
            // https://developer.mapquest.com/documentation/common/forming-locations/
            locations: STORES.map(store => `${store.address}, ${store.city}, ${store.state}`)
        })
    })

    let { time, distance, locations } = await resp.json();
    let postalCodes = locations.map((loc) => loc.postalCode)

    return STORES.map((store, ind) => ({
        ...store, time: time[ind], distance: distance[ind], zip: postalCodes[ind]
    }))
}

const getForecast = async (zip) => {
    let resp = await fetch(`${FORECAST_URL}&q=${encodeURIComponent(zip)}&days=1`)
    let json = await resp.json();

    return json.forecast.forecastday[0].day;
}

const getStoreWithWeather = async(store) => {
    let forecast = await getForecast(store.zip);

    return {
        ...store,
        temp: forecast.avgtemp_f,
        condition: forecast.condition.text
    }
}

main();
