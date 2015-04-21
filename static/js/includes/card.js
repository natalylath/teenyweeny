
var card = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            size: function(){
                nodes.body.find('.size-item').removeClass('selected');
                $(this).addClass('selected');
            },
            color: function(){
                nodes.body.find('.color-item').removeClass('selected');
                $(this).addClass('selected');
            },
            rate: function(){
                nodes.rateit.rateit();
            },
            recommend: function(){
                nodes.body.find('.recom').removeClass('active');
                $(this).addClass('active');
            },
            favorite: function(){
                nodes.body.find('.fav-list-item').removeClass('selected');
                $(this).addClass('selected');
            },
            events: {
                set: function(){
                    nodes.body
                        .on('click','.size-item', methods.size)
                        .on('click','.color-item', methods.color)
                        .on('click','.recom', methods.recommend)
                        .on('click','.fav-list-item', methods.favorite);
                }
            }
        };
    return {
        init: function(){
            nodes.rateit = nodes.body.find('.rateit');

            if(nodes.rateit.length != 0) {
                methods.rate();
            }

            methods.events.set();
        }
    }
}());
card.init();