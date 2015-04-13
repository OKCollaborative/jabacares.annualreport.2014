var Raphael = require('Raphael'),
  _ = require('_');

//polyfill window.HTMLElement
var elementPrototype = typeof window.HTMLElement !== "undefined" ? window.HTMLElement.prototype : window.Element.prototype;

elementPrototype.removeClass = function(remove) {
  var newClassName = "";
  var i;
  var classes = this.className.split(" ");
  for(i = 0; i < classes.length; i++) {
    if(classes[i] !== remove) {
      newClassName += classes[i] + " ";
    }
  }
  this.className = newClassName;
};

Raphael.fn.donutChart = function (cx, cy, r, rin, data, stroke) {
  var paper = this,
    rad = Math.PI / 180,
    chart = this.set();
  function sector(cx, cy, r, startAngle, endAngle, params) {
    //console.log(params.fill);
    var x1 = cx + r * Math.cos(-startAngle * rad),
      x2 = cx + r * Math.cos(-endAngle * rad),
      y1 = cy + r * Math.sin(-startAngle * rad),
      y2 = cy + r * Math.sin(-endAngle * rad),
      xx1 = cx + rin * Math.cos(-startAngle * rad),
      xx2 = cx + rin * Math.cos(-endAngle * rad),
      yy1 = cy + rin * Math.sin(-startAngle * rad),
      yy2 = cy + rin * Math.sin(-endAngle * rad);

    return paper.path(["M", xx1, yy1,
               "L", x1, y1,
               "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2,
               "L", xx2, yy2,
               "A", rin, rin, 0, +(endAngle - startAngle > 180), 1, xx1, yy1, "z"]
             ).attr(params);
  }

  var angle = 0,
    total = 0,
    start = 0,

    process = function (j) {
      var value = data[j].value,
        angleplus = 360 * value / total,
        popangle = angle + (angleplus / 2),
        color = data[j].color || Raphael.hsb(start, 0.75, 1),
        ms = 500,
        delta = 30,
        bcolor = data[j].color || Raphael.hsb(start, 1, 1),
        p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 1}),
        txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), data[j].label).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20}),
        segmentHighlight = function (e) {
          //turn off all other animations in chart
          chart.forEach(function(element) {
            var classNames = element.node.classList;
            if(_.includes(classNames,  'sector')) {
              element.stop().animate({transform: ""}, ms, "elastic");
            }
            else if(_.includes(classNames, 'sectorTxt')) {
              element.stop().animate({opacity: 0}, ms);
            }
          });

          //then animate the clicked element
          p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");

          // txt.stop().animate({opacity: 1}, ms, "elastic");
          //remove all clicked class
          _.forEach(document.getElementsByClassName('clicked'), function(element){
            element.removeClass('clicked');
          });
          //highlight the list item
          _.forEach(document.getElementsByClassName(e.target.classList[1]), function(element){
            if(element.tagName === 'LI'){
              element.classList.add('clicked');
            }
          });
        }
      ;
      // txt.node.setAttribute('class', 'sectorTxt');

      p.node.setAttribute('class', 'sector ' + data[j].class || '');
      p.click(segmentHighlight);
      p.hover(segmentHighlight);

      angle += angleplus;
      chart.push(p);
      // chart.push(txt);
      start += 0.1;
    };

  for (var i = 0, ii = data.length; i < ii; i++) {
    total += data[i].value;
  }
  for (i = 0; i < ii; i++) {
    process(i);
  }
  return chart;
};

module.exports = Raphael;
