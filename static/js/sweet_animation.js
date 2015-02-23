var h = $('#header_wrap').height() + $('#nav_spacer').height();

$('#body_wrap').css('margin-top', -h);
$('#logo_text').css({
    'margin-top': 60,
    'opacity': 0
});

var reveal_header_text = function() {
    $('#logo_text').toggleClass('smooth-transition-750').css(
        {
            'margin-top': 0,
            'opacity': 1
        }
    );
}

var slide_header_down = function() {
    $('#body_wrap').toggleClass('smooth-transition-750').css({'margin-top': 0});
    setTimeout(function() { tabs.setAttribute('selected', get_effective_hash()); }, 1000);
    setTimeout(reveal_header_text, 200);
}

// Reveal header
setTimeout(slide_header_down, 750);