var maps = (function(){
    var nodes = {},
        methods = {
            prepare: function(){
                if($('#map_moscow').length != 0) {
                    methods.create.mapMoscow();
                }
                if($('#map_region').length != 0) {
                    methods.create.mapRegion();
                }
            },
            create: {
                mapMoscow: function(){
                    var map = new ymaps.Map("map_moscow", {
                        center: [55.758497, 37.660291],
                        zoom: 15,
                        controls: []
                    });

                    var placemark = new ymaps.Placemark([55.758497, 37.660291], {},{
                        preset: 'islands#dotIcon'
                    });

                    map.geoObjects.add(placemark);
                },
                mapRegion: function(){
                    var map = new ymaps.Map("map_region", {
                        center: [55.753676, 37.619899],
                        zoom: 10,
                        controls: ['zoomControl']
                    },{
                        minZoom: 9,
                        maxZoom: 10
                    });

                    var tileUrlTemplate = 'static/images/map/%z/x=%x&y=%y',
                        keyTemplate = 'callback_tile_%c',
                        imgUrlTemplate = 'static/images/map/%z/x=%x&y=%y.png',
                        objSource = new ymaps.hotspot.ObjectSource(tileUrlTemplate, keyTemplate),
                        imgLayer = new ymaps.Layer(imgUrlTemplate, {tileTransparent: true}),
                        hotspotLayer = new ymaps.hotspot.Layer(objSource, {cursor: 'help'});

                    map.layers.add(hotspotLayer);
                    map.layers.add(imgLayer);
                }
            },
            events: {
                set: function(){
                    nodes.body.on('click', '.s-scroll', methods.scrollTo);
                }
            }
        };
    return {
        init: function(){
            ymaps.ready(methods.prepare);
        }
    }
}());

maps.init();