
var filters = (function(){
    var vars = {},
        nodes={
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
                    nodes.range = nodes.body.find('.slider-range');

                    if(nodes.range.length == 0) return false;

                    vars.min = 300;
                    vars.max = 20000;

                    vars.from = 800;
                    vars.to = 7000;

                    vars.flag = false;

                    nodes.sliderForm = nodes.range.parents('.slider-form');
                    nodes.minInput = nodes.sliderForm.find('.min');
                    nodes.maxInput = nodes.sliderForm.find('.max');

                    methods.range.init();

                    methods.range.setInputs(vars.from, vars.to);

                    nodes.range.find('.ui-slider-handle').eq(0).addClass('left-handle');
                    nodes.range.find('.ui-slider-handle').eq(1).addClass('right-handle');

                    methods.events.range();
                },
                init: function(){
                    nodes.range.slider({
                        range: true,
                        min: vars.min,
                        max: vars.max,
                        values: [vars.from, vars.to],
                        slide: function(event, ui) {
                            if(vars.flag) {
                                return false;
                            }

                            nodes.range.slider({values: methods.range.fixValues(ui.values[0], ui.values[1], true)});
                            methods.range.setInputs(ui.values[0], ui.values[1]);
                        },
                        stop: function(){
                            vars.flag = false;
                        }
                    });
                },

                setInputs: function(min, max){
                    nodes.minInput.val(min);
                    nodes.maxInput.val(max);
                },
                minChange: function(){
                    var min = parseInt(nodes.minInput.val()),
                        max = parseInt(nodes.maxInput.val());

                    if(min < vars.min || isNaN(min)) {
                        min = vars.min;
                    }
                    if(min > max) {
                        min = max;
                    }

                    nodes.range.slider({values: methods.range.fixValues(min, max)});
                    methods.range.setInputs(min, max);
                },
                maxChange: function(){
                    var min = parseInt(nodes.minInput.val()),
                        max = parseInt(nodes.maxInput.val());

                    if(max > vars.max || isNaN(max)) {
                        max = vars.max;
                    }
                    if(max < min) {
                        max = min;
                    }

                    nodes.range.slider({values: methods.range.fixValues(min, max)});
                    methods.range.setInputs(min, max);
                },
                fixValues: function(min, max, slide){
                    if(min == max && min != vars.min && max != vars.max) {
                        max += 2;
                        min -= 2;

                        if(slide) {
                            vars.flag = true;
                        }
                    }
                    return [min, max];
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
                select: function(){
                    var item = $(this);

                    if(item.hasClass('passive')) {
                        item.removeClass('passive');
                    }
                },
                remove: function(e) {
                    var item = $(this),
                        tag = item.closest('.tag');

                    if (item.closest('.tags').hasClass('toggle-tags')) {
                        if(!tag.hasClass('passive')) {
                            tag.addClass('passive');
                        }
                    } else {
                        tag.hide();
                    }

                    e.stopPropagation();
                }
            },
            events: {
                set: function(){
                    nodes.body
                        .on('click', '.s-filter', methods.filter.toggle)
                        .on('click', '.filter-option', methods.filter.select)
                        .on('click', '.option-del', methods.filter.remove)
                        .on('click', '.sort_btn', methods.sort.toggle)
                        .on('click', '.toggle-tags .tag', methods.tag.select)
                        .on('click', '.tag-remove', methods.tag.remove);
                },
                range: function(){
                    nodes.minInput.on('change',methods.range.minChange);
                    nodes.maxInput.on('change',methods.range.maxChange);
                }
            }
        };
    return {
        init: function(){
            methods.range.prepare();

            methods.events.set();
        }
    }
}());
filters.init();