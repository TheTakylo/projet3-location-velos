import Station from '../../../class/BikeApi/Station';
import SimpleSign from '../../../class/SimpleSign/SimpleSign';
import Services from '../../../Services/StoreService';
import AbstractComponent from '../../AbstractComponent';

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

        const canvas = SimpleSign.sign("canvasSignature");
        const $form = $("form.reservation-form");

        $form.find('button.submit').click(_ => {
            if (canvas.isEmpty()) {
                return Services.$alert.render('form_errors');
            }

            let station = <Station>this.$data.station;
            this.$data.station = station.available_bikes--;

            let expireAt = new Date(Date.now());
            expireAt.setMinutes(expireAt.getMinutes() + 2);

            Services.api.setReservaton(station, this.$data.data, expireAt.getTime());

            Services.$station.render();

            this.destroy();
        });

        $form.find('button.form-cancel').click(_ => { this.destroy(); });
        $form.find('button.sign-reset').click(_ => { canvas.reset(); });
    };
}