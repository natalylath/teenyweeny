
var filters = (function(){
    var nodes={
            body: $('body')
        },
        methods = {
            filter: {
                toggle: function(){
                    var item = $(this),
                        par = item.closest('.s-filter-block');

                    par.toggleClass('opened');

                    if (par.hasClass('opened')) {
                        item.text(item.data('close-text'));
                        par.find('.s-filter-content').slideDown();
                    } else {
                        item.text(item.data('open-text'));
                        par.find('.s-filter-content').slideUp();
                    }

                    return false;
                },
                select: function(){
                    var item = $(this);

                    if(item.hasClass('active')) {
                        item.removeClass('active');
                    } else {
                        item.addClass('active');
                    }
                },
                remove: function(e){
                    $(this).closest('.filter-option').removeClass('active');
                    e.stopImmediatePropagation();
                }
            },
            range: {
                prepare: function(){
                    var item = $(this),
                        par = item.parents('.slider-form'),
                        minVal =  $(".min", par),
                        maxVal =  $(".max", par),
                        currentSlider = item,
                        MIN_PRICE = 300,
                        MAX_PRICE = 20000;

                    methods.range.slider(MIN_PRICE, MAX_PRICE, minVal, maxVal);

                    minVal.val(nodes.range.slider( "values", 0 ));
                    maxVal.val(nodes.range.slider( "values", 1 ));

                    minVal.change(function () {
                        methods.range.minValChange(this, MIN_PRICE, MAX_PRICE, maxVal, currentSlider);
                    });

                    maxVal.change(function () {
                        methods.range.maxValChange(this, MIN_PRICE, MAX_PRICE, minVal, currentSlider)
                    });

                    item.find('.ui-slider-handle').eq(0).addClass('left-handle');
                },
                slider: function(MIN_PRICE, MAX_PRICE, minVal, maxVal){
                    nodes.range.slider({
                        range: true,
                        min: MIN_PRICE,
                        max: MAX_PRICE,
                        values: [ 800, 7000 ],
                        slide: function( event, ui ) {
                            minVal.val(ui.values[ 0 ]);
                            maxVal.val(ui.values[ 1 ]);
                        }
                    });
                },
                minValChange: function(item, MIN_PRICE, MAX_PRICE, maxVal, currentSlider){
                    var curValue = item.value;
                    var maxValue = maxVal.val();

                    if (parseInt(curValue) > maxVal.val()) {
                        curValue = MIN_PRICE;
                        maxValue = MAX_PRICE;
                    }
                    currentSlider.slider({values: [ parseInt(curValue), maxValue ]});
                },
                maxValChange: function(item, MIN_PRICE, MAX_PRICE, minVal, currentSlider){
                    var curValue = item.value;
                    var minValue = minVal.val();

                    if (parseInt(curValue) > MAX_PRICE) {
                        curValue = MAX_PRICE;
                    }
                    if (parseInt(curValue) < minValue) {
                        curValue = MAX_PRICE;
                        minValue = MIN_PRICE;
                    }
                    currentSlider.slider({values: [minValue, parseInt(curValue) ]});
                }
            },
            sort: {
                toggle: function(){
                    var item = $(this);

                    if (item.hasClass('active')) {
                        if (item.hasClass('sort-down')) {
                            item.removeClass('sort-down').addClass('sort-up');
                        } else {
                            item.removeClass('sort-up').addClass('sort-down');
                        }
                    } else {
                        item.closest('.sort').find('.sort_btn').removeClass('active').removeClass('sort-up').removeClass('sort-down');
                        item.addClass('active').addClass('sort-down');
                    }

                    return false;
                }
            },
            tag: {
                remove: function() {
                    var item = $(this);

                    if (item.closest('.tags').hasClass('toggle-tags')) {
                        item.closest('.tag').toggleClass('passive');
                    } else {
                        item.closest('.tag').hide();
                    }
                }
            },
            events: {
                set: function(){
                    nodes.body
                        .on('click', '.s-filter', methods.filter.toggle)
                        .on('click', '.filter-option', methods.filter.select)
                        .on('click', '.option-del', methods.filter.remove)
                        .on('click', '.sort_btn', methods.sort.toggle)
                        .on('click', '.tag-remove', methods.tag.remove);
                }
            }
        };
    return {
        init: function(){
            nodes.range = nodes.body.find('.slider-range');

            if(nodes.range.length != 0) {
                $.each(nodes.range, methods.range.prepare);
            }

            methods.events.set();
        }
    }
}());
filters.init();