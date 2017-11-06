$(function () {
		//intializing maps
		loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDy8HRqwTgiat99dbFR6mDGi1_BSgArnpo&callback=initialize',
              function(){console.log('Welcome to ParishFinder');})
	
		//Initalizing Map
		
		PF.mapUI.mapUIinit();
		
		// baseUrl = document.location.origin;
		
		$('.spinner').hide();
		
		// handle submit buttons on the forms
	$('input[type="submit"]').on ("click", function (event){
		
			event.preventDefault();
			PF.ui.panels.currentState();
			postalCode 		  = $('input[name="postalCode"]').val();
			parishName 		  = $('input[name="parishName"]').val();
			clergyName 		  = $('input[name="clergyName"]').val();
			positionClergyID  = $('select[name="clergyPosition"] option:selected').val();
			cityID			  = $('select[name="city"]').val();
			massTypeID		  = $('select[name="eventList"]').val();
			StartTime		  = $("input[name = 'StartTime']").val();
			
			DayOfWeek = $('input:checked').map(function(){
					return $(this).val();
    			});
    			
		//Intialization of Global Variables

			var link = $(this);
			var userClicked = link.data("click");

		//if theres is an action with the given name, call it
		
		if( typeof PF.userActions[userClicked] === "function"){
			
			PF.userActions[userClicked].call(this, event );
		}
		
	});

    // manage panels if the windows size changes
	    window.onresize = function () {
	        PF.ui.panels.currentState();

	    };

    // handle search tabs
    $( '[role="tab"]' ).click( PF.ui.tabs.toggleTabs );

    // dig and climb panels
    $( '.nav-dig' ).click( function() {
	    if ($(".panel__list").children().length  === 0 ){
		    PF.ui.panels.dig();
		    setTimeout(function() {	PF.ui.panels.dig();},400);
	    }else{
			PF.ui.panels.dig();	    
	    }
      
    });

    $( '.nav-climb' ).click( function() {
	    if ($(".panel__list").children().length  === 0 ){
		    PF.ui.panels.climb();
		    setTimeout(function() {	PF.ui.panels.climb();},400);
	    }else{
			PF.ui.panels.climb();
	    }
        
    });

    // map
    $( '.nav-roll__up' ).click( function() {
        PF.ui.map.unfurl();
        // PF.mapUI.map.invalidateSize();
    });
    $( '.nav-roll__down' ).click( function() {
        PF.ui.map.unfurl();
        // PF.mapUI.map.invalidateSize();
    });

});

function loadScript(src,callback){
  
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(callback)script.onload=callback;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = src;
  }
function initialize(){
	//intializing google maps ~apparently the normal way is too mainstream~
	geocoder = new google.maps.Geocoder;
}

