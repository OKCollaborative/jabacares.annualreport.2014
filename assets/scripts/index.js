var Raphael = require('./chart-donut');
var Liner = require('./liner');
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

    var size = {width:500,height:500},
        position = {x:size.width/2,y:size.height/2},
        radius = {inner:175, outer: 210};

    window.chartRevenues = Raphael('revenue-chart', size.width, size.height).donutChart(position.x, position.y, radius.outer, radius.inner, financials.revenues, '#fff');
    window.chartExpenses = Raphael('expense-chart', size.width, size.height).donutChart(position.x, position.y, radius.outer, radius.inner, financials.expenses, '#fff');

    window.onscroll = function(){
       if(window.scrollY >= 800) {
          document.getElementById('services').style.position = 'absolute';
          document.getElementById('services').style.top = '1050px';

       }
       else if(window.scrollY < 800) {
          document.getElementById('services').style.position = 'fixed';
          document.getElementById('services').style.top = '250px';
       }
    };
    $(window).resize(_.debounce(function(){
      $( '.connector' ).remove();
      var connectors = [
        ['medicare','advocacy'],
        ['advocacy','meals'],
        ['meals', 'caregiver-support'],
        ['caregiver-support', 'security'],
        ['security', 'home']
      ];
      _.forEach(connectors, function(connector){
        Liner.connect($('.'+connector[0] + ' .circle').get(0),$('.'+connector[1] + ' .circle').get(0), {color:'#777', style: 'dotted', weight:2} );
      });
      connectors = [
        ['navigating','social-isolation'],
        ['social-isolation','food-insecurity'],
        ['food-insecurity', 'caregivers'],
        ['caregivers', 'healthcare-reform'],
        ['healthcare-reform', 'institution']
      ];
      _.forEach(connectors, function(connector){
        Liner.connect($('.'+connector[0] + ' .circle').get(0),$('.'+connector[1] + ' .circle').get(0), {color:'#009', style: 'dotted', weight:2} );
      });
    }, 500));

    $(function() {
      $( document ).tooltip({
        tooltipClass: 'custom-tooltip-styling',
        position: { my: 'center top-20', at: 'center top', collision: 'flipfit' }
      });
    });

    function highlightServices(selectors){

      var serviceSelectors = (selectors.data || []).join(',') ;
      if(serviceSelectors.length){
        $( '#services li' + serviceSelectors ).removeClass('fadeback');
        $( '#services li:not(' + serviceSelectors + ')').addClass('fadeback');
      }
    }
    function unFade(){
        $( '#services li' ).removeClass('fadeback');
    }
    var objectives = {
      '.need.navigating,.contribution.medicare'          :['.info','.options','.medicare','.mortgage','.wills','.dual'],
      '.need.social-isolation,.contribution.advocacy'    :['.transitions','.health'],
      '.need.food-insecurity,.contribution.meals'        :['.home-meals','.center-meals'],
      '.need.caregivers,.contribution.caregiver-support' :['.info','.caregiver','.home','.mountainside','.acc'],
      '.need.healthcare-reform,.contribution.security'   :['.info','.aca','.medicare','.mortgage','.wellness'],
      '.need.institution,.contribution.home'             :['.pace','.ombudsmen']
    };
    _.forEach(objectives, function(services,objective){
      $(objective).on('click mouseover',services, highlightServices);
      // $(objective).on('click',services, highlightServices);
    });

    $('#community').on('mouseout', unFade);
  }
};

module.exports.init();


