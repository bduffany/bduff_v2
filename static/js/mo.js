

const CF = 1; // Time scaling factor. The default unit is seconds.
const LINEAR_DEFAULT_SPEED = 1;

/* The main object for the mo project*/
function mo() {
	this.tLast = 0;
}

const MS_TO_S = 0.001; // Conversion factor, milliseconds to seconds

/* Returns the length of time since this function was last called.
   cf is the conversion factor for this time interval. 
   The default is milliseconds. */
mo.prototype.dt = function(cf) {
	cf = cf || MS_TO_S;
  var d = new Date();
	var curTime = d.getTime();
	if (this.tLast == 0) {
		this.tLast = curTime;
	}
	var deltaT = curTime - this.tLast;
	this.tLast = curTime;
	deltaT *= MS_TO_S * CF;
	return deltaT;
}

/* mo_track generates incremental positions based on a 
   target position. Variants of mo_track decide what
   sorts of curves are applied to the motion. */

mo_track.prototype = new mo();

function mo_track(pos, curve) {
	this.pos = pos || 0;
	this.curve = curve || 'linear';
}

mo_track.prototype.follow = function() {
	return mo_track[this.curve].apply(this, arguments);
}

/* Returns the next position toward the targ position based on a 
	 constant speed value. */
mo_track.linear = function(targ, speed) {
	var v = speed || LINEAR_DEFAULT_SPEED;
	v = Math.abs(v);
	if (targ - this.pos != 0) {
		var sign = (targ - this.pos) > 0 ? 1 : -1; 
		this.pos += sign * LINEAR_DEFAULT_SPEED * this.dt();
	}
	return this.pos;
}

/* Returns the next position toward the targ position based on a
	 proportional speed ramp, i.e. the "P" in PID control */
mo_track.proportional = function(targ, p) {
	var err = targ - this.pos;
	this.pos += (err * p) * this.dt();
	return this.pos;
}