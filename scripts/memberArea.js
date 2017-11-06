/* memberArea.js
 * form validation 
 * modal layouts - add or edit/confimation/Thank you
 *
 */ 
		var modalHandler = {
		
		ajaxHandler: function(url, type, userValues){
			console.log(userValues);
			$.ajax({
			    	url  :baseURL+url,
					type : type,
					data : userValues,
				
					success: function ()
					{
						thankYouModal.empty();
						thankYouModal.dialog(modal.modalLayout('300','200', true, modal.thankYouCustoms.thankYouButtons, modal.thankYouCustoms.titleModal ));
						thankYouModal.append( '<p>Thank you for your confirmation. Please be patient as the page loads with your changes.</p>' );
						thankYouModal.dialog( "open" );
			    	},
		    	
			    	error: function(XMLHttpRequest, textStatus) { 	
						
				    	thankYouModal.empty();
						thankYouModal.dialog(modal.modalLayout('300','200', true, modal.thankYouCustoms.thankYouButtons, modal.thankYouCustoms.titleModal ));
			        	thankYouModal.append( "Status: " + textStatus +'<br>'+"Unfortunately we can't complete your request right now. Please Contact Your Administrator" ); 
			        	thankYouModal.dialog( "open");
			    	}
			});
		}, 
		
		validate: function(){

				formName = $('form').attr('class');
				$.validator.setDefaults({
					errorPlacement  :function(error, element){
						if (element.prop('type') === 'checkbox'){
							error.insertAfter(element.parent());
						} else {
							error.insertAfter(element);
						}
					}
					
				});
				
				$('.'+formName).validate({
					rules:{
// 						
						'handle': {
							required: true
						},
						'url':{
							required: true
						},
						'street1' :{
							required: true
						},
						'postalCode':{
							required: true
						},
						'areaCode':{
							required: true
						},
						'phoneNumber':{
							required: true
						},
						'clergyFirstName':{
							required: true
						}, 
						'clergyLastName':{
							required: true
						},									 
						'dayOfMonth': {
							required: true
						},
						'Month':{
							required :true,
							minlength: 1
						},
						'email' :{
							required :false,
						},
						'language' :{
							required: true,
						}
						
					},
// 					messages:{} to set message for every validation
				});
				
			if ($('.'+formName).valid())
			{
				
				confirmModal.dialog(modal.modalLayout('600', '500', true, modal.confirmCustoms.confirmButtons, modal.confirmCustoms.titleModal));
				confirmModal.empty();
		
				if (address.confirmMessage().length > 0 ){
						confirmModal.append( address.confirmMessage() );
					}else if(phone.confirmMessage().length > 0) {
						confirmModal.append( phone.confirmMessage() );
					}else if(social.confirmMessage().length > 0) {
						confirmModal.append( social.confirmMessage() );
					}else if(website.confirmMessage().length >0){
						confirmModal.append( website.confirmMessage() );		
					}else if(email.confirmMessage().length >0){
						confirmModal.append( email.confirmMessage() );					
					}else if(clergy.confirmMessage().length >0){
						confirmModal.append( clergy.confirmMessage() );					
					}else if (events.confirmMessage().length >0){
						confirmModal.append( events.confirmMessage() );
					}else{
						false;
					}
				confirmModal.dialog( "open" );
			}else{
				$('.'+formName).valid();
			}
		},
		
		confirmSuccess: function(){
			
			if (Object.keys(address.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', address.postAjaxArray() );
				}else if(Object.keys(phone.postAjaxArray()).length > 0) {
					modalHandler.ajaxHandler( 'admin/update','post', phone.postAjaxArray() );
				}else if(Object.keys(social.postAjaxArray()).length > 0) {
					modalHandler.ajaxHandler( 'admin/update','post', social.postAjaxArray() );
				}else if(Object.keys(website.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', website.postAjaxArray() );
				}else if(Object.keys(clergy.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', clergy.postAjaxArray() );
				}else if(Object.keys(email.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', email.postAjaxArray() );
				}else if (Object.keys(events.postAjaxArray()).length > 0){
		 			modalHandler.ajaxHandler( 'admin/update','post', events.postAjaxArray() );
				}else{
					false;
				}
			},
			
		thankYouSuccess: function(){
				addEditModal.dialog( "close" );
				confirmModal.dialog( "close" );
				$( this ).dialog( "close" );
				userValues = {};
				location.reload();		
			}
	};
	
	var dataHunter = {
		
		serializeForm :function (nameOfForm){
			var summary =[];
			var userValues={};
			 $('.'+nameOfForm+' :input').each(function (index, element) {
	
				summary['cid']   	= cid;
				summary['aid'] 	 	= aid;
				summary['phid']  	= phid;
				summary['wbid']  	= wbid;
				summary['emid']  	= emid;
				summary['evtSchid'] = evtSchid;
	
				userValues['cid'] 				= cid;
				userValues['aid'] 				= aid;
				userValues['phid']  			= phid;
				userValues['socid'] 			= socid;			
				userValues['wbid']  			= wbid;
				userValues['emid']  			= emid;
				userValues['eventID'] 			= eventid;
				userValues['evtSchid'] 			= evtSchid;
				userValues['clergyid'] 			= clergyid;	
				userValues['pid'] 				= pid;			
			 	
				 if ($(element).is( 'input' )){
						if ($(this).is( ':checked' )){
							if ($(this).attr('name') === 'dayOfweek[]' || $(this).attr( 'name' ) === 'Month'){
								var arrayPot = [];
								$('input[name="'+$(element).attr( 'name' )+'"]:checked' ).each(function(){
									arrayPot.push($(this).val());
								});
	 							
								summary[$(element).attr( 'name' )] = arrayPot;
								userValues[$(element).attr( 'name' )] = arrayPot; 
							}else{
								summary[$(element).attr( 'name' )] = $(element).val();
								userValues[$(element).attr( 'name' )]	=  $(element).val(); 
							}
						}
						if ($(element).attr( 'type' ) === 'text' ){
							if ($(element).attr( 'name' ) ==='dayOfMonth' ){
								if($(element).val() !== '0' ){
								summary[$(element).attr( 'name' )] = $(element).val();
								userValues[$(element).attr( 'name' )]	=  $(element).val(); 
								 
								}
							}else{
								summary[$(element).attr( 'name' )] = $(element).val();
								userValues[$(element).attr( 'name' )]	=  $(element).val();
							}
				 			
						} 
				} else if ($(element).is( 'select' )){
							if ($(this).attr( 'name' ) === 'language'){
								var arrayPot1 = [];
								var arrayPot2 = [];							
								$('select[name="'+$(element).attr( 'name' )+'"] :selected' ).each(function(){
									arrayPot2.push($(this).text())
									arrayPot1.push($(this).val());
								});
								summary[$(element).attr( 'name' )] = arrayPot2;
								userValues[$(element).attr( 'name' )] = arrayPot1;
								
							}else{
								
							summary[$(element).attr( 'name' )] = $( 'select[name="'+$(element).attr('name')+'"] option:selected' ).text();
							userValues[$(element).attr( 'name' )]	=  $( 'select[name="'+$(element).attr('name')+'"] option:selected' ).val();
							}	 
	
						}else{
							summary[ $(element).attr( 'name' ) ] = $(element).find( ":selected" ).text();
							userValues[$(element).attr( 'name' )]	=  $(element).val();
						}
				});
				return [summary, userValues];
		},
	};
		
	var address = {
			confirmMessage : function (){
								sourceArray = [];				
								sourceArray = dataHunter.serializeForm("churchAddress")[0];
	
								message ='';
								for ( var i in sourceArray){
									switch (i){
										case 'addressType' : message += 'Address Type : '+sourceArray[i]+" <br>"; break;
										case 'Street1':	message+= i+' : '+sourceArray[i]+" <br>"; break;
										case 'city' : message+= 'City : '+sourceArray[i]+" <br>"; break;
										case 'Abbreviation' : message += 'Province : '+sourceArray[i]+" <br>"; break;
										case 'postalCode' : message += i+' : '+sourceArray[i]+" <br>"; break;
										case 'latitude' : message += i+' : '+sourceArray[i]+" <br>"; break;
										case 'longitude' : message += i+' : '+sourceArray[i]+" <br>"; break;
									}
								}
								return message;
							},
							
			postAjaxArray: function(){ return dataHunter.serializeForm("churchAddress")[1];} //worked
	};
	
	var phone = {
			confirmMessage : function (){
								sourceArray = [];				
								sourceArray = dataHunter.serializeForm("churchPhone")[0];
	
								message ='';
								for ( var i in sourceArray){
									switch (i){
										case 'phoneType' : message += 'Phone Type : '+sourceArray[i]+" <br>"; break;
										case 'areaCode':	message += 'Area Code : '+sourceArray[i]+" <br>"; break;
										case 'phoneNumber' : message+= 'Phone Number : '+sourceArray[i]+" <br>"; break;
									}
								}
								return message;
							},
			postAjaxArray: function(){ return dataHunter.serializeForm("churchPhone")[1];}//worked
	
	};
	
	var social = {
			confirmMessage : function (){
								sourceArray = [];
								sourceArray = dataHunter.serializeForm("churchSocial")[0];
								message ='';
	
								for ( var i in sourceArray){
									switch (i){
										case 'socialType' : message += 'Social Type : '+sourceArray[i]+" <br>"; break;
										case 'handle':	message += 'Handle : '+sourceArray[i]+" <br>"; break;
										case 'url' : message+= 'URL : '+sourceArray[i]+" <br>"; break;
									}
								}
								return message;
							},
			postAjaxArray: function(){ return dataHunter.serializeForm("churchSocial")[1];}//worked
	
	};
	
	var website = {
			confirmMessage : function (){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("churchWebsite")[0];
									message ='';
									for ( var i in sourceArray){
										switch (i){
											case 'webType' : message += 'Web Type : '+sourceArray[i]+" <br>"; break;
											case 'website':	message += i+': '+sourceArray[i]+" <br>"; break;
										}
									}
									return message;
								},
							
			postAjaxArray: function(){ return dataHunter.serializeForm("churchWebsite")[1];}//worked
	
	};
	
	var email= {
			confirmMessage : function (){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("churchEmail")[0];
									message ='';
									for ( var i in sourceArray){
										switch (i){
											case 'webType' : message += 'Web Type : '+sourceArray[i]+" <br>"; break;
											case 'website':	message += i+': '+sourceArray[i]+" <br>"; break;
										}
									}
									return message;
								},
							
			postAjaxArray: function(){ return dataHunter.serializeForm("churchEmail")[1];}//worked
	
	};
	
	var events= {
			confirmMessage : function(){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("churchEvents")[0];
									message ='';

									for ( var i in sourceArray){
										
										switch (i){
											case 'eventType':message += 'Event Type : '+sourceArray[i]+" <br>";break;																
											case 'Schedule':message += 'Schedule : '+sourceArray[i]+" <br>";break;
											case 'dayOfweek[]': message += 'on the days of: '+sourceArray[i]+" <br>"; break;
											case 'startTime': message += i+': '+sourceArray[i]+" <br>"; break;
											case 'endTime': message += i+': '+sourceArray[i]+" <br>"; break;
											case 'Month': message += sourceArray[i]+' of the month '+" <br>"; break;
											case 'dayOfMonth': message += 'Day of the Month: '+sourceArray[i]+" <br>"; break;
											case 'language': message += 'this event has language/s: '+sourceArray[i]+" <br>"; break;
											case 'description': message += 'Description: '+sourceArray[i]+" <br>"; break;
										}	
									}
	
									return message;
								},
								
			postAjaxArray: function(){ return dataHunter.serializeForm("churchEvents")[1];} //worked
		};
	
	
	var clergy= {
		confirmMessage : function(){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("churchClergy")[0];
									message ='';
	
									for ( var i in sourceArray){
	
										switch (i){
											case 'clergyFirstName':message += 'First Name : '+sourceArray[i]+" <br>";break;																
											case 'clergySecondName':message += 'Second Name: '+sourceArray[i]+" <br>";break;
											case 'clergyThirdName': message += 'Third Name: '+sourceArray[i]+" <br>"; break;
											case 'clergyFourthName': message += 'Fourth Name: '+sourceArray[i]+" <br>"; break;
											case 'clergyFifthName': message += 'Fifth Name: '+sourceArray[i]+" <br>"; break;
											case 'clergySuffix': message += ' clergySuffix '+sourceArray[i]+" <br>"; break;
											case 'clergyPosition': message += ' clergyPosition '+sourceArray[i]+" <br>"; break;
											case 'clergyTitle': message += 'clergyTitle: '+sourceArray[i]+" <br>"; break;
											
										}
									}
	
									return message;
								},
								
		postAjaxArray: function(){ return dataHunter.serializeForm("churchClergy")[1];} //worked
			
		};
	
	
	// Object to managing the modal specific actions
	modal = {
			modalLayout :function (modalheight, modalwidth, noParentPageAccess, actionButtons, title)
			{

				return {
					height: modalheight,
					title: title,
					width : modalwidth,
					modal: noParentPageAccess, 
					buttons: actionButtons
					}
			},
		
			addCustoms :{
					titleModal: "Please add new details",
					addButtons: {
						Add : modalHandler.validate, 
						Cancel: function(){
							$("body").css('overflow', 'visible');
							addEditModal.dialog("close");
						
						}
					}
				},
					 
			editCustoms:{
					titleModal: "Please edit the details", 	
					editButtons: {
					
						Edit : modalHandler.validate,
						Cancel: function(modalBox){
						$("body").css('overflow', 'visible');	
							addEditModal.dialog("close");
							}
					},
				},
			confirmCustoms:{
					titleModal: "Confirm your edits",			
					confirmButtons:{
	
						Confirm: modalHandler.confirmSuccess,
						Back: function(modalBox){
							confirmModal.dialog("close");
							}
						}
				},
			thankYouCustoms:{
					titleModal: "Sending Confirmation…",
					thankYouButtons:{
						Ok: modalHandler.thankYouSuccess
					}
			},
			ajaxrequest : function (url, data, successcallbacks, errorcallback)
				{
					return $.ajax({
								url  : baseURL+url,
								type : 'POST',
								data : data,
								success: function(msg){
									addEditModal.empty();
									addEditModal.append( msg );
									addEditModal.dialog( "open" );
								},
								error:	errorcallback
							});
				},
		};
	
	// controller user interaction in the ChurchDetails
	var actions = {
		
		add: function(){
							$("body").css('overflow', 'hidden');	
			//set modal size requires hieght, width, always modal = true and customs buttons. 
			addEditModal.dialog(modal.modalLayout('600', '500', true, modal.addCustoms.addButtons, modal.addCustoms.titleModal));
	
			//retrieve view through ajax
			switch (this.getAttribute("class")){
				case 'addChurchaddress'	:
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchaddress', { cid : cid,  add_address: true});
						
					break;
				
				case 'addChurchphone':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchphone', { cid : cid,  add_phone: true});
						
					break;
		
				case 'addChurchwebsite': 
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchwebsite', { cid : cid,  add_website: true});	
					break;
					
				case 'addChurchsocial': 
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchsocial', { cid : cid,  add_social: true});
					break;
										
				case 'addChurchemail':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchemail', { cid : cid,  add_email: true});
	
					break;
				case 'addChurchevent':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchevent', { cid : cid, add_events: true });
					break;
				case 'addChurchclergy':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchclergy', { cid : cid, add_clergy: true });
					break;	
			}
		},
		edit: function(){
			//Disable Scrolling
			$("body").css('overflow', 'hidden');	
			//set modal size requires hieght, width, always modal = true and customs buttons. 
			addEditModal.dialog(modal.modalLayout('800', '500', true, modal.editCustoms.editButtons, modal.editCustoms.titleModal));
			
			//retrieve view through ajax
			switch (this.getAttribute("class")){
						
				case 'editChurchaddress'	:
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchaddress', { cid : cid,  aid : aid});
					break;
				case 'editChurchphone':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchphone', { cid : cid,  phid : phid});
					break;
				case 'editChurchsocial': 
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchsocial', { cid : cid,  socid: socid});
					break;	
				case 'editChurchwebsite': 
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchwebsite', { cid : cid,  wbid : wbid});
						
					break;
				case 'editChurchclergy':
// 						modal.ajaxrequest('admin/updateChurchInformation/updateChurchclergy', { cid : cid, pid :pid, clergyid: clergyid });
					window.location.href = baseURL+"admin/updateChurchInformation/updateChurchclergy/"+clergyid;
					break;	
				case 'editChurchemail':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchemail', { cid : cid,  emid : emid});
						
					break;
				case 'editChurchevent':
						modal.ajaxrequest('admin/updateChurchInformation/updateChurchevent', { cid : cid,  evtSchid : evtSchid});
					break;
			}
		}
	};
	
	$(" button[data-click] ").on ("click", function (event){

			//baseURL is defined in ChurchDetails as it is a part of php page.
		
			//Intialization of Global Variables
			addEditModal  = $( ".addEditModal" );
			confirmModal  = $( ".confirmModal" );
			thankYouModal = $( ".thankYouModal" );
			//an object which will hold uservalues before it is sent to the controller
			userValues 	  = {}; 
			cid           =  $(this).data('cid');
			pid           =  $(this).data('pid');
			aid           =  $(this).data('aid');
			phid          =  $(this).data('phid');
			socid         =  $(this).data('socid');
			wbid          =  $(this).data('wbid');
			emid  	      =  $(this).data('emid');
			clergyid      =  $(this).data('clergyid');
			evtSchid      =  $(this).data('eventscheduleid');
			eventid	      =  $(this).data('evtid');
			
			var link = $(this);
			var userClicked = link.data("click");
		
			event.preventDefault();
		
			//if theres is an action with the given name, call it
		
		if( typeof actions[userClicked] === "function"){
	
			actions[userClicked].call(this, event );
		}
		
	});