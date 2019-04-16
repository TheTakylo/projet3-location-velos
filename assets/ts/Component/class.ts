import BikeApi from "../class/BikeApi/BikeApi";
import LeafletMap from "../class/LeafletMap/LeafletMap";

const ClassesArray = {
    api: new BikeApi('127afb8ee4f63cf897ba3944a3ffc79aa1616206'),
    map: new LeafletMap({
        selector: 'map',
        api: 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
        accessToken: 'pk.eyJ1IjoidGhldGFreWxvIiwiYSI6ImNqc3lqZHN1czA0a3M0M296ZHd5OG5sN3gifQ.l3oeViJzU6cRTckBDLto2Q',
        maxZoom: 16,
        styleId: 'mapbox.streets',
        defaultView: [45.75, 4.85],
        defaultZoom: 13
    })
};


export default ClassesArray;