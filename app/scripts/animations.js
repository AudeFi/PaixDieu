if (document.querySelector('.swiper-container')!=undefined) {
    /*
     *
     * VERTICAL SCROLL
     *
     */
	document.querySelector('.swiper-slide-active').addEventListener('scroll', function() {
	   console.log('scrolling');
	
	  	if (document.querySelector('.swiper-slide-active').scrollTop > 50) {
	  		document.querySelector('.logo').style.margin = "-340px 40px";
            document.querySelector('.swiper-slide-active').style.padding = "0px";
            document.querySelector('.controls_bgAnimation').style.height = "0";
	  		document.querySelector('.story__text-abbey_scroll').style.opacity = "0";
	  	}
	  	if (document.querySelector('.swiper-slide-active').scrollTop < 49) {
	  		document.querySelector('.swiper-slide-active').style.padding = "50px 20px";
	  		document.querySelector('.logo').style.margin = "40px 40px";
            document.querySelector('.controls_bgAnimation').style.height = "100%";
            document.querySelector('.story__text-abbey_scroll').style.opacity = "1";
	  	}
	});
	


}
