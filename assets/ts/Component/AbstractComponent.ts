import Handlebars from 'handlebars/dist/cjs/handlebars';
import BikeApi from '../class/BikeApi/BikeApi';
import LeafletMap from '../class/LeafletMap/LeafletMap';
import ClassesArray from './class';

/**
* AbstractComponent
*
* @export
* @abstract
* @class AbstractComponent
*/
export default abstract class AbstractComponent {
    
    protected $class: { 
        api: BikeApi, 
        map: LeafletMap
    };
    
    protected $components: any;
    
    
    /**
    * Code HTML du composant
    */
    public abstract $view: string;
    
    /**
    * Code HTML du composant
    */
    public $data: any;
    
    
    /**
    * Conteneur HTML ou le composant doit être injecté
    */
    public abstract $container: string;
    
    
    /**
    * Créer une instance du composant
    */
    public constructor() {
        this.$class = ClassesArray;
    };
    
    
    /**
    * Effectue le rendu du composant avec ses données dans son conteneur
    */
    public render($data: any = {}): void {
        this.$data = $data;
        this.compile();
        
        return this.run();
    };
    
    protected compile(): void {
        if(!this.$view || !this.$container) return;
        
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
    
    protected set(v) {}
    
}
