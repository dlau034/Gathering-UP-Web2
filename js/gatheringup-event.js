/**
 * 
 */


GupMapper.prototype.show = function(){
//			console.log(this.template);

	for(var i=this.currentPosition; i<this.data.length; i++){
		var count = i+1; 
		var idDiv = this.identifier+count;
//				console.log("i: "+i+", count: "+count);
		if(this.template!==undefined){
//					console.log(this.data[i]);
			this.data[i].idDiv=idDiv;
			this.data[i].count=count;
			var temp1 = _.template(this.template, {item : this.data[i]});
//					console.log(this.outDataDiv);
			$( this.outDataDiv ).append(temp1);
			var myIcon = L.icon({
			    iconUrl: 'http://siteimages.gatheringup.com/mapsicon/e'+count+'.jpg',
			    iconSize: [47, 47],
			    iconAnchor: [23, 47],
			    popupAnchor: [0, -47],
			    idDiv: idDiv
			});
		}else{
			var myIcon = L.icon({
			    iconUrl: this.data[i].imageurl,
			    iconSize: [26, 24],
			    iconAnchor: [13, 24],
			    popupAnchor: [0, -24],
			    idDiv: idDiv
			});
			//				console.log(this.data[i].imageurl);
		}
		
		if(this.data[i].latitude!==undefined && this.data[i].latitude!= null){
					console.log(this.data[i]);

			this.markers[i]= L.marker([this.data[i].latitude, this.data[i].longitude],{icon: myIcon}).addTo(Window.map);
			this.markers[i].on('click', function(e) {
				Window.map.panTo([e.latlng.lat, e.latlng.lng]);
//					Window.map.setZoom(18);
//						console.log("lat: "+e.latlng.lat+ ", lng: "+e.latlng.lng );
				var idDiv = e.target.options.icon.options.idDiv;

				//console.log("click div element: "+idDiv);
					
				var offset = Math.floor($("#"+idDiv).offset().top-70)+"px";
				$root.animate({
					scrollTop: offset
				}, 1300);
/*						$("#"+idDiv).parent().animate({
							backgroundColor: "#ffffff"
						}, 1300);*/
			});
			var title;
			if(this.data[i].destname===undefined){
				title = this.data[i].summary;
			}else if(this.data[i].destname==null){
				title=this.data[i].localname;
			}else{
				title = this.data[i].destname;
			}
//					console.log("title: "+title)
			
			this.markers[i].bindPopup('<a  onclick="getnearbyid('+this.data[i].idlocalize+')">'+count+". "+title+'</a>' );
			if(this.template!==undefined){
				$("#"+idDiv).on("click",function(e){
					var num = $(this).attr('idmarker');
//						console.log(num);
					Window.map.panTo(Window.gupmap.markers[num-1].getLatLng());
					Window.gupmap.markers[num-1].openPopup();
				});
			}
//				var geojson = this.markers[i].toGeoJSON();
//				console.log(geojson);
		}

		if(i==(this.currentPosition+this.maxperpage)){
			this.currentPosition=i;
			break;
		}
	}
};



$(function() {
		$( "#datepicker" ).datepicker({
			dateFormat: 'yy-mm-dd', 
			minDate: 0 ,
		    onSelect: function(dateText, inst) { 
		        geteventbydate(dateText);
		    }
		});

		$(".eventmodal").on('show',function (){
			$(".event_wrap").css("position","fixed");
			
//			$(".nearby_wrap").css({position:"relative"});
		});

		
	Window.map = L.map("map_canvas");
	Window.gupmap;
	
	L.tileLayer('http://{s}.tile.cloudmade.com/b33ed4828e694c8eb411b09577f89072/997/256/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://cloudmade.com">CloudMade</a>'
	}).addTo(Window.map);
});

function geteventbydate(dateText){
	processURL("/events/ondate?date="+dateText);
}
function getevents()
{
	processURL("/events/getpage");
}

