import BikeApi from "../class/BikeApi/BikeApi";
import LeafletMap from "../class/LeafletMap/LeafletMap";
import AlertComponent from "../Component/Alerts/AlertComponent";
import AppComponent from "../Component/AppComponent";
import StationComponent from "../Component/Reservation/StationComponent";
import Step1Component from "../Component/Reservation/Steps/Step1Component";
import Step2Component from "../Component/Reservation/Steps/Step2Component";
import Station from "../class/BikeApi/Station";

class StoreService {
    
    private static instance: StoreService;
    
    public api: BikeApi;
    public map: LeafletMap;
    
    public $app: AppComponent;
    public $alert: AlertComponent;
    public $station: StationComponent;
    public $step1: Step1Component;
    public $step2: Step2Component;
    
    public $current_marker: L.Marker;
    public $current_station: Station;
    
    private constructor() { }
    
    static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
            StoreService.instance.api = new BikeApi('127afb8ee4f63cf897ba3944a3ffc79aa1616206');
            StoreService.instance.map = new LeafletMap({
                selector: 'map',
                api: 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
                accessToken: 'pk.eyJ1IjoidGhldGFreWxvIiwiYSI6ImNqc3lqZHN1czA0a3M0M296ZHd5OG5sN3gifQ.l3oeViJzU6cRTckBDLto2Q',
                maxZoom: 16,
                styleId: 'mapbox.streets',
                defaultView: [45.75, 4.85],
                defaultZoom: 13
            });
            
            StoreService.instance.$app = new AppComponent();
            StoreService.instance.$alert = new AlertComponent();
            StoreService.instance.$station = new StationComponent();
            StoreService.instance.$step1 = new Step1Component();
            StoreService.instance.$step2 = new Step2Component();
        }
        
        return StoreService.instance;
    }
    
    selectMarker(marker: L.Marker, station: Station): void {
        const api = StoreService.getInstance().api;
        
        if( api.hasReservation() && api.getReservation().station.number === station.number ) {
            StoreService.getInstance().$current_marker = marker;
            StoreService.getInstance().$current_marker.setIcon(LeafletMap.reservedIcon);
            return;
        }

        if( StoreService.getInstance().$current_marker ) {
            StoreService.getInstance().$current_marker
        }

        marker.setIcon(LeafletMap.selectIcon);
        
        StoreService.getInstance().$current_marker = marker;
        StoreService.getInstance().$current_station = station;
    }
    
}

const Services = StoreService.getInstance();

export default Services;