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
    $(document).on('click', '.brand-btn-cont .btn', function(e) {
    	$(this).toggleClass('opened');
    	if ($(this).hasClass('opened')) {
    		$(this).closest('.brand-more').find('.catalog-list').slideDown();
    		$(this).text('Свернуть бренды');
    	} else {
    		$(this).closest('.brand-more').find('.catalog-list').slideUp();
    		$(this).text($(this).data('originaltxt'));
    	}
    	
    	e.preventDefault();
    });


    /* catalog filter scripts */
    $(".slider-range").each(function() {
    	var par = $(this).parents('.slider-form');
    	var minVal =  $(".min", par);
    	var maxVal =  $(".max", par);
    	var currentSlider = $(this);
    	var MIN_PRICE = 300;
    	var MAX_PRICE = 20000;

        $(".slider-range").slider({
          range: true,
          min: MIN_PRICE,
          max: MAX_PRICE,
          values: [ 800, 7000 ],
          slide: function( event, ui ) {
            minVal.val(ui.values[ 0 ]);
            maxVal.val(ui.values[ 1 ]);
          }
        });
    
        minVal.val( $( ".slider-range" ).slider( "values", 0 ));
        maxVal.val( $( ".slider-range" ).slider( "values", 1 ));

        minVal.change(function () {
	        var curValue = this.value;
	        var maxValue = maxVal.val();
	        
	        if (parseInt(curValue) > maxVal.val()) {
	            curValue = MIN_PRICE;
	            maxValue = MAX_PRICE;
	        }
	        currentSlider.slider({values: [ parseInt(curValue), maxValue ]});
	    });

	    maxVal.change(function () {
	        var curValue = this.value;
	        var minValue = minVal.val();

	        if (parseInt(curValue) > MAX_PRICE) {
	            curValue = MAX_PRICE;
	        };
	        if (parseInt(curValue) < minValue) {
	            curValue = MAX_PRICE;
	            minValue = MIN_PRICE;
	        };

	        currentSlider.slider({values: [minValue, parseInt(curValue) ]});
	    });

        $(this).find('.ui-slider-handle').eq(0).addClass('left-handle');  
    });

    function filterBlock() {
		$(document).on('click', '.filter-title', function() {
			if ($(this).hasClass('special-title')) return;

			var par = $(this).closest('.filter-block');
			par.toggleClass('opened');
			if (par.hasClass('opened')) {
				par.find('.filter-content').slideDown();
			} else {
				par.find('.filter-content').slideUp();
			};
		});

		$(document).on('click', '.special-title', function() {
			var par = $(this).closest('.filter-block');
			par.toggleClass('opened');
			if (par.hasClass('opened')) {
				par.find('.subcontent').slideDown();
			} else {
				par.find('.subcontent').slideUp();
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

	$(document).on('click', '.popup-btn', function(e) {
		$(this).toggleClass('opened');
		var layer = $(this).closest('.popup-cont').find('.popup-layer');
		if ($(this).hasClass('opened')) {
			if ($(this).data('yoffset') != '' && $(this).data('yoffset')) {
				layer.css({'top': $(this).data('yoffset') + 'px'});
			};
			layer.show();
		} else {
			layer.hide();
		};
		e.preventDefault();
	});
	$(document).on('click', '.popup-close', function() {
		$(this).closest('.popup-layer').hide();
		$(this).closest('.popup-cont').find('.popup-btn').removeClass('opened');
	});

	$(document).on('focusin', '.tag-input', function() {
		$(this).closest('.autocomplete-cont').find('.autocomplete').show();
	});
	$(document).on('focuout', '.tag-input', function() {
		$(this).closest('.autocomplete-cont').find('.autocomplete').hide();
	});

	$(document).on('click', '.tag-remove', function() {
		if ($(this).closest('.tags').hasClass('toggle-tags')) {
			$(this).closest('.tag').toggleClass('passive');
		} else {
			(this).closest('.tag').hide();
		};

	});
	$(document).on('click', '.autocomplete-line', function() {
		$(this).closest('.popup-layer').find('.tags').html('<div class="tag">' + $(this).text() + '<span class="tag-remove"></span></div>');
		$(this).closest('.autocomplete').hide();
		$(this).closest('.autocomplete-cont').find('.tag-input').val($(this).text());
	});

	/* add ajax for loading content of specified breed! */
	$(document).on('click','.autocomplete-submit', function(e) {
		if (!$(this).hasClass('link')) {
			$(this).closest('.popup-layer').hide();
			$(this).closest('.popup-cont').find('.popup-btn').removeClass('opened');
			$('.breed-btn').addClass('active').text($(this).closest('.popup-cont').find('.tag-input').val());
			e.preventDefault();
		};
	});

	$(document).on('mouseenter', '.breed-btn', function() {
		$(this).closest('.breed-cont').find('.tip-layer').show();
	});
	$(document).on('mouseleave', '.breed-btn', function() {
		$(this).closest('.breed-cont').find('.tip-layer').hide();
	});

	$(document).on('click', '.filter-option', function() {
		$(this).addClass('active');
	});
	$(document).on('click', '.option-del', function(e) {
		$(this).closest('.filter-option').removeClass('active');
		e.stopImmediatePropagation();
	});

});





