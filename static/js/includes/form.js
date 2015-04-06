var form = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            active: function(){
                nodes.body
                    .find('.btn_grey[data-change="' + $(this).data('change') + '"]')
                    .removeAttr('disabled')
                    .removeClass('btn_grey')
                    .addClass('btn_block');
            },
            events: {
                set: function(){
                    nodes.body.on('change, keyup', '.s-change', methods.active);
                }
            }
        };
    return {
        init: function(){
            methods.events.set();
        }
    }
}());

form.init();