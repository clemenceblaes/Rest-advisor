"use strict";

import Store from "../js/store.js";

export default class Restaurant_infos {

    onRestaurantClick() { // Display restaurant informations on click.
    
            let iDSelectedRestaurant = $(this).attr("id");
            let numberSelectedRestaurant = iDSelectedRestaurant.substr(4); // We get the ID of the restaurant.
    
            let selectedRestaurant = Store.restaurants.filter(element => element.id == numberSelectedRestaurant); 
            // Find the restaurant with the same ID.
    
            $(".restaurantTitleAdress, .restaurantListOpinion, .restaurantAddOpinion, #listOpinion, #restaurantPicture, hr").css("display", "block");
            $('html,body').animate({scrollTop: $("#restTitle").offset().top}); 
    
            // Show restaurant's informations 
            $("#restTitle").html(selectedRestaurant[0].name); 
            $("#restAdress").html(selectedRestaurant[0].adress);
    
            if (selectedRestaurant[0].picture != undefined) {
                $("#restaurantPicture").css("background", "url('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + selectedRestaurant[0].picture + "&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs')");
            } // Ask API for a picture
            else {
                $("#restaurantPicture").css("background", "url(../css/img/nopicture.jpg)"); // Default picture if API don't have one.
            }
    

            // That part display the stars.

            const displayAverageStars = "<div class=\"star\">" +  "</div>";
            const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";
    
            $("#stars").empty();
    
            // Check average to know how many stars to show.
            for (let stars = 1; stars < selectedRestaurant[0].average; stars++) {
    
                $("#stars").append(displayAverageStars);
            };
    
            if (Number.isInteger(selectedRestaurant[0].average) == false) { 
                $("#stars").append(displayHalfStar); // Display an half star if the average is not an integer.
            };
    
            Store.restaurantPlaceID = selectedRestaurant[0].place_id;
            $(".opinion").remove();
    }

    displayRestaurantsInfos(callback) {
        $("body").on('click', ".restaurantName", this.onRestaurantClick); // On click on the restaurant, display infos.    
        $("body").on('click', ".restaurantName", callback); 
    }
}
