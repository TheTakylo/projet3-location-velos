import AbstractComponent from "../AbstractComponent";
import AlertComponent from "../Alerts/AlertComponent";

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

        {{#if show_remaining_time}}
        <div class="mt-3 alert alert-danger">
            Votre réservation à la station <strong>{{station.name}}</strong> expirera dans 
            <strong>
                {{#if remaining_minutes}}{{remaining_minutes}} et {{/if}}
                {{#if remaining_seconds}}{{remaining_seconds}}{{/if}}
            </strong>
        </div>
        {{/if}}

    {{/if}}
    `;

    public run(): void { 

        let alert = new AlertComponent();
        alert.destroy();

        if(this.$class.api.hasReservation() && !this.$class.api.hasExpired()) {
            this.$data["cancellable"] = true;
            this.$data["station"] = this.$class.api.getReservation().station;
            this.compile();

            this.startRemainingTimer();

            $("#delete-reservation").click(e => {
                this.cancelReservation();
            });
        }

        if(this.$data.station === undefined) {
            alert.render('default');
        }

    }

    private cancelReservation(): void {
        this.$class.api.deleteReservation();
        this.render();
    }


    private timeDiff(end: number) : { minutes: number, seconds: number} {
        let now = new Date().getTime();

        let seconds: number = (end - now) / 1000;

        let days: number = Math.floor( seconds /  86400);
        seconds -= days *86400;
        let hours: number = Math.floor( seconds /  3600);
        seconds -= hours *3600;
        let minutes: number = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        seconds = Math.floor(seconds);

        return {
            minutes: minutes,
            seconds: seconds
        };
    }

    private startRemainingTimer() {
        this.$data.show_remaining_time = true;
        
        const diff = this.timeDiff(this.$class.api.getReservation().expireAt);
        
        let s = diff.seconds;
        let m = diff.minutes;
        
        
        let intervalID = setInterval(() => {
            
            s--;
            
            if(s < 1) {
                m--;
                
                if(m < 1 && s < 1) {
                    clearInterval(intervalID);
                    this.cancelReservation();
                } else {
                    s = 59;
                }
            }

            let sec = s.toString() + " seconde" + ((s > 1) ? "s" : "");
            let min = m.toString() + " minute" + (( m > 1) ? "s" : "");

            console.log(s);
            console.log(m);

            this.$data.remaining_seconds = sec;
            this.$data.remaining_minutes = (m < 1) ? false : min;

            this.compile();
        }, 1000);

    }

} 