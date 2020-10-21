"use strict";

import Store from "../js/store.js";

export default class Maps {

    initMap() {
        let map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 48.573824, lng: 7.759609},
            zoom: 13
          });

        let infoWindow;
        infoWindow = new google.maps.InfoWindow();
        new google.maps.Marker({ 
            position: Store.pos,
            map,
            title: "Vous êtes ici !"
        });
    }
}