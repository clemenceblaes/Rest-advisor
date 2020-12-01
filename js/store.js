"use strict";

export default class Store { // Class that store all global variables.
    static pos; //The GPS position.
    static restaurants = []; // The main table of restaurants.
    static restaurantPlaceID; // The place_id of a selected restaurant.
    static actualisationRestaurants; // The active table of restaurants.
    static markersArray = []; // Table of markers.
}
