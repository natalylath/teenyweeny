
var price = (function(){
    var vars = {},
        nodes = {
            body: $('body')
        },
        methods = {
            prepare: function(){
                vars.num = [];
                vars.one = [];
                vars.total = [];
                vars.promo = 0;
                vars.bonus = 0;

                nodes.one = nodes.price.find('.s-price-one');
                nodes.num = nodes.price.find('.s-price-num');
                nodes.total = nodes.price.find('.s-price-total');
                nodes.input = nodes.price.find('.s-price-input');
                nodes.dec = nodes.price.find('.s-price-dec');
                nodes.inc = nodes.price.find('.s-price-inc');
                nodes.select = nodes.price.find('.s-price-select');

                nodes.totalSum = nodes.body.find('.s-price-total-sum');
                nodes.promo = nodes.body.find('.s-price-promo');
                nodes.bonus = nodes.body.find('.s-price-bonus');
                nodes.final = nodes.body.find('.s-price-final');

                $.each(nodes.input, function(){
                    vars.num.push($(this).val());
                });

                $.each(nodes.one, function(){
                    vars.one.push($(this).text());
                });

                $.each(nodes.total, function(){
                    vars.total.push(parseInt($(this).text()));
                });

                if(nodes.promo.length != 0) {
                    vars.promo = parseInt(nodes.promo.text());
                }

                if(nodes.bonus.length != 0) {
                    vars.bonus = parseInt(nodes.promo.text());
                }
            },
            counter: {
                decrement: function(){
                    var index = nodes.dec.index(this);

                    if(vars.num[index] > 1) {
                        vars.num[index]--;
                    }

                    methods.update(index);
                },
                increment: function(){
                    var index = nodes.inc.index(this);

                    vars.num[index]++;

                    methods.update(index);
                },
                change: function(){
                    var index = nodes.input.index(this),
                        value = parseInt($(this).val());

                    if(isNaN(value) || value < 1) {
                        value = 1;
                    }

                    vars.num[index] = value;

                    methods.update(index);
                }
            },
            select: {
                change: function(){
                    var item = $(this),
                        index = nodes.price.index(item.parents('.s-price')),
                        value = parseInt(item.val());

                    vars.one[index] = value;
                    nodes.one.eq(index).text(value);

                    methods.update(index);
                }
            },
            update: function(index){
                var value = vars.num[index],
                    price = vars.one[index] * value;

                vars.total[index] = price;

                nodes.input.eq(index).val(value);
                nodes.num.eq(index).text(value);
                nodes.total.eq(index).text(price);

                if(nodes.final.length != 0) {
                    var priceSum = 0;

                    $.each(vars.total, function(){
                        priceSum += this;
                    });

                    nodes.totalSum.text(priceSum);
                    nodes.final.text(priceSum - vars.promo - vars.bonus);
                }
            },
            events: {
                set: function(){
                    nodes.dec.on('click', methods.counter.decrement);
                    nodes.inc.on('click', methods.counter.increment);
                    nodes.input.on('change', methods.counter.change);
                    nodes.select.on('change', methods.select.change);
                }
            }
        };
    return {
        init: function(){
            nodes.price = nodes.body.find('.s-price');

            if(nodes.price.length != 0) {
                methods.prepare();
            }

            methods.events.set();
        }
    }
}());
price.init();