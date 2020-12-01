"use strict";

// Import the files needed.
import Opinion from "../js/opinions.js";
import Store from "../js/store.js";


export default class Restaurant_opinions { // Class used for restaurants_opinion.

    clickToAddOpinion = 1;
    opinion = undefined;
    places = undefined;
    static htmlNumberStar = undefined;
    static numberStar = undefined;

    constructor(places) {
        this.places = places;
        this.opinion = new Opinion(this);
    }

    getOpinion = () => { // Method that check if there are existing opinions for a restaurant 

        if (Store.restaurantPlaceID == undefined) {
            $(".restaurantListOpinion").html("Aucun avis pour ce restaurant. Pourquoi ne pas écrire le votre ?");
        }
    
        else {
            this.places.getRestaurantOpinions(() => { // Get opinions by Places API.
                this.restaurant_opinions.displayOpinionFromPlaces(jsonOpinion); // Display it on Opinion part of the page.
            });
        }
    }

    static displayOpinionFromPlaces(jsonOpinion) { //Function that show opinion and stars on html page.

        $(".restaurantListOpinion").empty();
        let opinionID = 0; 
        jsonOpinion.result.reviews.forEach(element => { // For each element from API, create a model
            
            let opinionText = 
            "<div class=\"opinion\" id=\"opinion" + opinionID + "\">" + 
                "<div class=\"opinionStars\" id=\"starsFromOpinion" + opinionID + "\">"+ "</div>" + 
                    "<div class=\"opinionText\" id=\"textFromOpinion\">"+ element.text + "</div>" +
            "</div>";
                    
            $(".restaurantListOpinion").append(opinionText); // And show it on html page


            // That part display stars.
            const displayAverageStars = "<div class=\"star\">" +  "</div>";
            const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";

            for (let Opinionstars = 1; Opinionstars < element.rating; Opinionstars++) {
                // Display entire stars
                $("#starsFromOpinion" + opinionID).append(displayAverageStars); 
            };

            if (Number.isInteger(element.rating) == false) { 
                $("#starsFromOpinion"+ opinionID).append(displayHalfStar); // Display an half star if average is not an integer
            };

            opinionID++;
        });  
    }

    static displayNewOpinions() { // Function that show new opinions

        $(".restaurantListOpinion").empty();

        let restaurant = Store.restaurants.filter(element => element.place_id == Store.restaurantPlaceID);
        // Get the restaurant we have to show opinions.

        let opinionID = 0; 
        restaurant[0].opinion.forEach(element => { // For each element from the main table, create a model  
            
            let opinionText = 
            "<div class=\"opinion\" id=\"opinion" + opinionID + "\">" + 
                "<div class=\"opinionStars\" id=\"starsFromOpinion" + opinionID + "\">"+ "</div>" + 
                    "<div class=\"opinionText\" id=\"textFromOpinion\">"+ element.comment + "</div>" +
            "</div>";
                    
            $(".restaurantListOpinion").append(opinionText);
        
            // That part display stars.
            const displayAverageStars = "<div class=\"star\">" +  "</div>";
            const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";

            for (let Opinionstars = 1; Opinionstars <= element.stars; Opinionstars++) {
                // Display entire stars
                $("#starsFromOpinion" + opinionID).append(displayAverageStars);
            };

            if (Number.isInteger(element.stars) == false) { 
                $("#starsFromOpinion"+ opinionID).append(displayHalfStar); // Display an half star if average is not an integer
            };

            opinionID++;
        });  

    }

    displayOpinionForm() { // jQuery that show the form to add an opinion.
        
        $(document).ready(function() {

            $("body").on('click', "#addOpinion", function () {

                if(this.clickToAddOpinion % 2 == 0) { //If the value can be divide per 2 => don't show
                    $("#opinionForm").css("display", "none");
                    this.clickToAddOpinion++;
                }
                else {
                    $("#opinionForm").css("display", "block"); 
                    this.clickToAddOpinion++;
                }  
                
            })
        })
    }

    voteWithStars() { //Function used to add a vote with stars.

        $(document).ready(function() {

            $(".voteStar").click(function() {

                Restaurant_opinions.htmlNumberStar = $(this).attr("id"); 
                Restaurant_opinions.numberStar = Number(Restaurant_opinions.htmlNumberStar.substr(4));
                //Get the number of the vote by html id
                $("#" + Restaurant_opinions.htmlNumberStar).css("color", "#F1C70C"); // Change the color
                $("#opinion").click(function() {
                    $("#" + Restaurant_opinions.htmlNumberStar).css("color", "#F1C70C"); // Keep the color

                    this.displayConfirmationOpinion(); // Show a confirmation
                })
            })
        })
    }

    displayConfirmationOpinion() { // Method that add the opinion and show a confirmation when is done.

        const opinion = this.opinion;

        $("body").on('click', "#addOpinionTable", function () {

            let opinionText; 

            opinionText = $('textarea[name=opinion]').val(); 

            if(opinionText != undefined && Restaurant_opinions.htmlNumberStar != undefined) {
                opinion.addOpinion(opinionText); // Add the opinion
                $("#opinionForm").css("display", "none");
                $("#confirmationOpinion").css("display", "flex"); 
                setTimeout(() => { 
                    $("#confirmationOpinion").css("display", "none");
                }, 3000);
                this.clickToAddOpinion++; //Sohw the confirmation.
            }
        })
    }

    init() { //Function that init all scripts about Opinions.
        this.displayOpinionForm();
        this.voteWithStars();
        this.displayConfirmationOpinion();
    }
}
