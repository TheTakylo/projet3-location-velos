import AbstractComponent from "../AbstractComponent";

export default class StationComponent extends AbstractComponent {

    public $container: string = "#app-station";

    public $view: string = `
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
                    <button type="button" class="btn btn-light" data-dismiss="modal">Annuler</button>
                    <button type="button" id="delete-reservation" class="btn btn-danger">Confirmer</button>
                </div>
                </div>
            </div>
        </div>
    {{/if}}
    `;

    public run(): void { 

        if(this.$class.api.hasReservation()) {
            this.$data["cancellable"] = true;
            this.$data["station"] = this.$class.api.getReservation().station;
            this.compile();


            $("#delete-reservation").click(e => {
                this.$class.api.deleteReservation();
            });
        }
    }

} 