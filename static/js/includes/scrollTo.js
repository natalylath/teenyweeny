var scrollTo = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            scrollTo: function(){
                $.scrollTo($('[data-scrollTo="' + $(this).data('scroll') + '"]'), vars.speed);
                return false;
            },
            events: {
                set: function(){
                    nodes.body.on('click', '.s-scroll', methods.scrollTo);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());

scrollTo.init();