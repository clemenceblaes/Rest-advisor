"use strict";

//Import the files needed.
import Store from "../js/store.js";
import Restaurant_infos from "../js/restaurant_infos.js";
import Restaurant_opinions from "../js/restaurant_opinions.js";
import Restaurant from "../js/restaurants.js";

export default class Restaurant_list { // Class used for the restaurant's list part of the page.

    clickToAddRestaurant = 1; 
    restaurant_infos = undefined;
    restaurant = undefined;

    constructor(places, maps) {
        this.places = places;
        this.maps = maps;
        this.restaurant = new Restaurant();
        this.restaurant_infos = new Restaurant_infos();
        this.restaurant_opinion = new Restaurant_opinions(this.places);
    }

    displayRestaurantsList(markers) { // Method that generate html name/adress part for each restaurant

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

        Store.actualisationRestaurants = Store.restaurants; // Synchronize active table and main table.

        // Method which display informations about restaurant cliked on.
        
        this.restaurant_infos.displayRestaurantsInfos(() => { 
            this.restaurant_opinion.getOpinion(); // Ask Places for Opinion in order to display them.
        });  

        markers();
    }

    addRestaurantFromForm() { //Function that get informations from input to add a restaurant

        const restaurant = this.restaurant;
        const self = this;

        $("body").on('click', "#addRestaurantButton", function () {

            // Get all values from inputs.
        let nameRestaurant, adressRestaurant, latRestaurant, longRestaurant;
            nameRestaurant = $('input[name=nameForm]').val();
            adressRestaurant = $('input[name=adressForm]').val();
            latRestaurant = $('input[name=latForm]').val();
            longRestaurant = $('input[name=longForm]').val();

            // If there is one empty, ask user to complete.
            if (nameRestaurant == "" || adressRestaurant == "" || latRestaurant == "" ||
                longRestaurant == "") {
                    alert("Merci de bien vouloir remplir tous les champs");
                }
                
            else {
                // Method that add the restaurant on main table.
                restaurant.addRestaurant(nameRestaurant, adressRestaurant, latRestaurant, longRestaurant);
                self.confirmationAddRestaurant(); // Show a confirmation.
                $(".displayRestaurants").empty();
                self.displayRestaurantsList(); // Display the new list of restaurant.
            }
        });
    }

    confirmationAddRestaurant() { // Function that show a confirmation when user add a restaurant. 
    
        $("#addRestaurant").css("display", "none");
        $("#confirmation").css("display", "flex"); 
        setTimeout(() => { 
            $("#confirmation").css("display", "none"); //Disappear after 3 secondes.
        }, 3000);
        this.clickToAddRestaurant++;
    }

    
    displayAddRestaurantForm() { // Function that show the form to add a restaurant when click on button.

        const addRestaurant = this.addRestaurantFromForm(); //Add the restaurant if all informations is validated. 
   
            $("body").on('click', "#addRest", function () {
    
                if(this.clickToAddRestaurant % 2 == 0) { // If the value can be divide per 2 => dont show the form
                    $("#addRestaurant").css("display", "none");
                    this.clickToAddRestaurant++;
                }
                else {
                    $("#addRestaurant").css("display", "block"); //Show the form
                    this.clickToAddRestaurant++;
                    addRestaurant;
                }  
            })
    }

    init() { // Function that init the main script from this part.
        const displayAddRestaurantForm = this.displayAddRestaurantForm.bind(this);
        $(document).ready(displayAddRestaurantForm);
    }
}
