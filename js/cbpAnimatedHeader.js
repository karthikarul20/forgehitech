/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		didScroll = false,
		changeHeaderOn = 215;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
//			$("#pageheader").hide();
                        $("#mainDiv").css("width","100%");
                        $("#mainDiv").css("position","fixed");
                        $("#mainDiv").css("z-index","100");
                        $("#mainDiv").css("top","0px");
                        
//            classie.add(header, 'cbp-af-header-shrink');
                        
		}
		else {
//			$("#pageheader").show();
                        $("#mainDiv").css("width","");
                        $("#mainDiv").css("position","");
                        $("#mainDiv").css("z-index","");
                        $("#mainDiv").css("top","");
//            classie.remove(header, 'cbp-af-header-shrink');
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();