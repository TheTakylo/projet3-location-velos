import Handlebars from 'handlebars/dist/cjs/handlebars';

/**
* AbstractComponent
*
* @export
* @abstract
* @class AbstractComponent
*/
export default abstract class AbstractComponent {

    /**
    * Code HTML du composant
    */
    public $view: string;

    /**
    * Code HTML du composant
    */
    public $data: any;


    /**
    * Conteneur HTML ou le composant doit être injecté
    */
    public $container: string;


    /**
    * Créer une instance du composant
    */
    public constructor() { };


    /**
    * Effectue le rendu du composant avec ses données dans son conteneur
    */
    public render($data: any = {}): void {
        this.$data = $data;
        this.compile();

        return this.run();
    };

    protected compile(): void {
        if (!this.$view || !this.$container) return;

        const template = Handlebars.compile(this.$view);
        document.querySelector(this.$container).innerHTML = template(this.$data);
    }

    public abstract run(): void;

    /**
    * 
    * Détruit le composant en vidant le conteneur
    */
    public destroy(): void {
        if (!this.$container) throw new Error("No container");

        document.querySelector(this.$container).innerHTML = "";
    };

}
