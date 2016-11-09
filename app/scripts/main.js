/*
 *
 * HORIZONTAL NAVIGATION
 *
 */
var mySwiper = new Swiper ('.swiper-container', { // Init swiper
    direction: 'horizontal',
    loop: false,
    hashnav:true,
    nextButton: '.swiper-button-next',
});

// EVENTS

//When I swipe manually (the hash change and I change the active menu item)
window.onhashchange = function(){ 
    var hash=document.location.hash.split('#')[1];
    $( ".swiper-pagination-switch."+ hash ).trigger( "click" );
};

//When I click on a section in the menu
$('.swiper-pagination-switch').on("click", changeSlide); 

// Change the active menu item and swipe to the correct slide 
function changeSlide(){
    console.log("click");
    mySwiper.slideTo($(this).index());
    $('.swiper-pagination-switch').removeClass('active');
    $(this).addClass('active')
}


// Get the position in the page at first connection on the website and update the position
var hash=document.location.hash.split('#')[1];
$( ".swiper-pagination-switch."+ hash ).trigger( "click" );
