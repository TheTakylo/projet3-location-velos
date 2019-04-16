import SimpleSign from '../../../class/SimpleSign/SimpleSign';
import AbstractComponent from '../../AbstractComponent';
import AlertComponent from '../../Alerts/AlertComponent';
import Station from '../../../class/BikeApi/Station';
import StationComponent from '../StationComponent';
import BikeApi from '../../../class/BikeApi/BikeApi';

export default class Step2Component extends AbstractComponent {

    public $container: string = "#app-form";

    public $view: string = `
    <form class="reservation-form">
        <canvas id="canvasSignature" width="250px" height="175px"></canvas>
        <div class="mt-3">
            <button type="button" class="form-cancel btn btn-secondary">Annuler</button>
            <button type="button" class="sign-reset btn btn-secondary">Effacer</button>
            <button type="button" class="submit btn btn-primary">Réserver</button>
        </div>
    </form>
    `;

    public run(): void {
        const alert = new AlertComponent();
        const stationComponent = new StationComponent();

        const canvas = SimpleSign.sign("canvasSignature");
        const $form = $("form.reservation-form");

        $form.find('button.submit').click(_ => {
            if (canvas.isEmpty()) {
                return alert.render('form_errors');
            }

            const station = <Station>this.$data.station;
            let expireAt = new Date(Date.now());
            expireAt.setMinutes(expireAt.getMinutes() + 20);

            this.$class.api.setReservaton(station, this.$data.data, expireAt.getTime());

            stationComponent.render();

            this.destroy();
        });

        $form.find('button.form-cancel').click(_ => { this.destroy(); });
        $form.find('button.sign-reset').click(_ => { canvas.reset(); });
    };
}