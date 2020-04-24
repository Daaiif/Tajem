$(document).ready(function() {
    $('.slider .owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        navText: [],
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items:1
            },
            480: {
                items: 1
            }
        }
    });
})

$(document).ready(function() {
    $('.reviews-slider .owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        navText: [],
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items:1
            },
            480: {
                items: 1
            }
        }
    });
})