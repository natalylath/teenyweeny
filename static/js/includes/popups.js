
var popups = (function(){
    var nodes = {
            document: $(document),
            body: $('body')
        },
        methods = {
            show: function(){
                var item = $(this),
                    layer = item.closest('.popup-cont').find('.popup-layer');

                if (layer.is(':hidden')) {
                    var top = item.data('top-offset'),
                        right = item.data('right-offset');

                    if (top && top != '') {
                        layer.css({'top': top + 'px'});
                    }
                    if (right && right != '') {
                        layer.css({'right': right + 'px'});
                    }

                    layer.show();
                } else {
                    layer.hide();
                }

                return false;
            },
            hide: function(){
                $(this).closest('.popup-layer').hide();
            },
            hideAll: function(e){
                if($(e.target).parents('.popup-layer').length == 0) {
                    nodes.popups.hide();
                }
            },
            events: {
                set: function(){
                    nodes.body
                        .on('click', '.popup-btn', methods.show)
                        .on('click', '.popup-close', methods.hide);

                    nodes.document.on('click', methods.hideAll);
                }
            }
        };
    return {
        init: function(){
            nodes.popups = nodes.body.find('.popup-layer');

            methods.events.set();
        }
    }
}());
popups.init();