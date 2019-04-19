import Services from '../../../Services/StoreService';
import AbstractComponent from '../../AbstractComponent';

export default class Step1Component extends AbstractComponent {

    public $container: string = "#app-form";

    public $view: string = `
    {{#if reservation_available}}
        <form class="reservation-form">
            <div class="form-group row">
                <label for="inputLastname" class="col-md-4 col-form-label">Nom</label>
                <div class="col-md-8">
                    <input name="lastname" type="text" class="form-control" id="inputLastname" placeholder="Nom">
                </div>
                </div>
                <div class="form-group row">
                <label for="inputFirstname" class="col-md-4 col-form-label">Prénom</label>
                <div class="col-md-8">
                    <input name="firstname" type="text" class="form-control" id="inputFirstname" placeholder="Prénom">
                </div>
            </div>
            <button type="button" class="substep1 btn btn-primary float-right">Réserver</button>
        </form>
    {{/if}}
    `;

    public run(): void {
        if (Services.api.hasReservation()) {
            Services.$alert.render('reservation_already');
            return;
        }

        this.$data.reservation_available = true;

        if (this.$data.station.available_bikes < 1) {
            Services.$alert.render('station_no_bikes_available');
            this.$data.reservation_available = false;

            this.compile();
            return;
        }
        this.compile();

        const $form = $("form.reservation-form");

        let $firstNameInput = $form.find("input[name='firstname']").val(localStorage.getItem('firstname'));
        let $lastNameInput = $form.find("input[name='lastname']").val(localStorage.getItem('lastname'));

        $form.find('.substep1').click(() => {
            const firstname: string = $firstNameInput.val().toString().trim();
            const lastname: string = $lastNameInput.val().toString().trim();

            // Vérification de la présence d'un nom & prénom
            if (firstname == '' || lastname == '') {
                Services.$alert.render('form_errors');
                return;
            }
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('lastname', lastname);

            const data = {
                firstname: firstname,
                lastname: lastname
            }

            Services.$step2.render({ station: this.$data.station, data: data });

        });
    };
}