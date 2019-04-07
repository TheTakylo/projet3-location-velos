import AbstractComponent from "./AbstractComponent";

export default class Step1 extends AbstractComponent {
    create(): void {
        console.log('Creation');
    }

    render($element: JQuery<HTMLElement>): void {

        $element.html();
    }

    destroy(): void {
        console.log('Destruction');
    }

}