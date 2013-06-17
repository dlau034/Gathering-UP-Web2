

//Toggles the bookmark flag 
function toggleplace(id, button)
{
	if(!window.isloggedin){
		registerpopup("#");
	}else{
//		console.log(button);
		if(bookmarks[id]==undefined || !bookmarks[id])
		{
			bookmarkplace(id, button);
			bookmarks[id]=1;
		}else
		{
			unbookmarkplace(id, button);
			bookmarks[id]=undefined;
		}
	}
}

function bookmarkplace(id, button)
{
	$.ajax({
	    type: "GET",
	    url: "/places/bookmark?idplace="+id,
//	        contentType: "application/json; charset=utf-8",
//	        dataType: "json",
	    success: function(data){
//	            alert("#"+idrest);
	        if(data=='true')
	        {
	        	$(button).removeClass("CTA_button");
	        	$(button).addClass("btn-orange");
	        	$(button).html("Bookmarked");
	        }
	    },
	    error: function(errMsg) {
	    }
	});
	return "#";
}

function unbookmarkplace(id, button)
{
	$.ajax({
     type: "GET",
     url: "/places/unbookmark?idplace="+id,
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
     success: function(data){
//         alert("#"+idrest+" "+data);
         if(data=='true')
         {
	        	$(button).addClass("CTA_button");
	        	$(button).removeClass("btn-orange");
	        	$(button).html('<i class="icon-bookmark icon-white"></i>Bookmark');
	        	$(button).show();
         }
     },
     error: function(errMsg) {
     }
	});
	return "#";
}

function placebookmarklogin(id)
{
	$(".pbookmark").val(id);
	loginpopup('/places');
}
