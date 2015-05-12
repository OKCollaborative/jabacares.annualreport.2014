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

    var size = {width:525,height:525},
        position = {x:size.width/2,y:size.height/2},
        radius = {inner:195, outer: 235},
        servicesMax = $('#places').offset().top - 25 - $('#services').height(),
        $services = $('#services');

    $services.el = $services.get(0);
    window.chartRevenues = Raphael('revenue-chart', size.width, size.height).donutChart(position.x, position.y, radius.outer, radius.inner, financials.revenues, '#fff');
    window.chartExpenses = Raphael('expense-chart', size.width, size.height).donutChart(position.x, position.y, radius.outer, radius.inner, financials.expenses, '#fff');

    window.onscroll = function(){
      // console.log(window.scrollY , servicesMax,  $services.offset().top);
      y = $(window).scrollTop() +225;
      if( y >= servicesMax ) {
        $services.absolute = true;
        $services.el.style.position = 'absolute';
        $services.el.style.top = servicesMax + 'px';
      }
      else if( y < servicesMax && $services.absolute){
        $services.absolute = false;
        $services.el.style.position = 'fixed';
        $services.el.style.top = '250px';
      }
    };

    function connect(){
      var connectors = [
        ['.navigating .description','.medicare .description'],
        ['.social-isolation .circle','.advocacy .circle'],
        ['.food-insecurity .description','.meals .description'],
        ['.caregivers .circle','.caregiver-support .circle'],
        ['.healthcare-reform .description','.security .description'],
        ['.institution .circle','.home .circle'],
      ];
      _.forEach(connectors, function(connector){
        Liner.connect($(connector[0]).get(0),$(connector[1]).get(0), {color:'#777', style: 'dotted', weight:2} );
      });
    }

    connect();

    $(window).resize(_.debounce(function(){
      window.onscroll(); //reset services block
      $( '.connector' ).remove();
      connect();
      servicesMax = $('#places').offset().top - 25 - $('#services').height();

    }, 500));

    function highlightServices(selectors){

      var serviceSelectors = (selectors.data || []).join(',') ;
      if(serviceSelectors.length){
        $( '#services li' + serviceSelectors ).addClass('bright').removeClass('fadeback');
        $( '#services li:not(' + serviceSelectors + ')').addClass('fadeback').removeClass('bright');
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
      $(objective).on('mouseover',services, highlightServices);
      $(objective).on('click',services, highlightServices);
    });

    $('#community').on('mouseout', unFade);


    $('.contribution').on('click', function() {
      $('.selected').not(this).removeClass('selected');

      if($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        $('#detail').slideFadeToggle();
      } else {
        $(this).addClass('selected');
        var $detail = $('#detail');
        var position = { top: $(this).offset().top + $(this).height() + 15, left: $(this).offset().left};
        $('#source .text').html( $(this).data('source') );
        $('#more .text').html( $(this).data('description') );
        $detail.css({top: position.top, left: position.left, width:$(this).width(),'margin-left':$(this).css('padding-left')});
        if($('#detail').css('display')==='none'){
          $('#detail').slideFadeToggle();
        }
      }
      return false;
    });

    function deselect(e) {
      $('#detail').slideFadeToggle(function() {
        e.removeClass('selected');
      });
    }
    $('#detail').on('click', function() {
      deselect($('.need,.contribution'));
      return false;
    });

    $.fn.slideFadeToggle = function(easing, callback) {
      return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
    };
  }
};

module.exports.init();


