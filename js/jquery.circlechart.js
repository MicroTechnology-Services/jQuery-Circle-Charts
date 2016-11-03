(function($) {
   $.fn.extend({
      // pass the options variable to the function
      circleChart: function(options) {
      // Set the default values, use comma to separate the settings, example:
         var defaults = {
               animate : true,
               diameter : 100,
               guage: 2,
               coverBg: '#fff',
               bgColor: '#efefef',
               fillColor: '#5c93c8',
               textSize: '14px',
               textWeight: 'normal'
            },
            styles = {
               cirContainer : {
                  'width':defaults.diameter,
                 'height':defaults.diameter
               },
               cir : {
                  'position': 'relative',
                  'text-align': 'center',
                  'width': defaults.diameter,
                  'height': defaults.diameter,
                  'border-radius': '100%',
                  'background-color': defaults.bgColor,
                  'background-image' : 'linear-gradient(91deg, transparent 50%, '+defaults.bgColor+' 50%), linear-gradient(90deg, '+defaults.bgColor+' 50%, transparent 50%)'
               },
               cirCover: {
                  'position': 'relative',
                  'top': defaults.guage,
                  'left': defaults.guage,
                  'text-align': 'center',
                  'width': defaults.diameter - (defaults.guage * 2),
                  'height': defaults.diameter - (defaults.guage * 2),
                  'border-radius': '100%',
                  'background-color': defaults.coverBg
               },
               text: {
                  'display': 'table-cell',
                  'width': defaults.diameter,
                  'height': defaults.diameter,
                  'vertical-align': 'middle',
                  'color': defaults.fillColor
                },
               inner: {
                  'display': 'inline-block',
                  'width': defaults.diameter / 2,
                  'height': defaults.diameter / 2
               },
               label: {
                  'font-size': defaults.textSize,
                  'font-weight': defaults.textWeight,
               },
               title: {
               }
            };

         var that = this,
            template = '<div><div class="ab"><div class="cir"><div class="text"><div class="inner"><div class="title">{{title}}</div><div class="data-value">{{datavalue}}</div></div></div></div></div></div>',
            options =  $.extend(defaults, options)

         function init() {
            that.each(function() {
               var $this = $(this),
                  // check for percent and/or total, otherwise set to 0;
                  dataPercent = Math.round($this.data('percent')),
                  dataValue = $this.data('value'),
                  dataTotal = Math.round($this.data('total')),
                  stopDeg = ( dataValue !== 'undefined'
                     ? dataValue / dataTotal * 100
                     : dataPercent ) * 3.6,
                  startDeg = options.animate ? 0 : stopDeg,
                  title = $this.data('title') || '',
                  $chart = $(template.replace('{{datavalue}}',
                     dataValue !== 'undefined' ? dataValue : dataPercent+'%')
                     .replace('{{title}}',title)
                  );
                  // set all of the css properties forthe chart
                  $chart.css(styles.cirContainer)
                     .find('.ab').css(styles.cir)
                     .find('.cir').css(styles.cirCover)
                     .find('.text').css(styles.text)
                     .find('.inner').css(styles.inner)
                     .find('.title').css(styles.title)
                     .siblings('.data-value').css(styles.label);

               $this.append($chart); // add the chart back to the target element
               setTimeout( function() {
                  animateChart(stopDeg,parseInt(startDeg),$chart.find('.ab')); // both values set to the same value to keep the function from looping and animating
               }, 250)
            });
         }

         var animateChart = function (stop,curr,$elm) {
            var deg = curr;
            if(curr <= stop) {
               if (deg >= 180) {
                  $elm.css('background-image','linear-gradient(' + (90+deg) + 'deg, transparent 50%, '+options.fillColor+' 50%),linear-gradient(90deg, '+options.fillColor+' 50%, transparent 50%)');
               } else {
                  $elm.css('background-image','linear-gradient(' + (deg-90) + 'deg, transparent 50%, '+options.bgColor+' 50%),linear-gradient(90deg, '+options.fillColor+' 50%, transparent 50%)');
               }
               curr ++;
               setTimeout( function() {
                  animateChart(stop,curr,$elm);
               }, 1);
            }
         };
         init(); // kick off the goodness
      }
   });

})(jQuery);