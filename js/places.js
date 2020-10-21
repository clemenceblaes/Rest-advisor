"use strict";

import Store from "../js/store.js";

export default class Places {

    getRestaurantsAround() {

        let requestURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + Store.pos.lat + "," + Store.pos.lng + "&radius=2500&type=restaurant&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs&callback=?";
    
        var request = new XMLHttpRequest();
        request.open('GET', requestURL); 
        request.responseType = 'json';
        request.send();  
    
        request.onload = function() {
            var jsonRestaurants = request.response;
        }
    }

    getRestaurantFromName(name) {

        let requestRestaurant;
        requestRestaurant = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + name +
        "&inputtype=textquery&fields=photos,formatted_address,name,rating,user_ratings_total,geometry,place_id&locationbias=circle:50000@" + Store.pos.lat + "," +
            Store.pos.lng + "&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs"; 

        var request = new XMLHttpRequest();
        request.open('GET', requestRestaurant); 
        request.responseType = 'json';
        request.send();  

        request.onload = function() { 
            var jsonRestaurants = request.response;
        }
    }

    getRestaurantFromAdress(adress) {

        let requestRestaurant;

        requestRestaurant = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+"+ adress + 
        "&type=restaurant&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs";     

        var request = new XMLHttpRequest();
        request.open('GET', requestRestaurant); 
        request.responseType = 'json';
        request.send();  

        request.onload = function() {
            var jsonRestaurants = request.response;
        }
    }

    getRestaurantOpinions() {
        let requestOpinionURL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + Store.restaurantPlaceID + "&fields=name,rating,reviews&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs";
    
        var request = new XMLHttpRequest();
        request.open('GET', requestOpinionURL); 
        request.responseType = 'json';
        request.send();  

        request.onload = function() {
            var jsonOpinion = request.response;
        }
    }
}