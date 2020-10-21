"use strict";

import Places from "../js/places.js";
import Restaurant_list from "../js/restaurant_list.js";

export default class Searching_part{

    restaurant_list = undefined;
    places = undefined;

    constructor() {
        this.restaurant_list = new Restaurant_list();
        this.places = new Places();
    }

    searching() {
        $("body").on('click', "#researchButton", function () {
            $(".displayRestaurants").empty();
            $(".mapPart, .listRestaurant").css("display", "block");
            $("#filter").css("display", "flex"); 
            $('html,body').animate({scrollTop: $("#listOfRestaurants").offset().top});  
        })
    }

    displayRestaurantsAround() { // Display restaurants from function that get restaurant around user position.

        $("body").on('click', "#geolocalisation", function() {
            $(".mapPart, .listRestaurant").css("display", "block"); 
            $("#filter").css("display", "flex"); 
            $('html,body').animate({scrollTop: $("#listOfRestaurants").offset().top});  
        })   
    }

    init() {
        this.searching();
        this.displayRestaurantsAround();
        this.places.getRestaurantsAround();
        this.restaurant_list.displayRestaurantsList();
    }
}