function filterByStars() {

    $(document).ready(function() {
        $(".filterStar").click(function() {
            let filterChoice = $(this).attr("id");

            console.log(filterChoice);
                
            $(".restaurantName").css("display", "none");
            let filterRestaurant = Store.restaurants.filter(element => {
                return element.average >= Number(filterChoice) && element.average < Number(filterChoice) + 1;
            })
            console.log(filterRestaurant);

            filterRestaurant.forEach(element => {
                $("#rest" + element.id).css("display", "block");           
            }) 
            Store.actualisationRestaurants = filterRestaurant;
            Markers.clearOverlays();
            Markers.displayMarkers();
        })
    });

    $(document).ready(function() {
        $("#cancelFilter").click(function() {
            $(".restaurantName").css("display", "block");
            $(".mapPart, .listRestaurant").css("display", "block");
            Store.actualisationRestaurants = Store.restaurants;
            Markers.clearOverlays();
            Markers.displayMarkers();
        })
    });
}

filterByStars();