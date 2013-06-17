/**
 * 
 */
//var mapgathering;
//initialize();

window.searchcriteria ={};
window.searchagain;
window.searchcount=0;
window.searchpage=0;
window.searchshow=10;
window.searchmax=0;
//window.gmapcenterflag=0;
window.mapgathering;

marker= [];
markerhidden= [];
maparray=[];
maparrayhidden=[];

jQuery(document).ready(function() {
$( "#Nearby_Search" ).typeahead({
	source: function (query, process) {
          return $.get('/bit/localize/search', { search: query }, function (data) {
      		var name = eval(data);

            return process(name);
        });
      },
      minLength: 2});

	$( "#accordion" ).accordion({
        heightStyle: "content",
        collapsible: true
      });
	
//console.log('accordion');

});

function initialize() 
{
	
	var center;
	if(maparray==undefined || maparray[0]==undefined){
		center = new google.maps.LatLng(40.78486000000000, -73.96303600000000);		
	}else{
		center = new google.maps.LatLng(maparray[0].latitude, maparray[0].longitude);
	}
	gmapzoom = 18;

//		console.log(maparray[0].latitude+", "+maparray[0].longitude)
	if(window.mapgathering==undefined)
	{
		var mapOptions = {
		          center: center,
		          mapTypeControl: true,
		          mapTypeControlOptions: {
		              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		              position: google.maps.ControlPosition.BOTTOM_CENTER
		          },
		          panControl: false,
		          zoomControl: true,
		          zoomControlOptions: {
		              style: google.maps.ZoomControlStyle.SMALL,
		              position: google.maps.ControlPosition.TOP_RIGHT
		          },
		          scaleControl: false,
		          streetViewControl: true,
		          streetViewControlOptions: {
		              position: google.maps.ControlPosition.BOTTOM_CENTER
		          },
		          zoom: window.gmapzoom,
		          mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
//			console.log("map_canvas done");
	    window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	}
//        window.mapgathering.style.width='100%';
//        window.mapghatering.style.height='100%';
    
    refreshmap(14);

}

function getcategory(category)
{
	clearmap();
	
//	console.log("Getting category...");
	$.ajax({
	    type: "POST",
	    url: "/localize/getfavorites?categoryid="+category,
	    dataType: 'json',
	    success: function(data){
	    	if(data.status=="true"){
//	        	console.log(data);
				window.tierhidden = data.tierhidden;
				window.tierdisplay = data.tierdisplay;
				window.searchmax = window.tierdisplay.length;
	
				displayresults();
	//			refreshmap(14);
				initialize(); 
	    	}else{
	//    		console.log("returned false");
	//    	    console.log(data);
	        	
	    	}
	    	
	    },
	    error: function(errMsg, ajaxOptions, thrownError) {
			console.log(errMsg);
	    }
	}
	);
}

function getcategory(category)
{
	clearmap();
	
//	console.log("Getting category...");
	$.ajax({
	    type: "POST",
	    url: "/localize/getfavorites?categoryid="+category,
	    dataType: 'json',
	    success: function(data){
	    	if(data.status=="true"){
//	        	console.log(data);
				window.tierhidden = data.tierhidden;
				window.tierdisplay = data.tierdisplay;
				window.searchmax = window.tierdisplay.length;
	
				displayresults();
	//			refreshmap(14);
				initialize(); 
	    	}else{
	//    		console.log("returned false");
	//    	    console.log(data);
	        	
	    	}
	    	
	    },
	    error: function(errMsg, ajaxOptions, thrownError) {
			console.log(errMsg);
	    }
	}
	);
}
function getnearbyid(searchid)
{
	clearmap();
	
//	console.log("Getting category...");
	$.ajax({
	    type: "POST",
	    url: "/localize/getnearbyid?searchid="+searchid,
	    dataType: 'json',
	    success: function(data){
	    	if(data.status=="true"){
//	        	console.log(data);
				window.tierhidden = data.tierhidden;
				window.tierdisplay = data.tierdisplay;
				window.searchmax = window.tierdisplay.length;
	
				displayresults();
	//			refreshmap(14);
				initialize(); 
	    	}else{
	//    		console.log("returned false");
	//    	    console.log(data);
	        	
	    	}
	    	
	    },
	    error: function(errMsg, ajaxOptions, thrownError) {
			console.log(errMsg);
	    }
	}
	);

}

function getnearby(search)
{
	clearmap();
	
//	console.log("Getting category...");
	$.ajax({
	    type: "POST",
	    url: "/localize/getnearby?search="+search,
	    dataType: 'json',
	    success: function(data){
	    	if(data.status=="true"){
//	        	console.log(data);
				window.tierhidden = data.tierhidden;
				window.tierdisplay = data.tierdisplay;
				window.searchmax = window.tierdisplay.length;
	
				displayresults();
	//			refreshmap(14);
				initialize(); 
	    	}else{
	//    		console.log("returned false");
	//    	    console.log(data);
	        	
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
//	console.log("clearing hidden markers..."+ markerhidden.length);
	for(var i=0; i<markerhidden.length; i++){
//		console.log("removing markerhidden: "+i);
		markerhidden[i].setMap(null);
		maparrayhidden[i]=null;
	}
	markerhidden= [];
	maparrayhidden=[];
//	console.log("clearing markers..."+ marker.length);
	for(var i=0; i<marker.length; i++){
//		console.log("removing marker: "+i);
		marker[i].setMap(null);
		maparray[i]=null;
	}
	marker= [];
	maparray=[];

	window.searchcriteria ={};
	window.searchagain;
	window.searchcount=0;
	window.searchpage=0;
	window.searchshow=10;
	window.searchmax=0;

	window.tierhidden;
	window.tierdisplay;
	$( ".nearby_wrap" ).html("");
}
function refreshmap(zoom)
{

	var center = new google.maps.LatLng(40.78486000000000, -73.96303600000000);
	if(maparray[0])
	{
//		console.log("gmap center");
//		console.log(maparray[0]);
		center = new google.maps.LatLng(maparray[0].latitude, maparray[0].longitude);
	}
	
	if(window.mapgathering != undefined){
		window.mapgathering.setCenter(center);
		window.mapgathering.setZoom(zoom);
	}
	
//	console.log(maparray[0].latitude+", "+maparray[0].longitude)

	for(var i=0; i<maparrayhidden.length; i++)
    {
      	var myLatlng = new google.maps.LatLng(maparrayhidden[i].latitude,maparrayhidden[i].longitude);
      	markerhidden[i] = new google.maps.Marker({
    	    position: myLatlng,
    	    animation: google.maps.Animation.DROP,
    	    title: maparrayhidden[i].destination,
      	    icon: maparrayhidden[i].iconurl
    	});
      	markerhidden[i].setMap(window.mapgathering );
    }
        
    for(var i=0; i<maparray.length; i++)
    {
      	var myLatlng = new google.maps.LatLng(maparray[i].latitude,maparray[i].longitude);
      	marker[i] = new google.maps.Marker({
    	    position: myLatlng,
    	    animation: google.maps.Animation.DROP,
    	    title: maparray[i].destination,
      	    icon: 'http://siteimages.gatheringup.com/mapsicon/'+maparray[i].count+'.png'
//      	    icon: 'https://chart.googleapis.com/chart?chst=d_map_spin&chld=.6%7C0%7C44dBbC%7C11%7Cb%7C'+maparray[i].count
    	});

    	if(maparray[i].count){
    		var divnum = document.getElementById(maparray[i].count);
//    		$(divnum).attr("gid", i);

    		google.maps.event.addDomListener(divnum, 'click', function(e) {
        		count = $(this).attr("id");
    			toggleBounce(count-1);
   			});
    	}
    	marker[i].setMap(window.mapgathering );
	
      }
}

function toggleBounce(count) {
//	var j= $("#"+count).attr("id");
	var j=count;
//	console.log("j2: "+j);
	
//	window.mapgathering.setZoom(18);
//	window.mapgathering.setMapType(google.maps.MapTypeId.ROADMAP);
	var myLatlng = marker[j].getPosition();
	window.mapgathering.setCenter(myLatlng);
	marker[j].setAnimation(google.maps.Animation.BOUNCE);

	setTimeout("window.marker["+j+"].setAnimation(null)", 2150);
}


// initalize will only run when page has completely loaded. So we push
// the locations into an array and let initialize add markers.
function setgmapiconmarker(lat, long, destname, iconurl)
{
    	maparrayhidden.push({latitude: lat, longitude: long, destination: destname, iconurl: iconurl});
//    	window.searchcount++;
}
//initalize will only run when page has completely loaded. So we push
//the locations into an array and let initialize add markers.
function setgmapnumbermarker(lat, long, destname, count)
{
	console.log("setgmapnumbermarker( lat:"+lat+", lon: "+ long+", name: "+destname+", count: "+count+" )");
 	maparray.push({latitude: lat, longitude: long, destination: destname, count: count});
 	window.searchcount++;
}