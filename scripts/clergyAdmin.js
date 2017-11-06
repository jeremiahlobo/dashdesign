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
						thankYouModal.dialog(modal.modalLayout('300', '200', true, modal.thankYouCustoms.thankYouButtons, modal.thankYouCustoms.titleModal ));
						thankYouModal.append( '<p>Thank you for your confirmation. Please be patient as the page loads with your changes.</p>' );
						thankYouModal.dialog( "open" );
			    	},
		    	
			    	error: function(XMLHttpRequest, textStatus) { 	
						
				    	thankYouModal.empty();
						thankYouModal.dialog(modal.modalLayout('300', '200', true, modal.thankYouCustoms.thankYouButtons, modal.thankYouCustoms.titleModal ));
			        	thankYouModal.append( "Status: " + textStatus +'<br>'+"Unfortunately we can't complete your request right now. Please Contact Your Administrator" ); 
			        	thankYouModal.dialog( "open");
			    	}
			});
		}, 
		
		validate: function(){

			if(typeof formName === 'undefined'){
				formName = $('form').attr('class');
			}else{
				formName = formName;

			}

				
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
						'handle': {
							required: true
						},
						'street1': {
							required: true
						},
						'postalCode': {
							required: true
						},
						'areaCode': {
							required: true
						},
						'phoneNumber': {
							required: true
						},
						'clergyFirstName': {
							required: true
						}, 
						'clergyLastName': {
							required: true
						}
						
					},
