import Station from "./Station";
import ReservationUser from "./StationReservationUser";

export default class Reservation {
    public station: Station;
    public expireAt: number;
    public user: ReservationUser;

    public hasExpired(): boolean {
       return this.expireAt < (new Date(Date.now()).getTime());
    }

    constructor(data: any) {
        this.station = new Station(data["station"]);
        this.expireAt = data["expireAt"];
        this.user = data["user"];
    }
}
