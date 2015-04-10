
module.exports = {

	connect: function connect(div1, div2, lineOptions) {
		lineOptions = lineOptions || {};
	  var offsetFrom = this.getOffset(div1);
	  var offsetTo = this.getOffset(div2);

	  var line = {
	    start:{
	      x:offsetFrom.left + offsetFrom.width/2,
	      y:offsetFrom.top + offsetFrom.height/2
	    },
	    end:{
	      x:offsetTo.left + offsetTo.width/2,
	      y:offsetTo.top + offsetTo.height/2
	    }
	  };

	  line.length = Math.sqrt(((line.end.x-line.start.x) * (line.end.x-line.start.x)) +
	                ((line.end.y-line.start.y) * (line.end.y-line.start.y)));
	  line.center = {
	    x: ((line.start.x + line.end.x) / 2) - (line.length / 2),
	    y: ((line.start.y + line.end.y) / 2) - (lineOptions.weight / 2)
	  };
	  line.angle = Math.atan2((line.start.y-line.end.y),(line.start.x-line.end.x))*(180/Math.PI);

	  var htmlLine = "<div class='connector' style='border-top:" + lineOptions.weight + "px " + lineOptions.style + " "  + lineOptions.color + ";left:" + line.center.x + "px; top:" + line.center.y + "px; width:" + line.length + "px;" + this.transform(line.angle) + "'/>";
	  //
	  //document.body.innerHTML += htmlLine;
	  $('body').append($(htmlLine));
	},
	transform: function transform(angle){
	  return '-moz-transform:rotate(' + angle + 'deg);' +
	         '-webkit-transform:rotate(' + angle + 'deg);' +
	         '-o-transform:rotate(' + angle + 'deg);' +
	         '-ms-transform:rotate(' + angle + 'deg);' +
	         'transform:rotate(' + angle + 'deg);'
	       ;
	},

	getOffset: function getOffset( el ) {
		var _x = 0;
		var _y = 0;
		var _w = el.offsetWidth|0;
		var _h = el.offsetHeight|0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y+window.scrollY, left: _x, width: _w, height: _h };
	}

};
