if (document.querySelector('.swiper-container')!=undefined) {
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
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        keyboardControl : true,
        preventClicks: true,
    });

    // EVENTS

    //When I swipe manually (the hash change and I change the active menu item)
    window.onhashchange = function(){
        var hash = document.location.hash.split('#')[1];
        if (hash.indexOf("?") != -1 )
            hash = hash.substring(0, hash.indexOf("?"));
        var currentSwitch = document.querySelector('.swiper-pagination-switch.'+ hash );


        var backbutton = true; // back button options =! change url option (not the same event but I can't distinct them)
        if (backbutton == false) {
            removeClass('.swiper-pagination-switch', 'active');
            addClass('.swiper-pagination-switch.' + hash, 'active');
        }
        else {
            swipeEvent(currentSwitch);
        }
        if (hash == "brassins")
            urlParameters(paramBrassin);
        document.querySelector('.controls_pageTitle').innerHTML = document.querySelector('.swiper-pagination-switch.active').textContent;
    };
    //When I click on a section in the menu
    var allSwitcher = document.querySelectorAll('.swiper-pagination-switch');
    for (var i = 0; i < allSwitcher.length; i++) {
        allSwitcher[i].addEventListener('click', function(){
            mySwiper.unlockSwipes(); //After opening the menu, unlock the ability to swipe next
            removeClass('.controls_menuOpen', 'openned');
            menuState = "swipe";
            swipeEvent( this );
        });
    }

    function swipeEvent(target) {
        mySwiper.slideTo(target.dataset.indexnumber);
        removeClass('.swiper-pagination-switch', 'active');
        addClass('[data-indexnumber="' + target.dataset.indexnumber + '"]', 'active');
    }

    function removeClass(selector, className) {
        var allElements = document.querySelectorAll(selector);
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].classList.remove(className);
        }
    }

    function addClass(selector, className) {
        var allElements = document.querySelectorAll(selector);
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].classList.add(className);
        }
    }


    // Get the position in the page at first connection on the website and update the menu current item
    var hash = document.location.hash.split('#')[1];
    var paramBrassin = 1; // Default to first one
    var paramBrasserie;
    if (hash == undefined) {  // If I don't have a specific slide, put #accueil
        document.location.hash = 'accueil';
        hash = 'accueil';
    }
    if (hash.indexOf("brassins?") != -1 ) { // If i have parameters on a specific bottle
        paramBrassin = hash.substring(hash.indexOf("=") + 1); //Save parameter
        hash = hash.substring(0, hash.indexOf("?")); // Get the hash without parameter
        swipeEvent( document.querySelector('.swiper-pagination-switch.'+ hash ) ); // Force swipe to the page
    } else if (hash.indexOf("deguster?") != -1 ) { // If i have parameters on a specific bar
        paramBrasserie = hash.substring(hash.indexOf("=") + 1); //Save parameter
        hash = hash.substring(0, hash.indexOf("?")); // Get the hash without parameter
        swipeEvent( document.querySelector('.swiper-pagination-switch.'+ hash ) ); // Force swipe to the page
    }

    console.log(hash);
    removeClass('.swiper-pagination-switch', 'active');
    addClass('.swiper-pagination-switch.' + hash, 'active');
    document.querySelector('.controls_pageTitle').innerHTML = document.querySelector('.swiper-pagination-switch.active').textContent;


    // SWIPER CONTROLS

    //bind to determined event(s)
    var pressTimer;
    var menuState = "swipe";
    var startEvent = 'mousedown';
    var endEvent = 'mouseup';

    setTouchEvent();
    function setTouchEvent() {
        if (Modernizr.touchevent) {
            startEvent = 'touchstart';
            endEvent = 'touchend';
        }
    }

    var controlsButton = document.querySelectorAll('.controls_button');
    for (var i = 0; i < controlsButton.length; i++) {
        // ON MOBILE - TOUCH EVENT
        controlsButton[i].addEventListener(startEvent , startingClickMenu );
        controlsButton[i].addEventListener(endEvent , endingClickMenu );
    }

    function startingClickMenu() {
        if (menuState == "open") {
            removeClass('.controls_menuOpen', 'openned');
            mySwiper.unlockSwipes();
            menuState = "close";
        } else {
            pressTimer = window.setTimeout(function() {
                addClass('.controls_menuOpen', 'openned');
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
