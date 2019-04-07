import AbstractComponent from '../../AbstractComponent';

export default class FirstStep extends AbstractComponent {
    
    protected $view: string = `
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
    `;

    public render($container: JQuery<HTMLElement>, $data?: any, callback?: CallableFunction): void {
        this.$container = $container;
        this.compile($data);

        const $form = $("form.reservation-form");

        $form.find('.substep1').click(() => {
            const firstname: string = $form.find("input[name='firstname']").val().toString().trim();
            const lastname: string = $form.find("input[name='lastname']").val().toString().trim();
            
            // Vérification de la présence d'un nom & prénom
            if(firstname == '' || lastname == '') {
               return callback({success: false});
            }

            const data = {
                station: $data.station,
                firstname: firstname, 
                lastname: lastname
            }

            callback({success: true, data: data});
        });
        
    };
}