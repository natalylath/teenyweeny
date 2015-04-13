
var maps = (function(){
    var nodes = {
            body: $('body')
        },
        methods = {
            prepare: function(){
                if(nodes.body.find('#map_moscow').length != 0) {
                    methods.create.mapMoscow();
                }
                if(nodes.body.find('#map_regions').length != 0) {
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
                    var map = new ymaps.Map("map_regions", {
                        center: [55.753676, 37.619899],
                        zoom: 10,
                        controls: []
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
            }
        };
    return {
        init: function(){
            ymaps.ready(methods.prepare);
        }
    }
}());
maps.init();