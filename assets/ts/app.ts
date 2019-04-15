require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

import Slider from "./class/Slider/Slider";
import AppComponent from "./Component/AppComponent";

new Slider($('#slider'));


let app = new AppComponent().run();

// const reservationMap = new LeafletMap({
//     selector: 'map',
//     api: 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
//     accessToken: 'pk.eyJ1IjoidGhldGFreWxvIiwiYSI6ImNqc3lqZHN1czA0a3M0M296ZHd5OG5sN3gifQ.l3oeViJzU6cRTckBDLto2Q',
//     maxZoom: 16,
//     styleId: 'mapbox.streets',
//     defaultView: [45.75, 4.85],
//     defaultZoom: 13
// });

// const bikeApi = new BikeApi('127afb8ee4f63cf897ba3944a3ffc79aa1616206');

// bikeApi.load().then(data => { reservationMap.addList(data); });


// const alertComponent = new AlertComponent();
// const stationComponent = new StationComponent();
// const step1Component = new Step1Component();
// const step2Component = new Step2Component();

// if (bikeApi.getReservation()) {
    
//     let cancellable = false;
    
//     if(bikeApi.getReservation().hasExpired()) {
//         alertComponent.render('reservation_expired');
//         bikeApi.deleteReservation();
//     } else {
//         cancellable = true;
//         alertComponent.render('reservation_already');
//     }
    
//     stationComponent.render({ station: bikeApi.getReservation().station, cancellable: cancellable })
//     .then(data => {
        
//     });
    
// } else {
//     alertComponent.render('default');
// }

// let showStation = (station: Station, reservation?: Reservation | null) => {
//     alertComponent.destroy();

//     if(reservation instanceof Reservation && !reservation.hasExpired()) {
//         alertComponent.render('reservation_already');
//         stationComponent.render({ station: station });
//     } else {
//         stationComponent.render({ station: station });
//     }
// }

// let startReversation = async (station: Station) => {
//     showStation(station, bikeApi.getReservation());
    
//     try {
        
//         let step1 = await step1Component.render();
//         let step2 = await step2Component.render();
        
//         let expireAt = new Date(Date.now());
//         expireAt.setMinutes(expireAt.getMinutes() + 20);
        
//         bikeApi.setReservaton(station, step1, expireAt.getTime());
        
//         alertComponent.render('reservation_success');
        
//         localStorage.setItem('firstname', step1.firstname);
//         localStorage.setItem('lastname', step1.lastname);
        
//         step2Component.destroy();
        
//     } catch {
//         alertComponent.render('form_errors');
//     }
    
    
// };

// reservationMap.onSelect((station: Station) => {
//     startReversation(station);
//     SimpleScroll.scrollTo('#reservation-card');
// });



// // function dateDiff(start, end) {
// //     return (end - start).toString()
// // }

// // let start = new Date(Date.now()).getTime();
// // let end = bikeApi.getReservation().expireAt

// // console.log(start);
// // console.log(end);

// // console.log(new Date(dateDiff(start, end)));