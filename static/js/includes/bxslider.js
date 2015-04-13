
var bxSlider = (function(){
    var vars = {},
        nodes = {
            body: $('body')
        },
        methods = {
            base: {
                init: function(){
                    nodes.body.find('.bxslider').bxSlider({
                        pager: false,
                        nextSelector: '.quick-variant .bx-arrow-right',
                        prevSelector: '.quick-variant .bx-arrow-left',
                        nextText: '',
                        prevText: '',
                        slideWidth: 106,
                        minSlides: 6,
                        maxSlides: 6
                    });
                }
            },
            photo: {
                init: function(){
                    nodes.body.find('.bxslider-photo').not('.no-zoom').bxSlider({
                        pagerCustom: '#bxpager',
                        minSlides: 1,
                        maxSlides: 1,
                        slideWidth: 378,
                        nextText: '',
                        prevText: '',
                        mode: 'fade',
                        nextSelector: '.bxslider-photo-border .bx-arrow-right',
                        prevSelector: '.bxslider-photo-border .bx-arrow-left',
                        onSliderLoad: function (currentIndex) {
                            methods.photo.onSliderLoad(currentIndex);

                        },
                        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                            methods.photo.onSlideAfter($slideElement, oldIndex, newIndex);
                        }
                    });
                },
                onSliderLoad: function(currentIndex){
                    nodes.body.find('.bxslider-photo .photo-slide').eq(currentIndex).addClass('active');

                    nodes.body.find('.bxslider-photo .photo-slide').eq(currentIndex).find('img').elevateZoom({
                        zoomWindowWidth: 520,
                        zoomWindowHeight: 330
                    });
                },
                onSlideAfter: function($slideElement, oldIndex, newIndex){
                    nodes.body.find('.bxslider-photo .photo-slide').removeClass('active');
                    $slideElement.addClass('active');

                    $slideElement.find('img').elevateZoom({
                        zoomWindowWidth: 520,
                        zoomWindowHeight: 330
                    });

                    $('.bxpager').removeClass('active');
                    var el = $('.bxpager'+'.'+'b'+ newIndex).not('.bx-clone');
                    el.addClass('active');
                }
            },
            pager: {
                init: function(){
                    nodes.body.find('#bxpager').not('.in-layer').bxSlider({
                        minSlides: 4,
                        maxSlides: 4,
                        moveSlides: 1,
                        slideWidth: 70,
                        pager: false,
                        slideMargin: 5,
                        nextText: '',
                        prevText: '',
                        nextSelector: '.bxpager-cont .bx-arrow-right',
                        prevSelector: '.bxpager-cont .bx-arrow-left',
                        onSliderLoad: function (currentIndex) {
                            methods.pager.onSliderLoad();
                        }
                    });
                },
                onSliderLoad: function(){
                    nodes.body.find('#bxpager .bxpager').eq(0).addClass('active');
                },
                click: function(){
                    var item = $(this);

                    if (item.hasClass('video-pager')) return;

                    nodes.body.find('.bxpager').removeClass('active');
                    item.addClass('active');
                }
            },
            gallery: {
                prepare:function(){
                    nodes.bxgallery = nodes.body.find('.bxgallery');

                    if(nodes.bxgallery.length != 0) {
                        vars.total = nodes.bxgallery.find('.slide').length;
                        vars.mult = 4;

                        if (vars.total != 1) {
                            nodes.body.find('.bxgallery-cont .bx-arrow-left').css('visibility', 'visible');
                            nodes.body.find('.bxgallery-cont .bx-arrow-right').css('visibility', 'visible');
                            nodes.body.find('.bxgallery-counter').css('visibility', 'visible');

                            methods.gallery.init();
                        }
                    }
                },
                init: function(){
                    nodes.bxgallery.bxSlider({
                        minSlides: 1,
                        maxSlides: 1,
                        slideWidth: 900,
                        pager: false,
                        slideMargin: 0,
                        nextText: '',
                        prevText: '',
                        nextSelector: '.bxgallery-cont .bx-arrow-right',
                        prevSelector: '.bxgallery-cont .bx-arrow-left',
                        onSliderLoad: function (currentIndex) {
                            methods.gallery.onSliderLoad();
                        },
                        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
                            methods.gallery.onSlideBefore($slideElement, oldIndex, newIndex);
                        }
                    });
                },
                onSliderLoad: function(){
                    nodes.body.find('.bxgallery-total').text(vars.total * vars.mult);
                },
                onSlideBefore: function($slideElement, oldIndex, newIndex){
                    $('.bxgallery-cur').text(newIndex * vars.mult + 1);
                    $('.bxgallery-cur2').text((newIndex+1) * vars.mult);
                }
            }
        },
        events = {
            set: function(){
                nodes.body
                    .on('click','.video-pager', function(e) {
                        e.stopImmediatePropagation();
                    })
                    .on('click','.bxpager', methods.bxpager.click);
            }
        };
    return {
        init: function(){
            methods.base.init();
            methods.photo.init();
            methods.pager.init();
            methods.gallery.prepare();
        }
    }
}());
bxSlider.init();