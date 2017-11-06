var validation = 
{
		validClass: 'is-valid',
		charUnder : "minimum 4 characters",
	fields:{ 
		//Rules
/*
			text:{
				reg: /\b(?=.*\d)(?=.*[a-zA-Z]).{6,}\b/g,
				hint: 'Alphanumerical please',
				error: 'No Special characters Please',
			},
*/

			postalCode: {
				reg: /[A-Z|a-z]{1}[\d]{1}[A-Z|a-z]{1}?[\d]{1}[A-Z|a-z]{1}[\d]{1}/g,
				hint: 'eg: A1A2B3 No spaces',
				error: 'Try the hint',
			}, 
			
			search :{
				reg: /[^a-zA-Z0-9\s\\?\\,\\.\\;\\']/g,
				hint: "We can't have Characters like $, %, ^, &, *, ( ,)",
			},
			
			tel :{
				reg: /\b\d{3}[-. ]?\d{3}[-. ]?\d{4}\b/g,		
				hint: "only numbers please",
			
			},
			
			day :{
				reg: /^([0-2]?[0-9]|3[01]|[1-31])$/g,
				hint: 'Enter a number between 1 and 31',
				error: 'see hint'
			},
			
			email :{
				reg: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/g,
				hint: "please type in a valid email",
			},
			
			url :{
				reg: /http(s?):\/\/|([\w]+\.){1}([\w]+\.?)+/g,
				hint: "please type in a valid website URL example www.google.ca ",
			}
		},
		validateLength : function (element)
		{
			if ( element.length < validation.fields.minLength) return true
			else if ( element.length > validation.fields.maxLength) return true
			else if ( 0 == element.length ) return true
			else return false;
		},

		regTest : function ( fieldType, fieldValue )
		{
			for (var i in validation.fields){
				
					return(validation.fields[i].reg.test(fieldValue)? true : false ); 
				}
			
		},
};

//init
$(function (){

$(':input').focus(function (){
	
		$(this).on('blur', function(){
			if ( !validation.validateLength( this.value ) ){
				console.log(this.value);
				if (true === validation.regTest($(this).attr("type"), this.value)){	
					$(this).next(".error-message").html('');
					$(this).siblings( "input[type = 'submit']" ).prop('disabled', false).parent().removeClass('is-invalid');
				}else{
					$(this).closest( "input[type = 'submit']" ).prop('disabled', true);
					$(this).parent().addClass('is-invalid');
					if ( $(this).attr("type") === 'search'){$(this).next(".error-message").html(validation.fields.search.hint);}
					else if ( $(this).attr("type") === 'text' ){$(this).next(".error-message").html('');}
					else if ( $(this).attr("type") === 'email' ){$(this).next(".error-message").html(validation.fields.email.hint);}
					else if ( $(this).attr("type") === 'tel'  ){$(this).next(".error-message").html(validation.fields.tel.hint);}
					else if ( $(this).attr("type") === 'url'  ){$(this).next(".error-message").html(validation.fields.url.hint);}
					else if ( $(this).attr("type") === 'postalCode' ){$(this).next(".error-message").html(validation.fields.postalCode.hint);}
					else if ( $(this).attr("type") === 'day' ){$(this).next(".error-message").html(validation.fields.day.hint);}
				}			
			}else{

				if ( this.value.length <= validation.fields.minLength ) return $(this).nextAll(".hint-message").html( validation.fields.charUnder )
				
			}
		});
	});
});


