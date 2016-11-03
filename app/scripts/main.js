//Navigation scroll
var menu_link = document.querySelectorAll('.main-menu a');
for(var i = 0; i < menu_link.length; i++) {
    menu_link[i].addEventListener('click',function(event){
        var $anchor = $(this);         
        $('html, body').stop().animate({
            scrollLeft: $($anchor.attr('href')).offset().left
        }, 1000);
        event.preventDefault();
    });
}