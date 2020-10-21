"use strict";

import Store from "../js/store.js";
import Markers from "./markers.js";
import Restaurant_infos from "./restaurant_infos.js";
import Restaurant_opinions from "./restaurant_opinions.js";

export default class Restaurant_list {

    clickToAddRestaurant = 1; 
    markers = undefined;
    restaurant_infos = undefined;
    restaurant_opinion = undefined;

    constructor() {
        this.markers = new Markers();
        this.restaurant_infos = new Restaurant_infos();
        this.restaurant_opinion = new Restaurant_opinions();
    }

    displayRestaurantsList() {

        Store.restaurants.forEach(element => {
    
        let restaurantsDescription = 
        "<div class=\"col-lg-12 restaurantName\" id=\"rest" + element.id + "\">"+
            "<div class=\"col-lg-12 restaurantDisplay\">" + 
                "<div class=\"col-lg-9\" id=\"" + element.name + "\">"+
                    "<h2 class=\"restTitle\">" + element.name + "</h2>" +
                        "<h3 id=\"restStar" + element.id +"\" class=\"restaurantStars\">" + "" + "</h3>"+
                        "<h3 class=\"restAddress\">" + element.adress +"</h3>"+
                        "<p id=\"restOpinion" + element.id + "\" class=\"mainOpinion\">" + "</p>"+
                        "<hr class=\"bookends\"></hr>" +
                "</div>" +
            "<div id=\"picture" + element.id + "\" class=\"col-lg-3 restaurantPicture\">" + "</div>" +
        "</div>" + 
    "</div>";
    
        $(".displayRestaurants").append(restaurantsDescription);
        })
    
        Store.actualisationRestaurants = Store.restaurants;
        this.markers.displayMarkers();
        this.restaurant_infos.displayRestaurantsInfos();
        this.restaurant_opinion.displayOpinion();     
    }

    displayAddRestaurantForm() { // Function that show the form to add a restaurant when click on button.

        $(document).ready(function() {
    
            $("body").on('click', "#addRest", function () {
    
                if(this.clickToAddRestaurant % 2 == 0) {
                    $("#addRestaurant").css("display", "none");
                    this.clickToAddRestaurant++;
                }
                else {
                   $("#addRestaurant").css("display", "block"); 
                   this.clickToAddRestaurant++;
                }  
            })
        })
    }

    addRestaurantFromForm() { //Function that get informations from input to add a restaurant

        $(document).ready(function() {

            let nameRestaurant, adressRestaurant, latRestaurant, longRestaurant;
                nameRestaurant = $('input[name=nameForm]').val();
                adressRestaurant = $('input[name=adressForm]').val();
                latRestaurant = $('input[name=latForm]').val();
                longRestaurant = $('input[name=longForm]').val();

                if (nameRestaurant == "" || adressRestaurant == "" || latRestaurant == "" ||
                    longRestaurant == "") {
                        alert("Merci de bien vouloir remplir tous les champs");
                    }
                    
                else {
                    restaurant.addRestaurant(nameRestaurant, adressRestaurant, latRestaurant, longRestaurant);
                }
                $(".displayRestaurants").empty();
        })
    }

    confirmationAddRestaurant() {
        $("body").on('click', "#addRestaurantButton", function () {

            $("#addRestaurant").css("display", "none");
            $("#confirmation").css("display", "flex"); 
            setTimeout(() => { 
                $("#confirmation").css("display", "none");
            }, 3000);
            restaurant.addRestaurant();
            this.clickToAddRestaurant++;
        })
    }

    init() {
        this.displayAddRestaurantForm();
        this.addRestaurantFromForm();
        this.confirmationAddRestaurant();
    }
}
