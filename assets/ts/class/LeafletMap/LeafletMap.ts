import Station from "../BikeApi/Station";
import LeafletMapConfig from "./LeafletMapConfig";
import Services from "../../Services/StoreService";

const L = require('leaflet');
require('leaflet/dist/leaflet.css')
require('leaflet.markercluster');

export default class LeafletMap {

    private selector: string;
    private api: string;
    private accessToken: string;
    private maxZoom: number;
    private styleId: string;
    private defaultView: [number, number];
    private defaultZoom: number;

    private map: L.Map;
    private mapCluster = L.markerClusterGroup({
        showCoverageOnHover: false // Désactivation des zones de markers au hover
    });

    private mapMarkersPositions: Array<[number, number]> = [];

    private defaultStation: Station;

    static readonly selectIcon: L.Icon = L.icon({
        iconUrl: "./build/images/markers/marker-yellow.png",
        iconSize: [55, 55],
        iconAnchor: [24, 54]
    });

    static readonly reservedIcon: L.Icon = L.icon({
        iconUrl: "./build/images/markers/marker-blue.png",
        iconSize: [55, 55],
        iconAnchor: [24, 54]
    });

    static readonly openIcon: L.Icon = L.icon({
        iconUrl: "./build/images/markers/marker-green.png",
        iconSize: [55, 55],
        iconAnchor: [24, 54]
    });

    static readonly closedIcon: L.Icon = L.icon({
        iconUrl: "./build/images/markers/marker-red.png",
        iconSize: [55, 55],
        iconAnchor: [24, 54]
    });

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

    private initMap(): void {
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

    public setDefaultStation(station: Station): void {
        this.defaultStation = station;
    }

    public addList(stations: Station[], callback) {

        stations.forEach(station => {
            let icon;

            const position: [number, number] = [station.position.lat, station.position.lng];

            // Ajout de la position du marker dans une variable contenant l'ensemble des positions
            this.mapMarkersPositions.push(position);

            if (this.defaultStation) {
                if (station.number === this.defaultStation.number) {
                    icon = LeafletMap.reservedIcon;
                } else {
                    icon = station.getLeafletIcon();
                }
            } else {
                icon = station.getLeafletIcon();
            }

            // Marker
            const marker: L.Marker = L.marker(position, { icon: icon, station: station });


            // Ajout du point sur le layer
            this.mapCluster.addLayer(marker);

            marker.addEventListener('click', () => {
                Services.selectMarker(marker, station);

                callback(station);
            });

        });

        if (!this.defaultStation) {
            this.center();
        } else {
            this.map.setView(this.defaultStation.getPosition(), 18);
        }
    };

    public center(): void {
        this.map.fitBounds(this.mapMarkersPositions);
    }

}