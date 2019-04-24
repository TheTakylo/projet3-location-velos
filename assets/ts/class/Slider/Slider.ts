export default class Slider {

    private $slider: JQuery<HTMLElement>;
    private $nextButton: JQuery<HTMLElement>;
    private $prevButton: JQuery<HTMLElement>;
    private $pauseButton: JQuery<HTMLElement>;
    private $playButton: JQuery<HTMLElement>;
    private $slides: JQuery<HTMLElement>;

    private slideDuration: number = 4000;
    private slidesCount: number;
    private currentSlide: number = 0;
    private isPaused: boolean;

    constructor(slider: JQuery<HTMLElement>) {
        this.$slider = slider;
        this.$slides = this.$slider.find('.slide');
        this.$nextButton = this.$slider.find('.next-slide');
        this.$prevButton = this.$slider.find('.prev-slide');
        this.$pauseButton = this.$slider.find('.pause-slide');
        this.$playButton = this.$slider.find('.play-slide');

        this.slidesCount = this.$slides.length;

        this.initSlider();
    }

    private initSlider(): void {
        let intervalID = setInterval(() => {
            this.next();
        }, this.slideDuration);

        $(window).keydown(e => {
            const keyCode = e.keyCode;

            if (keyCode === 37) {
                this.$prevButton.click();
            } else if (keyCode === 39) {
                this.$nextButton.click();
            }
        });

        this.$nextButton.click((e) => {
            e.preventDefault();

            this.next();
            clearInterval(intervalID);
            intervalID = setInterval(() => { this.next(); }, this.slideDuration);
        });
        this.$prevButton.click((e) => {
            e.preventDefault();

            this.prev();
            clearInterval(intervalID);
            intervalID = setInterval(() => { this.next(); }, this.slideDuration);
        });

        this.$pauseButton.click((e) => {
            e.preventDefault();

            if(this.isPaused) {
                this.isPaused = false;
                this.$pauseButton.show();
                this.$playButton.hide();
            } else {
                this.isPaused = true;
                this.$pauseButton.hide();
                this.$playButton.show();
            }
        });
    }

    private showSlide(slide: number): void {
        // Permets de mettre la dernière diapositive s'il n'y a pas de diapositive précédente 
        if (slide < 0) { slide = this.slidesCount - 1; }
        // Permets de mettre la première diapositive s'il n'y a pas de diapositive suivante
        if (slide > this.slidesCount - 1) { slide = 0; }

        this.currentSlide = slide;

        // On cache les slides visibles
        this.$slides.removeClass('visible');

        // On affiche le slide
        $(this.$slides[slide]).addClass('visible');
    }

    private next(): void {
        if(this.isPaused) {
            return;
        }
        let slide = this.currentSlide + 1;
        this.showSlide(slide);
    }

    private prev(): void {
        if(this.isPaused) {
            return;
        }

        let slide = this.currentSlide - 1;
        this.showSlide(slide);
    }

}