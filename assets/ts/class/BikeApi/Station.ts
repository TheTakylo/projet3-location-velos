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

    public getBadge(): string {
        return (this.status == 'OPEN') ? 'success' : 'danger';
    }
}