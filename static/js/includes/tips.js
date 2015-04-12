var tips = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            prepare: function(){
                nodes.tips = nodes.body.find('.tip');

                $.each(nodes.tips.filter('.tip_atop_b'), function(){
                    var tip = $(this);

                    tip.css({
                        'margin-left': -methods.getSize(tip,'width')/2
                    })
                });

                $.each(nodes.tips.filter('.tip_atop_r'), function(){
                    var tip = $(this);

                    tip.css({
                        'margin-top': -methods.getSize(tip,'height')/2
                    })
                });

                $.each(nodes.tips.filter('.tip_inside'), function(){
                    var tip = $(this),
                        wrap = tip.closest('.tip-wrap');

                    tip.css({
                        'bottom': methods.getSize(wrap,'height')/2 - methods.getSize(tip,'height')/2
                    }).show();
                });
            },
            show: function(){
                $(this).closest('.tip-wrap').find('.tip').fadeIn(vars.speed);
            },
            hide: function(){
                $(this).closest('.tip-wrap').find('.tip').hide();
            },
            getSize: function(el,param){
                var copy = el.clone(),
                    size;

                copy.appendTo(nodes.body).show();

                if(param == 'width') {
                    size = copy.outerWidth();
                } else if(param == 'height') {
                    size = copy.outerHeight();
                }

                copy.remove();
                return size;
            },
            events: {
                set: function(){
                    nodes.body
                        .on('mouseenter', '.tip-init', methods.show)
                        .on('mouseleave', '.tip-init', methods.hide);
                }
            }
        };
    return {
        init: function(){
            methods.prepare();

            methods.events.set();
        }
    }
}());

tips.init();

