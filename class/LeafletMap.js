class LeafletMap {
    
    mapId;
    mapApi;
    mapAccessToken;
    mapMaxZoom;
    mapStyleId;
    mapDefaultView;
    mapDefaultZoom;
    
    map;
    mapCluster;
    mapPoints = [];
    
    constructor(config) {
        this.mapId = config.mapId;
        this.mapApi = config.mapApi;
        this.mapAccessToken = config.mapAccessToken;
        this.mapMaxZoom = config.mapMaxZoom;
        this.mapStyleId = config.mapStyleId;
        this.mapDefaultView = config.mapDefaultView;
        this.mapDefaultZoom = config.mapDefaultZoom;
        
        this.initMap();
    };
    
    initMap() {
        this.map = L.map(this.mapId).setView(this.mapDefaultView, this.mapDefaultZoom);
        
        L.tileLayer(this.mapApi, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: this.mapMaxZoom,
            accessToken: this.mapAccessToken,
            id: this.mapStyleId
            
        }).addTo(this.map);
        
        
        this.mapCluster = L.markerClusterGroup();
    }
    
    setList(list) {
        // On parcours la liste
        list.forEach(item => {
            // On definie un Point
            let p = [item.position.lat, item.position.lng];

            // Ajout du point dans une variable contenant l'ensemble des points
            this.mapPoints.push(p);

            // Ajout du point sur le layer
            this.mapCluster.addLayer(
                L.marker(p, {
                    icon: L.icon({
                        iconUrl: './images/marker.png', 
                        iconSize: [55, 55],
                        iconAnchor: [24, 54]
                    })
                })
            )
        });

        // Ajout du layer sur la map
        this.map.addLayer(this.mapCluster);

        // On centre la carte par rapport au nuage de points
        this.map.fitBounds(this.mapPoints);
    };

    onclick(callback) {
        this.mapCluster.addEventListener('click', (event) => {
            callback(event);
        });
    }
    
}