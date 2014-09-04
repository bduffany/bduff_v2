const p = 15.0;
const HEIGHT = 3;

// Request animation frame cross-browser support
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = 
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame;
}


var canvas = null, ctx = null, l = null;
var x = 0, width = 200, height = 0;

function LinkBar(canvas) {
	this.canv_w = canvas.width;
	this.canv_h = canvas.height;
	this.ctx = canvas.getContext('2d');
	this.components = new Array();
	this.compnames = ['left', 'right', 'top'];
	for (var i = 0; i < this.compnames.length; i++) {
		this.components[this.compnames[i]] = new mo_track(0, 'proportional');
	}
}

LinkBar.prototype.draw = function(x, width, height) {
	var l = this.components['left'].follow(x, p);
	var r = this.components['right'].follow(x + width, p);
	// var h = this.components['top'].follow(height, p);
	this.ctx.fillStyle = "#FFFFFF";
	this.ctx.fillRect(l, this.canv_h - h, r - l, h);
}

function animateNav() {
	if (l !== null) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		l.draw(x, width, height);
	}
	window.requestAnimationFrame(animateNav);
}

$(document).ready(function() {
	canvas = document.getElementById('navfx');
	canvas.height = HEIGHT;
	canvas.width = $("#nav").width();
	ctx = canvas.getContext('2d');
	var n = $('#nav li');
	n.mouseover(function() {
		if (l === null) {
			l = new LinkBar(canvas);
			animateNav();
		}
		var $li = $(this);
		x = $li.position()['left'] + parseInt($li.css('marginLeft'));
		width = $li.width();
		height = HEIGHT;
	});
	n.mouseleave(function() {
		height = 0;
	});

	// Sticky navbar
	var nav_bg = $('#nav_bg');
	var nav_links = $('#navbar');
	var navbar = $('#navbar, #nav_bg');
	var nav_top = navbar.position().top;
	var stick_last = false;
	$(window).scroll(function() {
		var stick = ($(this).scrollTop() > nav_top);
		if (stick != stick_last) {
			if (stick) {
				navbar.stop(true).css({
					position : 'fixed',
					top : 0
				}).animate({
					opacity : 0.90
				}, 'fast');
			} else {
				navbar.stop(true).css({
					position : 'absolute', 
					top: 'auto'
				}).animate({
					opacity: 1.0
				}, 'fast');
			}
		}
		stick_last = stick;
	});
});