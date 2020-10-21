"use strict";

import Maps from "../js/maps.js";
import Restaurant_list from "../js/restaurant_list.js";
import Restaurant_infos from "../js/restaurant_infos.js";
import Restaurant_opinions from "../js/restaurant_opinions.js";
import Searching_part from "../js/searchingPart.js"; // CamelCase
import Store from "../js/store.js";

export default class Page {

    maps = undefined;
    searching_part = undefined;
    restaurant_list = undefined; //CamelCase
    restaurant_infos = undefined;
    restaurant_opinion = undefined;


    constructor() {
        this.maps = new Maps();   
        this.searching_part = new Searching_part();
        this.restaurant_infos = new Restaurant_infos();
        this.restaurant_opinion = new Restaurant_opinions();
        this.restaurant_list = new Restaurant_list();
    }

    activateGeolocalisation() { // Activate the geolocalisation on page.

        $(document).ready(function() {
            infoWindow = new google.maps.InfoWindow();
  
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                position => {
                Store.pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
                  map.setCenter(Store.pos);
                  new google.maps.Marker({
                    position: Store.pos,
                    map,
                    title: "Vous êtes ici !"
                  });
                }
              )}
        })
    }

    init() { 
        // Run Jquery method from the searching part of the page.
        this.activateGeolocalisation();
        this.maps.initMap();
        this.searching_part.init();

        //Run Jquery method from the RestaurantList part of the page.

        this.restaurant_list.init();
        // Run Jquery method from the RestaurantInfos  part of the page.
        this.restaurant_infos.displayRestaurantsInfos();

        // Run Jquery method for the Opinion part of the page.
        this.restaurant_opinion.init();
    }
}

