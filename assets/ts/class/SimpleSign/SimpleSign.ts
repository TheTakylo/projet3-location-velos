
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
        
        
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#000000';
        
        this.canvas.addEventListener('mousedown', this.start.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.end.bind(this));
        this.canvas.addEventListener('mouseout', this.end.bind(this));
        
        
        this.canvas.addEventListener('touchstart', this.start.bind(this));
        this.canvas.addEventListener('touchmove', this.draw.bind(this));
        this.canvas.addEventListener('touchend', this.end.bind(this));
    };
    
    public isEmpty(): boolean {
        return !this.started;
    }
    
    public reset(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    
    private start(event): void {
        this.started = true;
        this.draggable = true;
        
        this.context.beginPath();
        this.context.moveTo(event.offsetX, event.offsetY);
    };
    
    private end(): void {
        this.draggable = false;
    };
    
    private draw(event): void {
        if (!this.draggable || !this.started) {
            return;
        }
        
        event.preventDefault();
        
        if (event.changedTouches) {
            let touch = event.touches[0];
            let rect = this.canvas.getBoundingClientRect();
            
            let x = touch.clientX - rect.left;
            let y = touch.clientY - rect.top;
            
            this.context.lineTo(x, y);
        } else {
            this.context.lineTo(event.offsetX, event.offsetY);
        }
        
        this.context.stroke();
    };
    
};