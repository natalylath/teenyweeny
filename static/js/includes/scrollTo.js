
var scrollTo = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            scrollTo: function(){
                var keyword = $(this).data('scroll');

                if(keyword == 'top') {
                    $.scrollTo(0, vars.speed);
                } else {
                    $.scrollTo($('[data-scrollTo="' + keyword + '"]'), vars.speed);
                }

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