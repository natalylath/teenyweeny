var forms = (function(){
    var vars= {
            speed: 150
        },
        nodes = {
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
            delivery: {
                prepare: function(){
                    nodes.deliveryAddressFormStreet = nodes.deliveryAddressForm.find('#street');
                    nodes.deliveryAddressFormHouse = nodes.deliveryAddressForm.find('#house');
                    nodes.deliveryAddressFormCorp = nodes.deliveryAddressForm.find('#corp');
                    nodes.deliveryAddressFormOffice = nodes.deliveryAddressForm.find('#office');
                },
                type: function(){
                    var item = $(this);
                    if(!item.hasClass('current')) {
                        nodes.body.find('.form_substrate.current')
                            .removeClass('current')
                            .removeClass('corner');

                        nodes.deliveryTypeForm.hide();

                        item.addClass('current');

                        if(item.data('form')) {
                            item.addClass('corner');
                            nodes.deliveryTypeForm.fadeIn(vars.speed);
                        }
                    }
                },
                address: function(){
                    var item = $(this),
                        parent = item.parent();

                    nodes.body.find('.s-delivery-address-edit').show();
                    nodes.body.find('.s-delivery-address-str').show();

                    if(item.data('new')) {
                        $.each(nodes.deliveryAddressForm.find('input[type="text"]'), function(){
                            $(this).val('');
                        });

                        nodes.deliveryAddressForm
                            .insertAfter(parent)
                            .fadeIn(vars.speed);
                    } else {
                        nodes.deliveryAddressForm.hide();
                    }

                },
                addressEdit: function(e){
                    var item = $(this),
                        parent = item.parent();

                    nodes.body.find('.s-delivery-address-edit').show();
                    nodes.body.find('.s-delivery-address-str').show();

                    item.hide();
                    parent.find('.s-delivery-address-str').hide();

                    nodes.deliveryAddressFormStreet.val(parent.find('.street').text());
                    nodes.deliveryAddressFormHouse.val(parent.find('.house').text());
                    nodes.deliveryAddressFormCorp.val(parent.find('.corp').text());
                    nodes.deliveryAddressFormOffice.val(parent.find('.office').text());

                    nodes.deliveryAddressForm
                        .insertAfter(parent)
                        .fadeIn(vars.speed);

                    e.preventDefault();
                }
            },
            depend: function(){
                var item = $(this);
                nodes.body.find('[data-dependent="' + item.data('depend') + '"]').attr('disabled', item.is(':checked'));
            },
            addFile: function(){
                nodes.fileName.text($(this).val());
            },
            phoneMask: function(){
                nodes.body.find('.phone-mask').mask('+7 (000) 000-00-00');
            },
            datepicker: function(){
                nodes.body.find("#date").datepicker();
            },
            password: function(){
                nodes.password = nodes.body.find('#password');
                nodes.showPassword = nodes.body.find('#show_pass');

                nodes.password.password()
                    .on('show.bs.password',function (e) {
                        nodes.showPassword.prop('checked', true);
                    })
                    .on('hide.bs.password', function (e) {
                        nodes.showPassword.prop('checked', false);

                        nodes.showPassword.click(function () {
                            console.log(6);
                            var txt = nodes.password.password('val'),
                                cur = nodes.password.val();

                            nodes.password.password('toggle');

                            if (cur != '') {
                                nodes.password.password('val', txt);
                            }
                        });
                    });

                nodes.password1 = nodes.body.find('#password1');
                nodes.showPassword1 = nodes.body.find('#show_pass1');

                nodes.password1.password()
                    .on('show.bs.password',function (e) {
                        nodes.showPassword1.prop('checked', true);
                        })
                    .on('hide.bs.password', function (e) {
                        nodes.showPassword1.prop('checked', false);
                    });

                nodes.password1.click(function () {
                    var txt = nodes.password1.password('val'),
                        cur = nodes.password1.val();

                    nodes.password1.password('toggle');

                    if (cur != '') {
                        nodes.password1.password('val', txt);
                    }
                });
            },
            events: {
                set: function(){
                    nodes.body
                        .on('change', '.s-change', methods.active)
                        .on('keyup', '.s-change', methods.active)
                        .on('click', '.s-delivery-type', methods.delivery.type)
                        .on('click', '.s-delivery-address', methods.delivery.address)
                        .on('click', '.s-delivery-address-edit', methods.delivery.addressEdit)
                        .on('click', '.s-depend', methods.depend)
                        .on('change', '[type="file"]', methods.addFile);

                }
            }
        };
    return {
        init: function(){
            nodes.deliveryTypeForm = nodes.body.find('.s-delivery-type-form');

            nodes.deliveryAddressForm = nodes.body.find('.s-delivery-address-form');

            if(nodes.deliveryAddressForm.length != 0) {
                methods.delivery.prepare();
            }

            nodes.fileName = nodes.body.find('.form_file_name');

            methods.phoneMask();
            //methods.password();
            methods.datepicker();

            methods.events.set();
        }
    }
}());

forms.init();


