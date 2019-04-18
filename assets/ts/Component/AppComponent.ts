import Station from "../class/BikeApi/Station";
import Services from "../Services/StoreService";
import SimpleScroll from "../simplescroll";
import AbstractComponent from "./AbstractComponent";

export default class AppComponent extends AbstractComponent {

    public run(): void {
        Services.station.render();

        // Chargement des données depuis l'API
        Services.$api
            .load()
            .then(data => {
                // Ajout des données (stations) sur la carte
                Services.$map.addList(data);

                // Quand l'utilisateur clique sur une station 
                Services.$map.onSelect((station: Station) => {
                    SimpleScroll.scrollTo('#reservation-card');

                    Services.station.render({ station: station });
                    Services.step1.render({ station: station });
                });
            });
    }

}