	PF.lonlat  = {
		centreOnMap :function (postalcode){
				
				var coordinates = new Array()
	    		geocoder.geocode( { 'address': postalcode }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					PF.mapUI.mapMarkerWithPopUp((results[0].geometry.location.lat())+0, (results[0].geometry.location.lng())+0, "#3ca0d3", "religious-christian", "large", postalcode, "This is you");
	        
                    PF.mapUI.map.panTo([(results[0].geometry.location.lat())+0, (results[0].geometry.location.lng())+0 ]);				
				}
			});
		},
	}