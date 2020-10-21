"use strict";

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

    addToTable(jsonRestaurants) { //Method that add restaurants from api's requests to the table.

        jsonRestaurants.results.forEach(element => {

              Store.restaurants.push(new Restaurant(Store.restaurants.length, element.name, element.vicinity, element.geometry.location, element.rating, 
                element.place_id, null, element.user_ratings_total, undefined)); 

            if (element.photos[0].photo_reference != undefined) {
              Store.restaurants.picture = element.photos[0].photo_reference; 
            }
      })
    }

    //Method that add restaurants from the html form.
    addRestaurant(nameRestaurant, adressRestaurant, latRestaurant, longRestaurant){

        let newSessionStorage = Store.restaurants.length;
        let restPosition = new google.maps.LatLng(latRestaurant, longRestaurant);
        let newRestaurant = new Restaurant(newSessionStorage ,nameRestaurant, adressRestaurant,restPosition, 0, undefined, null, 0, undefined);
        Store.restaurants.push(newRestaurant);

        let jsonRestaurant = JSON.stringify(newRestaurant);
        let titleSessionStorage = "Restaurant" + newSessionStorage;
        sessionStorage.setItem(titleSessionStorage,jsonRestaurant);
        restaurant_list.displayRestaurantsList();       
    }
}

