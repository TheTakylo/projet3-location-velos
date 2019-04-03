import Station from "./Station";

interface Reservation {
    station: {
        number: number;
        contract_name: string;
    };
    expireAt: number;
}

interface BikeApiConfig {
    apiKey: string;
}

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
    constructor(config: BikeApiConfig) {
        this.apiKey = config.apiKey;
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
        .then((data: Station[]) => {
            this.stations = data;
            
            return data;
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
        return localStorage.getItem('reservation') !== null;
    }
    
    /**
    * Vérifie si la réservation à expirer
    * 
    * @returns {boolean | null}
    */
    hasExpired(): boolean | null {
        if(!this.hasReservation()) {
            return null;
        }
        
        let expireAt = this.getReservation().expireAt;
        let now = new Date(Date.now()).getTime();
        
        return expireAt < now;
    }
    
    /**
    * Retourne la réservation enregistrée
    * 
    * @returns {Reservation}
    */
    getReservation(): Reservation {
        return <Reservation>JSON.parse(localStorage.getItem('reservation'));
    }
    
    setReservaton(station: Station, expireAt: number) {
        const data: Reservation = {
            station: {
                number: station.number,
                contract_name: station.contract_name
            },
            expireAt: expireAt
        };
        
        localStorage.setItem('reservation', JSON.stringify(data));
    }
    
    deleteReservation(): void {
        localStorage.clear();
    }
    
}
