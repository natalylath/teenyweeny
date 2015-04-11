var form = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            active: function(){
                var keyword = $(this).data('change');

                $('[data-show="' + keyword + '"]').fadeIn(150);

                nodes.body
                    .find('.btn_grey[data-change="' + keyword + '"]')
                    .removeAttr('disabled')
                    .removeClass('btn_grey')
                    .addClass('btn_block');
            },
            depend: function(){
                var item = $(this);
                nodes.body.find('[data-dependent="' + item.data('depend') + '"]').attr('disabled', item.is(':checked'));
            },
            addFile: function(){
                nodes.fileName.text($(this).val());
            },
            events: {
                set: function(){
                    nodes.body
                        .on('change', '.s-change', methods.active)
                        .on('keyup', '.s-change', methods.active)
                        .on('click', '.s-depend', methods.depend)
                        .on('change', '[type="file"]', methods.addFile);

                }
            }
        };
    return {
        init: function(){
            nodes.fileName = nodes.body.find('.form_file_name');

            methods.events.set();
        }
    }
}());

form.init();