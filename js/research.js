"use strict";

//Import files needed.
import Restaurant from "../js/restaurants.js";
import Store from "../js/store.js";

export default class Research { //Class that contains all scripts about manual research.

    maps = undefined;
    places = undefined;
    restaurant = undefined;

    constructor(maps, places) {
       this.maps = maps
       this.places = places
       this.restaurant = new Restaurant();
    }


    //Method that create APi request with Regex.
    //Get geolocalisation
    //Add results to the main table.
    //Display results on restaurant's list.
    research() {

        Store.restaurants = []; // Reset the main table.
        let researchbyName, researchbyAdress;
        researchbyName = $('input[name=researchName]').val();
        researchbyAdress = $('input[name=researchAdress]').val();

        const regex = / /gi; //Regex for API request
        let keyWordsName = researchbyName.replace(regex, '%20');
        let keyWordAdress = researchbyAdress.replace(regex, '%20');

            if (researchbyName != undefined && researchbyAdress == "") {
                this.places.getRestaurantFromName(keyWordsName); // Function that ask the API with keywords.
                this.searchByNameInSessionStorage(keyWordsName); // Function that check if there is something with same name on storage.
                }
    
            //if user is searching by localisation.
            else if (researchbyAdress != undefined && researchbyName == "") {
                this.places.getRestaurantFromAdress(keyWordAdress); // Function that ask the API with keywords.
                this.searchByAdressInSessionStorage(keyWordAdress); // Function that check if there is something with same adress on storage.
            }
    }

    // Function that check is there is a result on a table with word from research.
    filterRestaurants(arr, requete) {
        return arr.filter(function (el) {
              return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        })
    }

    searchByNameInSessionStorage(researchbyName) {

        let restaurantFromStorage, jsonRestaurantFromStorage;
        let storage = []; // Table of all restaurants in sessionStorage 
        let nameStorage = []; // Table with all adresses from sessionStorage
        if (sessionStorage.length > 0) {
            for (let id = 0; id < sessionStorage.length; id++) {
                restaurantFromStorage = sessionStorage.getItem("Restaurant" + id); // We get elements from storage
                jsonRestaurantFromStorage = JSON.parse(restaurantFromStorage);
                storage.push(jsonRestaurantFromStorage); // We push every elements in a table
                nameStorage.push(jsonRestaurantFromStorage.name); // We push every element's names in a table
            }
            
            // Filter all result in tables
            let result = this.filterRestaurants(nameStorage, researchbyName.toLowerCase());

            // We compare results to find element from research and push it on main restaurant table.
            storage.forEach(element => {
                result.forEach(result => {
                    if (element.name == result) {
                        element.id = Store.restaurants.length;
                        Store.restaurants.push(element);
                    }
                })
            })
        }
    }

    searchByAdressInSessionStorage(researchbyAdress) {

        let restaurantFromStorage, jsonRestaurantFromStorage;
        if (sessionStorage.length > 0) {
            let storage = []; // Table of all restaurants in sessionStorage 
            let adressStorage = []; // Table with all adresses from sessionStorage
            for (let id = 0; id < sessionStorage.length; id++) {
                restaurantFromStorage = sessionStorage.getItem("Restaurant" + id); // We get elements from storage
                jsonRestaurantFromStorage = JSON.parse(restaurantFromStorage);
                storage.push(jsonRestaurantFromStorage); // We push every elements in a table
                adressStorage.push(jsonRestaurantFromStorage.adress); // We push every element's adress in a table

            }

            let result = this.filterRestaurants(adressStorage, researchbyAdress.toLowerCase()); 
            // Filter all result in tables
            
            // We compare results to find element from research and push it on main restaurant table.
            storage.forEach(element => {
                result.forEach(result => {
                    if (element.adress == result) { 
                       element.id = Store.restaurants.length;
                        Store.restaurants.push(element);
                    }
                })
            })
        }
    }

}
