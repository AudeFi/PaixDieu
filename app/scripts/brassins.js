/*
*   EVENT CAROUSEL
*/

var list_bottles = document.querySelector(".carousel_listProducts").children;
var list_clickTarget = document.querySelectorAll(".carousel_listProducts .carousel_mainImg");;
for(var i = 0; i < list_clickTarget.length; i++){
    list_clickTarget[i].addEventListener('click', function(){
        paramBrassin = this.dataset.productnumber;
        for(var i = 0; i < list_bottles.length; i++){
            list_bottles[i].className = "carousel_product";
        }
        list_bottles[paramBrassin - 1].className = "carousel_product active";
        urlParameters(paramBrassin);
    });
}

function urlParameters(index) {
    _url = location.href;
    idMark = _url.indexOf("?");
    if (idMark != (-1) )
        _url = _url.substring(0, idMark);
    _url = _url + '?id=' + index;
    location.href = _url;
}

// Check if url already on a specific bottle
if (paramBrassin != 1) {
    document.querySelector("[data-productnumber='" + paramBrassin + "']").click();
    setTimeout(function(){
        urlParameters(paramBrassin);
    }, 1000);
}