function processURL(url){
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        success: function(data){
        	if(data.status=="true"){
//    			Window.tierhidden = data.tierhidden;
//    			Window.tierdisplay = data.tierdisplay;

        		if(Window.gupmap!==undefined){
        			Window.gupmap.clean();
        			Window.gupmap=undefined;
        		}
/*        		if(Window.guphiddenmap!==undefined){
        			Window.guphiddenmap.clean();
        			Window.guphiddenmap=undefined;
        		}*/
   				Window.map.setView([40.78486, -73.963036], 13);
/*
    			if(data.tierhidden.length>0){
	        		Window.guphiddenmap = new GupMapper('hidden');
	    			Window.guphiddenmap.setData(data.tierhidden);
	    			Window.guphiddenmap.show();
	    			console.log("hidden set");
    			}*/
    			if(data.tierdisplay.length>0){
	        		Window.gupmap = new GupMapper();
	        		Window.gupmap.setTemplate('#eventtemplate');
	        		Window.gupmap.setOutDataDiv('.event_wrap');
	    			Window.gupmap.setData(data.tierdisplay);
	    			Window.gupmap.show();
	    			console.log("display set");
    			}
        	}
        }
	});
}

function displayevent(count){
	
	if(window.eventdetailstemplate===undefined){
		window.eventdetailstemplate = $('#eventdetails').html();
	}
	var outdata = Window.gupmap.getDetails(count-1);
	
	var temp1 = _.template(window.eventdetailstemplate, {item : outdata});
	
	$( ".eventmodal" ).html(temp1);
	$(".eventmodal").on('hide',function (){
		$(".event_wrap").css({position:"relative"});

		var temp = Window.gupmap.getOffset(count-1);
		var offset = Math.floor(temp)+"px";
		$root.animate({
			scrollTop: offset
		}, 0);
	});
	$( ".eventmodal" ).modal("show");

}

function bookmarkevent(id, button)
{
		$.ajax({
	        type: "GET",
	        url: "/events/bookmark?idevent="+id,
//	        contentType: "application/json; charset=utf-8",
//	        dataType: "json",
	        success: function(data){
//	            alert("#"+idrest);
	            if(data=='true')
	            {
		        	$(button).addClass("btn-orange");
		        	$(button).html("Bookmarked");

//	                $("#"+id).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
	            }
	        }
	  });
	return "#";
}
function unbookmarkevent(id, button)
{
	$.ajax({
		type: "GET",
		url: "/events/unbookmark?idevent="+id,
		success: function(data){
			if(data=='true')
			{
				$(button).removeClass("btn-orange");
				$(button).html('<i class="icon-bookmark icon-white"></i>Bookmark');
				$(button).show();
				//           $("#"+id).html('<img src="/images/gtk-bookmark.png" width="30" align="bottom">');
			}
		}
	});
	return "#";
}

function toggleevent(id, button)
{
		if(bookmarks[id]==undefined || !bookmarks[id])
		{
			bookmarkevent(id, button);
			bookmarks[id]=1;
		}else
		{
			unbookmarkevent(id, button);
			bookmarks[id]=undefined;
		}
}


