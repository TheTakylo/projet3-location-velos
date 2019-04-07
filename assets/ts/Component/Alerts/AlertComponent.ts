import AbstractComponent from "../AbstractComponent";

export default class AlertComponent extends AbstractComponent {
    protected $view: string = `
        <div class="alert alert-{{type}}" role="alert">
            {{message}}
        </div>
    `;
} 