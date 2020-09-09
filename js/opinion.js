class Opinion {

    static searchRestaurantByName() {

        let searchRestaurant;

        $(document).ready(function() {
            $("#search").click(function(){
                searchRestaurant = $('input[name=searchRestaurantByName]').val();
                if(searchRestaurant == "") {
                    alert("Votre recherche est vide !")
                }

                if(Store.restaurants.filter(element => element.name == searchRestaurant.toUpperCase())) {
                    alert('Match');
                }
                else {
                    alert('No match found.');
                }   
            })
        })

    }
}


Opinion.searchRestaurantByName();