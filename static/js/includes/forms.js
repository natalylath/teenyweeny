
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

                $('[data-show="' + keyword + '"]').fadeIn(vars.speed);

                nodes.body
                    .find('.btn_grey[data-change="' + keyword + '"]')
                    .removeAttr('disabled')
                    .removeClass('btn_grey')
                    .addClass('btn_block');
            },
            password: {
                prepare: function(){
                    nodes.password = nodes.body.find('.s-password');
                    nodes.password.password();
                },
                show: function(){
                    var item = $(this),
                        password = nodes.password.filter('[data-password="' + item.data('password') + '"]'),
                        txt = password.password('val'),
                        cur = password.val();

                    password.password('toggle');

                    if (cur != '') {
                        password.password('val', txt);
                    } else {
                        password.password('val', cur);
                    }
                }
            },
            delivery: {
                prepare: function(){
                    nodes.deliveryTypeForm = nodes.body.find('.s-delivery-type-form');
                    nodes.deliveryAddressForm = nodes.body.find('.s-delivery-address-form');

                    if(nodes.deliveryAddressForm.length != 0) {
                        nodes.deliveryAddressFormName = nodes.deliveryAddressForm.find('.s-name');
                        nodes.deliveryAddressFormCity = nodes.deliveryAddressForm.find('.s-city');
                        nodes.deliveryAddressFormStation = nodes.deliveryAddressForm.find('.s-station');
                        nodes.deliveryAddressFormStreet = nodes.deliveryAddressForm.find('.s-street');
                        nodes.deliveryAddressFormHouse = nodes.deliveryAddressForm.find('.s-house');
                        nodes.deliveryAddressFormCorp = nodes.deliveryAddressForm.find('.s-corp');
                        nodes.deliveryAddressFormOffice = nodes.deliveryAddressForm.find('.s-office');
                        nodes.deliveryAddressFormAccess = nodes.deliveryAddressForm.find('.s-access');
                        nodes.deliveryAddressFormFloor = nodes.deliveryAddressForm.find('.s-floor');
                        nodes.deliveryAddressFormIntercom = nodes.deliveryAddressForm.find('.s-intercom');
                    }
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
                        parent = item.parents('.s-delivery-address-block');

                    nodes.body.find('.s-delivery-address-edit').show();
                    nodes.body.find('.s-delivery-address-str').show();

                    if(item.data('new')) {
                        $.each(nodes.deliveryAddressForm.find('input[type="text"]'), function(){
                            $(this).val('');
                        });

                        if(item.hasClass('btn')) {
                            nodes.deliveryAddressForm.hide()
                                .insertBefore(item.parent())
                                .fadeIn(vars.speed);
                        } else {
                            nodes.deliveryAddressForm.hide()
                                .insertAfter(parent)
                                .fadeIn(vars.speed);
                        }

                    } else {
                        nodes.deliveryAddressForm.hide();
                    }

                },
                addressEdit: function(e){
                    var item = $(this),
                        parent = item.parents('.s-delivery-address-block');

                    nodes.deliveryAddressFormName.val(parent.find('.s-name').text());
                    nodes.deliveryAddressFormCity.val(parent.find('.s-city').text());
                    nodes.deliveryAddressFormStation.val(parent.find('.s-station').text());
                    nodes.deliveryAddressFormStreet.val(parent.find('.s-street').text());
                    nodes.deliveryAddressFormHouse.val(parent.find('.s-house').text());
                    nodes.deliveryAddressFormCorp.val(parent.find('.s-corp').text());
                    nodes.deliveryAddressFormOffice.val(parent.find('.s-office').text());
                    nodes.deliveryAddressFormAccess.val(parent.find('.s-access').text());
                    nodes.deliveryAddressFormFloor.val(parent.find('.s-floor').text());
                    nodes.deliveryAddressFormIntercom.val(parent.find('.s-intercom').text());

                    nodes.body.find('.s-delivery-address-edit').show();
                    nodes.body.find('.s-delivery-address-str').show();

                    parent.find('.s-delivery-address-str').hide();

                    if(item.hasClass('btn')) {
                        nodes.deliveryAddressForm.hide()
                            .insertBefore(item.parent())
                            .fadeIn(vars.speed);
                    } else {
                        item.hide();

                        nodes.deliveryAddressForm.hide()
                            .insertAfter(parent)
                            .fadeIn(vars.speed);
                    }

                    e.preventDefault();
                }
            },
            depend: function(){
                var item = $(this);
                nodes.body.find('[data-dependent="' + item.data('depend') + '"]').prop('disabled', item.is(':checked'));
            },
            addFile: function(){
                nodes.body.find('.form_file_name').text($(this).val());
            },
            phoneMask: function(){
                nodes.body.find('.phone-mask').mask('+7 (000) 000-00-00');
            },
            datepicker: function(){
                $.datepicker.setDefaults($.datepicker.regional['ru']);

                nodes.body.find(".s-date").datepicker({
                    dateFormat: "dd/mm/yy"
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
                        .on('click', '.s-show-password', methods.password.show)
                        .on('change', '[type="file"]', methods.addFile);
                }
            }
        };
    return {
        init: function(){
            methods.delivery.prepare();
            methods.password.prepare();

            methods.phoneMask();
            methods.datepicker();

            methods.events.set();
        }
    }
}());
forms.init();
