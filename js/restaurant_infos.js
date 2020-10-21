"use strict";

import Restaurant_opinions from "../js/restaurant_opinions.js";

export default class Restaurant_infos {

    constructor(restaurant_opinion) {
        this.restaurant_opinion = restaurant_opinion;
    }

    displayRestaurantsInfos() {

        $("body").on('click', ".restaurantName", function () {
    
            let iDSelectedRestaurant = $(this).attr("id");
            let numberSelectedRestaurant = iDSelectedRestaurant.substr(4);
    
            let selectedRestaurant = Store.restaurants.filter(element => element.id == numberSelectedRestaurant); 
    
            $(".restaurantTitleAdress, .restaurantListOpinion, .restaurantAddOpinion, #listOpinion, #restaurantPicture, hr").css("display", "block");
            $('html,body').animate({scrollTop: $("#restTitle").offset().top}); 
    
            $("#restTitle").html(selectedRestaurant[0].name);
            $("#restAdress").html(selectedRestaurant[0].adress);
    
            if (selectedRestaurant[0].picture != undefined) {
                $("#restaurantPicture").css("background", "url('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + selectedRestaurant[0].picture + "&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs')");
            }
            else {
                $("#restaurantPicture").css("background", "url(../css/img/nopicture.jpg)"); 
            }
    
            const displayAverageStars = "<div class=\"star\">" +  "</div>";
            const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";
    
            $("#stars").empty();
    
            for (let stars = 1; stars < selectedRestaurant[0].average; stars++) {
    
                $("#stars").append(displayAverageStars);
            };
    
            if (Number.isInteger(selectedRestaurant[0].average) == false) { 
                $("#stars").append(displayHalfStar);
            };
    
            Store.restaurantPlaceID = selectedRestaurant[0].place_id;
            $(".opinion").remove();
            this.restaurant_opinion.displayOpinion();
        });
    }
}