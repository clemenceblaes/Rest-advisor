"use strict";

class Restaurants {
    constructor(id, name, adress, positionLat, positionLong, opinion, average, marker ) {
        this.id = id;
        this.name = name;
        this.adress = adress;
        this.positionLat = positionLat;
        this.positionLong = positionLong;
        this.opinion = opinion;
        this.average = average;
        this.marker = marker;

    }
    
    static displayRestaurant() {
        $.getJSON("../json/restaurants.json", (json) => {

            let numberRestaurant = 0;
            json.existingRestaurants.forEach(restaurant => {
                let restaurantsList = 
                "<div class=\"col-lg-12 restaurantName\" id=\"" + numberRestaurant + "\">"+
                    "<div class=\"col-lg-12 restaurantDisplay\">" + 
                        "<div class=\"col-lg-9\" id=\"" + restaurant.restaurantName + "\">"+
                            "<h2 class=\"" + restaurant.restaurantName + "\">" + restaurant.restaurantName + "</h2>" +
                                "<h3 id=\"restStar" + numberRestaurant +"\" class=\"restaurantStars\">" + "" + "</h3>"+
                                "<h3 class=\"restAddress\">" + restaurant.address +"</h3>"+
                                "<p id=\"restOpinion" + numberRestaurant + "\" class=\"mainOpinion\">" + "</p>"+
                                "<hr class=\"bookends\"></hr>" +
                        "</div>" +
                        "<div id=\"picture" + numberRestaurant + "\" class=\"col-lg-3 restaurantPicture\">" + "</div>" +
                    "</div>" + 
                "</div>";
                     
                $('.restaurantsList').append(restaurantsList); 
                
                let requestPicture = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + restaurant.lat +
                     "," + restaurant.long + "&fov=80&heading=70&pitch=0&key=AIzaSyB1Hl07T2rCswkqAaJmIiKL1SChOG4aVfs";
                
                $('#picture' + numberRestaurant).css("background", "url(" + requestPicture +")");

                let restPosition = new google.maps.LatLng(Store.restaurants.positionLat, Store.restaurants.positionLong);

                Store.restaurants.push(new Restaurants(numberRestaurant, restaurant.restaurantName, restaurant.address, 
                    restaurant.lat, restaurant.long, restaurant.ratings, null, restPosition));
                numberRestaurant++;     
            });
            Store.actualisationRestaurants = Store.restaurants;
            Restaurants.displayMarkers();
        });
    }

    static displayMarkers() {
        var icon = {
            url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
            scaledSize: new google.maps.Size(50, 50),
        };

            console.log(Store.actualisationRestaurants);
        Store.actualisationRestaurants.forEach(element => {
        let restMarker = new google.maps.Marker({
            icon: icon,
            position: element.marker,
            map: map,
            title: element.name
            })
        })
    }

    static displayOpinion() {
        let click = 1;
        $.getJSON("../json/restaurants.json", (json) => {

                for (let idRestaurant = 0; idRestaurant < json.existingRestaurants.length; idRestaurant++) {
                    let restaurantOpinions = [];
                    let opinionStar;
                    for (let existingOpinions = 0; existingOpinions < json.existingRestaurants[idRestaurant].ratings.length; existingOpinions++) {
                        restaurantOpinions.push(json.existingRestaurants[idRestaurant].ratings[existingOpinions].comment);

                        let restOpinionID = idRestaurant.toString() + existingOpinions.toString();
                        let addOpinions ="<div id=\"opinionStars" + restOpinionID + "\" class=\"opinionStars\">" + "</div>" + 
                                            "<div id=\"restOpinion" + idRestaurant + "\" class=\"opinion\">" + restaurantOpinions[existingOpinions] + 
                                                 "</div>";
                        $("#restOpinion" + idRestaurant).append(addOpinions);
                        $("#restOpinion" + idRestaurant).css("display", "none");

                        opinionStar = json.existingRestaurants[idRestaurant].ratings[existingOpinions].stars;
                        const displayStars = "<div class=\"star\">" +  "</div>";
                        const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";

                        for(let numberStars = 1; numberStars <= opinionStar; numberStars++) {
                            $("#opinionStars" + restOpinionID).append(displayStars);
                        }
                        if (Number.isInteger(opinionStar) == false) { 
                            $("#opinionStars" + restOpinionID).append(displayHalfStar);
                        }
                    }
                }

                $(".restaurantName").click(function() {
                    let thisRestaurant = $(this).attr("id");
                    if (click % 2 == 0) {
                        $("#restOpinion" + thisRestaurant).css("display", "none");
                        click++;
                    }
                    else {
                        $("#restOpinion" + thisRestaurant).css("display", "contents"); 
                        click++;
                    }
                })

                $(".opinionStars").css("display", "flex");
  
            
        })


    }
        


}
