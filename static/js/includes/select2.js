
var select2 = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            base: {
                init: function(){
                    nodes.body.find('.select2').select2({
                        minimumResultsForSearch: 20
                    });
                }
            },
            priceList: {
                init: function(){
                    nodes.body.find('.select2-complex').select2({
                        'width': 135,
                        formatResult: methods.priceList.format,
                        formatSelection: methods.priceList.format,
                        minimumResultsForSearch: 20
                    });
                },
                format: function(item){
                    var originalOption = $(item.element);
                    return '<span class="pr">' + item.text + '</span>' + '<span class="val">' + originalOption.data('volume') + '</span>';
                }
            },
            productColor: {
                init: function () {
                    nodes.body.find('.select2-color').select2({
                        'width': '100%',
                        formatResult: methods.productColor.format,
                        formatSelection: methods.productColor.format,
                        minimumResultsForSearch: 20
                    });
                },
                format: function (item) {
                    var originalOption = $(item.element);
                    return '<span class="color ' + originalOption.data('volume') + '"></span>' + item.text;
                }
            }
        };
    return {
        init: function(){
            methods.base.init();
            methods.priceList.init();
            methods.productColor.init();
        }
    }
}());
select2.init();