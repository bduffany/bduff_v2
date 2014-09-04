var _bd_fx = {
  start: function() {
    $('body').removeClass('nojquery')

    $('#nav a').mouseenter(function() {
      $(this).clearQueue().animate({
        backgroundColor : 'white',
        color : 'black'
      }, 75);
    })
    .mouseleave(function() {
      $(this).animate({
        backgroundColor : 'transparent',
        color : 'white'
      }, 150);
    });
  },

  rearm: function() {
    var eb = $('.adminbutton').css({opacity: 0.3});
    eb.mouseenter(function() {
      $(this).animate({opacity: 1.0}, 100);
    });
    eb.mouseleave(function() {
      $(this).animate({opacity: 0.3}, 100);
    });
  }
}