// 					messages:{} to set message for every validation
				});
				
				
			if ($('.'+formName).valid())
			{
				
				confirmModal.dialog(modal.modalLayout('600', '500', true, modal.confirmCustoms.confirmButtons, modal.confirmCustoms.titleModal));
				confirmModal.empty();
		
				if (clergy.confirmMessage().length > 0 ){
						confirmModal.append( clergy.confirmMessage() );
					}else if(phone.confirmMessage().length > 0) {
						confirmModal.append( phone.confirmMessage() );
					}else if(social.confirmMessage().length > 0) {
						confirmModal.append( social.confirmMessage() );
					}else if(website.confirmMessage().length >0){
						confirmModal.append( website.confirmMessage() );		
					}else if(email.confirmMessage().length >0){
						confirmModal.append( email.confirmMessage() );					
					}else if (speakslanguage.confirmMessage().length > 0){
						confirmModal.append( speakslanguage.confirmMessage() );
					}else{
						false;
					}
				confirmModal.dialog( "open" );
			}else{
				$('.'+formName).valid();
			}
		},
		
		confirmSuccess: function(){
			console.log(Object.keys);
			if(Object.keys(phone.postAjaxArray()).length > 0) {
					modalHandler.ajaxHandler( 'admin/update','post', phone.postAjaxArray() );
				}else if(Object.keys(social.postAjaxArray()).length > 0) {
					modalHandler.ajaxHandler( 'admin/update','post', social.postAjaxArray() );
				}else if(Object.keys(website.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', website.postAjaxArray() );
				}else if(Object.keys(clergy.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', clergy.postAjaxArray() );
				}else if(Object.keys(email.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', email.postAjaxArray() );
				}else if(Object.keys(speakslanguage.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', speakslanguage.postAjaxArray() );
				}else if(Object.keys(removeClergy.postAjaxArray()).length > 0){
					modalHandler.ajaxHandler( 'admin/update','post', removeClergy.postAjaxArray() );
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
				 
				 
	
				summary['clergyid']   			= clergyid;
				summary['phid']					= clergyphid;
				summary['wbid']		  			= clergywebid;
				summary['emid']  				= clergyemid;
				summary['splangid']      		= clergysplang;
	
				userValues['phid']  			= clergyphid;
				userValues['socid'] 			= clergysocid;			
				userValues['wbid']  			= clergywebid;
				userValues['emid']  			= clergyemid;
				userValues['splangid']          = clergysplang;
				userValues['clergyid'] 			= clergyid;
				userValues['clergyexist']		= clergyexist;	
				userValues['clergypos']			= clergypos;
				userValues['addclergypos']		= addclergypos;		
				userValues['clergyname']		= clergyname;			
			 	userValues['clergyhaspos']		= clergyhaspos;
			 	userValues['remclergypos']		= remclergypos;

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
								var arrayPot1 = [];
								var arrayPot2 = [];	
							if ($(this).attr( 'name' ) === 'language' || $(this).attr('name') === 'speakslanguage'){
						
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
		
	var phone = {
			confirmMessage : function (){
								sourceArray = [];				
								sourceArray = dataHunter.serializeForm("clergyPhone")[0];
	
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
			postAjaxArray: function(){ return dataHunter.serializeForm("clergyPhone")[1];}	
	};
	
	var social = {
			confirmMessage : function (){
								sourceArray = [];
								sourceArray = dataHunter.serializeForm("clergySocial")[0];
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
			postAjaxArray: function(){ return dataHunter.serializeForm("clergySocial")[1];}
	
	};
	
	var website = {
			confirmMessage : function (){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("clergyWebsite")[0];
									message ='';
									for ( var i in sourceArray){
										switch (i){
											case 'webType' : message += 'Web Type : '+sourceArray[i]+" <br>"; break;
											case 'website':	message += i+': '+sourceArray[i]+" <br>"; break;
										}
									}
									return message;
								},
							
			postAjaxArray: function(){ return dataHunter.serializeForm("clergyWebsite")[1];}
	
	};
	var email= {
			confirmMessage : function (){
									sourceArray = [];					
									sourceArray = dataHunter.serializeForm("clergyEmail")[0];
									message ='';
									for ( var i in sourceArray){
										switch (i){
											case 'emailType' : message += 'Email Type : '+sourceArray[i]+" <br>"; break;
											case 'email':	message += i+': '+sourceArray[i]+" <br>"; break;
										}
									}
									return message;
								},
								
			postAjaxArray: function(){ return dataHunter.serializeForm("clergyEmail")[1];}
	
	};
	
	var clergy= {
		confirmMessage : function(){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("clergyInfo")[0];
									message ='';
	
									for ( var i in sourceArray){
	
										switch (i){
											case 'firstName':message += ' First Name : '+sourceArray[i]+" <br>";break;																
											case 'secondName':message += ' Second Name: '+sourceArray[i]+" <br>";break;
											case 'thirdName': message += ' Third Name: '+sourceArray[i]+" <br>"; break;
											case 'fourthName': message += ' Fourth Name: '+sourceArray[i]+" <br>"; break;
											case 'fifthName': message += 'Fifth Name: '+sourceArray[i]+" <br>"; break;
											case 'clergySuffix': message += ' Suffix: '+sourceArray[i]+" <br>"; break;
											case 'clergyPosition': message += ' Position: '+sourceArray[i]+" <br>"; break;
											case 'clergyTitle': message += 'Title: '+sourceArray[i]+" <br>"; break;
											case 'clergyParish': message += 'Parish: '+sourceArray[i]+" <br>"; break;
											case 'clergyActivity': message+= 'Current Status:'+sourceArray[i]+" <br>"; break;
											
										}
									}
	
									return message;
								},		
								
		postAjaxArray: function(){ return dataHunter.serializeForm("clergyInfo")[1];} //worked
			
		};
		
	var speakslanguage= {
		confirmMessage : function(){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("clergyLanguage")[0];
									message ='';
									
									for ( var i in sourceArray){
	
										switch (i){
											case 'speakslanguage': message += 'this Clergy speaks language: '+sourceArray[i]+" <br>"; break;
											
										}
									}

									return message;
								},		
								
		postAjaxArray: function(){ return dataHunter.serializeForm("clergyLanguage")[1];} //worked

		};
	var removeClergy = 	{
		confirmMessage : function(){
									sourceArray = [];
									sourceArray = dataHunter.serializeForm("clergyInfo")[0];
									message ='';
	
									for ( var i in sourceArray){
	
										switch (i){
											case 'firstName':message += ' First Name : '+sourceArray[i]+" <br>";break;																
											case 'secondName':message += ' Second Name: '+sourceArray[i]+" <br>";break;
											case 'thirdName': message += ' Third Name: '+sourceArray[i]+" <br>"; break;
											case 'fourthName': message += ' Fourth Name: '+sourceArray[i]+" <br>"; break;
											case 'fifthName': message += 'Fifth Name: '+sourceArray[i]+" <br>"; break;
											case 'clergySuffix': message += ' Suffix: '+sourceArray[i]+" <br>"; break;
											case 'clergyPosition': message += ' Position: '+sourceArray[i]+" <br>"; break;
											case 'clergyTitle': message += 'Title: '+sourceArray[i]+" <br>"; break;
											case 'clergyParish': message += 'Parish: '+sourceArray[i]+" <br>"; break;
											case 'clergyActivity': message+= 'Current Status:'+sourceArray[i]+" <br>"; break;
											
										}
									}
	
									return message;
								},		
								
		postAjaxArray: function(){ return dataHunter.serializeForm("clergyInfo")[1];} //worked
			
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

			confirmRemoveCustoms:{
					titleModal: "Confirm your edits",			
					confirmButtons:{
	
						Confirm: modalHandler.confirmSuccess,
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
	
	// controller user interaction in the ClergyDetails
	var actions = {
		
		add: function(){
			
			$("body").css('overflow', 'hidden');	
			//set modal size requires hieght, width, always modal = true and customs buttons. 
			addEditModal.dialog(modal.modalLayout('600', '500', true, modal.addCustoms.addButtons, modal.addCustoms.titleModal));
	
			//retrieve view through ajax
			switch (this.getAttribute("class")){
				
				case 'addClergy'	:
						modal.ajaxrequest('admin/updateClergyInformation/updateClergy', { add_clergy: true});
						
					break;
				case 'addClergyName'	:
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyName', { add_clergy: true});
						
					break;
				case 'addClergyPosition'	:
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyPosition', { add_clergy: true});
						
					break;

				case 'addClergyphone':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyphone', { clergyid : clergyid,  add_phone: true});
						
					break;
		
				case 'addClergywebsite': 
						modal.ajaxrequest('admin/updateClergyInformation/updateClergywebsite', { clergyid : clergyid,  add_website: true});	
					break;
					
				case 'addClergysocial': 
						modal.ajaxrequest('admin/updateClergyInformation/updateClergysocial', { clergyid : clergyid,  add_social: true});
					break;
										
				case 'addClergyemail':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyemail', { clergyid : clergyid,  add_email: true});
					break;
					
				case 'addClergyLanguage':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyLanguage', { clergyid : clergyid,  add_splang : true});
					break;				
			}
		},
		edit: function(){
			//Disable Scrolling
			$("body").css('overflow', 'hidden');	
			//set modal size requires hieght, width, always modal = true and customs buttons. 
			addEditModal.dialog(modal.modalLayout('700', '500', true, modal.editCustoms.editButtons, modal.editCustoms.titleModal));
			
			//retrieve view through ajax

			switch (this.getAttribute("class")){

				
				case 'editClergy':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergy', { clergyid : clergyid});
					break;
				case 'editClergyName':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyName', { clergyid : clergyid});
					break;
				case 'editClergyPosition':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyPosition', { clergyid : clergyid, clergyhaspos: clergyhaspos});
					break;
				case 'editClergyphone':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyphone', { clergyid : clergyid,  clergyphid : clergyphid});
					break;
				case 'editClergysocial': 
						modal.ajaxrequest('admin/updateClergyInformation/updateClergysocial', { clergyid : clergyid,  clergysocid: clergysocid});
					break;	
				case 'editClergywebsite':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergywebsite', { clergyid : clergyid,  clergywebid : clergywebid});
						
					break;
				case 'editClergyemail':

						modal.ajaxrequest('admin/updateClergyInformation/updateClergyemail', { clergyid : clergyid,  clergyemid : clergyemid});
						
					break;
				case 'editClergyLanguage':
						modal.ajaxrequest('admin/updateClergyInformation/updateClergyLanguage', { clergyid : clergyid,  clergysplang : clergysplang});
					break;
			}
		}, 
		
		remove: function(){
			//Disable Scrolling
			$("body").css('overflow', 'hidden');	
			//set modal size requires hieght, width, always modal = true and customs buttons. 
			addEditModal.dialog(modal.modalLayout('300', '500', true, modal.editCustoms.editButtons, modal.editCustoms.titleModal));
			
			//retrieve view through ajax

			switch (this.getAttribute("class")){
				case 'removeClergyPosition' :
						modal.ajaxrequest('admin/updateClergyInformation/removeClergyPosition', { clergyid : clergyid, clergyhaspos: clergyhaspos, remclergypos: remclergypos});
					break;
				
			}
		},
	};
	$(" button[data-click] ").on ("click", function (event){

			//baseURL is defined in ClergyDetails as it is a part of php page.

			//Intialization of Global Variables
			addEditModal  = $( ".addEditModal" );
			confirmModal  = $( ".confirmModal" );

			thankYouModal = $( ".thankYouModal" );

			//an object which will hold uservalues before it is sent to the controller
			userValues 	  = {}; 
			clergyid      =  $(this).data('clergyid');			
			clergyphid    =  $(this).data('phid');
			clergysocid   =  $(this).data('socid');
			clergywebid   =  $(this).data('wbid');
			clergyemid    =  $(this).data('emid');
			clergysplang  =  $(this).data('splangid');
			clergyexist   =  $(this).data('clergyexist');
			clergyname    =  $(this).data('clergyname');
			clergypos     =  $(this).data('clergypos');
			addclergypos  =  $(this).data('addclergypos');
			clergyhaspos  =  $(this).data('clergyhasposition');
			remclergypos  =  $(this).data('remclergypos');
			


			var link = $(this);
			var userClicked = link.data("click");

			event.preventDefault();	
			//if theres is an action with the given name, call it
		
		if( typeof actions[userClicked] === "function"){
	
			actions[userClicked].call( this, event );
		}
		
	});