if (document.querySelector('.swiper-container')!=undefined) {
    /*
     *
     * VERTICAL SCROLL
     *
     */

 	console.log('I am animations.js');	
 	
 	document.querySelector('.swiper-slide-active').onclick = function(){
 		var element = document.querySelector('.swiper-slide-active');
 		console.log('clic on element');
 		console.log(element + element.scrollTop);	
 	}

	document.querySelector('.swiper-slide-active').addEventListener('scroll', function() {
	        console.log('scrolling');
	
	  	if (document.querySelector('.swiper-slide-active').scrollTop > 50) {
	  		console.log('scroll supérieur à 10');
	  		document.querySelector('.logo').style.margin = "-340px 40px";
	  		document.querySelector('.swiper-slide-active').style.padding = "0px";
	  	}
	  	if (document.querySelector('.swiper-slide-active').scrollTop < 49) {
	  		console.log('scroll inférieur à 0');
	  		document.querySelector('.swiper-slide-active').style.padding = "50px 20px";
	  		document.querySelector('.logo').style.margin = "40px 40px";

	  	}
	});
	


}
