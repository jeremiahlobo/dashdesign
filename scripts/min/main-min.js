function loadScript(t,a){var e=document.createElement("script");e.type="text/javascript",a&&(e.onload=a),document.getElementsByTagName("head")[0].appendChild(e),e.src=t}function initialize(){geocoder=new google.maps.Geocoder}var PF=PF||{};PF.filter={},PF.forms={},PF.helper={},PF.ui={},PF.mapUI={},PF.platform={},PF.filter={showAll:function(){featureLayer.setFilter(function(){return!0})},showNone:function(){featureLayer.setFilter(function(){return!1})},by:function(t,a){featureLayer.setFilter(function(e){return e.properties[t]===a})},within:function(t,a){featureLayer.setFilter(function(e){return e.properties[t]in a})},makeList:function(t,a){for(var e=[],i=0;i<t.length;i++){var n=t[i].properties[a];indexOf.call(e,n)<0&&e.push(n)}},findNearest:function(t,a){var e=[],i=L.circle([a.getLatLng().lat,a.getLatLng().lng],e[t-1]);return featureLayer.eachLayer(function(t){e.push(a.getLatLng().distanceTo(t.getLatLng()))}),i}},PF.helper={compareNumber:function(t,a){return!Number.isNan(t)&&!Number.isNan(a)&&t-a}},PF.forms={ajaxPostHandler:function(t,a,e){$(".spinner").show(),$.ajax({url:baseURL+t,type:"POST",data:a,success:function(t){e(t),$(".spinner").hide()},error:function(t,a){$(".spinner").hide(),console.log(a)}})},validation:{}},PF.userActions={search:function(){switch(this.getAttribute("class")){case"searchChurch":postalCode?PF.lonlat.centreOnMap(postalCode):(PF.ui.panels.dig(),PF.forms.ajaxPostHandler("app/Search",{parishName:parishName,cityID:cityID},PF.userActions.list.church));break;case"searchClergy":PF.ui.panels.dig(),PF.forms.ajaxPostHandler("app/Search",{clergyName:clergyName,positionClergyID:positionClergyID},PF.userActions.list.clergy);break;case"searchMass":PF.ui.panels.dig(),PF.forms.ajaxPostHandler("app/Search",{massTypeID:massTypeID,DayOfWeek:DayOfWeek.get(),StartTime:StartTime},PF.userActions.list.mass);break}},list:{church:function(t){$(".panel__list").empty(),$(".panel__list").html(t),$("#churchlist > li").click(function(){PF.ui.panels.dig(),console.log("here"),PF.forms.ajaxPostHandler("app/information/parishDetails",{idParish:this.id},PF.userActions.information.church),PF.mapUI.flyToPin($(this).data("longitude"),$(this).data("latitude"),$(this).data("cid"))})},clergy:function(t){$(".panel__list").empty(),$(".panel__list").html(t),$("#clergylist > li").click(function(){console.log($(this).data("idparish")),PF.mapUI.boundsOnPID($(this).data("idparish")),PF.ui.panels.dig(),PF.forms.ajaxPostHandler("app/information/clergyDetails",{idClergy:this.id},PF.userActions.information.clergy)})},mass:function(t){$(".panel__list").empty(),$(".panel__list").html(t),$("#masslist > li").click(function(){PF.ui.panels.dig(),PF.forms.ajaxPostHandler("app/information/parishDetails",{idParish:this.id},PF.userActions.information.mass),PF.mapUI.flyToPin($(this).data("longitude"),$(this).data("latitude"),$(this).data("cid"))})}},information:{church:function(t){$(".panel__detail").html(t),$(".churchtitle").on("click",function(){PF.mapUI.flyToPin($(this).data("longitude"),$(this).data("latitude"),$(this).data("cid"))})},clergy:function(t){$(".panel__detail").html(t),$(".churchtitle").on("click",function(){PF.forms.ajaxPostHandler("app/information/parishDetails",{idParish:this.id},PF.userActions.information.mass),PF.mapUI.flyToPin($(this).data("longitude"),$(this).data("latitude"),$(this).data("cid"))})},mass:function(t){$(".panel__detail").html(t),$(".churchtitle").on("click",function(){PF.mapUI.flyToPin($(this).data("longitude"),$(this).data("latitude"),$(this).data("cid"))})}}};var PF=PF||{};PF.ui={},PF.ui.map={unfurl:function(){$("#map").hasClass("unfurled")?($(".unfurled").removeClass("unfurled"),$(".active").removeClass("active"),$(".icon-roll__down").addClass("active")):($("#map").addClass("unfurled"),$(".active").removeClass("active"),$(".icon-roll__up").addClass("active"))}},PF.ui.panels={panels:document.getElementsByClassName("panel"),panelsLocation:[],panelsWidth:[],currentState:function(){var t=!1;this.panelsLocation=[],this.panelsWidth=[];for(var a=0;a<this.panels.length;a++){var e=window.getComputedStyle(this.panels[a]).getPropertyValue("transform"),i=window.getComputedStyle(this.panels[a]).getPropertyValue("width"),n=Number(e.split("(")[1].split(")")[0].split(", ")[4]),r=Number(i.match(/(\d+)/g));0!==Math.abs(n%r)&&(t=!0),this.panelsLocation.push(n),this.panelsWidth.push(r)}if(t){var s;if(this.panelsLocation.indexOf(0)<0){var o=[],l;for(a=0;a<this.panelsLocation.length;a++)o.push(Math.abs(this.panelsLocation[a]));l=o.indexOf(Math.min.apply(Math,o)),s=l}else s=this.panelsLocation.indexOf(0);for(a=0;a<this.panelsLocation.length;a++){var p=a-s,c=p*this.panelsWidth[a],u="translate3d("+c+"px, 0, 0)";this.panels[a].style.transform=u}}},dig:function(){if(this.currentState(),this.panelsLocation[this.panelsLocation.length-1]>=this.panelsWidth[this.panelsWidth.length-1])for(var t=0;t<this.panels.length;t++){var a=this.panelsLocation[t]-this.panelsWidth[t],e="translate3d("+a+"px, 0, 0)";this.panels[t].style.transform=e}},climb:function(){if(this.currentState(),this.panelsLocation[0]<=-1*this.panelsWidth[0])for(var t=0;t<this.panels.length;t++){var a=this.panelsLocation[t]+this.panelsWidth[t],e="translate3d("+a+"px, 0, 0)";this.panels[t].style.transform=e}}},PF.ui.tabs={toggleTabs:function(){if("true"===$(this).attr("aria-selected"))$('[aria-selected="true"]').attr("aria-selected","false"),$.each($('[aria-selected="false"]'),function(){var t=$(this).attr("aria-controls");$("[id="+t+"]").attr("aria-hidden","true").slideUp(200)});else{$('[aria-selected="true"]').attr("aria-selected","false"),$(this).attr("aria-selected","true"),$.each($('[aria-selected="false"]'),function(){var t=$(this).attr("aria-controls");$("[id="+t+"]").attr("aria-hidden","true").slideUp(200)});var t=$(this).attr("aria-controls");$("[id="+t+"]").attr("aria-hidden","false").slideDown(200)}}};var PF=PF||{};L.mapbox.accessToken="pk.eyJ1IjoidHJhdmlzdy1yY2IiLCJhIjoiV1I2X0ZlQSJ9.HuDZt_-iESg9dg_PQvTFqA";var markersList=new Array;PF.mapUI={map:L.mapbox.map("map","travisw-rcb.j03n31d8"),featureLayer:new L.mapbox.featureLayer,mapUIinit:function(){PF.mapUI.featureLayer.loadURL("index.php/site/show_churches"),navigator.geolocation?PF.mapUI.map.locate():PF.mapUI.map.fitBounds(PF.mapUI.featureLayer.getBounds()),PF.mapUI.findCurrentLocation(),PF.mapUI.featureLayer.on("layeradd",function(t){marker=t.layer,markers=L.marker([marker.feature.properties.Latitude,marker.feature.properties.Longitude],{idChurch:""+marker.feature.properties.ChurchID,idParish:""+marker.feature.properties.idParish}).setIcon(L.icon({iconUrl:"http://a.tiles.mapbox.com/v4/marker/pin-m-place-of-worship+dd5252.png?access_token=pk.eyJ1IjoidHJhdmlzdy1yY2IiLCJhIjoiV1I2X0ZlQSJ9.HuDZt_-iESg9dg_PQvTFqA",iconSize:[30,70],iconAnchor:[15,35],popupAnchor:[0,-35]})),markersList.push(markers),markers.addTo(PF.mapUI.map),markers.bindPopup(PF.mapUI.loadInfoMarkers(marker.feature)),markers.on("click",function(){PF.mapUI.pinPopUPInformation(this.options)})}),PF.mapUI.featureLayer.on("click",function(t){PF.mapUI.map.panTo(t.layer.getLatLng())})},refresh:function(){PF.mapUI.map.invalidateSize()},findCurrentLocation:function(){PF.mapUI.map.on("locationfound",function(t){var a=L.marker(new L.LatLng(t.latlng.lat,t.latlng.lng),{icon:L.mapbox.marker.icon({"marker-color":"#4098d4","marker-symbol":"star"})}).bindPopup("Here I am!").addTo(PF.mapUI.map);try{PF.mapUI.map.fitBounds(PF.filter.findNearest(3,a).getBounds())}catch(t){PF.mapUI.map.setView(a.getLatLng(),13)}PF.mapUI.map.on("locationerror",function(){PF.mapUI.map.fitBounds(featureLayer.getBounds())})})},loadInfoMarkers:function(t){var a="<h3>"+t.properties.Church+"</h3>";return null!==t.properties.areaCode&&"Fax"!==t.properties.phone&&(phoneNumber='<p><a href="tel:1'+t.properties.areaCode+t.properties.phone+'"> ('+t.properties.areaCode+") "+t.properties.phone.replace(/\W/g,"").replace(/(...)/,"$1-")+"</a></p>"),null!==t.properties.Email&&(email='<p><a href="mailto:'+t.properties.Email+'">'+t.properties.Email+"</a></p>"),null!==t.properties.WebsiteUrl&&(website="<p><a href= http://"+t.properties.WebsiteUrl+' target="_blank">'+t.properties.WebsiteUrl+"</a></p>"),a+'<div class="churchContent">'+phoneNumber+email+website+"</div>"},mapMarkerWithPopUp:function(t,a,e,i,n,r){L.marker(new L.LatLng(t,a),{icon:L.mapbox.marker.icon({"marker-color":e,"marker-size":n,"marker-symbol":i})}).addTo(PF.mapUI.map)},openMarkerInfo:function(t){for(var a in markersList){markersList[a].options.idChurch==t&&markersList[a].openPopup()}},pinPopUPInformation:function(t){PF.ui.panels.dig(),setTimeout(function(){PF.ui.panels.dig()},400),PF.forms.ajaxPostHandler("App/information/parishDetails",{idParish:t.idParish},PF.userActions.information.church)},flyToPin:function(t,a,e){PF.mapUI.map.setView([a,t],17),PF.mapUI.openMarkerInfo(e)},boundsOnPID:function(t){longlatbounds=new Array;for(var a in markersList){var e=markersList[a].options.idParish;e==t&&(console.log(e),longlatbounds.push(markersList[a].getLatLng()),PF.mapUI.openMarkerInfo(markersList[a].options.idChurch))}bounds=L.latLngBounds(longlatbounds),PF.mapUI.map.fitBounds(bounds,{maxZoom:16,padding:[50,50]})}};var PF=PF||{};PF.ui={},PF.ui.map={unfurl:function(){$("#map").hasClass("unfurled")?($(".unfurled").removeClass("unfurled"),$(".active").removeClass("active"),$(".icon-roll__down").addClass("active")):($("#map").addClass("unfurled"),$(".active").removeClass("active"),$(".icon-roll__up").addClass("active"))}},PF.ui.panels={panels:document.getElementsByClassName("panel"),panelsLocation:[],panelsWidth:[],currentState:function(){var t=!1;this.panelsLocation=[],this.panelsWidth=[];for(var a=0;a<this.panels.length;a++){var e=window.getComputedStyle(this.panels[a]).getPropertyValue("transform"),i=window.getComputedStyle(this.panels[a]).getPropertyValue("width"),n=Number(e.split("(")[1].split(")")[0].split(", ")[4]),r=Number(i.match(/(\d+)/g));0!==Math.abs(n%r)&&(t=!0),this.panelsLocation.push(n),this.panelsWidth.push(r)}if(t){var s;if(this.panelsLocation.indexOf(0)<0){var o=[],l;for(a=0;a<this.panelsLocation.length;a++)o.push(Math.abs(this.panelsLocation[a]));l=o.indexOf(Math.min.apply(Math,o)),s=l}else s=this.panelsLocation.indexOf(0);for(a=0;a<this.panelsLocation.length;a++){var p=a-s,c=p*this.panelsWidth[a],u="translate3d("+c+"px, 0, 0)";this.panels[a].style.transform=u}}},dig:function(){if(this.currentState(),this.panelsLocation[this.panelsLocation.length-1]>=this.panelsWidth[this.panelsWidth.length-1])for(var t=0;t<this.panels.length;t++){var a=this.panelsLocation[t]-this.panelsWidth[t],e="translate3d("+a+"px, 0, 0)";this.panels[t].style.transform=e}},climb:function(){if(this.currentState(),this.panelsLocation[0]<=-1*this.panelsWidth[0])for(var t=0;t<this.panels.length;t++){var a=this.panelsLocation[t]+this.panelsWidth[t],e="translate3d("+a+"px, 0, 0)";this.panels[t].style.transform=e}}},PF.ui.tabs={toggleTabs:function(){if("true"===$(this).attr("aria-selected"))$('[aria-selected="true"]').attr("aria-selected","false"),$.each($('[aria-selected="false"]'),function(){var t=$(this).attr("aria-controls");$("[id="+t+"]").attr("aria-hidden","true").slideUp(200)});else{$('[aria-selected="true"]').attr("aria-selected","false"),$(this).attr("aria-selected","true"),$.each($('[aria-selected="false"]'),function(){var t=$(this).attr("aria-controls");$("[id="+t+"]").attr("aria-hidden","true").slideUp(200)});var t=$(this).attr("aria-controls");$("[id="+t+"]").attr("aria-hidden","false").slideDown(200)}}},PF.lonlat={centreOnMap:function(t){var a=new Array;geocoder.geocode({address:t},function(a,e){e==google.maps.GeocoderStatus.OK&&(PF.mapUI.mapMarkerWithPopUp(a[0].geometry.location.lat()+0,a[0].geometry.location.lng()+0,"#3ca0d3","religious-christian","large",t,"This is you"),PF.mapUI.map.panTo([a[0].geometry.location.lat()+0,a[0].geometry.location.lng()+0]))})}};var Detect={init:function(){this.OS=this.searchString(this.dataOS)},searchString:function(t){for(var a=0;a<t.length;a++){var e=t[a].string,i=t[a].prop;if(e){if(-1!=e.indexOf(t[a].subString))return t[a].identity}else if(i)return t[a].identity}},dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"macOS"},{string:navigator.userAgent,subString:"iPhone",identity:"iOS"},{string:navigator.userAgent,subString:"iPad",identity:"iOS"},{string:navigator.userAgent,subString:"iPod",identity:"iOS"},{string:navigator.userAgent,subString:"Android",identity:"Android"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};$(function(){loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDy8HRqwTgiat99dbFR6mDGi1_BSgArnpo&callback=initialize",function(){console.log("Welcome to ParishFinder")}),PF.mapUI.mapUIinit(),$(".spinner").hide(),$('input[type="submit"]').on("click",function(t){t.preventDefault(),PF.ui.panels.currentState(),postalCode=$('input[name="postalCode"]').val(),parishName=$('input[name="parishName"]').val(),clergyName=$('input[name="clergyName"]').val(),positionClergyID=$('select[name="clergyPosition"] option:selected').val(),cityID=$('select[name="city"]').val(),massTypeID=$('select[name="eventList"]').val(),StartTime=$("input[name = 'StartTime']").val(),DayOfWeek=$("input:checked").map(function(){return $(this).val()});var a=$(this),e=a.data("click");"function"==typeof PF.userActions[e]&&PF.userActions[e].call(this,t)}),window.onresize=function(){PF.ui.panels.currentState()},$('[role="tab"]').click(PF.ui.tabs.toggleTabs),$(".nav-dig").click(function(){0===$(".panel__list").children().length?(PF.ui.panels.dig(),setTimeout(function(){PF.ui.panels.dig()},400)):PF.ui.panels.dig()}),$(".nav-climb").click(function(){0===$(".panel__list").children().length?(PF.ui.panels.climb(),setTimeout(function(){PF.ui.panels.climb()},400)):PF.ui.panels.climb()}),$(".nav-roll__up").click(function(){PF.ui.map.unfurl()}),$(".nav-roll__down").click(function(){PF.ui.map.unfurl()})});