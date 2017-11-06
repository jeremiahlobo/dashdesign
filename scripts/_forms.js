	PF.forms ={
		//handles all form submissions and validation
		//redirects it to the controllers search
		ajaxPostHandler: function(url, userValues, cb ){
			$('.spinner').show();
			$.ajax({
			    	url  :baseURL+url,
					type : 'POST',
					data : userValues,
					
					success: function (data)
					{
						
						cb(data);
						$('.spinner').hide();						
			    	},
		    	
			    	error: function(XMLHttpRequest, textStatus) { 	
						$('.spinner').hide();						
							console.log(textStatus);
		
			    	}
			});
		},
		validation : {
		//validates using jquery validation pulgin
		//will have rules and messages	
		},
	};
	
	PF.userActions = {
		search: function (){

			//send input values to 
			switch (this.getAttribute("class")){
							
					case 'searchChurch'	:
							
							if ( postalCode ){
								// send postal code to Search Controller								
								PF.lonlat.centreOnMap(postalCode);
								
							}else {
								// send church and city info to Search Controller
								PF.ui.panels.dig();
								PF.forms.ajaxPostHandler('app/Search', { parishName : parishName, cityID : cityID }, PF.userActions.list.church );	
										
							}
						break;
					
					case 'searchClergy' :
								PF.ui.panels.dig();
								PF.forms.ajaxPostHandler('app/Search', { clergyName : clergyName, positionClergyID : positionClergyID }, PF.userActions.list.clergy );
						
						break;
					case 'searchMass':
								PF.ui.panels.dig();		
								PF.forms.ajaxPostHandler('app/Search', { massTypeID : massTypeID, DayOfWeek : DayOfWeek.get(), StartTime : StartTime }, PF.userActions.list.mass );	
						break;
				}
		},
		 
		list: {
			church: function( data ){
				$('.panel__list').empty();
				$('.panel__list').html( data );
					$('#churchlist > li').click(function () {
						PF.ui.panels.dig();
						console.log('here');
						PF.forms.ajaxPostHandler( 'app/information/parishDetails', { idParish : this.id },PF.userActions.information.church );

						PF.mapUI.flyToPin($(this).data('longitude'), $(this).data('latitude'), $(this).data('cid'))
					});
			},
			clergy : function( data ){
				$('.panel__list').empty();
				$('.panel__list').html( data );
					$('#clergylist > li').click(function () {
						console.log($(this).data('idparish'));
						PF.mapUI.boundsOnPID($(this).data('idparish'));
						PF.ui.panels.dig();

						PF.forms.ajaxPostHandler( 'app/information/clergyDetails', { idClergy : this.id },PF.userActions.information.clergy );
					});
			},
			mass: function( data ){
				$('.panel__list').empty();
				$('.panel__list').html( data );
						$('#masslist > li').click(function () {
					PF.ui.panels.dig();
					PF.forms.ajaxPostHandler( 'app/information/parishDetails', { idParish : this.id },PF.userActions.information.mass );
					PF.mapUI.flyToPin($(this).data('longitude'), $(this).data('latitude'), $(this).data('cid'))
				}); 
			}
		},
		information:{
			church:function(data){					
				
				$('.panel__detail').html(data);
				$(".churchtitle").on( 'click',function() {
					PF.mapUI.flyToPin( $(this).data("longitude"), $(this).data("latitude"), $(this).data("cid") );
					});
			},
			clergy : function(data){
				$('.panel__detail').html(data);
				$(".churchtitle").on( 'click',function() {
					PF.forms.ajaxPostHandler( 'app/information/parishDetails', { idParish : this.id },PF.userActions.information.mass );
					PF.mapUI.flyToPin( $(this).data("longitude"), $(this).data("latitude"), $(this).data("cid") );
					});
			},
			mass: function(data){
				$('.panel__detail').html(data);
				$(".churchtitle").on( 'click',function() {
					PF.mapUI.flyToPin( $(this).data("longitude"), $(this).data("latitude"), $(this).data("cid") );
					});
			},
		}
		
	}
	
	