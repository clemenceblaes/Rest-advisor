"use strict";

//Import the files needed.
import Store from "../js/store.js";
import Restaurant_list from "../js/restaurant_list.js";
import Research from "../js/research.js";
 
export default class Searching_part{ //Class that store scrips used in the Searching part on page.

    restaurant_list = undefined;
    places = undefined;
    research = undefined;
    maps = undefined;

    constructor(maps, places) {
        this.maps = maps;
        this.places = places;
        this.restaurant_list = new Restaurant_list(this.places, maps);
        this.research = new Research(maps, places);
    }

    searching() { //jQuery used for research without geolocalisation.

        const research = this.research;

        //Display restaurant's list, filter options, and scroll to them.
        $("body").on('click', "#researchButton", function () {
            Store.restaurants.length = 0;
            $(".displayRestaurants").empty();
            $(".mapPart, .listRestaurant").css("display", "block");
            $("#filter").css("display", "flex"); 
            $('html,body').animate({scrollTop: $("#listOfRestaurants").offset().top});  
                research.research();
        })
    }

    displayRestaurantsAround(callback) { // Display restaurants from function that get restaurant around user position. 
      //Display restaurant's list, filter options, and scroll to them.
        $("body").on('click', "#geolocalisation", function() {
            $(".mapPart, .listRestaurant").css("display", "block"); 
            $("#filter").css("display", "flex"); 
            $('html,body').animate({scrollTop: $("#listOfRestaurants").offset().top});  
            callback();  
        }) 
    }

    init() { //Method that init all scripts used on Searching part from page.

        this.searching();
        this.places.getRestaurantsAround(() => {
            this.displayRestaurantsAround(() => {
                this.restaurant_list.displayRestaurantsList(() => {
                    this.maps.clearOverlays();
                    this.maps.displayMarkers();
                });
            });
        });
    }
}
