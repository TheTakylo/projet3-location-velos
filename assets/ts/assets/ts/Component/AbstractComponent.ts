export default abstract class AbstractComponent {
    public constructor() {
        this.create();
    }

    abstract create(): void;

    abstract render($element: JQuery<HTMLElement>): void;

    abstract destroy(): void;
}
