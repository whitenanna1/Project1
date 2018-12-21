$( document ).ready(function() {
    console.log( "ready!" );

    $.ajax({
        url: ;
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    var lat = ;
    var long = ;

    $.ajax({
        url: "http://api.powderlin.es/closest_stations?lat="+lat+"&lng="+long+"&data=true&days=0&count=5",
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });    
});