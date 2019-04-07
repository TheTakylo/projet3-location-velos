import ReservationUser from "./StationReservationUser";
import Station from "./Station";

export default class Reservation {
    public station: Station;
    public expireAt: number;
    public user: ReservationUser;
}
