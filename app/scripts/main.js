/*
 *
 * HORIZONTAL NAVIGATION
 *
 */
var mySwiper = new Swiper ('.swiper-container', { // Init swiper
    direction: 'horizontal',
    loop: false,
    hashnav:true,
    pagination: '.swiper-pagination',
    paginationType: 'bullets',
    nextButton: '.swiper-button-next'
});

// EVENTS

//When I swipe manually (the hash change and I change the active menu item)
window.onhashchange = function(){ 
    var hash = document.location.hash.split('#')[1];
    $currentSwitch = $('.swiper-pagination-switch.'+ hash );

    var backbutton = true; // back button options =! change url option (not the same event but I can't distinct them)
    if (backbutton == false) {
        $('.swiper-pagination-switch').removeClass('active');
        $currentSwitch.addClass('active');
    }
    else {
        swipeEvent($currentSwitch);
    }    
};
//When I click on a section in the menu
$('.swiper-pagination-switch').on("click", function () {
    swipeEvent( $(this) );
});

function swipeEvent($target) {
    console.log("entered function");
    mySwiper.slideTo($target.index());
    $('.swiper-pagination-switch').removeClass('active');
    $target.addClass('active');
}

// Get the position in the page at first connection on the website and update the menu current item
var hash = document.location.hash.split('#')[1];
if (hash == undefined) {
    document.location.hash = 'accueil';
    hash = 'accueil';
}
$('.swiper-pagination-switch').removeClass('active');
$('.swiper-pagination-switch.'+ hash ).addClass('active');

// SWIPER CONTROLS
/*$('.swiper-button-next')*/