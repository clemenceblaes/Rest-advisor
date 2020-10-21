"use strict";

import Restaurant_infos from "../js/restaurant_infos.js";

export default class Opinion {

    restaurant_infos = undefined;

    constructor() {
        this.restaurant_infos = new Restaurant_infos();
    }

    addOpinion(htmlNumberStar, numberStar, opinionText) {
   
        if (opinionText === undefined) {
            alert("Merci de renseigner un avis.")
        }
        else if (htmlNumberStar === undefined) {
            alert("Merci de donner une note à l'établissement");
        }
        else {
            let restaurant = Store.restaurants.filter(element => element.place_id == Store.restaurantPlaceID);
            let jsonOpinion = 
                    {
                    "stars": numberStar,
                    "comment": opinionText,
                    };
    
            if (restaurant.opinion == null) {
                restaurant.opinion = jsonOpinion;
            }
    
            else {
                restaurant.opinion.push(jsonOpinion);
            }
    
            let restaurantStars = [];
    
            for (let existingStars = 0; existingStars < restaurant.opinion.length; existingStars++) {
            //For each restaurant we push the number of star on a table to make an average.
            restaurantStars.push(parseInt(restaurant.opinion[existingStars].stars)); 
            }

            //This part calculate the average.
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let restaurantNumberStar = restaurantStars.reduce(reducer);   
            let restaurantAverageStars = Math.round((restaurantNumberStar / parsedRestaurant.opinion.length)*100)/100;
            restaurant.average = restaurantAverageStars;
    
        this.restaurant_infos.displayOpinion();
        }
    }
}