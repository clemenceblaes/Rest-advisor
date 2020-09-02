class Geolocalisation {
    
    static displayMarkers() {

        $.getJSON("../json/restaurants.json", (json) => {

            var icon = {
                url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
                scaledSize: new google.maps.Size(50, 50),
            };

            json.existingRestaurants.forEach(restaurant => {
                let restPosition = new google.maps.LatLng(restaurant.lat, restaurant.long);
                let restMarker = new google.maps.Marker({
                icon: icon,
                position: restPosition,
                map: map,
                title: restaurant.restaurantName
                })
            })
        })
    }
}