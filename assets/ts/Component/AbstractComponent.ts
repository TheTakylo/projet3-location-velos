import Handlebars from 'handlebars/dist/cjs/handlebars';

/**
 * AbstractComponent
 * 
 * 
 *
 * @export
 * @abstract
 * @class AbstractComponent
 */
export default abstract class AbstractComponent {
    
    /**
     * 
     * Code HTML du composant
     *
     * @protected
     * @type {string}
     * @memberof AbstractComponent
     */
    protected $view: string;
    

    /**
     * 
     * Conteneur HTML ou le composant doit être injecté
     *
     * @protected
     * @type {JQuery<HTMLElement>}
     * @memberof AbstractComponent
     */
    protected $container: JQuery<HTMLElement>;
    

    /**
     * 
     * Créer une instance du composant
     * 
     * @param {{}} [$data]
     * @memberof AbstractComponent
     */
    public constructor() { };
    

    /**
     * 
     * Effectue le rendu du composant avec ses données dans son conteneur
     *
     * @param {JQuery<HTMLElement>} $container
     * @memberof AbstractComponent
     */
    public render($container: JQuery<HTMLElement>, $data?: {}, callback?: CallableFunction): void {
        this.$container = $container;

        this.compile($data);
    };
    

    /**
     * 
     * Détruit le composant en vidant le conteneur
     *
     * @memberof AbstractComponent
     */
    public destroy(): void {
        if(!this.$container) return;
        
        this.$container.html("");
    };


    /**
     * Render the view with the data
     * 
     * @memberof AbstractComponent
     */
    protected compile($data?: {}): void {
        const template = Handlebars.compile(this.$view);
        this.$container.html(template($data));
    }

}
