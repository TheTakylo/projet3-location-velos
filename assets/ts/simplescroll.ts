/**
* @author Sébastien Thuret <sebastien.thuret@yahoo.fr>
* @class SimpleScroll
* @classdesc A simple javascript class to scroll to an element with an animation
*/
export default class SimpleScroll {

    private target;
    private targetPosition;
    private startPosition;
    private duration;
    private elapsedTime;

    /**
    * @param {HTMLElement | string} target target element
    * @param {number} duration animation duration
    * @param {number} adjust adjustement of the scroll (ex substraction of the menu to have a perfect alignement)
    */
    static scrollTo(target, duration: number = 1000, adjust: number = 0) {
        return new SimpleScroll(target, duration, adjust);
    }

    /**
    * @param {HTMLElement | string} target
    * @param {number} duration
    * @param {number} adjust
    */
    constructor(target, duration: number = 1000, adjust: number = 0) {
        this.target = this.findTarget(target);
        this.targetPosition = this.target.getBoundingClientRect().top + adjust;
        this.startPosition = window.pageYOffset;
        this.duration = duration;
        this.elapsedTime = 0;

        this.runScroll();
    }

    /**
    * The scroll function
    */
    runScroll() {
        window.scrollTo(0, this.easeAnimation(this.elapsedTime += 10, this.startPosition, this.targetPosition, this.duration));

        if (this.elapsedTime < this.duration) requestAnimationFrame(this.runScroll.bind(this))
    }

    /**
    * Convert the target to an element if it is not
    * 
    * @param {HTMLElement | string} target 
    * @returns {HTMLElement}
    */
    findTarget(target) {
        // If the target is already an instance of HTMLElement
        if (target instanceof HTMLElement) return target;

        // If the target is a string (ex: a div ID) find it
        return document.querySelector(target);
    }

    /**
    * @param {number} t time elapsed
    * @param {number} b start
    * @param {number} c target
    * @param {number} d duration
    */
    easeAnimation(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

}