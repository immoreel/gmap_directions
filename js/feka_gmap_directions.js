var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder;

//var destination = 'Rendementsweg 29, Mijdrecht';/*DIT MOET DAN DUS ANDERS*/
function initialize() {
    var destination = document.getElementById('gmap_directions_destination').innerHTML;
    var infoWindow = document.getElementById('gmap_directions_infowindow').innerHTML;
    var contentString = '<div class="maps_infowindow">' + infoWindow + '</div>';

    console.log(destination);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': destination}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latlng = results[0].geometry.location;
            var mapOptions = {
                zoom: 11,
                center: results[0].geometry.location
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            map.panBy(0, -50);

            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('directions-panel'));

            var control = document.getElementById('control');
            control.style.display = 'block';
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: latlng
            });

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 200
            });

            infowindow.open(map, marker);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function calcRoute() {
    var start = document.getElementById('zip').value;
    var destination = document.getElementById('gmap_directions_destination').innerHTML;
    var request = {
        origin: start,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
