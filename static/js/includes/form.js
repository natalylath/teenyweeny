var form = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            active: function(){
                $(this)
                    .find('.btn_grey[type="submit"]')
                    .removeAttr('disabled')
                    .removeClass('btn_grey')
                    .addClass('btn_block');
            },
            events: {
                set: function(){
                    nodes.body.on('change, keyup', '.s-form', methods.active);
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