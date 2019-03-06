const request = require('request');

const geoCode = (address, callback) => {
    const geoCodeToken = 'pk.eyJ1IjoiZGV2bW9kZSIsImEiOiJjanN0ZDB6cnkyMmw3NDNwZG5ncmpmaTRiIn0.p6wiKgOzUa3FSKF2khiWeA';
    // const address = encodeURIComponent('noida 201301 india');
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geoCodeToken}&limit=1`;
    
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect mapbox location service.', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);        
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
})
};

module.exports = geoCode;