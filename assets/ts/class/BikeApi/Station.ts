import LeafletMap from "../LeafletMap/LeafletMap";

export default class Station {
    public number: number;
    public contract_name: string;
    public name: string;
    public address: string;
    public position: {
        lat: number
        lng: number
    };
    public banking: boolean;
    public bonus: boolean
    public status: string;
    public bike_stands: number;
    public available_bike_stands: number;
    public available_bikes: number;
    public last_update: Date;
    public badge: boolean;

    public getLeafletIcon(): L.Icon {
        return (this.status == 'OPEN') ? LeafletMap.openIcon : LeafletMap.closedIcon;
    }

    constructor(data: any) {
        this.number = data["number"];
        this.contract_name = data["contract_name"];
        this.name = data["name"];
        this.address = data["address"];
        this.position = data["position"];
        this.banking = data["banking"];
        this.bonus = data["bonus"]
        this.status = data["status"];
        this.bike_stands = data["bike_stands"];
        this.available_bike_stands = data["available_bike_stands"];
        this.available_bikes = data["available_bikes"];
        this.last_update = data["last_update"];
        this.badge = (data["status"] == "OPEN") ? true : false;
    }
}