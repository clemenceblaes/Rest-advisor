class Stars {

    static displayStars() {

        $.getJSON("../json/restaurants.json", (json) => {
   
            for (let idRestaurant = 0; idRestaurant < json.existingRestaurants.length; idRestaurant++) {
                let restaurantStars = [];
                for (let existingStars = 0; existingStars < json.existingRestaurants[idRestaurant].ratings.length; existingStars++) {
                    restaurantStars.push(parseInt(json.existingRestaurants[idRestaurant].ratings[existingStars].stars));

                }
                 //This is the calculation to obtain average notation for each restaurant.
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let restaurantNumberStar = restaurantStars.reduce(reducer);   
                let restaurantAverageStars = Math.round((restaurantNumberStar / json.existingRestaurants[idRestaurant].ratings.length)*100)/100; 


                //Update average information on the restaurant's table.
                let thisRestaurantName = json.existingRestaurants[idRestaurant].restaurantName;
                let restaurantWithStar = Store.restaurants.find(element => element.name === thisRestaurantName);
                restaurantWithStar.average = restaurantAverageStars;

                //Display one or a half star in terms of restaurant's average notatation.
                const displayAverageStars = "<div class=\"star\">" +  "</div>";
                const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";
                for(let numberStars = 1; numberStars <= restaurantAverageStars; numberStars++) {
                    $("#restStar" + idRestaurant).append(displayAverageStars);
                }

                //If we obtain a float number, we display a half star
                if (Number.isInteger(restaurantAverageStars) == false) { 
                    $("#restStar" + idRestaurant).append(displayHalfStar);
                }
                $("#restStar" + idRestaurant).css("display", "flex");
            }
        });
    }
}