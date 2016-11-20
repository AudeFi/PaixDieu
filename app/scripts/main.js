/*
 *
 * HORIZONTAL NAVIGATION
 *
 */

if ( document.querySelector('.swiper-container') != undefined ) {

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
        var currentSwitch = document.querySelector('.swiper-pagination-switch.'+ hash );

        var backbutton = true; // back button options =! change url option (not the same event but I can't distinct them)
        if (backbutton == false) {
            removeActiveClass();
            currentSwitch.classList.add('active');
        }
        else {
            swipeEvent(currentSwitch);
        }
        document.querySelector('.controls_pageTitle').innerHTML = document.querySelector('.swiper-pagination-switch.active').textContent;    
    };
    //When I click on a section in the menu
    var allSwitcher = document.querySelectorAll('.swiper-pagination-switch');
    for (var i = 0; i < allSwitcher.length; i++) {
        allSwitcher[i].addEventListener('click', function(){
            mySwiper.unlockSwipes(); //After opening the menu, unlock the ability to swipe next
            document.querySelector('.controls_menuOpen').classList.remove('openned');
            menuState = "swipe";
            swipeEvent( this );
        });
    }

    function swipeEvent(target) {
        mySwiper.slideTo(target.dataset.indexnumber);
        removeActiveClass();
        target.classList.add('active');
    }

    function removeActiveClass() {
        var allSwitcher = document.querySelectorAll('.swiper-pagination-switch');
        for (var i = 0; i < allSwitcher.length; i++) {
            allSwitcher[i].classList.remove('active');
        }
    }

    // Get the position in the page at first connection on the website and update the menu current item
    var hash = document.location.hash.split('#')[1];
    if (hash == undefined) {
        document.location.hash = 'accueil';
        hash = 'accueil';
    }

    removeActiveClass();
    document.querySelector('.swiper-pagination-switch.'+ hash ).classList.add('active');
    document.querySelector('.controls_pageTitle').innerHTML = document.querySelector('.swiper-pagination-switch.active').textContent;


    // SWIPER CONTROLS

    //bind to determined event(s)
    var pressTimer;
    var menuState = "swipe";

    var controlsButton = document.querySelectorAll('.controls_button');
    for (var i = 0; i < controlsButton.length; i++) {
        // ON DESKTOP - MOUSE EVENT
        /*controlsButton[i].addEventListener('mousedown', startingClickMenu );
        controlsButton[i].addEventListener('mouseup', endingClickMenu );*/
        // ON MOBILE - TOUCH EVENT
        controlsButton[i].addEventListener('touchstart', startingClickMenu );
        controlsButton[i].addEventListener('touchend', endingClickMenu );
    }

    function startingClickMenu() {
        if (menuState == "open") {
            document.querySelector('.controls_menuOpen').classList.remove('openned');
            mySwiper.unlockSwipes();
            menuState = "close";
        } else {
            pressTimer = window.setTimeout(function() { 
                document.querySelector('.controls_menuOpen').classList.add('openned');
                menuState = "open";
                mySwiper.lockSwipes(); // If we oppened the menu with a long press on next button, don't swipe to next slide
            },300); 
        }
        return false;
    }

    function endingClickMenu() {
        if( menuState == "close"){
            menuState = "swipe";
        }
        else if ( menuState == "swipe" ) {
            mySwiper.unlockSwipes(); // If we didn't open the menu, act normal and swipe next
            mySwiper.slideNext();
        }
        clearTimeout(pressTimer);
        return false;
    }
}