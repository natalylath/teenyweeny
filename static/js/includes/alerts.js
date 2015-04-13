
var alerts = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            hide: function(){
                $(this).parent().fadeOut(vars.speed);
            },
            events: {
                set: function(){
                    nodes.body.on('click', '.alert .close', methods.hide);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());
alerts.init();