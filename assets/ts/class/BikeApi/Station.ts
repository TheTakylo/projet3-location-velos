export default interface Station {
    number: number;
    contract_name: string;
    name: string;
    address: string;
    position: {
        lat: number
        lng: number
    };
    banking: boolean;
    bonus: boolean
    status: string;
    bike_stands: number;
    available_bike_stands: number;
    available_bikes: number;
    last_update: Date;
}