$(document).ready(function () {
    console.log("ready!");

    $("#search").on("click", function (event) {
        event.preventDefault();

        var userZip = $("#zip").val().trim();

        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + userZip + "&key=AIzaSyCtACpMRAILtspcD0Xv5L3SADKump8sbJk",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var maps = response.results[0];

            var lat = maps.geometry.location.lat;
            var long = maps.geometry.location.lng;

            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/http://api.powderlin.es/closest_stations?lat=" + lat + "&lng=" + long + "&data=true&days=0&count=5",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var resortLat = response[0].station_information.location.lat;
                var resortLong = response[0].station_information.location.lng;
                var snowDepth = response[0].data[0]["Snow Depth (in)"];
                var resortName = response[0].station_information.name;


                $.ajax({
                    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + userZip + "&destinations=" + resortLat + "," + resortLong + "&key=AIzaSyCtACpMRAILtspcD0Xv5L3SADKump8sbJk",
                    method: "GET"
                }).then(function (response) {
                    console.log(response);

                    var distance = response.rows[0].elements[0].distance.text;
                    console.log(distance);
                    var duration = response.rows[0].elements[0].duration.text;
                    console.log(duration);


                    $("#resorts-0").text(resortName);
                    $("#snowfall-0").append(snowDepth);
                    $("#distance-0").append(distance);
                    $("#duration-0").append(duration);


                });

            });


        });

    });


});