var tabs = (function(){
    var vars = {
            speed: 150
        },
        nodes = {
            body: $('body')
        },
        methods = {
            switch: function(){
                var item = $(this),
                    index = item.index(),
                    data = item.parent().data('tabs');

                nodes.tabs.filter('[data-tabs="' + data + '"]').find('li').eq(index).addClass('selected').siblings().removeClass('selected');
                nodes.tabsBoxes.filter('[data-tabs="' + data + '"]').find('.tab-box').eq(index).fadeIn(vars.speed).siblings('.tab-box').hide();

                if(nodes.tabsRelated.length != 0) {
                    nodes.tabsRelated.filter('[data-tabs="' + data + '"]').find('li').eq(index).addClass('selected').siblings().removeClass('selected');
                }
            },
            events: {
                set: function(){
                    nodes.tabs.on('click', 'li:not(.selected)', methods.switch);

                    if(nodes.tabsRelated.length != 0) {
                        nodes.tabsRelated.on('click', 'li:not(.selected)', methods.switch);
                    }
                }
            }
        };
    return {
        init: function(){
            nodes.tabs = nodes.body.find('.s-tabs');
            nodes.tabsRelated = nodes.body.find('.s-tabs-related');
            nodes.tabsBoxes = nodes.body.find('.s-tabs-boxes');

            methods.events.set();
        }
    }
}());

tabs.init();