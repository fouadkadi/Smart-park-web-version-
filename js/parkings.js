//var database = firebase.database();
//var ref = firebase.database().ref;
var parking = [[36.7676381,3.0536369,'Parking Didouche Mourad',"src='img/didouche.JPG'"],
                [36.759643,3.0529838, 'Parking Ali Mellah',"src='img/ali_mellah.jpg'"],
                [36.7711826,3.0599676,'Parking Sofia',"src='img/sofia.jpg'"],
                [36.7005133, 3.2074712, 'Parking Houari Boumedienne Airport',"src='img/houari_boum.jpg'"],
                [36.7678509, 3.0587155, 'Parking Bezier',"src='img/bezier.jpg'"],
                [36.792143, 3.0544095, 'Parking Bab el oued',"src='img/bab_el_oued.jpg'"],
                [36.7701633,3.0545415, 'Parking Yahia Benaiache',"src='img/yahia.jpg'"],
                [36.7390456, 3.1553383, 'Parking ABC Tower',"src='img/abc_tower.jpg'"],
                [36.7640911, 3.0521386, 'Parking Khelifa Boukhalfa',"src='img/khelifa_boukhalfa.jpg'"],
                [36.7042235, 3.0860099, 'Parking Ain Naadja',"src='img/ain_naadja.jpg'"],
                [36.7569686, 3.0517904, 'Parking Sidi Mhamed',"src='img/sidi_mhamed.jpg'"],
                [36.7376634, 3.081258, 'Parking El madania',"src='img/el_madania.jpeg'"],
                [36.7147883, 3.1977272, 'Parking Bab ezzouar',"src='img/bab_ezzouar.JPG'"],
                [36.7567449, 2.9967465, 'Parking Dely Brahim',"src='img/dely_brahim.jpg'"],
                [36.7564401, 3.0304784, 'Parking El biar',"src='img/el_biar.jpg'"],
                [36.731764, 3.1333328, 'Parking El harrash',"src='img/el_harrash.jpg'"],
                [36.7347299, 3.0320814, 'Parking El achour',"src='img/el_achour.jpg'"]];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(36.76, 3.054),
    mapTypeId: 'roadmap'
  });
  for(var i=0;i<parking.length;i++)
  {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parking[i][0], parking[i][1]),
        map: map,
        info : new google.maps.InfoWindow({content :"<div style='float:left'><img "+parking[i][3]+" height='128' width='128'></div>"+ parking[i][2]+ "<br>Tarifs:" +
        "<br>1 Heure: 50DA" +
        "<br>2 Heures: 100DA" +
        "<br>3 Heures: 150DA" +
        "<br>Plus de 3 Heures: 60DA/30min </p>"}),
        clickable : true
      });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                marker.info.open(map, marker);
            }
        })(marker, i));
  }
}

var x = document.getElementById("locate");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser :(";
    }
}
function showPosition(position) {
  var y = parseInt(document.getElementById("perimetre").value,10);
    var distance;
    for(var p=0;p<parking.length;p++)
    {
        distance=getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,parking[p][0],parking[p][1]);
        if(distance<=y)
        {
            x.innerHTML = x.innerHTML+ "  <div class='whiter2'><p class='par'><br>"+parking[p][2] + "<br>Distance: " + distance.toFixed(2)+"Km" +
            "<br>Tarifs:" +
            "<br>1 Heure: 50DA" +
            "<br>2 Heures: 100DA" +
            "<br>3 Heures: 150DA" +
            "<br>Plus de 3 Heures: 60DA/30min </p><button>Take a place</button></div>";
        }
    }
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI/180);
}
