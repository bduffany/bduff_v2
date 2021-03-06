// Sticky navbar
var navbar = $('#navbar');
var nav_top = $('#header_wrap').height();
var stick_last = false;
$(window).scroll(function() {
    var stick = ($(this).scrollTop() > nav_top);
    if (stick != stick_last) {
        if (stick) {
            navbar.stop(true).css({
                position : 'fixed',
                top: 0
            }).animate({
                opacity: 0.90
            }, 'fast');
        } else {
            navbar.stop(true).css({
                position: 'absolute',
                top: 0
            }).animate({
                opacity: 1.0
            }, 'fast');
        }
    }
    stick_last = stick;
});