/*

		$(function() {
			$( "#datepicker" ).datepicker({
				dateFormat: 'yy-mm-dd', minDate: 0 ,
			    onSelect: function(dateText, inst) { 
			        window.location = getbydate(dateText);
			    }
			});
		});

		window.searchpage=0;
		window.searchshow=100;
		window.searchmax=0;
		window.mapgathering;
		window.tierdisplay=[];
		window.template=null;
		window.marker=[];


window.initflag = true;
window.gmapzoom =14;

function initialize() 
{
	if(!window.initflag){
		var integer = setInterval(function () {    
			if (window.initflag) {           
				initgmap();
				window.clearInterval(integer);
				return;
			}
			console.log("initflag..");
		}, 1000);
	}else{
		initgmap();
		console.log("done..");
	}
}

function getbydate(date)
{
	gmapzoom = 17;
	loadpage("/events/ondate?date="+date);
}

function loadpage(url)
{
	clearmap();
	
	$.ajax({
	    type: "POST",
	    url: url,
	    dataType: 'json',
	    success: function(data){
	    	if(data.status=="true"){
//				window.tierhidden = data.tierhidden;
				window.tierdisplay = data.tierdisplay;
				initialize(); 
	    	}
	    },
	    error: function(errMsg, ajaxOptions, thrownError) {
			console.log(errMsg);
	    }
	}
	);
}
function clearmap()
{
	for(var i=0; i<window.marker.length; i++){
		window.marker[i].setMap(null);
    	if(window.tierdisplay[i]!=undefined){
    		var divnum = document.getElementById(i+1);

    		google.maps.event.clearListeners(divnum, 'click');
    	}
    	window.tierdisplay[i]=null;
	}

	window.marker= [];
//	window.markerhidden= [];
//	window.tierhidden=[];
	window.tierdisplay=[];
	window.searchpage=0;
	window.searchmax=0;

	$( ".nearby_wrap" ).html("");
}

function initgmap()
{
	var center;
//	if(window.tierdisplay===undefined || window.tierdisplay[0]===undefined){
		center = [40.78486, -73.963036];
//	}else{
//		center = new google.maps.LatLng(window.tierdisplay[0].latitude, window.tierdisplay[0].longitude);
//	}

	if(window.mapgathering===undefined)
	{
	    window.mapgathering = L.map('map_canvas').setView(center, window.gmapzoom);
	    L.tileLayer('http://{s}.tile.cloudmade.com/b33ed4828e694c8eb411b09577f89072/997/256/{z}/{x}/{y}.png', {
	        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://cloudmade.com">CloudMade</a>',
	        maxZoom: window.gmapzoom
	    }).addTo(map);

	}
    displayresults();
    refreshmap(window.gmapzoom);
}

function displayresults(){
	if(window.tierdisplay!=undefined){
		window.searchmax = window.tierdisplay.length;
	}
	if(window.template==undefined){
		window.template = $('#eventtemplate').html();
	}
	console.log("display results");
	var temp1 = _.template(window.template, {outdata : window.tierdisplay, page: window.searchpage, numentries: window.searchshow});
	$( ".event_wrap" ).append(temp1);
}
function refreshmap(zoom)
{

	$root = $('html,body');

	if(window.tierdisplay!=undefined){
		console.log("tierdisplay has results");
	    for(var i=0; i<window.tierdisplay.length; i++)
	    {
	    	count=i+1;
			console.log("count:"+count);
	    	if(window.tierdisplay[i].latitude!==undefined && window.tierdisplay[i].latitude!==null){
				console.log("latitude: "+window.tierdisplay[i].latitude);
				console.log("summary: "+window.tierdisplay[i].summary);
				var summary=window.tierdisplay[i].summary;
				
	      	var myLatlng = new google.maps.LatLng(window.tierdisplay[i].latitude,window.tierdisplay[i].longitude);
	      	window.marker[i] = new google.maps.Marker({
	    	    position: myLatlng,
	    	    animation: google.maps.Animation.DROP,
	    	    title: summary,
	      	    icon: 'http://siteimages.gatheringup.com/mapsicon/'+count+'.png'
	    	});
	
	   		var divnum = document.getElementById(count);
	
	   		google.maps.event.addDomListener(divnum, 'click', function(e) {
	   				k = $(this).attr("id");
	    			toggleBounce(k-1);
			});
	   		makeInfoWindowEvent(window.mapgathering, window.infowindow, count, window.tierdisplay[i].summary, window.tierdisplay[i].idevent);
	
	    	window.marker[i].setMap(window.mapgathering );
	    	if(count==window.searchshow){
	    		break;
	    	}
	    	}
	    }
	}
	window.searchpage++;	
	window.delayscrollflag=0;
}



function makeInfoWindowEvent(map, infowindow, count, summary, idevent) {
	var content = '<a  onclick="getnearbyid('+idevent+')">'+count+". "+summary+'</a>';
	google.maps.event.addListener(window.marker[count-1], 'click', function() {
		infowindow.setContent(content);
		infowindow.open(map, window.marker[count-1]);
//		console.log("Top: "+$("#"+count).offset().top);
		var offset = Math.floor($("#"+count).offset().top-120)+"px";
		$root.animate({
			scrollTop: offset
		}, 1300);
		return false;
	});
}

function toggleBounce(count) {
	var j=count;
	
	if(window.marker[j]!=undefined){
//		console.log("marker found!");
		var myLatlng = window.marker[j].getPosition();
		window.mapgathering.panTo(myLatlng);
//		window.mapgathering.setCenter(myLatlng);
		window.marker[j].setAnimation(google.maps.Animation.BOUNCE);
		setTimeout("window.marker["+j+"].setAnimation(null)", 2150);
		var content = '<a  onclick="getnearbyid('+window.tierdisplay[j].idevent+')">'+(count+1)+". "+window.tierdisplay[j].summary+'</a>';
		infowindow.setContent(content);
		infowindow.open(window.mapgathering, window.marker[count]);

//   		makeInfoWindowEvent(window.mapgathering, window.infowindow, count+1, window.tierdisplay[j].destname, window.tierdisplay[j].idlocalize);
	}
}

*/