
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

                nodes.choice = nodes.price.find('.s-price-choice');
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
                    var item = $(this),
                        chart = true;

                    if(item.parent().hasClass('s-price-block')) {
                        chart = false;
                    }
                    vars.total.push({
                        value: parseInt(item.text()),
                        chart: chart
                    });
                });

                if(nodes.choice.length != 0) {
                    methods.events.choice();
                }

                if(nodes.select.length != 0) {
                    methods.events.select();
                }

                if(nodes.promo.length != 0) {
                    vars.promo = parseInt(nodes.promo.text());
                }

                if(nodes.bonus.length != 0) {
                    vars.bonus = parseInt(nodes.bonus.text());
                    vars.bonusMax = parseInt(nodes.body.find('.s-price-bonus-max').text());
                    nodes.bonusInput = nodes.body.find('.s-price-bonus-input');
                    nodes.bonusButton = nodes.body.find('.s-price-bonus-button');

                    methods.events.bonus();
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
            choice: {
                click: function(){
                    var item = $(this),
                        index = nodes.price.index(item.parents('.s-price')),
                        value = parseInt(item.find('.card-complex-price').text());

                    vars.one[index] = value;
                    nodes.one.eq(index).text(value);

                    nodes.body.find('.s-price-choice').removeClass('selected');
                    item.addClass('selected');

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
            bonus: {
                change: function(){
                    var item = $(this),
                        value = parseInt(item.val());

                    if(isNaN(value) || value < 1) {
                        vars.bonus = 0;
                        item.val('');
                    } else if(value > vars.bonusMax) {
                        vars.bonus = vars.bonusMax;
                        item.val(vars.bonusMax);
                    } else {
                        vars.bonus = value;
                        item.val(value);
                    }
                },
                update: function(){
                    nodes.bonus.text(vars.bonus);
                    nodes.final.text(parseInt(nodes.totalSum.text()) - vars.promo - vars.bonus);
                    return false;
                }
            },
            update: function(index){
                var value = vars.num[index],
                    price = vars.one[index] * value,
                    block =  nodes.price.eq(index).find('.s-price-block');

                vars.total[index].value = price;

                nodes.input.eq(index).val(value);
                nodes.num.eq(index).text(value);
                nodes.total.eq(index).text(price);


                if(block.length != 0 && block.is(':hidden')) {
                    block.fadeIn();
                }

                if(nodes.final.length != 0) {
                    var totalSum = 0;

                    $.each(vars.total, function(){
                        if(this.chart) {
                            totalSum += this.value;
                        }
                    });

                    if(nodes.totalSum.length != 0) {
                        nodes.totalSum.text(totalSum);
                    }

                    nodes.final.text(totalSum - vars.promo - vars.bonus);
                }
            },
            events: {
                set: function(){
                    nodes.dec.on('click', methods.counter.decrement);
                    nodes.inc.on('click', methods.counter.increment);
                    nodes.input.on('change', methods.counter.change);
                },
                choice: function(){
                    nodes.choice.on('click', methods.choice.click);
                },
                select: function(){
                    nodes.select.on('change', methods.select.change);
                },
                bonus: function(){
                    nodes.bonusInput.on('change', methods.bonus.change);
                    nodes.bonusButton.on('click', methods.bonus.update);
                }
            }
        };
    return {
        init: function(){
            nodes.price = nodes.body.find('.s-price');

            if(nodes.price.length != 0) {
                methods.prepare();
                methods.events.set();
            }
        }
    }
}());
price.init();