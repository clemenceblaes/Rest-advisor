"use strict";

// Import the file we need.
import Store from "../js/store.js"; 

// This class is for the filter function of the page.
export default class Filter {

    constructor(maps) {
        this.filterByStars(maps);
    }
    
    filterByStars(maps) { //Function that let user filter results by average.

        $(document).ready(function() {
            $(".filterStar").on('click', {maps}, function(event) {
                let filterChoice = $(this).attr("id"); // Take the number of stars user wants.
                    
                $(".restaurantName").css("display", "none"); // Stop display all restaurants.

                //Filter the restaurant table to find restaurants with the number of stars.
                let filterRestaurant = Store.restaurants.filter(element => {
                    return element.average >= Number(filterChoice) && element.average < Number(filterChoice) + 1;
                })

                filterRestaurant.forEach(element => {
                    $("#rest" + element.id).css("display", "block"); // Display restaurants found on script over.       
                }) 
                Store.actualisationRestaurants = filterRestaurant; // Set these restaurants in active table.
                let maps = event.data.maps;
                maps.clearOverlays(); // Clear the map.
                maps.displayMarkers(); //Display markers.
            })

            
            $("#cancelFilter").on('click', {maps}, function(event) {
                $(".restaurantName").css("display", "block"); // Display all restaurants
                $(".mapPart, .listRestaurant").css("display", "block");
                Store.actualisationRestaurants = Store.restaurants; // Reset active's table from restaurant's table.
                let maps = event.data.maps;
                maps.clearOverlays(); //Clear the map
                maps.displayMarkers(); // Display markers.
            })
        });
    }

}
