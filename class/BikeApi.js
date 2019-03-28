class BikeApi {
    
    /**
    * @type {String} Clé de l'API
    */
    apiKey;
    
    /**
    * @type {Array} Liste des stations 
    */
    stations;
    
    /**
    * @default null
    * @type {*} Réservation en cours 
    */
    currentReservation = null;
    
    
    /**
    * 
    * @param {Array} config 
    */
    constructor(config) {
        this.apiKey = config.apiKey;
    }
    
    /**
    * Charge la liste des stations depuis l'api
    * 
    * @async
    * 
    * @returns {Promise<Array>} Liste des stations 
    */
    async load() {
        return new Promise((resolve, reject) => {
            $.get('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=' + this.apiKey).then(data => {
            this.stations = data;
            
            resolve(data);
        });
    });
}

/**
* Retourne une station par rapport à sa latitude et à sa longitude
* 
* @param {Number} lat 
* @param {Number} lng 
* 
* @returns Station
*/
findStation(lat, lng) {
    return this.stations.filter(station => {
        return (station.position.lat === lat && lng === station.position.lng);
    })
}

/**
* Retourn true si une reservation est enregistrée
* 
* @returns {Boolean}
*/
hasReservation() {
    return this.currentReservation !== null;
}

/**
* Retourne la réservation enregistrée
* 
* @returns {*}
*/
getReservation() {
    return this.currentReservation
}

}