$(document).ready(function() {

	/* common scripts */

	$('.select2').select2({
		minimumResultsForSearch: 20
	});

	function priceList() {
		function format(item) {
			var originalOption = $(item.element);
			return '<span class="pr">' + item.text + '</span>' + '<span class="val">' + originalOption.data('volume') + '</span>';
		}
		$('.select2-complex').select2({
			'width': 135,
			formatResult: format,
			formatSelection: format,
			minimumResultsForSearch: 20
		});
	}
	priceList();

	function pruductColor() {
		function format(item) {
			var originalOption = $(item.element);
			return '<span class="color ' + originalOption.data('volume') + '"></span>' + item.text;
		}
		$('.select2-color').select2({
			'width': '100%',
			formatResult: format,
			formatSelection: format,
			minimumResultsForSearch: 20
		});
	}
	pruductColor();

	$('.fancybox').fancybox({
    	padding: 0,
    	fitToView: false,
    	tpl: {
			closeBtn : '<a class="fancybox-item fancybox-close close2"></a>'
		},
		afterLoad: function(current) {
			if (current.element.hasClass('quick-view-btn')) {
				setTimeout( function() {
					if ($('.bxslider-photo-border .bx-arrow-right .bx-next').length < 1) {
						cardGalleryLayer();
					};
				}, 200);
			};
		}
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
			}
			if (parseInt(curValue) < minValue) {
				curValue = MAX_PRICE;
				minValue = MIN_PRICE;
			}

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
			}
		});

		$(document).on('click', '.special-title', function() {
			var par = $(this).closest('.filter-block');
			par.toggleClass('opened');
			if (par.hasClass('opened')) {
				par.find('.subcontent').slideDown();
			} else {
				par.find('.subcontent').slideUp();
			}
		});

	}
	filterBlock();

	/* filter last level - filter page */
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
	}

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
		}
		e.preventDefault();
	});

	$(document).on('click', '.popup-btn', function(e) {
		$(this).toggleClass('opened');
		var layer = $(this).closest('.popup-cont').find('.popup-layer');
		if ($(this).hasClass('opened')) {
			if ($(this).data('yoffset') != '' && $(this).data('yoffset')) {
				layer.css({'top': $(this).data('yoffset') + 'px'});
			}
			layer.show();
		} else {
			layer.hide();
		}
		e.preventDefault();
	});
	$(document).on('click', '.popup-close', function() {
		$(this).closest('.popup-layer').hide();
		$(this).closest('.popup-cont').find('.popup-btn').removeClass('opened');
	});


	/*
	$(document).on('focusin', '.tag-input', function() {
		$(this).closest('.autocomplete-cont').find('.autocomplete').show();
	});
	$(document).on('focuout', '.tag-input', function() {
		$(this).closest('.autocomplete-cont').find('.autocomplete').hide();
	});*/

	$(document).on('click', '.tag-remove', function() {
		if ($(this).closest('.tags').hasClass('toggle-tags')) {
			$(this).closest('.tag').toggleClass('passive');
		} else {
			$(this).closest('.tag').hide();
		};

	});
	/*
	$(document).on('click', '.autocomplete-line', function() {
		$(this).closest('.popup-layer').find('.tags').html('<div class="tag">' + $(this).text() + '<span class="tag-remove"></span></div>');
		$(this).closest('.autocomplete').hide();
		$(this).closest('.autocomplete-cont').find('.tag-input').val($(this).text());
	});*/

	/* add ajax for loading content of specified breed! */
	/*
	$(document).on('click','.autocomplete-submit', function(e) {
		if (!$(this).hasClass('link')) {
			$(this).closest('.popup-layer').hide();
			$(this).closest('.popup-cont').find('.popup-btn').removeClass('opened');
			$('.breed-btn').addClass('active').text($(this).closest('.popup-cont').find('.tag-input').val());
			e.preventDefault();
		};
	});*/

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


	$(document).on('click', '.filter-option', function() {
		$(this).addClass('active');
	});
	$(document).on('click', '.option-del', function(e) {
		$(this).closest('.filter-option').removeClass('active');
		e.stopImmediatePropagation();
	});

	/* card scripts */
	function cardGallery() {
		$('.bxslider-photo').not('.no-zoom').bxSlider({
		  	pagerCustom: '#bxpager',
		  	minSlides: 1,
		  	maxSlides: 1,
		  	slideWidth: 378,
		  	nextText: '',
		  	prevText: '',
		  	mode: 'fade',
		  	nextSelector: '.bxslider-photo-border .bx-arrow-right',
			prevSelector: '.bxslider-photo-border .bx-arrow-left',
			onSliderLoad: function (currentIndex) {
	 			$('.bxslider-photo .photo-slide').eq(currentIndex).addClass('active');
	 			$('.bxslider-photo .photo-slide').eq(currentIndex).find('img').elevateZoom({
	 				zoomWindowWidth: 520,
	           		zoomWindowHeight: 330
	 			});
	       	},
			onSlideAfter: function ($slideElement, oldIndex, newIndex) {
				$('.bxslider-photo .photo-slide').removeClass('active');
				$slideElement.addClass('active');
				$slideElement.find('img').elevateZoom({
					zoomWindowWidth: 520,
	           		zoomWindowHeight: 330
				});

				$('.bxpager').removeClass('active');
				var el = $('.bxpager'+'.'+'b'+ newIndex).not('.bx-clone');
				el.addClass('active');
			}
		});

		$('#bxpager').not('.in-layer').bxSlider({
		  	minSlides: 4,
		  	maxSlides: 4,
		  	moveSlides: 1,
		  	slideWidth: 70,
		  	pager: false,
		  	slideMargin: 5,
		  	nextText: '',
		  	prevText: '',
		  	nextSelector: '.bxpager-cont .bx-arrow-right',
			prevSelector: '.bxpager-cont .bx-arrow-left',
	        onSliderLoad: function (currentIndex) {
	 			$('#bxpager .bxpager').eq(0).addClass('active');
	       	}
		});
		$(document).on('click','.bxpager', function() {
			if ($(this).hasClass('video-pager')) return;
			$('.bxpager').removeClass('active');
			$(this).addClass('active');
		});
	};
	cardGallery();

	/* some changes for gallery in a "quick view layer" in catalog filter page */
	function cardGalleryLayer() {
		$('.no-zoom').bxSlider({
		  	pager: true,
		  	minSlides: 1,
		  	maxSlides: 1,
		  	slideWidth: 378,
		  	nextText: '',
		  	prevText: '',
		  	mode: 'fade',
		  	nextSelector: '.bxslider-photo-border .bx-arrow-right',
			prevSelector: '.bxslider-photo-border .bx-arrow-left'
		});
	};

	$(document).on('click','.video-pager', function(e) {
		e.stopImmediatePropagation();
	});

	$(document).on('click', '.show-more', function(e) {
		$(this).toggleClass('opened');
		var hid = $(this).closest('.review-item').find('.review-txt-hidden');
		if ($(this).hasClass('opened')) {
			hid.slideDown();
			$(this).text('Свернуть отзыв');
		} else {
			hid.slideUp();
			$(this).text('Читать полностью');
		};
		e.preventDefault();
	});

	$(document).on('click', '.review-extend-link', function(e) {
		$(this).toggleClass('opened');
		var hid = $('.review-extend');
		if ($(this).hasClass('opened')) {
			hid.slideDown();
			$(this).text($(this).data('hid'));
		} else {
			hid.slideUp();
			$(this).text($(this).data('open'));
		};
		e.preventDefault();
	});

	if ($('.rateit').length) {
		$('.rateit').rateit();
	};
	
	/* recently viewed products */
	if ($('.bxgallery').length) {
		var total = $('.bxgallery .slide').length;
		var mult = 4;
		if (total != 1) {
			$('.bxgallery-cont .bx-arrow-left').css('visibility', 'visible');
			$('.bxgallery-cont .bx-arrow-right').css('visibility', 'visible');
			$('.bxgallery-counter').css('visibility', 'visible');

			$('.bxgallery').bxSlider({
			  	minSlides: 1,
			  	maxSlides: 1,
			  	slideWidth: 900,
			  	pager: false,
			  	slideMargin: 0,
			  	nextText: '',
			  	prevText: '',
			  	nextSelector: '.bxgallery-cont .bx-arrow-right',
				prevSelector: '.bxgallery-cont .bx-arrow-left',
				onSliderLoad: function (currentIndex) {
					$('.bxgallery-total').text(total * mult);
				},
				onSlideBefore: function ($slideElement, oldIndex, newIndex) {
					$('.bxgallery-cur').text(newIndex * mult + 1);
					$('.bxgallery-cur2').text((newIndex+1) * mult);
				}
			});
		};
	};

	$('.fancybox-gal').fancybox({
    	padding: 0,
    	fitToView: true,
    	nextEffect: 'none',
    	prevEffect: 'none',
    	tpl: {
			closeBtn : '<a class="fancybox-item fancybox-close close2"></a>'
		}
    });

	$('.phone-mask').mask('+7 (000) 000-00-00');

	function productPrice() {

		function updateTotalPrice(el) {
			var actual = parseInt($('.prod-price-actual').val());
			$('.total-value').text(actual * el.val());
			$('.counter-value').text(el.val());
			$('.card-total').show();
		};

		$(document).on('click', '.count-inc', function() {
			var el = $('.card-count-input');
			cur = parseInt(el.val());

			el.val(cur + 1);
			updateTotalPrice(el);
			
   		});

   		$(document).on('click', '.count-dec', function() {
			var el = $('.card-count-input');
			cur = parseInt(el.val());
			if (cur < 2) return;
			el.val(cur - 1);

			updateTotalPrice(el);
   		});

   		$(document).on('change', '.card-count-input', function() {
			var cur  = parseInt($(this).val());
			if (cur < 2) {
				$(this).val('1');
			};
			updateTotalPrice($(this));
   		});

   		$(".card-count-input").keydown(function (e) {
	    	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	            (e.keyCode == 65 && e.ctrlKey === true) || 
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 return;
	        }
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
	    });

	};

	/*if it is a card page (simple, complex or cloth) */
	if ($('.prod-price-actual').length) {
		productPrice();
	};
  	
  	$(document).on('click', 'div.related-suggest', function() {
  		$.scrollTo('#related', 300);
  	});
	
	$(document).on('click', '.size-item', function() {
  		$('.size-item').removeClass('selected');
  		$(this).addClass('selected');
  	});
  	$(document).on('click', '.color-item', function() {
  		$('.color-item').removeClass('selected');
  		$(this).addClass('selected');
  	});

  	$(document).on('click', '.fav-list-item', function() {
  		$('.fav-list-item').removeClass('selected');
  		$(this).addClass('selected');
  	});


  	/* login and registration layers */
  	$('#password').password().on('show.bs.password',function (e) {
        $('#show_pass').prop('checked', true);
    }).on('hide.bs.password', function (e) {
                $('#show_pass').prop('checked', false);
            });
    $('#show_pass').click(function () {
    	var txt = $('#password').password('val');
    	var cur = $('#password').val();
        $('#password').password('toggle');
        if (cur != '') {
        	$('#password').password('val', txt);
    	};
    });

   $('#password1').password().on('show.bs.password',function (e) {
        $('#show_pass1').prop('checked', true);
    }).on('hide.bs.password', function (e) {
                $('#show_pass1').prop('checked', false);
            });
    $('#show_pass1').click(function () {
    	var txt = $('#password1').password('val');
    	var cur = $('#password1').val();
        $('#password1').password('toggle');
        if (cur != '') {
        	$('#password1').password('val', txt);
    	};
    });

    $(document).on('click', '.fancy-close', function(e) {
    	$.fancybox.close();
    	e.preventDefault();
    });



	//= includes/alert.js
	//= includes/tip.js
	//= includes/scrollTo.js
	//= includes/toggle.js
	//= includes/autocomplete.js
	//= includes/form.js
	//= includes/tabs.js
	//= includes/maps.js
});
