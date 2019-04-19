import Services from "../../Services/StoreService";
import AbstractComponent from "../AbstractComponent";

export default class StationComponent extends AbstractComponent {

    public $container: string = "#app-station";

    public $view: string = `
    {{#if station}}
        <h4><span class="title">{{station.name}}</span></h4>
        <div class="mt-1 mb-3">
            {{#if station.badge}}
            <span class="badge badge-success">
                Station ouverte
            </span>
            {{/if}}
            {{#unless station.badge}}
            <span class="badge badge-danger">
                Station fermée
            </span>
            {{/unless}}
        </div>
        <div class="row">
            <div class="col-md-5">Adresse :</div>
            <div class="col-md-7 text-right">
                <span class="address">{{station.address}}</span>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-5">Vélos disponibles :</div>
            <div class="col-md-7 text-right">
                <span class="places">{{station.available_bikes}}</span> <i class="ml-2 fa fa-bicycle"></i>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-5">Places disponibles :</div> 
            <div class="col-md-7 text-right">
                <span class="available_bikes">{{station.available_bike_stands}}</span>
            </div>
        </div>
        
        {{#if cancellable}}
        <button  data-toggle="modal" data-target="#exampleModal" type="button" class="btn btn-danger mt-4 cancel-reservation" role="button">Annuler</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Annulation de votre réservation</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mt-2 mb-2">
                        <strong>Confirmez vous l'annulation de votre réservation</strong>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-l
                        ight" data-dismiss="modal">Annuler</button>
                        <button type="button" data-dismiss="modal" id="delete-reservation" class="btn btn-danger">Confirmer</button>
                    </div>
                </div>
            </div>
        </div>
        {{/if}}
        
        <div class="mt-3 alert alert-danger d-none" id="reservation_timer">
            Votre réservation à la station <strong>{{station.name}}</strong> expirera dans 
            <strong>
                <span id="time_minutes"><span class="minutes"></span> et </span>
                <span id="time_seconds"><span class="seconds"></span></span>
            </strong>
        </div>
    {{/if}}
    `;

    private $time_minutes;
    private $seconds_span;
    private $minutes_span;

    public run(): void {

        Services.$alert.destroy();

        if (Services.api.hasReservation() && !Services.api.hasExpired()) {

            this.$data["cancellable"] = true;
            this.$data["station"] = Services.api.getReservation().station;
            this.compile();

            this.$time_minutes = $("#reservation_timer #time_minutes");
            this.$seconds_span = $('#reservation_timer #time_seconds .seconds');
            this.$minutes_span = $('#reservation_timer #time_minutes .minutes');

            this.startRemainingTimer();

            $("#delete-reservation").click(e => {
                this.cancelReservation();
            });

        }

        if (this.$data.station === undefined) {
            Services.$alert.render('default');
        }
    }

    private cancelReservation(): void {
        Services.api.deleteReservation();
        this.render();
    }


    private timeDiff(end: number): { minutes: number, seconds: number } {
        let now = new Date().getTime();

        let seconds: number = (end - now) / 1000;

        let days: number = Math.floor(seconds / 86400);
        seconds -= days * 86400;
        let hours: number = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        let minutes: number = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        seconds = Math.floor(seconds);

        return {
            minutes: minutes,
            seconds: seconds
        };
    }

    private startRemainingTimer() {
        let $timer = $("#reservation_timer");
        $timer.removeClass('d-none');

        const diff = this.timeDiff(Services.api.getReservation().expireAt);
        let s = diff.seconds;
        let m = diff.minutes;

        this.showTime(m, s);

        let lastM = false;

        let intervalID = setInterval(() => {

            s--;

            if (s === 0) {
                m--;
                s = 59;

                lastM = (m === 0) ? true : false;
            }

            if(lastM && s === 0) {
                $timer.addClass("d-none");
                clearInterval(intervalID);
                this.cancelReservation();
            }

            this.showTime(m, s);
        }, 1000);

    }

    private showTime(m: number, s: number) {
        let sec: string = s.toString() + " seconde" + ((s > 1) ? "s" : "");
        let min: string = m.toString() + " minute" + ((m > 1) ? "s" : "");

        if ((m < 1)) {
            this.$time_minutes.hide();
        } else {
            this.$minutes_span.html(min);
        }

        this.$seconds_span.html(sec);
    }

} 