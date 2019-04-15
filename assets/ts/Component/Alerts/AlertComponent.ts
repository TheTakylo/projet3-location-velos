import AbstractComponent from "../AbstractComponent";

export default class AlertComponent extends AbstractComponent {

    public $container: string = "#app-alerts";

    public $view: string = `
    <div class="alert alert-{{type}}" role="alert">
        {{message}}
    </div>
    `;

    public render(data: string): void {
        const ALERTS = {
            'default': { type: 'primary', message: 'Veuillez sélectionnez une station.' },
            'form_errors': { type: 'danger', message: 'Veuillez remplir tous les champs.' },
            'reservation_success': { type: 'success', message: 'Votre réservation à bien été confirmée.' },
            'reservation_expired': { type: 'danger', message: 'Votre réservation précédente a expiré.' },
            'reservation_already': { type: 'primary', message: "Vous avez déjà une réservation en cours. Si vous réservez un autre vélo, votre réservation actuelle sera annulée" }
        }
        this.$data = ALERTS[data];
        this.compile();

        return this.run();
    }

    public run(): void {}
} 