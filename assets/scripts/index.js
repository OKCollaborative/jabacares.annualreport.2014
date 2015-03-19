var skrollr = require('skrollr');
var s = skrollr.init({
  edgeStrategy: 'set',
  easing: {
    WTF: Math.random,
    inverted: function (p) {
      return 1 - p;
    }
  }
});


var attachFastClick = require('fastclick');
attachFastClick(document.body);


module.exports = {
  init: function () {
    // run the app and use some plugins
    // $.cookie('name', 'value');
    // $('input, textarea').placeholder();
    // $(document).foundation();
  }
};

module.exports.init();
