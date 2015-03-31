$(document).ready(function() {
	
	/* common scripts */
	$('ul.tabs').on('click', 'li:not(.selected)', function() {  
	    $(this).addClass('selected').siblings().removeClass('selected')  
	    .parents('div.tabs-cont').find('div.tab-box').eq($(this).index()).fadeIn(150).siblings('div.tab-box').hide();
	});

	$('.select2').select2({
		minimumResultsForSearch: 20
	});

	function priceList() {
		function format(item) {
		    var originalOption = $(item.element);
		    return '<span class="pr">' + item.text + '</span>' + '<span class="val">' + originalOption.data('volume') + '</span>';
		};
		$('.select2-complex').select2({
			'width': 135,
			formatResult: format,
			formatSelection: format,
			minimumResultsForSearch: 20
		});
	};
	priceList();

    $('.fancybox').fancybox({
    });

    $(document).on('click', '.top-page', function(e) {
    	$.scrollTo(0, 500);
    	e.preventDefault();
    });



    /* catalog scripts */
    $(".slider-range").each(function() {
        $(".slider-range").slider({
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

	$(document).on('click', '.sort-btn', function(e) {
		if ($(this).hasClass('active')) {
			if ($(this).hasClass('sort-down')) {
				$(this).removeClass('sort-down').addClass('sort-up');
			} else {
				$(this).removeClass('sort-up').addClass('sort-down');
			}
		} else {
			$(this).closest('.sort').find('.sort-btn').removeClass('active').removeClass('sort-up').removeClass('sort-down');
			$(this).addClass('active').addClass('sort-down');
		};
		e.preventDefault();
	});

});





