
var autocomplete = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            show: function(){
                $(this).closest('.autocomplete-cont').find('.autocomplete').show();
            },
            hide: function(){
                var item = $(this);

                setTimeout(function(){
                    item.closest('.autocomplete-cont').find('.autocomplete').hide();
                },100);
            },
            insert: function(){
                var item = $(this),
                    value = item.text(),
                    tags = item.closest('.popup-layer').find('.tags');

                if(tags.length != 0) {
                    tags.html('<div class="tag">' + value + '<span class="tag-remove"></span></div>');
                }

                item.closest('.autocomplete').hide();
                item.closest('.autocomplete-cont').find('.autocomplete-input').val(value);
            },
            submit: function(){
                /* add ajax for loading content of specified breed! */
                var item = $(this);
                if (!item.hasClass('link')) {
                    item.closest('.popup-layer').hide();
                    item.closest('.popup-cont').find('.popup-btn').removeClass('opened');
                    $('.breed-btn').addClass('active').text(item.closest('.popup-cont').find('.tag-input').val());
                    e.preventDefault();
                }
            },
            events: {
                set: function(){
                    nodes.body
                        .on('focus', '.autocomplete-input', methods.show)
                        .on('blur', '.autocomplete-input', methods.hide)
                        .on('click', '.autocomplete-line', methods.insert)
                        .on('click', '.autocomplete-submit', methods.submit);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());
autocomplete.init();