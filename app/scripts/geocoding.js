// this function localizes an address chosen by the user
function closestPlaces() {
    var input = document.getElementById("userAddress").value;
    console.log(input);
}

// this functions counts the ambassadors
function ambassadorsCount() {
	var div = document.getElementById('ambassadors_number');
	div.innerHTML += 'Parmi ' + ambassadors.length + ' ambassadeurs';
}

ambassadorsCount();

// appel pour afficher le marker
function displayAmbassadorPoint(ambassador, map) // on passe l'ambassadeur pour recup les infos pr afficher marker
{ 

	var contentString = '<div id="content">'+
      	'<div id="siteNotice">'+
      	'</div>'+
      	'<h1 id="firstHeading" class="firstHeading">'+ ambassador.name +'</h1>'+
      	'<div id="bodyContent">'+
      	'Adresse : ' + ambassador.place +
      	'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      	'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      	'(last visited June 22, 2009).</p>'+
      	'</div>'+
      	'</div>';

    var currentInfowindow = null;

	var infowindow = new google.maps.InfoWindow({
    	content: contentString
  	});

    var marker = new google.maps.Marker({
      position: ambassador.coords,
      title: ambassador.name,
      map: map,
    });  

	google.maps.event.addListener(marker, 'click', function() { 
    	if (currentInfowindow != null) { 
    	    currentInfowindow.close(); 
    	} 
    	infowindow.open(map, marker); 
    	currentInfowindow = infowindow; 
	}); 

    google.maps.event.addListener(marker, 'click', function() {
    	console.log(ambassador.name);
    	event.preventDefault();

    	// Redirect instead with JavaScript
    	urlParametersBrasserie(ambassador.name);

    });

    function urlParametersBrasserie(index) {
    _url = location.href;
    idMark = _url.indexOf("?");
    if (idMark != (-1) )
        _url = _url.substring(0, idMark);
    _url = _url + '?bar=' + index;
    location.href = _url;
}

	// Check if url already on a specific bottle
	if (paramBrasserie != undefined) {
	    setTimeout(function(){
	        urlParametersBrasserie(paramBrasserie);
	    }, 1000);
	}

	

}

function getLocation(ambassador, success, map)
{

	

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
        { 'address': ambassador.place },
        function (result, status) {
            if (status != google.maps.GeocoderStatus.OK) { // si le statut est bad on fait rien
                return; // ERROR HERE
            }
            // on ajoute les coords a l'ambassadeur courant
            ambassador.coords = {
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng(),
            };

            // on exécute la fonction d'affichage du marker avec l'ambassadeur courant
            success(ambassador, map);
        }
    );
}
    
    // var twitter = document.querySelector('.twitter-share-button');
    // twitter.setAttribute('data-href', 'frfr');
    // console.log(twitter);



	

