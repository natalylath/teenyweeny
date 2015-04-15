
var fancybox = (function(){
    var vars = {
            delay: 200
        },
        nodes = {
            document: $(document),
            body: $('body')
        },
        methods = {
            base: {
                init: function(){
                    nodes.body.find('.fancybox').fancybox({
                        padding: 0,
                        fitToView: false,
                        tpl: {
                            closeBtn : '<a class="fancybox-item fancybox-close close2"></a>'
                        },
                        afterLoad: function(current) {
                            methods.base.afterLoad(current);
                        }
                    });
                },
                afterLoad: function(current){
                    if (current.element.hasClass('quick-view-btn')) {
                        setTimeout( function() {
                            if ($('.quickview-photo-cont .bx-arrow-right .bx-next').length < 1) {
                                methods.base.cardGalleryLayer();
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
                        nextSelector: '.quickview-photo-cont .bx-arrow-right',
                        prevSelector: '.quickview-photo-cont .bx-arrow-left'
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
                    nodes.document.on('click', '.fancy-close', methods.base.close)
                }
            }

        };
    return {
        init: function(){
            methods.base.init();
            methods.gallery.init();
        }
    }
}());
fancybox.init();