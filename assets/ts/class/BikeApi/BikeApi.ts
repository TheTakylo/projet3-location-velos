import Station from "./Station";
import Reservation from "./StationReservation";
import ReservationUser from "./StationReservationUser";

export default class BikeApi {

    /**
    * @type {String} Clé de l'API
    */
    private apiKey;

    /**
    * @type {Station[]} Liste des stations 
    */
    private stations: Station[];

    /**
    * 
    * @param {Array} config 
    */
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
    * Charge la liste des stations depuis l'api
    * 
    * @async
    * 
    * @returns {Promise<Station[]>} Liste des stations 
    */
    async load(): Promise<Station[]> {
        return $.get('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=' + this.apiKey)
            .then((data) => {
                this.stations = data.map((stationObj) => {
                    return new Station(stationObj);
                });

                return this.stations;
            });
    }

    find(number: number, contract_name: string): Station {
        return this.stations.filter(station => {
            return (station.number === number && contract_name === station.contract_name);
        })[0];
    }

    /**
    * Retourn true si une reservation est enregistrée
    * 
    * @returns {Boolean}
    */
    hasReservation(): boolean {
        return sessionStorage.getItem('reservation') !== null;
    }

    /**
    * Retourne la réservation enregistrée
    * 
    * @returns {Reservation}
    */
    getReservation(): Reservation | null {
        if(sessionStorage.getItem('reservation') === null) {
            return;
        }
        
        return new Reservation(JSON.parse(sessionStorage.getItem('reservation')));
    }

    setReservaton(station: Station, user: ReservationUser, expireAt: number) {
        const data = new Reservation({
            station: station,
            expireAt: expireAt,
            user: user
        });

        sessionStorage.setItem('reservation', JSON.stringify(data));
    }

    deleteReservation(): void {
        sessionStorage.clear();
    }

}
