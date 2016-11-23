// this function localizes an address chosen by the user
function closestPlaces() {
    var input = document.getElementById("userAddress").value;
    console.log(input);
}

// this functions counts the ambassadors
function ambassadorsCount() {
	var div = document.getElementById('ambassadors_number');
	div.innerHTML += 'Parmi ' + ambassadors.length + ' ambassadeurs.';
}

ambassadorsCount();
closestPlaces();

// appel pour afficher le marker
function displayAmbassadorPoint(ambassador, map) // on passe l'ambassadeur pour recup les infos pr afficher marker
{ 

    var marker = new google.maps.Marker({
      position: ambassador.coords,
      title: ambassador.name,
      map: map,
    });  

    google.maps.event.addListener(marker, 'click', function() {
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


	let ambassador = getAmbassador(index.replace('-', ' '));
	displayInformations(ambassador);
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

function displayInformations(ambassador) {
  let container = document.querySelector('.ambassador-infos');
  let name = document.querySelector('.ambassador-name');
  let place = document.querySelector('.ambassador-place');

  if (!container.classList.contains('active')) {
    container.classList.add('active');
  }

  place.innerHTML = ambassador.place;
  name.innerHTML = ambassador.name;
}


function getAmbassador(ambassador) {
  for(var i = 0; i < ambassadors.length; i++) {
    if (ambassador == ambassadors[i].name) {
      return ambassadors[i];
    }
  }
}




	

