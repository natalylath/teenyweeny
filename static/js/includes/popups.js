
var popups = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            show: function(){
                var item = $(this),
                    layer = item.closest('.popup-cont').find('.popup-layer');

                item.toggleClass('opened');

                if (item.hasClass('opened')) {
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
                var item = $(this);

                item.closest('.popup-layer').hide();
                item.closest('.popup-cont').find('.popup-btn').removeClass('opened');
            },
            events: {
                set: function(){
                    nodes.body
                        .on('click', '.popup-btn', methods.show)
                        .on('click', '.popup-close', methods.hide);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());
popups.init();