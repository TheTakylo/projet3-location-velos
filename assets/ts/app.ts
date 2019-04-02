require('bootstrap/dist/css/bootstrap.min.css');
require('../images/marker-green.png');
require('../images/marker-red.png');
require('../images/logo.png');

import BikeApi from "./class/BikeApi/BikeApi";
import LeafletMap from "./class/LeafletMap/LeafletMap";
import SimpleSign from "./class/SimpleSign/SimpleSign";

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

const $defaultAlert = $('#reservation-card #default-alert');
const $errorAlert = $('#reservation-card #error-alert');
const $successAlert = $('#reservation-card #success-alert');
const $form = $('#reservation-card form');

const $stationDetail = $('#reservation-card #station-detail'),
$stationTitle = $stationDetail.find('.title'),
$stationAddress = $stationDetail.find('.address'),
$stationPlaces = $stationDetail.find('.places'),
$stationAvailableBikes = $stationDetail.find('.available_bikes'),
$stationState = $stationDetail.find('.state');

bikeApi.load().then(data => {
    data.forEach(item => {
        
        const position: [number, number] = [item.position.lat, item.position.lng];
        const icon = ( item.status === 'OPEN' ) ? 'marker-green.png' : 'marker-red.png';
        
        const marker = revervationMap.addItem(position, "./build/images/" + icon);
        
        // Gestion du click sur un marker (une station)
        marker.addEventListener('click', () => {
            
            $defaultAlert.addClass('d-none');
            $form.removeClass('d-none');
            $stationDetail.removeClass('d-none');
            
            $stationTitle.text(item.name);
            $stationAddress.text(item.address);
            $stationAvailableBikes.text(item.available_bike_stands);
            
            const textClassList = ['text-success', 'text-danger', 'text-warning'];
            const badgesClassList = ['badge-success', 'badge-danger', 'badge-warning'];
            
            // Nombre de vélos 
            // SI le nombre est supérieur à 5, le texte sera VERT
            // SI le nombre est inférieur à 5 et supérieur à 2 , le texte sera ORANGE
            // SI le nombre est inférieur à 2 , le texte sera ROUGE
            if(item.bike_stands > 5) {
                $stationPlaces.parent().removeClass(textClassList).addClass('text-success');
                $stationPlaces.text(item.bike_stands);
            } else if (item.bike_stands < 5) {
                $stationPlaces.parent().removeClass(textClassList).addClass('text-danger');
                $stationPlaces.text(item.bike_stands);
            } else if (item.bike_stands < 2) {
                $stationPlaces.parent().removeClass(textClassList).addClass('text-warning');
                $stationPlaces.text(item.bike_stands);
            }
            
            // Status de la stations
            // VERT = OPEN
            // ROUGE = CLOSE
            if(item.status == 'OPEN') {
                $stationState.text('Station ouverte');
                $stationState.removeClass(badgesClassList).addClass('badge-success');
            } else {
                $stationState.text('Station fermée');
                $stationState.removeClass(badgesClassList).addClass('badge-danger');
            }
        })
    });
    
    revervationMap.center();
});


const $reservationForm = $('#reservation-form');
const $buttonStepOne = $reservationForm.find('button.substep1');
const $buttonStepTwo = $reservationForm.find('button.substep2');

// Click du boutton réserver
$buttonStepOne.click(e => {
    e.preventDefault();
    
    const firstname: string = $reservationForm.find("input[name='firstname']").val().toString().trim();
    const lastname: string = $reservationForm.find("input[name='lastname']").val().toString().trim();
    
    // Vérification de la présence d'un nom & prénom
    if(firstname == '' || lastname == '') {
        // Message d'erreur
        $errorAlert.removeClass('d-none');
        return;
    }
    
    $errorAlert.addClass('d-none');
    
    // On cache la premère partie & on affiche le canvas de signature
    $reservationForm.find('.step-1').addClass('d-none');
    $reservationForm.find('.step-2').removeClass('d-none');
    
    // Canvas de signature
    const sign = SimpleSign.sign('canvasSignature');
    
    // TODO: Annulation de la réservation
    $reservationForm.find('.form-cancel').click(e => { sign.reset(); });
    // TODO: Remise à zéro du canvas 
    $reservationForm.find('.sign-reset').click(e => { sign.reset(); });
    
    $buttonStepTwo.click(e => {

        // Si le canvas (la signature) est vide
        if(sign.isEmpty()) {
            $errorAlert.removeClass('d-none');
            return;
        }

        // On cache le canvas & les bouttons
        $reservationForm.find('.step-2').addClass('d-none');

        // Remise à zéro des champs
        $reservationForm.find("input[name='firstname']").text("");
        $reservationForm.find("input[name='lastname']").text("");
        
        
        // On cache le message d'erreur
        $errorAlert.addClass('d-none');
        // Message de succès
        $successAlert.removeClass('d-none');
    });
    
});