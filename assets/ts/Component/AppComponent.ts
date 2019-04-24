import Station from "../class/BikeApi/Station";
import SimpleScroll from "../class/SimpleScroll/SimpleScroll";
import Services from "../Services/StoreService";
import AbstractComponent from "./AbstractComponent";

export default class AppComponent extends AbstractComponent {

    public run(): void {
        Services.$station.render();

        if(Services.api.hasReservation() && !Services.api.hasExpired()) {
            Services.map.setDefaultStation(Services.api.getReservation().station);
        }

        // Chargement des données depuis l'API
        Services.api
            .load()
            .then(data => {
                // Ajout des données (stations) sur la carte
                Services.map.addList(data, (station: Station) => {
                    SimpleScroll.scrollTo('#reservation-card');

                    Services.$station.render({ station: station });
                    Services.$step1.render({ station: station });
                });
            });
    }

}