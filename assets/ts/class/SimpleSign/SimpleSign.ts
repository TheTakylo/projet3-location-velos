export default class SimpleSign {
    
    canvas;
    context;
    
    height: number;
    width: number;
    draggable: boolean = false;
    started: boolean = false;
    
    static sign(element: string) {
        return new SimpleSign(element);
    };
    
    constructor(element: string) {
        this.canvas = document.getElementById(element);
        this.context = this.canvas.getContext("2d");
        
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        
        this.context.clearRect(0, 0, this.height, this.width);
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000';
        
        this.canvas.addEventListener('mousedown', this.start.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.end.bind(this));


        this.canvas.addEventListener('touchstart', this.start.bind(this));
        this.canvas.addEventListener('touchmove', this.draw.bind(this));
        this.canvas.addEventListener('touchend', this.end.bind(this));
    };
    
    public isEmpty(): boolean {
        return !this.started;
    }
    
    public reset(): void {
        this.context.clearRect(0, 0, this.height, this.width);
    }
    
    private start(event): void {
        this.started = true;
        this.draggable = true;
        
        this.context.moveTo(event.offsetX, event.offsetY);
    };
    
    private end(): void {
        this.draggable = false;
        this.context.beginPath();
    };
    
    private draw(event): void {
        if(this.draggable && this.started) {
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();        
        }
    };
    
};