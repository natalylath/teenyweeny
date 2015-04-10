var filters = (function(){
    var methods = {
            toggle: function(){
                var item = $(this),
                    par = item.closest('.filter-block');

                par.toggleClass('opened');

                if (par.hasClass('opened')) {
                    if (item.hasClass('special-title')) {
                        par.find('.subcontent').slideDown();
                    } else {
                        par.find('.filter-content').slideDown();
                    }
                } else {
                    if (item.hasClass('special-title')) {
                        par.find('.subcontent').slideUp();
                    } else {
                        par.find('.filter-content').slideUp();
                    }
                }
            },
            events: {
                set: function(){
                    $(document).on('click', '.filter-title, .filter-help-title, special-title', methods.toggle);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());

filters.init();
