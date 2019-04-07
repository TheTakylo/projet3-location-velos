import AbstractComponent from "./AbstractComponent";

export default class Step2 extends AbstractComponent {
    create(): void {
        console.log('Creation');
    }

    render(): void {
        console.log('Rendu');
    }

    destroy(): void {
        console.log('Destruction');
    }

}