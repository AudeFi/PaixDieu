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
    /*nextButton: '.swiper-button-next'*/
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
    mySwiper.unlockSwipes(); //After opening the menu, unlock the ability to swipe next
    $('ul.main-menu').toggle('pressed');
    $('.swiper-button-next').removeClass('pressed');
    $menuState = "swipe";
    swipeEvent( $(this) );
});

function swipeEvent($target) {
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

//bind to determined event(s)
var pressTimer;
$menuState = "swipe";


// ON MOBILE EVENT
$('.swiper-button-next').bind('touchend', function() {
    if( $menuState == "close"){
        $menuState = "swipe";
    }
    else if ( $menuState == "swipe" ) {
        mySwiper.unlockSwipes(); // If we didn't open the menu, act normal and swipe next
        mySwiper.slideNext();
    }
    clearTimeout(pressTimer);
    return false;
}).bind('touchstart', function(){
    if ($menuState == "open") {
        $('ul.main-menu').toggle('pressed');
        $('.swiper-button-next').removeClass('pressed');
        mySwiper.unlockSwipes();
        $menuState = "close";
    } else {
        pressTimer = window.setTimeout(function() { 
            $('ul.main-menu').toggle('pressed');
            $('.swiper-button-next').addClass('pressed');
            $menuState = "open";
            mySwiper.lockSwipes(); // If we oppened the menu with a long press on next button, don't swipe to next slide
        },300); 
    }
    return false; 
});


// ON DESKTOP EVENT
$('.swiper-button-next').mouseup(function(e) {
    if( $menuState == "close"){
        $menuState = "swipe";
    }
    else if ( $menuState == "swipe" ) {
        mySwiper.unlockSwipes(); // If we didn't open the menu, act normal and swipe next
        mySwiper.slideNext();
    }
    clearTimeout(pressTimer);
    return false;
}).mousedown(function(){
    console.log($menuState);
    if ($menuState == "open") {
        $('ul.main-menu').toggle('pressed');
        $('.swiper-button-next').removeClass('pressed');
        mySwiper.unlockSwipes();
        $menuState = "close";
    } else {
        pressTimer = window.setTimeout(function() { 
            $('ul.main-menu').toggle('pressed');
            $('.swiper-button-next').addClass('pressed');
            $menuState = "open";
            mySwiper.lockSwipes(); // If we oppened the menu with a long press on next button, don't swipe to next slide
        },300); 
    }
    return false; 
});