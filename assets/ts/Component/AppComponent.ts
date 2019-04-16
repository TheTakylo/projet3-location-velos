import Station from "../class/BikeApi/Station";
import SimpleScroll from "../simplescroll";
import AbstractComponent from "./AbstractComponent";
import StationComponent from "./Reservation/StationComponent";
import Step1Component from "./Reservation/Steps/Step1Component";

export default class AppComponent extends AbstractComponent {

    public $view: string;
    public $container: string;
    
    public run(): void {
        const stationComponent = new StationComponent();
        stationComponent.render();
        
        const step1Component = new Step1Component();
        // Chargement des données depuis l'API
        this.$class.api
        .load()
        .then(data => {
            // Ajout des données (stations) sur la carte
            this.$class.map.addList(data);

            // Quand l'utilisateur clique sur une station 
            this.$class.map.onSelect((station: Station) => {
                SimpleScroll.scrollTo('#reservation-card');

                stationComponent.render({station: station});
                step1Component.render({station: station});
            });
        });
    }
    
}