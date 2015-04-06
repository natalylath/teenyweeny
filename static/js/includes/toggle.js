var toggle = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            toggle: function(){
                var keyword = $(this).data('toggle');

                $('[data-hide="' + keyword + '"]').hide();
                $('[data-show="' + keyword + '"]').fadeIn(150);

                return false;
            },
            events: {
                set: function(){
                    nodes.body.on('click', '.s-toggle', methods.toggle);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());

toggle.init();