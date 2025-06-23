class StickyHeader {
    constructor(header) {
        this.header = jQuery(header);
        this.headerHeight = this.header.outerHeight();
        this.lastPos = 0;
        this.counter = 0;

        jQuery(window).on("scroll", this.onScrollHandler.bind(this));
    }

    // show/hide header
    onScrollHandler() {
        let currPos = jQuery(window).scrollTop();

        if (currPos - this.lastPos > 0) {
            this.counter = Math.max(this.counter - (currPos - this.lastPos), -this.headerHeight);
            // change color after the header is gone
            if (this.counter === -this.headerHeight) {
                this.header.removeClass("colored").addClass("transparent");
            }
        } else {
            this.counter = Math.min(this.counter + (this.lastPos - currPos), 0);
            // change the color instantly
            if (currPos >= this.headerHeight) {
                this.header.removeClass("transparent").addClass("colored");
            } else {
                this.header.removeClass("colored").addClass("transparent");
            }
        }

        this.header.css({
            transform: `translateY(${this.counter}px)`,
        });

        this.lastPos = currPos;
    }
}

jQuery(function ($) {
    new StickyHeader("header");
});
