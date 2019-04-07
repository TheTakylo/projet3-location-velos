import AbstractComponent from '../../AbstractComponent';
import SimpleSign from '../../../class/SimpleSign/SimpleSign';

export default class SecondStep extends AbstractComponent {
    
    protected $view: string = `
    <form class="reservation-form">
        <canvas id="canvasSignature" width="250px" height="175px"></canvas>
        <div class="mt-3">
            <button type="button" class="form-cancel btn btn-secondary">Annuler</button>
            <button type="button" class="sign-reset btn btn-secondary">Effacer</button>
            <button type="button" class="submit btn btn-primary">Réserver</button>
        </div>
    </form>
    `;

    public render($container: JQuery<HTMLElement>, $data?: {}, callback?: CallableFunction): void {
        this.$container = $container;
        this.compile($data);

        const canvas = SimpleSign.sign("canvasSignature");
        const $form = $("form.reservation-form");

        $form.find('button.submit').click(e => {
            if(canvas.isEmpty()) {
                return callback({success: false});
            }

            return callback({success: true, data: $data});
        });

        $form.find('button.form-cancel').click(e => {
            
        });
        
        $form.find('button.sign-reset').click(e => {
            canvas.reset();
        });
    };
}