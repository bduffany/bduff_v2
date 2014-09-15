var h = $('#header_wrap').height() + $('#nav_spacer').height();

$('#body_wrap').css('margin-top', -h);
$('#logo_text').css({
    'margin-top': 60,
    'opacity': 0
});

// Reveal header
$('#body_wrap').delay(750).animate(
    {'margin-top': 0}, 
    {
        easing: 'easeOutQuint',
        duration: 500,
        done: function() {
            // Set initially selected tab equal to the effective hash.
            // This also triggers the hashchange event, causing initial
            // content to be loaded in the main div.
            tabs.setAttribute('selected', get_effective_hash());

            reveal_header_text();
        }
    }
)

var reveal_header_text = function() {
    $('#logo_text').animate(
        {
            'margin-top': 0,
            'opacity': 1
        },
        {
            duration: 1600,
            easing: 'easeOutQuint'
        }
    );
}