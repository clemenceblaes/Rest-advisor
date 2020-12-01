"use strict";

//Import the files needed.
import Maps from "../js/maps.js";
import Restaurant_list from "../js/restaurant_list.js";
import Restaurant_opinions from "../js/restaurant_opinions.js";
import Searching_part from "../js/searchingPart.js"; // CamelCase
import Filter from "../js/filter.js";
import Places from "./places.js";


export default class Page { //This is the class that init the main page.

    maps = undefined;
    searching_part = undefined;
    restaurant_list = undefined; //CamelCase
    restaurant_infos = undefined;
    restaurant_opinion = undefined;
    filter = undefined;
    places = undefined;


    constructor() {
        this.maps = new Maps();  
        this.places = new Places(this.maps); 
        this.searching_part = new Searching_part(this.maps, this.places);
        this.restaurant_opinion = new Restaurant_opinions(this.places);
        this.restaurant_list = new Restaurant_list(this.places);
        this.filter = new Filter(this.maps);
    }

    onReady() { 
        // Run Jquery method from the searching part of the page.
          this.maps.initMap(); // Initialize the map
          this.maps.activateGeolocalisation(() => { //Activate geolocalisation
            this.searching_part.init();
          });
        //Run Jquery method from the RestaurantList part of the page.
        this.restaurant_list.init();

        // Run Jquery method for the Opinion part of the page.
        this.restaurant_opinion.init();
    }

    init() {
      const boundOnReady = this.onReady.bind(this); //Save the value of this for the function OnReady.
      $(document).ready(boundOnReady); //Run OnReady function.
    }
}

