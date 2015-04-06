var tip = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            show: function(){
                $(this).closest('.tip-wrap').find('.tip').fadeIn(vars.speed);
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
            methods.events.set();
        }
    }
}());

tip.init();
