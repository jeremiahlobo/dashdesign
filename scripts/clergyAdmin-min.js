var modalHandler={ajaxHandler:function(e,a,r){console.log(r),$.ajax({url:baseURL+e,type:a,data:r,success:function(){thankYouModal.empty(),thankYouModal.dialog(modal.modalLayout("300","200",!0,modal.thankYouCustoms.thankYouButtons,modal.thankYouCustoms.titleModal)),thankYouModal.append("<p>Thank you for your confirmation. Please be patient as the page loads with your changes.</p>"),thankYouModal.dialog("open")},error:function(e,a){thankYouModal.empty(),thankYouModal.dialog(modal.modalLayout("300","200",!0,modal.thankYouCustoms.thankYouButtons,modal.thankYouCustoms.titleModal)),thankYouModal.append("Status: "+a+"<br>Unfortunately we can't complete your request right now. Please Contact Your Administrator"),thankYouModal.dialog("open")}})},validate:function(){"undefined"==typeof formName?formName=$("form").attr("class"):formName=formName,$.validator.setDefaults({errorPlacement:function(e,a){"checkbox"===a.prop("type")?e.insertAfter(a.parent()):e.insertAfter(a)}}),$("."+formName).validate({rules:{handle:{required:!0},street1:{required:!0},postalCode:{required:!0},areaCode:{required:!0},phoneNumber:{required:!0},clergyFirstName:{required:!0},clergyLastName:{required:!0}}}),$("."+formName).valid()?(confirmModal.dialog(modal.modalLayout("600","500",!0,modal.confirmCustoms.confirmButtons,modal.confirmCustoms.titleModal)),confirmModal.empty(),clergy.confirmMessage().length>0?confirmModal.append(clergy.confirmMessage()):phone.confirmMessage().length>0?confirmModal.append(phone.confirmMessage()):social.confirmMessage().length>0?confirmModal.append(social.confirmMessage()):website.confirmMessage().length>0?confirmModal.append(website.confirmMessage()):email.confirmMessage().length>0?confirmModal.append(email.confirmMessage()):speakslanguage.confirmMessage().length>0&&confirmModal.append(speakslanguage.confirmMessage()),confirmModal.dialog("open")):$("."+formName).valid()},confirmSuccess:function(){console.log(Object.keys),Object.keys(phone.postAjaxArray()).length>0?modalHandler.ajaxHandler("admin/update","post",phone.postAjaxArray()):Object.keys(social.postAjaxArray()).length>0?modalHandler.ajaxHandler("admin/update","post",social.postAjaxArray()):Object.keys(website.postAjaxArray()).length>0?modalHandler.ajaxHandler("admin/update","post",website.postAjaxArray()):Object.keys(clergy.postAjaxArray()).length>0?modalHandler.ajaxHandler("admin/update","post",clergy.postAjaxArray()):Object.keys(email.postAjaxArray()).length>0?modalHandler.ajaxHandler("admin/update","post",email.postAjaxArray()):Object.keys(speakslanguage.postAjaxArray()).length>0?modalHandler.ajaxHandler("admin/update","post",speakslanguage.postAjaxArray()):Object.keys(removeClergy.postAjaxArray()).length>0&&modalHandler.ajaxHandler("admin/update","post",removeClergy.postAjaxArray())},thankYouSuccess:function(){addEditModal.dialog("close"),confirmModal.dialog("close"),$(this).dialog("close"),userValues={},location.reload()}},dataHunter={serializeForm:function(e){var a=[],r={};return $("."+e+" :input").each(function(e,s){if(a.clergyid=clergyid,a.phid=clergyphid,a.wbid=clergywebid,a.emid=clergyemid,a.splangid=clergysplang,r.phid=clergyphid,r.socid=clergysocid,r.wbid=clergywebid,r.emid=clergyemid,r.splangid=clergysplang,r.clergyid=clergyid,r.clergyexist=clergyexist,r.clergypos=clergypos,r.addclergypos=addclergypos,r.clergyname=clergyname,r.clergyhaspos=clergyhaspos,r.remclergypos=remclergypos,$(s).is("input")){if($(this).is(":checked"))if("dayOfweek[]"===$(this).attr("name")||"Month"===$(this).attr("name")){var t=[];$('input[name="'+$(s).attr("name")+'"]:checked').each(function(){t.push($(this).val())}),a[$(s).attr("name")]=t,r[$(s).attr("name")]=t}else a[$(s).attr("name")]=$(s).val(),r[$(s).attr("name")]=$(s).val();"text"===$(s).attr("type")&&("dayOfMonth"===$(s).attr("name")?"0"!==$(s).val()&&(a[$(s).attr("name")]=$(s).val(),r[$(s).attr("name")]=$(s).val()):(a[$(s).attr("name")]=$(s).val(),r[$(s).attr("name")]=$(s).val()))}else if($(s).is("select")){var o=[],l=[];"language"===$(this).attr("name")||"speakslanguage"===$(this).attr("name")?($('select[name="'+$(s).attr("name")+'"] :selected').each(function(){l.push($(this).text()),o.push($(this).val())}),a[$(s).attr("name")]=l,r[$(s).attr("name")]=o):(a[$(s).attr("name")]=$('select[name="'+$(s).attr("name")+'"] option:selected').text(),r[$(s).attr("name")]=$('select[name="'+$(s).attr("name")+'"] option:selected').val())}else a[$(s).attr("name")]=$(s).find(":selected").text(),r[$(s).attr("name")]=$(s).val()}),[a,r]}},phone={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergyPhone")[0],message="";for(var e in sourceArray)switch(e){case"phoneType":message+="Phone Type : "+sourceArray[e]+" <br>";break;case"areaCode":message+="Area Code : "+sourceArray[e]+" <br>";break;case"phoneNumber":message+="Phone Number : "+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergyPhone")[1]}},social={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergySocial")[0],message="";for(var e in sourceArray)switch(e){case"socialType":message+="Social Type : "+sourceArray[e]+" <br>";break;case"handle":message+="Handle : "+sourceArray[e]+" <br>";break;case"url":message+="URL : "+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergySocial")[1]}},website={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergyWebsite")[0],message="";for(var e in sourceArray)switch(e){case"webType":message+="Web Type : "+sourceArray[e]+" <br>";break;case"website":message+=e+": "+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergyWebsite")[1]}},email={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergyEmail")[0],message="";for(var e in sourceArray)switch(e){case"emailType":message+="Email Type : "+sourceArray[e]+" <br>";break;case"email":message+=e+": "+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergyEmail")[1]}},clergy={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergyInfo")[0],message="";for(var e in sourceArray)switch(e){case"firstName":message+=" First Name : "+sourceArray[e]+" <br>";break;case"secondName":message+=" Second Name: "+sourceArray[e]+" <br>";break;case"thirdName":message+=" Third Name: "+sourceArray[e]+" <br>";break;case"fourthName":message+=" Fourth Name: "+sourceArray[e]+" <br>";break;case"fifthName":message+="Fifth Name: "+sourceArray[e]+" <br>";break;case"clergySuffix":message+=" Suffix: "+sourceArray[e]+" <br>";break;case"clergyPosition":message+=" Position: "+sourceArray[e]+" <br>";break;case"clergyTitle":message+="Title: "+sourceArray[e]+" <br>";break;case"clergyParish":message+="Parish: "+sourceArray[e]+" <br>";break;case"clergyActivity":message+="Current Status:"+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergyInfo")[1]}},speakslanguage={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergyLanguage")[0],message="";for(var e in sourceArray)switch(e){case"speakslanguage":message+="this Clergy speaks language: "+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergyLanguage")[1]}},removeClergy={confirmMessage:function(){sourceArray=[],sourceArray=dataHunter.serializeForm("clergyInfo")[0],message="";for(var e in sourceArray)switch(e){case"firstName":message+=" First Name : "+sourceArray[e]+" <br>";break;case"secondName":message+=" Second Name: "+sourceArray[e]+" <br>";break;case"thirdName":message+=" Third Name: "+sourceArray[e]+" <br>";break;case"fourthName":message+=" Fourth Name: "+sourceArray[e]+" <br>";break;case"fifthName":message+="Fifth Name: "+sourceArray[e]+" <br>";break;case"clergySuffix":message+=" Suffix: "+sourceArray[e]+" <br>";break;case"clergyPosition":message+=" Position: "+sourceArray[e]+" <br>";break;case"clergyTitle":message+="Title: "+sourceArray[e]+" <br>";break;case"clergyParish":message+="Parish: "+sourceArray[e]+" <br>";break;case"clergyActivity":message+="Current Status:"+sourceArray[e]+" <br>";break}return message},postAjaxArray:function(){return dataHunter.serializeForm("clergyInfo")[1]}};modal={modalLayout:function(e,a,r,s,t){return{height:e,title:t,width:a,modal:r,buttons:s}},addCustoms:{titleModal:"Please add new details",addButtons:{Add:modalHandler.validate,Cancel:function(){$("body").css("overflow","visible"),addEditModal.dialog("close")}}},editCustoms:{titleModal:"Please edit the details",editButtons:{Edit:modalHandler.validate,Cancel:function(e){$("body").css("overflow","visible"),addEditModal.dialog("close")}}},confirmCustoms:{titleModal:"Confirm your edits",confirmButtons:{Confirm:modalHandler.confirmSuccess,Back:function(e){confirmModal.dialog("close")}}},confirmRemoveCustoms:{titleModal:"Confirm your edits",confirmButtons:{Confirm:modalHandler.confirmSuccess}},thankYouCustoms:{titleModal:"Sending Confirmation…",thankYouButtons:{Ok:modalHandler.thankYouSuccess}},ajaxrequest:function(e,a,r,s){return $.ajax({url:baseURL+e,type:"POST",data:a,success:function(e){addEditModal.empty(),addEditModal.append(e),addEditModal.dialog("open")},error:s})}};var actions={add:function(){switch($("body").css("overflow","hidden"),addEditModal.dialog(modal.modalLayout("600","500",!0,modal.addCustoms.addButtons,modal.addCustoms.titleModal)),this.getAttribute("class")){case"addClergy":modal.ajaxrequest("admin/updateClergyInformation/updateClergy",{add_clergy:!0});break;case"addClergyName":modal.ajaxrequest("admin/updateClergyInformation/updateClergyName",{add_clergy:!0});break;case"addClergyPosition":modal.ajaxrequest("admin/updateClergyInformation/updateClergyPosition",{add_clergy:!0});break;case"addClergyphone":modal.ajaxrequest("admin/updateClergyInformation/updateClergyphone",{clergyid:clergyid,add_phone:!0});break;case"addClergywebsite":modal.ajaxrequest("admin/updateClergyInformation/updateClergywebsite",{clergyid:clergyid,add_website:!0});break;case"addClergysocial":modal.ajaxrequest("admin/updateClergyInformation/updateClergysocial",{clergyid:clergyid,add_social:!0});break;case"addClergyemail":modal.ajaxrequest("admin/updateClergyInformation/updateClergyemail",{clergyid:clergyid,add_email:!0});break;case"addClergyLanguage":modal.ajaxrequest("admin/updateClergyInformation/updateClergyLanguage",{clergyid:clergyid,add_splang:!0});break}},edit:function(){switch($("body").css("overflow","hidden"),addEditModal.dialog(modal.modalLayout("700","500",!0,modal.editCustoms.editButtons,modal.editCustoms.titleModal)),this.getAttribute("class")){case"editClergy":modal.ajaxrequest("admin/updateClergyInformation/updateClergy",{clergyid:clergyid});break;case"editClergyName":modal.ajaxrequest("admin/updateClergyInformation/updateClergyName",{clergyid:clergyid});break;case"editClergyPosition":modal.ajaxrequest("admin/updateClergyInformation/updateClergyPosition",{clergyid:clergyid,clergyhaspos:clergyhaspos});break;case"editClergyphone":modal.ajaxrequest("admin/updateClergyInformation/updateClergyphone",{clergyid:clergyid,clergyphid:clergyphid});break;case"editClergysocial":modal.ajaxrequest("admin/updateClergyInformation/updateClergysocial",{clergyid:clergyid,clergysocid:clergysocid});break;case"editClergywebsite":modal.ajaxrequest("admin/updateClergyInformation/updateClergywebsite",{clergyid:clergyid,clergywebid:clergywebid});break;case"editClergyemail":modal.ajaxrequest("admin/updateClergyInformation/updateClergyemail",{clergyid:clergyid,clergyemid:clergyemid});break;case"editClergyLanguage":modal.ajaxrequest("admin/updateClergyInformation/updateClergyLanguage",{clergyid:clergyid,clergysplang:clergysplang});break}},remove:function(){switch($("body").css("overflow","hidden"),addEditModal.dialog(modal.modalLayout("300","500",!0,modal.editCustoms.editButtons,modal.editCustoms.titleModal)),this.getAttribute("class")){case"removeClergyPosition":modal.ajaxrequest("admin/updateClergyInformation/removeClergyPosition",{clergyid:clergyid,clergyhaspos:clergyhaspos,remclergypos:remclergypos});break}}};$(" button[data-click] ").on("click",function(e){addEditModal=$(".addEditModal"),confirmModal=$(".confirmModal"),thankYouModal=$(".thankYouModal"),userValues={},clergyid=$(this).data("clergyid"),clergyphid=$(this).data("phid"),clergysocid=$(this).data("socid"),clergywebid=$(this).data("wbid"),clergyemid=$(this).data("emid"),clergysplang=$(this).data("splangid"),clergyexist=$(this).data("clergyexist"),clergyname=$(this).data("clergyname"),clergypos=$(this).data("clergypos"),addclergypos=$(this).data("addclergypos"),clergyhaspos=$(this).data("clergyhasposition"),remclergypos=$(this).data("remclergypos");var a=$(this),r=a.data("click");e.preventDefault(),"function"==typeof actions[r]&&actions[r].call(this,e)});