"use strict";

import Places from "../js/places.js";
import Opinion from "../js/opinions.js";

export default class Restaurant_opinions {

    clickToAddOpinion = 1;
    opinion = undefined;

    constructor(places) {
        this.places = places;
        this.opinion = new Opinion();
    }

    displayOpinion() {

        if (Store.restaurantPlaceID == undefined) {
    
            $(".restaurantListOpinion").html("Aucun avis pour ce restaurant. Pourquoi ne pas écrire le votre ?");
        }
    
        else {

            this.places.getRestaurantOpinions();
            let opinionID = 0; 
            jsonOpinion.result.reviews.forEach(element => {   
                
                console.log(element);
                
                let opinionText = 
                "<div class=\"opinion\" id=\"opinion" + opinionID + "\">" + 
                    "<div class=\"opinionStars\" id=\"starsFromOpinion" + opinionID + "\">"+ "</div>" + 
                        "<div class=\"opinionText\" id=\"textFromOpinion\">"+ element.text + "</div>" +
                "</div>";
                        
                $(".restaurantListOpinion").append(opinionText);
            
                const displayAverageStars = "<div class=\"star\">" +  "</div>";
                const displayHalfStar = "<div class=\"halfStar\">" +  "</div>";

                for (let Opinionstars = 1; Opinionstars < element.rating; Opinionstars++) {

                    $("#starsFromOpinion" + opinionID).append(displayAverageStars);
                };

                if (Number.isInteger(element.rating) == false) { 
                    $("#starsFromOpinion"+ opinionID).append(displayHalfStar);
                };

                opinionID++;
            });  
        }
    }

    displayOpinionForm() {
        
        $(document).ready(function() {

            $("body").on('click', "#addOpinion", function () {

                if(clickToAddOpinion % 2 == 0) {
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

    voteWithStars() { //Function used to add a vote with stars to an added opinion.

        $(document).ready(function() {

            $(".voteStar").click(function() {

                let htmlNumberStar;
                htmlNumberStar = $(this).attr("id");
                numberStar = Number(htmlNumberStar.substr(4));
                $("#" + htmlNumberStar).css("color", "#F1C70C");
                $("#opinion").click(function() {
                    $("#" + htmlNumberStar).css("color", "#F1C70C"); 
                })
            })
        })
    }

    displayConfirmationOpinion() {
        $("body").on('click', "#addOpinionTable", function () {

            let numberStar, opinionText; 

            opinionText = $('textarea[name=opinion]').val();
            this.opinion.addOpinion(htmlNumberStar, numberStar, opinionText);

            if(opinionText != undefined && htmlNumberStar != undefined) {
                $("#opinionForm").css("display", "none");
                $("#confirmationOpinion").css("display", "flex"); 
                setTimeout(() => { 
                    $("#confirmationOpinion").css("display", "none");
                }, 3000);
                this.clickToAddOpinion++;
            }
        })
    }

    init() {
        this.displayOpinionForm();
        this.voteWithStars();
        this.displayConfirmationOpinion();
    }
}