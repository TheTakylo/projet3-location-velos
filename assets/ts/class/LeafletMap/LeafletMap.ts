const L = require('leaflet');
require('leaflet/dist/leaflet.css')
require('leaflet.markercluster');

interface LeafletMapConfig {
    selector: string;
    api: string;
    accessToken: string;
    maxZoom: number;
    styleId: string;
    defaultView: [number, number];
    defaultZoom: number;
}

export default class LeafletMap {
    
    selector: string;
    api: string;
    accessToken: string;
    maxZoom: number;
    styleId: string;
    defaultView: [number, number];
    defaultZoom: number;
    
    map: L.Map;
    mapCluster = L.markerClusterGroup({
        showCoverageOnHover: false // Désactivation des zones de markers au hover
    });
    mapMarkersPositions: Array<[number, number]> = [];
    
    constructor(mapConfig: LeafletMapConfig) {
        this.selector = mapConfig.selector;
        this.api = mapConfig.api;
        this.accessToken = mapConfig.accessToken;
        this.maxZoom = mapConfig.maxZoom;
        this.styleId = mapConfig.styleId;
        this.defaultView = mapConfig.defaultView;
        this.defaultZoom = mapConfig.defaultZoom;
        
        this.initMap();
    };
    
    public initMap(): void {
        this.map = L.map(this.selector).setView(this.defaultView, this.defaultZoom);
        
        L.tileLayer(this.api, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: this.maxZoom,
            id: this.styleId,
            detectRetina: true,
            accessToken: this.accessToken
        }).addTo(this.map);
        
        
        // Ajout du layer sur la map
        this.map.addLayer(this.mapCluster);
    }
    
    public addItem(markerPositions: [number, number], iconUrl: string = './build/images/marker-icon.png'): L.Marker {
        
        // Ajout de la position du marker dans une variable contenant l'ensemble des positions
        this.mapMarkersPositions.push(markerPositions);
        
        
        // Icon 
        let icon: L.Icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [55, 55],
            iconAnchor: [24, 54]
        });

        // Marker
        let marker: L.Marker = L.marker(markerPositions, { icon: icon });
        
        // Ajout du point sur le layer
        this.mapCluster.addLayer( marker );

        return marker;
    };

    public center(): void {
        this.map.fitBounds(this.mapMarkersPositions);
    }
}