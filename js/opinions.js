"use strict";

//Import the filed needed
import Store from "../js/store.js";
import Restaurant_opinions from "../js/restaurant_opinions.js";

export default class Opinion {  // Class that let user add an opinion.

    addOpinion(opinionText) {

        //First we check if all cases are used
        if (opinionText === undefined) {
            alert("Merci de renseigner un avis.")
        }
        else if (Restaurant_opinions.htmlNumberStar === undefined) {
            alert("Merci de donner une note à l'établissement");
        }
        else {

            // This search the restaurant we have to push a new opinion
            let restaurant = Store.restaurants.filter(element => element.place_id == Store.restaurantPlaceID);

            // We create a new opinion
            let jsonOpinion = 
                    {
                    "stars": Restaurant_opinions.numberStar,
                    "comment": opinionText,
                    };
    
            if (restaurant.opinion == null) {
                restaurant.opinion = new Array(); // If this restaurant has no opinion we create the table.
            }
    
            Store.restaurants[restaurant[0].id].opinion.push(jsonOpinion); // Else we push the new one
    

            // This part calculate a new average.
            let restaurantStars = [];
    
            for (let existingStars = 1; existingStars < Store.restaurants[restaurant[0].id].opinion.length; existingStars++) {
            //For each restaurant we push the number of star on a table to make an average.
            restaurantStars.push(parseInt(Store.restaurants[restaurant[0].id].opinion[existingStars].stars)); 
            }

            //This part calculate the average.
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let restaurantNumberStar = restaurantStars.reduce(reducer);   
            let restaurantAverageStars = Math.round((restaurantNumberStar / Store.restaurants[restaurant[0].id].length)*100)/100;
            restaurant.average = restaurantAverageStars;
    
        Restaurant_opinions.displayNewOpinions(); // Method that display all opinions old + new.
        }
    }
}
