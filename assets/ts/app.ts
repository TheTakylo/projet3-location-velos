require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

import BikeApi from "./class/BikeApi/BikeApi";
import Station from "./class/BikeApi/Station";
import LeafletMap from "./class/LeafletMap/LeafletMap";
import Slider from "./class/Slider/Slider";
import AlertComponent from "./Component/Alerts/AlertComponent";
import StationComponent from "./Component/Reservation/StationComponent";
import FirstStep from "./Component/Reservation/Steps/FirstStep";
import SecondStep from "./Component/Reservation/Steps/SecondStep";

let slider = new Slider($('#slider'));

const reservationMap = new LeafletMap({
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

bikeApi.load().then(data => {
    
    reservationMap.addList(data);
    
});



const $appAlerts = $('#app-alerts');
const $appContent = $('#app-content');
const $appStation = $('#app-station');
const $appForm = $('#app-form');

const alert = new AlertComponent();
const stationComponent = new StationComponent();
const firstStep = new FirstStep();
const secondStep = new SecondStep();

if (bikeApi.hasReservation() && !bikeApi.hasExpired()) {
    alert.render($appAlerts, { type: 'primary', message: 'Vous avez une réservation en cours.' });

    const station = bikeApi.getReservation().station;

    stationComponent.render($appStation,  {
        station: station,
        badge: (station.status == 'OPEN') ? true : false,
        confirmed: true
    });
    
} else {
    alert.render($appAlerts, { type: 'primary', message: 'Veuillez sélectionnez une station.' });
}


reservationMap.onSelect((station: Station) => {
    
    if (bikeApi.hasReservation() && !bikeApi.hasExpired()) {
        
        alert.render($appAlerts, { type: 'danger', message: 'Vous avez déjà une réservation en cours. Veuillez l\'annuler' });
        
    } else {
        alert.destroy();
        
        stationComponent.render($appStation, {
            station: station,
            badge: (station.status == 'OPEN') ? true : false,
        });
        
        firstStep.render($appForm, {station: station}, (response) => {
            alert.destroy();
            
            if (!response.success) {
                alert.render($appAlerts, {type: 'danger', message: 'Veuillez remplir tous les champs.'});
            } else {
                
                secondStep.render($appForm, response.data, (response) => {
                    if(!response.success) {
                        alert.render($appAlerts, {type: 'danger', message: 'Veuillez remplir tous les champs.'});
                    } else {
                        let expireAt = new Date(Date.now());
                        expireAt.setMinutes(expireAt.getMinutes() + 20);

                        const user = {
                            firstname: response.data.firstname,
                            lastname: response.data.lastname
                        }

                        bikeApi.setReservaton(response.data.station, user, expireAt.getTime());
                        alert.render($appAlerts, {type: 'success', message: 'Votre réservation à bien été confirmée.'});

                        secondStep.destroy();
                    }
                });
            }
        });
        
    }
    
});