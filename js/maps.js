"use strict";

import Store from "../js/store.js";

export default class Map { // Class that contains all scripts use with the Google Map.

    map = undefined; 

    constructor() {
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 48.5734053, lng: 7.7521113}, //Coord of Strasbourg - Best City Ever
            zoom: 13
        })
    }

    initMap() { //Method that init the map.

        new google.maps.Marker({ 
            position: Store.pos,
            map: this.map,
            title: "Vous êtes ici !"
        });
    }

    activateGeolocalisation(initSearchingPart) { // Activate the geolocalisation on page.

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
            Store.pos = { 
                lat: position.coords.latitude, // Use GPS coordonnates
                lng: position.coords.longitude,
              };
              this.map.setCenter(Store.pos);
              new google.maps.Marker({
                position: Store.pos,
                map: this.map,
                title: "Vous êtes ici !"
              });
              initSearchingPart(); // We init jQuery method for the searching part.
            }
        )}  
        else {
            alert("Vous n'avez pas accepté la géolocalisation");
        }      
    }

    geolocalisation(callback) { //Geolocalisation for manual research

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
                Store.pos = { 
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.map.setCenter(Store.pos);
                new google.maps.Marker({
                    position: Store.pos,
                    map: this.map,
                    title: "Vous êtes ici !"
                });
                callback();
            }
        )}        
    }

    clearOverlays() { // Method that clean activ markers on Map.
        for (var i = 0; i < Store.markersArray.length; i++ ) {
          Store.markersArray[i].setMap(null);
        }
        Store.markersArray.length = 0; //We reset the table of markers.
    }

    displayMarkers() { // Method that display markers from the active's restaurant table on map.
        var icon = {
            url: "http://maps.google.com/mapfiles/kml/pal2/icon13.png",
            scaledSize: new google.maps.Size(35, 35),
        };

        Store.actualisationRestaurants.forEach(element => { // For each active restaurants ...
            let restMarker = new google.maps.Marker({ // We put a marker on the map... 
                icon: icon,
                position: element.location,
                map: this.map,
                title: element.name
            })
            this.map.setCenter(Store.actualisationRestaurants[0].location) // Set the center of the map on first element
            Store.markersArray.push(restMarker); // And store it on a table to delete them after.
        })
    }
    
}
