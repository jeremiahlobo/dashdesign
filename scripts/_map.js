var PF = PF || {};

	L.mapbox.accessToken = 'pk.eyJ1IjoidHJhdmlzdy1yY2IiLCJhIjoiV1I2X0ZlQSJ9.HuDZt_-iESg9dg_PQvTFqA';
	var markersList = new Array();
	PF.mapUI = {

		// initialize map then featurelayer
		map : L.mapbox.map('map', 'travisw-rcb.j03n31d8'),

    	featureLayer : new L.mapbox.featureLayer(),

		mapUIinit:function () {

		// populate initial view
		PF.mapUI.featureLayer.loadURL('index.php/site/show_churches');


		// initialize view and attempt to geolocate
	    if ( !navigator.geolocation ){
	        PF.mapUI.map.fitBounds(PF.mapUI.featureLayer.getBounds());
	    	} else {
	        		PF.mapUI.map.locate();
	    		}

		// location found handler
	    	PF.mapUI.findCurrentLocation();


	    //add markers
	    PF.mapUI.featureLayer.on('layeradd', function (e) {
			marker = e.layer
			markers = L.marker([marker.feature.properties.Latitude, marker.feature.properties.Longitude],{idChurch: ""+marker.feature.properties.ChurchID+"" , idParish :""+marker.feature.properties.idParish+""}).setIcon(L.icon({
				  iconUrl: "http://a.tiles.mapbox.com/v4/marker/pin-m-place-of-worship+dd5252.png?access_token=pk.eyJ1IjoidHJhdmlzdy1yY2IiLCJhIjoiV1I2X0ZlQSJ9.HuDZt_-iESg9dg_PQvTFqA",
				  iconSize: [30, 70],
				  iconAnchor: [15, 35],
				  popupAnchor: [0, -35]
				}));
			markersList.push(markers);
			markers.addTo(PF.mapUI.map);
			markers.bindPopup(PF.mapUI.loadInfoMarkers(marker.feature));

			markers.on('click', function () {
 				PF.mapUI.pinPopUPInformation(this.options);
			});
	    });
		// event handlers
			PF.mapUI.featureLayer.on('click', function (e) {
	    	PF.mapUI.map.panTo(e.layer.getLatLng());
	    });

	},
	    //refresh map
refresh : function () {
    	PF.mapUI.map.invalidateSize();
	},


	findCurrentLocation : function (){
		PF.mapUI.map.on('locationfound', function (e){
	        var myMarker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), {
		            icon: L.mapbox.marker.icon({
		                'marker-color': '#4098d4',
		                'marker-symbol': 'star'
						})
	        }).bindPopup('Here I am!').addTo(PF.mapUI.map);

	        try {
	            PF.mapUI.map.fitBounds(PF.filter.findNearest(3, myMarker).getBounds());
	        } catch(err) {
	            PF.mapUI.map.setView(myMarker.getLatLng(), 13);
	        }

		// geolocation available but returns error
			PF.mapUI.map.on('locationerror', function () {
		        PF.mapUI.map.fitBounds(featureLayer.getBounds());
				});
		});
	},

	loadInfoMarkers :function(feature){

		var title = '<h3>' + feature.properties.Church + '</h3>';

	    if (feature.properties.areaCode !== null && feature.properties.phone !== 'Fax') {
	         phoneNumber= '<p><a href="tel:1' + feature.properties.areaCode + '' + feature.properties.phone +
	            '"> (' + feature.properties.areaCode +
	            ') ' + feature.properties.phone.replace(/\W/g, '').replace(/(...)/, '$1-') + '</a></p>';
	    }

	    if (feature.properties.Email !== null) {
	        email = '<p><a href="mailto:' + feature.properties.Email +
	            '">' + feature.properties.Email + '</a></p>';
	    }

	    if (feature.properties.WebsiteUrl !== null) {
	        website = '<p><a href= http://' + feature.properties.WebsiteUrl +
	            ' target="_blank">' + feature.properties.WebsiteUrl + '</a></p>';
	    }
	    return title+'<div class="churchContent">'+phoneNumber+email+website+'</div>';

	},



	mapMarkerWithPopUp : function( lat, lon, markerColor, markerSymbol, markerSize, features ) {


		L.marker(new L.LatLng( lat, lon ),{
	            icon: L.mapbox.marker.icon({
	                "marker-color": markerColor,
					"marker-size": markerSize,
					"marker-symbol": markerSymbol
	            })
	    }).addTo(PF.mapUI.map);
	},

	openMarkerInfo: function(cid){
        for (var i in markersList){

            var markerID = markersList[i].options.idChurch;

            if (markerID == cid){
                markersList[i].openPopup();
            }
        }
    },

    pinPopUPInformation: function (info){
			PF.ui.panels.dig();
			setTimeout(function() {	PF.ui.panels.dig();},400);
		    PF.forms.ajaxPostHandler( 'App/information/parishDetails', { idParish : info.idParish },PF.userActions.information.church );

	},

    flyToPin: function (lon, lat, cid) {
		PF.mapUI.map.setView([lat, lon], 17);
		PF.mapUI.openMarkerInfo(cid);
	},

	boundsOnPID:function (pid){
		longlatbounds = new Array();
		for (var i in markersList){

			var markerID = markersList[i].options.idParish;


            if (markerID == pid){
	                        	console.log(markerID);
	            longlatbounds.push( markersList[i].getLatLng());
	            PF.mapUI.openMarkerInfo(markersList[i].options.idChurch);
            }

        }
	            bounds = L.latLngBounds(longlatbounds);
	            PF.mapUI.map.fitBounds(bounds, {maxZoom:16, padding:[50, 50]});

	}



};



/* End of file _map.js */
/* Location: ./script/_map.js */
