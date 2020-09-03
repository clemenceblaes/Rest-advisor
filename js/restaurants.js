"use strict";

class Restaurants {
    constructor(name, adress, positionLat, positionLong, opinion, average ) {
        this.name = name;
        this.adress = adress;
        this.positionLat = positionLat;
        this.positionLong = positionLong;
        this.opinion = opinion;
        this.average = average;

    }
    
    static displayRestaurant() {
        $.getJSON("../json/restaurants.json", (json) => {

            let numberRestaurant = 0;
            json.existingRestaurants.forEach(restaurant => {
                let restaurantsList = 
                "<div class=\"restaurantName\" id=\"" + numberRestaurant + "\">"+
                    "<div class=\"" + numberRestaurant + "\" id=\"" + restaurant.restaurantName + "\">"+
                        "<h2 class=\"" + restaurant.restaurantName + "\">" + restaurant.restaurantName + "</h2>" +
                            "<h3 id=\"restStar" + numberRestaurant +"\" class=\"restaurantStars\">" + "" + "</h3>"+
                            "<h3 class=\"restAddress\">" + restaurant.address +"</h3>"+
                            "<p id=\"restOpinion" + numberRestaurant + "\" class=\"mainOpinion\">" + "</p>"+
                    "</div>" + 
                "</div>";
                    $('.restaurantsList').append(restaurantsList);  

                Store.restaurants.push(new Restaurants(restaurant.restaurantName, restaurant.address, restaurant.lat, restaurant.long, restaurant.ratings, null));
                numberRestaurant++;     
            });
        });
        console.log(Store.restaurants);
    }

    static displayOpinion() {
        $.getJSON("../json/restaurants.json", (json) => {

                for (let idRestaurant = 0; idRestaurant < json.existingRestaurants.length; idRestaurant++) {
                    let restaurantOpinions = [];
                    for (let existingOpinions = 0; existingOpinions < json.existingRestaurants[idRestaurant].ratings.length; existingOpinions++) {
                        restaurantOpinions.push(json.existingRestaurants[idRestaurant].ratings[existingOpinions].comment);

                        let addOpinions ="<div id=\"opinionStars" + idRestaurant + "\" class=\"opinionStars\">" + 
                                            "<div id=\"restaurantOpinion" + idRestaurant + "\" class=\"opinion\">" + restaurantOpinions[existingOpinions] + 
                                            "</div>" + 
                                        "</div>";
                        $("#restOpinion" + idRestaurant).append(addOpinions);
                        $("#restOpinion" + idRestaurant).css("display", "none");
                    }
                }
                $(".restaurantName").click(function() {
                    let thisRestaurant = $(this).attr("id");
                    $("#restOpinion" + thisRestaurant).css("display", "contents"); //fonctionne
                })
  
            
        })


    }
        


}

// https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY&signature=YOUR_SIGNATURE -- Adress photo API google