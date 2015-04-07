var tip = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            prepare: function(){
                nodes.tips = nodes.body.find('.tip');
                nodes.tips.css({
                    'visibility': 'visible',
                    'display' : 'none'
                });
            },
            show: function(){
                var tip = $(this).closest('.tip-wrap').find('.tip');

                if(tip.hasClass('tip_atop_b')) {
                    tip.css({
                        'margin-left': -tip.outerWidth()/2
                    })
                } else if(tip.hasClass('tip_atop_r')) {
                    tip.css({
                        'margin-top': -tip.outerHeight()/2
                    })
                }

                tip.fadeIn(vars.speed);
            },
            hide: function(){
                $(this).closest('.tip-wrap').find('.tip').hide();
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

tip.init();
