"use strict";

import Store from "../js/store.js";

export default class Markers {

    clearOverlays() {
        for (var i = 0; i < Store.markersArray.length; i++ ) {
          Store.markersArray[i].setMap(null);
        }
        Store.markersArray.length = 0;
    }

    displayMarkers() { 
        var icon = {
            url: "http://maps.google.com/mapfiles/kml/pal2/icon13.png",
            scaledSize: new google.maps.Size(35, 35),
        };

        Store.actualisationRestaurants.forEach(element => {
            let restMarker = new google.maps.Marker({
                icon: icon,
                position: element.location,
                map: map,
                title: element.name
            })
            Store.markersArray.push(restMarker);
        })
    }

}