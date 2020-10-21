"use strict";

import Maps from "../js/maps.js";
import Places from "../js/places.js";
import Restaurant from "../js/restaurants.js";
import Restaurant_list from "../js/restaurant_list.js";

export default class Research {

    maps = undefined;
    places = undefined;
    restaurant = undefined;
    restaurant_list = undefined;

    constructor() {
       this.maps = new Maps();
       this.places = new Places();
       this.restaurant = new Restaurant();
       this.restaurant_list = new Restaurant_list();
    }

    research() {

        Store.restaurants = [];
        let researchbyName, researchbyAdress;
        researchbyName = $('input[name=researchName]').val();
        researchbyAdress = $('input[name=researchAdress]').val();

        const regex = / /gi;
        let keyWordsName = researchbyName.replace(regex, '%20');
        let keyWordAdress = researchbyAdress.replace(regex, '%20');

        this.maps.geolocalisation();

        if (researchbyName != undefined && researchbyAdress == "") {
            this.places.getRestaurantFromName(keyWordsName);
            }

        else if (researchbyAdress != undefined && researchbyName == "") {
            this.places.getRestaurantFromAdress(keyWordAdress)
        }

        this.restaurant.addToTable(jsonRestaurants);
        this.restaurant_list.displayRestaurantsList();
        map.setCenter(Store.restaurants[0].location);
    }

    filterRestaurants(arr, requete) {
        return arr.filter(function (el) {
              return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        })
    }

    searchByNameInSessionStorage(researchbyName) {

        let restaurantFromStorage, jsonRestaurantFromStorage;
        let storage = [];
        let nameStorage = [];
        if (sessionStorage.length > 0) {
            for (let id = 0; id < sessionStorage.length; id++) {
                restaurantFromStorage = sessionStorage.getItem("Restaurant" + id);
                jsonRestaurantFromStorage = JSON.parse(restaurantFromStorage);
                nameStorage.push(jsonRestaurantFromStorage.name);
                storage.push(jsonRestaurantFromStorage);
            }
            
            let result = this.filterRestaurants(nameStorage, researchbyName.toLowerCase());
            console.log(result);
            storage.forEach(element => {
                result.forEach(result => {
                    if (element.name == result) {
                        element.id = Store.restaurants.length;
                        Store.restaurants.push(element);
                    }
    
                    else{
                        console.log("couin");
                    }
                })
            })
        }
    }

    searchByAdressInSessionStorage(researchbyAdress) {

        let restaurantFromStorage, jsonRestaurantFromStorage;
        if (sessionStorage.length > 0) {
            let storage = [];
            let adressStorage = [];
            for (let id = 0; id < sessionStorage.length; id++) {
                restaurantFromStorage = sessionStorage.getItem("Restaurant" + id);
                jsonRestaurantFromStorage = JSON.parse(restaurantFromStorage);
                storage.push(jsonRestaurantFromStorage);
                adressStorage.push(jsonRestaurantFromStorage.adress);
            }

            let result = this.filterRestaurants(adressStorage, researchbyAdress.toLowerCase());
            
            storage.forEach(element => {
                result.forEach(result => {
                    if (element.adress == result) {
                        element.id = Store.restaurants.length;
                        Store.restaurants.push(element);
                    }
    
                    else{
                        console.log("couin");
                    }
                })
            })
        }
    }

}