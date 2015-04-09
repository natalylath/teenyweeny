ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map_moscow", {
        center: [55.76, 37.64],
        zoom: 15
    });

    myPlacemark = new ymaps.Placemark([55.76, 37.64], {
        balloonContent: 'Столица России'
    });

    myMap.geoObjects.add(myPlacemark);
}