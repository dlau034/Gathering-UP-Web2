/**
 * 
 */
//var mapgathering;
//initialize();

window.searchcriteria ={};
window.searchagain;
window.searchcount=1;

var maparray=[];

function initialize() {
	var mapOptions = {
          center: new google.maps.LatLng(maparray[0].latitude, maparray[0].longitude),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
        window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//        window.mapgathering.style.width='100%';
//        window.mapghatering.style.height='100%';
        
    for(var i=0; i<maparray.length; i++)
    {
    	var imageurl;
    	if(maparray[i].iconurl){
    		imageurl =maparray[i].iconurl;
    	}else{
    		imageurl = 'https://chart.googleapis.com/chart?chst=d_map_spin&chld=.6%7C0%7C44dBbC%7C11%7Cb%7C'+maparray[i].count;
    	}
          	var myLatlng = new google.maps.LatLng(maparray[i].latitude,maparray[i].longitude);
        	var marker = new google.maps.Marker({
        	    position: myLatlng,
        	    title: maparray[i].destination,
          	    icon: imageurl
        	});
        	marker.setMap(window.mapgathering );
        	
      }
}
      
// initalize will only run when page has completely loaded. So we push
// the locations into an array and let initialize add markers.
function setgmapiconmarker(lat, long, destname, iconurl)
{
    	maparray.push({latitude: lat, longitude: long, destination: destname, iconurl: iconurl});
    	window.searchcount++;
}
//initalize will only run when page has completely loaded. So we push
//the locations into an array and let initialize add markers.
function setgmapnumbermarker(lat, long, destname, count)
{
 	maparray.push({latitude: lat, longitude: long, destination: destname, count: count});
 	window.searchcount++;
}

      
function formSubmit(newsearch)
{
	if(newsearch)
	{
		window.searchcount=1;

		var category_ids = [];
		var neighborhood_ids = [];
		var search = "";
		var zipcode = "";
		var geolocate=0;
		var criteria;
	
		var test = {test: category_ids};
		if($("#search").val())
		{
			search = $("#search").val();
		}
		if($("#categoryraw").val())
		{
			category_ids = $("#categoryraw").val();
		}
		if($("#neighborhoodraw").val())
		{
			neighborhood_ids = $("#neighborhoodraw").val();
		}	
		criteria ={category: category_ids,neighborhood: neighborhood_ids, search: search, page: 0};
		$("#businesssearchresults").html('');
		$('#resultview > input[value="More"]').remove();
		window.searchcriteria = criteria;
		window.searchagain=formSubmit;
	}else{
		criteria = searchcriteria;
		criteria.page++;
		window.searchcriteria = criteria;
	}
	$.ajax({
        type: "POST",
        url: "/find/restaurants",
        data: criteria,
        dataType: "json",
        success: function(data){
			jQuery.each(data, function(index, value){
				data[index].count=window.searchcount++;
			});
            if(data==false|| data=='false' || data==null)
            {
				if(newsearch){
					$("#businesssearchresults").html("<b>No results found</b>");
				}else{
					$('#resultview > input[value="More"]').remove();
				}
            }else{

            	var template  = $("#restaurants").html();
            	var temp = _.template(template, {outdata : data});
				if(newsearch){
					$('#resultview > input[value="More"]').remove();

					$("#businesssearchresults").html(temp);
					morebutton = '<input type="button" value="More" class="btn btn-blue btn-large span5" onclick="window.searchagain(0)" />';
					$(morebutton).appendTo("#resultview");
			
					var mapOptions = {
            			center: new google.maps.LatLng(40.741, -73.98),
            			zoom: 10,
            			mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
					if(data.length<10){
						$('#resultview > input[value="More"]').remove();
					}
				}else{
					if(data.length>0){
						$(temp).appendTo("#businesssearchresults");
						if(data.length<10){
							$('#resultview > input[value="More"]').remove();
						}
					}else{
						$('#resultview > input[value="More"]').remove();
					}
				}

				jQuery.each(data, function(index, value){
            	var myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
            	var marker = new google.maps.Marker({
            	    position: myLatlng ,
            	    title: value.destname,
              	    icon: 'https://chart.googleapis.com/chart?chst=d_map_spin&chld=.6%7C0%7C44cBfC%7C11%7Cb%7C'+value.count
            	});
            	marker.setMap(window.mapgathering );
				setbookmark(value.idbusiness);
	            
			});
            }
           },
        error: function(errMsg, ajaxOptions, thrownError) {
        	$("#map_canvas").html("");
        }
  });
}
function restaurantdetails(idrest){
	$.ajax({
        type: "POST",
        url: "/find/restaurants/one?idrest="+idrest,
        dataType: "json",
        success: function(data){
        	var myLatlng;
			jQuery.each(data, function(index, value){
	          	myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
	            
			});

        	window.mapgathering.setCenter(myLatlng);
        	window.mapgathering.setZoom(16);
           },
        error: function(errMsg) {
            alert(errMsg);
        }
  });
	
}

function restaurantcenter(latitude, longitude){
	var myLatlng = new google.maps.LatLng(latitude,longitude);
	window.mapgathering.setCenter(myLatlng);
	window.mapgathering.setZoom(16);
}

function randomrestaurant(){
	var neighborhood_ids;
	
	if($("#neighborhoodraw2").val())
	{
		neighborhood_ids = $("#neighborhoodraw2").val();
	}	
	criteria ={neighborhood: neighborhood_ids};

	$.ajax({
        type: "POST",
        url: "/find/restaurants/randomone",
        data: criteria,
        dataType: "json",
        success: function(data){
        	var myLatlng;
			jQuery.each(data, function(index, value){
	        	setbookmark(value.idbusiness);
	          	myLatlng = new google.maps.LatLng(value.latitude,value.longitude);
			});
	        var mapOptions = {
	                center: myLatlng,
	                zoom: 16,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	              };
            window.mapgathering = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        	var marker = new google.maps.Marker({
        	    position: myLatlng //,
        	});
        	marker.setMap(window.mapgathering );

            
			var template  = $("#restaurants").html();

			var temp = _.template(template, {outdata : data});
			$("#businesssearchresults").html(temp);
			$('#resultview > input[value="More"]').remove();
			
           },
        error: function(errMsg) {
            alert(errMsg);
        }
  });
	
}

// Set's bookmarks for search result templates.
function setbookmark(idrest)
{
		if(bookmarks[idrest]!=undefined && bookmarks[idrest])
		{
			$("#"+idrest).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
		}
}

// Toggles the bookmark flag 
function togglebusiness(idrest)
{
	if(bookmarks[idrest]==undefined || !bookmarks[idrest])
	{
		bookmarkrestaurant(idrest);
		bookmarks[idrest]=1;
	}else
	{
		unbookmarkrestaurant(idrest);
		bookmarks[idrest]=undefined;
	}
}
function bookmarkrestaurant(idrest)
{
		$.ajax({
	        type: "GET",
	        url: "/dining/bookmark?idbiz="+idrest,
	        success: function(data){
	            if(data=='true')
	            {
	                $("#"+idrest).html('<img src="/images/gtk-bookmark-on.png" width="30" align="bottom">');
	            }
	           },
	        error: function(errMsg) {
	        }
	  });
	return "#";
}
function unbookmarkrestaurant(idrest)
{
	$.ajax({
        type: "GET",
        url: "/dining/unbookmark?idbiz="+idrest,
        success: function(data){
            if(data=='true')
            {
                $("#"+idrest).html('<img src="/images/gtk-bookmark.png" width="30" align="bottom">');
            }
           },
        error: function(errMsg) {
        }
  });
	return "#";
}
function diningbookmarklogin(idrest)
{
	$(".bbookmark").val(idrest);
	loginpopup('/dining');
}

function uploadimage(idrest)
{
    $("#"+idrest+"output").html('<div style="padding:10px"><img src="/images/350.gif" alt="Please Wait"/> <span>Uploading...</span></div>');

	senddata = new FormData($('#'+idrest+'Form')[0]);
	
    $.ajax({
		url: '/imageupload/business?idbiz='+idrest,
		type: 'POST',
		data: senddata,
		cache: false,
		processData: false,
		contentType: false,
        success:  function (responseText){
        	if(responseText=="false"){
                $('#'+idrest+'imagename').val("");  // reset form
                $("#"+idrest+"output").html('<div style="padding:10px">Error: file not uploaded.</div>');
        	}else{
            $('#'+idrest+'imagename').val("");  // reset form
            $("#"+idrest+"output").html('<img  src="'+responseText+'" alt="Please Wait"/>');
        }
        }
    });
}
