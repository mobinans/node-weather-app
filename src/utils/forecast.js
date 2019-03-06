const request = require('request');

const forecast = (lan, lat, callback) => {
    const darkSkyWeatherApi = 'ad95ffc12ffb5702f5a7d47c304638d4';
    const key = '?units=si&lang=en';
    const url = `https://api.darksky.net/forecast/${darkSkyWeatherApi}/${lat},${lan}${key}`;

    request({url, json: true}, (err, {body}) => {
        // const data = JSON.parse(res.body);
        if(err){
           callback('Unable to connect to weather secrvice.', undefined);
        }else if(body.error){
           callback('Unable to find location', undefined);
        }else{
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            const dailySummary = body.daily.data[0].summary;
            const outputData = `${dailySummary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`; 
            callback(undefined, outputData);
        }
    });    
}

module.exports = forecast;