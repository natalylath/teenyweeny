$(document).ready(function() {
	$('ul.tabs').on('click', 'li:not(.selected)', function() {  
	    $(this).addClass('selected').siblings().removeClass('selected')  
	    .parents('div.tabs-cont').find('div.tab-box').eq($(this).index()).fadeIn(150).siblings('div.tab-box').hide();
	});

	function priceList() {

		function format(item) {
		    var originalOption = $(item.element);
		    return '<span class="pr">' + item.text + '</span>' + originalOption.data('volume');
		};
 
		$('.select2').select2({
			'width': 180,
			formatResult: format,
			formatSelection: format,
			minimumResultsForSearch: 20
		});

	};
	
	priceList();

	if ($('.bxslider').length) {
		$('.bxslider').bxSlider({
			pager: false,
			nextSelector: '.bx-arrow-right',
			prevSelector: '.bx-arrow-left',
			nextText: '',
			prevText: '',
			slideWidth: 106,
			minSlides: 6,
			maxSlides: 6
		});
	};

	function filterBlock() {
		
		$(document).on('click', '.filter-title', function() {
			var par = $(this).closest('.filter-block');
			par.toggleClass('opened');
			if (par.hasClass('opened')) {
				par.find('.filter-content').slideDown();
			} else {
				par.find('.filter-content').slideUp();
			};
		});

	};
	filterBlock();


    $( ".slider-range" ).each(function() {
        $( ".slider-range" ).slider({
          range: true,
          min: 300,
          max: 5900,
          values: [ 800, 2100 ],
          slide: function( event, ui ) {
            $(this).parents('.slider-form').find( ".min" ).val(ui.values[ 0 ]);
            $(this).parents('.slider-form').find( ".max" ).val(ui.values[ 1 ]);
          }
        });
    
        $(this).parents('.slider-form').find( ".min" ).val( $( ".slider-range" ).slider( "values", 0 ));
        $(this).parents('.slider-form').find( ".max" ).val( $( ".slider-range" ).slider( "values", 1 ));

        $(this).find('.ui-slider-handle').eq(0).addClass('left-handle');  
    });
    

});





