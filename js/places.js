"use strict";

//Import the files we needed.
import Store from "../js/store.js";
import Restaurant from "../js/restaurants.js";
import Restaurant_opinions from "./restaurant_opinions.js";
import Restaurant_list from "../js/restaurant_list.js";
import Maps from "../js/maps.js";



export default class Places { // Class used for each scripts from Google Places API.

    restaurant = undefined;
    restaurant_opinions = undefined;
    restaurant_list = undefined;

    constructor(maps, restaurant_opinions) {
        this.maps = maps
        this.restaurant = new Restaurant();
        this.restaurant_opinions = restaurant_opinions;
        this.restaurant_list = new Restaurant_list(this);
    }


    // Method that ask Places API for Restaurants around user position and store its on main table
    getRestaurantsAround(display) {

        const map = this.maps;

        let requestURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + Store.pos.lat + "," +
            Store.pos.lng + "&radius=2500&type=restaurant&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs&callback=?"; // Request API

        var request = new XMLHttpRequest(); // New request API
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            var jsonRestaurants = request.response;
            Restaurant.addToTableGeo(jsonRestaurants); // Add to main table
            display(); // Display them on the list on page.
        }
    }

    getRestaurantFromName(name) { // Method that get Restaurants from API with Name

        const rest = this.restaurant_list;
        const map = this.maps;

        let requestRestaurant;
        requestRestaurant = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + name +
            "&inputtype=textquery&fields=photos,formatted_address,name,rating,user_ratings_total,geometry,place_id&locationbias=circle:50000@" + Store.pos.lat + "," +
            Store.pos.lng + "&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs";

        var request = new XMLHttpRequest(); // New request API
        request.open('GET', requestRestaurant);
        request.responseType = 'json';
        request.send();

        request.onload = function () {

            const getPlaces = new Promise((resolve, reject) => { // Create a promise
                var jsonRestaurants = request.response;
                Restaurant.addToTableManualName(jsonRestaurants); // Add to main table
                resolve();

                if (jsonRestaurants == undefined) {
                    reject();
                }
            })

            getPlaces.then(() => { // When restaurants are added to main table, we display the list, and markers.
                rest.displayRestaurantsList(() => {
                    Store.actualisationRestaurants = Store.restaurants; // Synchronize Active table with Main Table
                    map.clearOverlays();
                    map.displayMarkers();
                });
            })
        }
    }

    getRestaurantFromAdress(adress) { // Method that get Restaurants from API with Adress

        let requestRestaurant;
        const rest = this.restaurant_list;
        const map = this.maps;

        requestRestaurant = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+" + adress +
            "&type=restaurant&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs";

        var request = new XMLHttpRequest();
        request.open('GET', requestRestaurant);
        request.responseType = 'json';
        request.send();

        request.onload = function () {

            const getPlaces = new Promise((resolve, reject) => { // Create a promise
                var jsonRestaurants = request.response;
                Restaurant.addToTableManualAdress(jsonRestaurants); // Add to main table
                resolve();

                if (jsonRestaurants == undefined) {
                    reject();
                }
            })

            getPlaces.then(() => { // When restaurants are added to main table, we display the list, and markers.
                rest.displayRestaurantsList(() => {
                    Store.actualisationRestaurants = Store.restaurants; // Synchronize Active table with Main Table
                    map.clearOverlays();
                    map.displayMarkers();
                });
            })
        }
    }

    getRestaurantOpinions() { // Method that get opinions from API for a Restaurant

        let requestOpinionURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + Store.restaurantPlaceID + "&fields=name,rating,reviews&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs";

        var request = new XMLHttpRequest(); // New request API
        request.open('GET', requestOpinionURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {

            let jsonOpinion = request.response;
            let restaurant;

            restaurant = Store.restaurants.filter(element => element.place_id == Store.restaurantPlaceID);
            // Get the restaurant we have to push opinions

            Store.restaurants.forEach(element => {

                if (element.place_id === restaurant[0].place_id) {

                    element.opinion = new Array(); //Create a table to store opinions.

                    let id = 0;
                    //For each opinions from API, we create a model.
                    jsonOpinion.result.reviews.forEach(result => {

                        let opinion =
                        {
                            "stars": result.rating,
                            "comment": result.text,
                        };
                        element.opinion.push(opinion); // We add the model to the table.
                        id++;
                    })
                }
            });
            Restaurant_opinions.displayOpinionFromPlaces(jsonOpinion); // Display all opinions.
        }
    }
}
