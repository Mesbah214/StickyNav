class stickyheader {
    constructor(header) {
        this.header = jquery(header);
        this.headerheight = this.header.outerheight();
        this.lastpos = 0;
        this.counter = 0;

        jquery(window).on("scroll", this.onscrollhandler.bind(this));
    }

    // show/hide header
    onscrollhandler() {
        let currpos = jquery(window).scrolltop();

        if (currpos - this.lastpos > 0) {
            this.counter = math.max(this.counter - (currpos - this.lastpos), -this.headerheight);
            // change color after the header is gone
            if (this.counter === -this.headerheight) {
                this.header.removeclass("colored").addclass("transparent");
            }
        } else {
            this.counter = math.min(this.counter + (this.lastpos - currpos), 0);
            // change the color instantly
            if (currpos >= this.headerheight) {
                this.header.removeclass("transparent").addclass("colored");
            } else {
                this.header.removeclass("colored").addclass("transparent");
            }
        }

        this.header.css({
            transform: `translatey(${this.counter}px)`,
        });

        this.lastpos = currpos;
    }
}

jquery(function ($) {
    new stickyheader("header");
});
