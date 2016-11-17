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
    mySwiper.unlockSwipeToNext(); //After opening the menu, unlock the ability to swipe next
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
/*var pressTimer;
$('.swiper-button-next').mouseup(function(){
    if( $cancelclick ){
        mySwiper.lockSwipeToNext(); // If we oppened the menu with a long press on next button, don't swipe to next slide
    }
    else {
        mySwiper.unlockSwipeToNext(); // If we didn't open the menu, act normal and swipe next
    }
    clearTimeout(pressTimer);
    return false;
}).mousedown(function(){
    $cancelclick = false;
    pressTimer = window.setTimeout(function() { 
        $('ul.main-menu').toggle('pressed');
        console.log("long click");
        $cancelclick = true;
    },500);    
    return false; 
});
*/


//determine which events to use
var startEventType = 'mousedown',
    endEventType   = 'mouseup';
//If mobile
    startEventType = 'touchstart';
    endEventType   = 'touchend';

//bind to determined event(s)
var pressTimer;
$('.swiper-button-next').bind(endEventType, function() {
    if( $cancelclick ){
        console.log("lock");
        mySwiper.lockSwipeToNext(); // If we oppened the menu with a long press on next button, don't swipe to next slide
    }
    else {
        console.log("not lock");
        mySwiper.unlockSwipeToNext(); // If we didn't open the menu, act normal and swipe next
    }
    clearTimeout(pressTimer);
    return false;
}).bind(startEventType, function(){
    $cancelclick = false;
    pressTimer = window.setTimeout(function() { 
        $('ul.main-menu').toggle('pressed');
        console.log("long click");
        $cancelclick = true;
    },500);    
    return false; 
});