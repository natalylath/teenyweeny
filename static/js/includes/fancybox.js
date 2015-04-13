
var fancybox = (function(){
    var vars = {
            delay: 200
        },
        nodes = {
            document: $(document),
            body: $('body')
        },
        methods = {
            default: {
                init: function(){
                    nodes.body.find('.fancybox').fancybox({
                        padding: 0,
                        fitToView: false,
                        tpl: {
                            closeBtn : '<a class="fancybox-item fancybox-close close2"></a>'
                        },
                        afterLoad: function(current) {
                            methods.default.afterLoad(current);
                        }
                    });
                },
                afterLoad: function(current){
                    if (current.element.hasClass('quick-view-btn')) {
                        setTimeout( function() {
                            if ($('.bxslider-photo-border .bx-arrow-right .bx-next').length < 1) {
                                methods.default.cardGalleryLayer();
                            }
                        }, vars.delay);
                    }
                },
                cardGalleryLayer: function(){
                    nodes.body.find('.no-zoom').bxSlider({
                        pager: true,
                        minSlides: 1,
                        maxSlides: 1,
                        slideWidth: 378,
                        nextText: '',
                        prevText: '',
                        mode: 'fade',
                        nextSelector: '.bxslider-photo-border .bx-arrow-right',
                        prevSelector: '.bxslider-photo-border .bx-arrow-left'
                    });
                },
                close: function(e){
                    $.fancybox.close();
                    e.preventDefault();
                }
            },
            gallery: {
                init: function(){
                    nodes.body.find('.fancybox-gal').fancybox({
                        padding: 0,
                        fitToView: true,
                        nextEffect: 'none',
                        prevEffect: 'none',
                        tpl: {
                            closeBtn : '<a class="fancybox-item fancybox-close close2"></a>'
                        }
                    });
                }
            },
            events: {
                set: function(){
                    nodes.document.on('click', '.fancy-close', methods.default.close)
                }
            }

        };
    return {
        init: function(){
            methods.default.init();
            methods.gallery.init();
        }
    }
}());
fancybox.init();