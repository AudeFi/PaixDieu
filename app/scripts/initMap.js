// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.8708675, lng: 1.3574238},
    zoom: 6
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Init markers
  for (var i = 0; i < ambassadors.length; i++) {
    var ambassador = ambassadors[i];

    getLocation(ambassador, displayAmbassadorPoint, map);
  }

  document.querySelector('.deguster_twitter').addEventListener('click', function (e) {
    e.preventDefault();

    const url = encodeURI(window.location.href.replace(' ', '-')).replace('#', '%23');
    const texte = encodeURI('Venez déguster de la bonne biere');
    const toShare = 'https://twitter.com/share?url='+ url +'&text='+ texte;
    window.open(toShare, '', 'width=500,height=400');
  });

  document.querySelector('.deguster_facebook').addEventListener('click', function (e) {
    e.preventDefault();

    const url = encodeURI(window.location.href.replace(' ', '-')).replace('#', '%23');
    const toShare = 'https://www.facebook.com/sharer/sharer.php?sdk=joey&u='+ url;
    window.open(toShare, '', 'width=500,height=400');
  });

  document.querySelector('#near-me').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById("userAddress").value;
    getLocation({place: input}, function(te, map) {
      map.setCenter(te.coords);
    }, map);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}