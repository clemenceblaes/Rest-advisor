"use strict";

//Import the files needed.
import Store from "../js/store.js";

//Class that store restaurant's instances and functions that add them on main table.
export default class Restaurant {

  constructor(id, name, adress, location, average, place_id, opinion, number_opinion, picture) {
    this.id = id;
    this.name = name;
    this.adress = adress;
    this.location = location;
    this.average = average;
    this.place_id = place_id;
    this.opinion = opinion;
    this.number_opinion = number_opinion;
    this.picture = picture;
  }

  setPicture(picture) { // Set the picture from Places.
    this.picture = picture;
  }

  //Method that add restaurants from Geolocalisation or research on main table.
  static addToTableGeo(jsonRestaurants) { //Method that add restaurants from api's requests to the table.

    jsonRestaurants.results.forEach(element => {

      const restaurant = new Restaurant(Store.restaurants.length, element.name, element.vicinity, element.geometry.location, element.rating,
        element.place_id, null, element.user_ratings_total, undefined); // We create a new Restaurant

      if (element.photos && element.photos[0].photo_reference) {
        restaurant.setPicture(element.photos[0].photo_reference); // Check if there is a picture and then push it.
      }

      Store.restaurants.push(restaurant);
    })
  }

  static addToTableManualAdress(jsonRestaurants) { //Method that add restaurants from api's requests to the table.

    jsonRestaurants.results.forEach(element => {

      const restaurant = new Restaurant(Store.restaurants.length, element.name, element.formatted_address, element.geometry.location, element.rating,
        element.place_id, null, element.user_ratings_total, undefined);

      if (element.photos && element.photos[0].photo_reference) {
        restaurant.setPicture(element.photos[0].photo_reference);
      }

      Store.restaurants.push(restaurant);
    })
  }

  static addToTableManualName(jsonRestaurants) { //Method that add restaurants from api's requests to the table.

    jsonRestaurants.candidates.forEach(element => {

      const restaurant = new Restaurant(Store.restaurants.length, element.name, element.formatted_address, element.geometry.location, element.rating,
        element.place_id, null, element.user_ratings_total, undefined);

      if (element.photos && element.photos[0].photo_reference) {
        restaurant.setPicture(element.photos[0].photo_reference);
      }

      Store.restaurants.push(restaurant);
    })
  }

  //Method that add restaurants from the html form on main table.
  addRestaurant(nameRestaurant, adressRestaurant, latRestaurant, longRestaurant) {

    let newSessionStorage = sessionStorage.length; //Create an new id for the table.
    let restPosition = new google.maps.LatLng(latRestaurant, longRestaurant); //Create Google Maps Coordonnates
    let newRestaurant = new Restaurant(newSessionStorage, nameRestaurant, adressRestaurant, restPosition, 0, undefined, null, 0, undefined);
    Store.restaurants.push(newRestaurant); //Add restaurants on main table.

    let jsonRestaurant = JSON.stringify(newRestaurant);
    let titleSessionStorage = "Restaurant" + newSessionStorage;
    sessionStorage.setItem(titleSessionStorage, jsonRestaurant); // Store it on localStorage. 
  }
}

