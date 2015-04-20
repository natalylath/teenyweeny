
var card = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            price: {
                prepare: function(){
                    nodes.countInput = nodes.body.find('.card-count-input');
                    nodes.totalValue = nodes.body.find('.total-value');
                    nodes.counterValue = nodes.body.find('.counter-value');
                    nodes.cardTotal = nodes.body.find('.card-total');
                },
                increment: function(){
                    var current = parseInt(nodes.countInput.val());

                    nodes.countInput.val(current + 1);

                    methods.price.updateTotalPrice();
                },
                decrement: function(){
                    var current = parseInt(nodes.countInput.val());

                    if (current < 2) return;
                    nodes.countInput.val(current - 1);

                    methods.price.updateTotalPrice();
                },
                change: function(){
                    var current  = parseInt(nodes.countInput.val());

                    if (nodes.countInput.val() == '' || current < 2) {
                        nodes.countInput.val('1');
                    }

                    methods.price.updateTotalPrice();
                },
                keydown: function(e){
                    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
                        return;
                    }
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                },
                updateTotalPrice: function(){
                    var actual = parseInt(nodes.priceActual.val());

                    nodes.totalValue.text(actual * nodes.countInput.val());
                    nodes.counterValue.text(nodes.countInput.val());
                    nodes.cardTotal.show();
                }
            },
            recom: function(){
                nodes.body.find('.recom').removeClass('active');
                $(this).addClass('active');
            },
            size: function(){
                nodes.body.find('.size-item').removeClass('selected');
                $(this).addClass('selected');
            },
            color: function(){
                nodes.body.find('.color-item').removeClass('selected');
                $(this).addClass('selected');
            },
            complex: function(){
                nodes.body.find('.card-complex-item').removeClass('selected');
                $(this).addClass('selected');
            },
            favorite: function(){
                nodes.body.find('.fav-list-item').removeClass('selected');
                $(this).addClass('selected');
            },
            rate: function(){
                nodes.rateit.rateit();
            },
            events: {
                set: function(){
                    nodes.body
                        //.on('click', '.count-inc', methods.price.increment)
                        //.on('click', '.count-dec', methods.price.decrement)
                        //.on('change', '.card-count-input', methods.price.change)
                        //.on('keydown', '.card-count-input', methods.price.keydown)
                        .on('click','.recom', methods.recom)
                        .on('click','.size-item', methods.size)
                        .on('click','.color-item', methods.color)
                        .on('click','.card-complex-item', methods.complex)
                        .on('click','.fav-list-item', methods.favorite);
                }
            }
        };
    return {
        init: function(){
            nodes.priceActual = nodes.body.find('.prod-price-actual');

            if(nodes.priceActual.length != 0) {
                //methods.price.prepare();
            }

            nodes.rateit = nodes.body.find('.rateit');

            if(nodes.rateit.length != 0) {
                methods.rate();
            }

            methods.events.set();
        }
    }
}());
card.init();