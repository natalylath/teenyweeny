var filters = (function(){
    var methods = {
            toggle: function(){
                var item = $(this),
                    par = item.closest('.filter-block');

                par.toggleClass('opened');

                if (par.hasClass('opened')) {
                    item.find('.s-filter-open').hide();
                    item.find('.s-filter-close').show();

                    par.find('.s-filter-content').slideDown();
                } else {
                    item.find('.s-filter-open').show();
                    item.find('.s-filter-close').hide();

                    par.find('.s-filter-content').slideUp();
                }

                return false;
            },
            events: {
                set: function(){
                    $(document).on('click', '.s-filter', methods.toggle);
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
