
require('../css/style.css');

import LeafletMap from "./class/LeafletMap";
import BikeApi from "./class/BikeApi";

let myMap = new LeafletMap({
    mapId: 'map',
    mapApi: 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
    mapAccessToken: 'pk.eyJ1IjoidGhldGFreWxvIiwiYSI6ImNqc3lqZHN1czA0a3M0M296ZHd5OG5sN3gifQ.l3oeViJzU6cRTckBDLto2Q',
    mapMaxZoom: 16,
    mapStyleId: 'mapbox.streets',
    mapDefaultView: [45.75, 4.85],
    mapDefaultZoom: 12
});

let bikeApi = new BikeApi({
    apiKey: '127afb8ee4f63cf897ba3944a3ffc79aa1616206'
});

bikeApi.load().then(_ => {
    console.log(_);
    myMap.setList(bikeApi.stations);
    
    
    myMap.onclick(event => {
        console.log(event)
        let station = event.layer._latlng;
        
        station = bikeApi.findStation(station.lat, station.lng);
        
        console.log(station);
    });
});