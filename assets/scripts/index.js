var Raphael = require('./chart-donut');
var attachFastClick = require('fastclick');

attachFastClick(document.body);


module.exports = {
  init: function () {
    // run the app and use some plugins
    // $.cookie('name', 'value');
    // $('input, textarea').placeholder();
    // $(document).foundation();
    var financials = {
      revenues:[
        { value: 972641,  color: '#a9bccd', class:'fed',          label: 'Federal Government' },
        { value: 444753,  color: '#295882', class:'state',        label: 'State Government' },
        { value: 1077253, color: '#67b244', class:'local',        label: 'Local Governments' },
        { value: 303513,  color: '#685ba3', class:'investment',   label: 'Investment Activities' },
        { value: 1527627, color: '#bb2d17', class:'fee',          label: 'Fee-for-Service' },
        { value: 885762,  color: '#eb9000', class:'philanthropy', label: 'Philanthropy' },
        { value: 639075,  color: '#368a8d', class:'affiliate-revenue',    label: 'Revenue from Affiliates' }
      ],
      expenses:[
        { value: 736173,  color: '#000000', class:'senior-center',  label: 'Community Senior Center operation' },
        { value: 258942,  color: '#a9bccd', class:'health',         label: 'Health Services & Disease Prevention' },
        { value: 517165,  color: '#295882', class:'meals',          label: 'Home Delivered Meals' },
        { value: 679214,  color: '#67b244', class:'info-assist',    label: 'Information & Assistance (Options Counseling)' },
        { value: 88518,   color: '#685ba3', class:'counseling',     label: 'Insurance Counseling ' },
        { value: 114151,  color: '#bb2d17', class:'ombudsmen',      label: 'Ombudsmen Services' },
        { value: 812066,  color: '#eb9000', class:'affiliate-expense',      label: 'Affiliate Operations' },
        { value: 1638313, color: '#368a8d', class:'care-center',    label: 'Adult/Child Care Center(s) operations' },
        { value: 837428,  color: '#359207', class:'transportation', label: 'Transportation & general facility operations' }
      ],
    };

    var size = {width:600,height:600},
        position = {x:size.width/2,y:size.height/2},
        radius = {inner:200, outer: 250};

    window.chartRevenues = Raphael("revenue-chart", size.width, size.height).donutChart(position.x, position.y, radius.outer, radius.inner, financials.revenues, "#fff");
    window.chartExpenses = Raphael("expense-chart", size.width, size.height).donutChart(position.x, position.y, radius.outer, radius.inner, financials.expenses, "#fff");

    window.onscroll = function(){
       // if(window.scrollY >= 800) {
       //    document.getElementById('services').style.position = 'relative';
       // }
    };
  }
};

module.exports.init();


