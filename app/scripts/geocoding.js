// appel pour afficher le marker
function displayAmbassadorPoint(ambassador, map) // on passe l'ambassadeur pour recup les infos pr afficher marker
{ 
    var marker = new google.maps.Marker({
      position: ambassador.coords,
      title: ambassador.name,
      map: map,
    });  

    console.log(marker);
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
