require('bootstrap/dist/css/bootstrap.min.css');
require('../images/marker-green.png');
require('../images/marker-red.png');
require('../images/logo.png');

import BikeApi from "./class/BikeApi/BikeApi";
import LeafletMap from "./class/LeafletMap/LeafletMap";
import Slider from "./class/Slider/Slider";

const revervationMap = new LeafletMap({
    selector: 'map',
    api: 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
    accessToken: 'pk.eyJ1IjoidGhldGFreWxvIiwiYSI6ImNqc3lqZHN1czA0a3M0M296ZHd5OG5sN3gifQ.l3oeViJzU6cRTckBDLto2Q',
    maxZoom: 16,
    styleId: 'mapbox.streets',
    defaultView: [45.75, 4.85],
    defaultZoom: 13
});

const bikeApi = new BikeApi({
    apiKey: '127afb8ee4f63cf897ba3944a3ffc79aa1616206'
});

let $defaultAlert = $('#reservation-card .alert.alert-secondary');
let $form = $('#reservation-card form');

let $stationDetail = $('#reservation-card #station-detail'),
    $stationTitle = $stationDetail.find('.title'),
    $stationAddress = $stationDetail.find('.address'),
    $stationPlaces = $stationDetail.find('.places'),
    $stationAvailableBikes = $stationDetail.find('.available_bikes');

bikeApi.load().then(data => {
    data.forEach(item => {

        const position: [number, number] = [item.position.lat, item.position.lng];
        const icon = ( item.status === 'OPEN' ) ? 'marker-green.png' : 'marker-red.png';

        const marker = revervationMap.addItem(position, "./build/images/" + icon);
        
        marker.addEventListener('click', () => {
            $defaultAlert.addClass('d-none');
            $form.removeClass('d-none');
            $stationDetail.removeClass('d-none');

            $stationTitle.text(item.name);
            $stationAddress.text(item.address);
            $stationPlaces.text(item.available_bike_stands);
            $stationAvailableBikes.text(item.bike_stands);
        })
    });
    
    revervationMap.center();
});


const slider = new Slider();