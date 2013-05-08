
/*
 * The variable below should be set in the main page so that it can be prepopulated.
 * 
 * window.publishready = 0;  // Article is ready to be published
 * window.articleid = 0;  // The Article
 */

$(document).ready(function(){

	$(".btn-destory").click(function(){
		$(this).closest(".content_btn").slideUp("slow",function(){
			idsection = $(this).find('input[name="idsection"]').val();
			articleid =  $(this).find('input[name="articleid"]').val();
			if(idsection && idsection != ""){
				data={idsection: idsection, articleid: articleid};
				$.ajax({
					url: '/storycreate/removeitem',
					type: 'POST',
					data: data
				});
			}
			$(this).remove();
		});
	});
	$("#article").submit(function(e){
	    e.preventDefault();
	  });
	$("Form :input:submit").click(function() {
	    $(this).attr("disabled", true);
	});
});

function addmodule(element){
	if(!window.template){
		window.template  = $("#idmodule").html();
	}

	var temp = _.template(window.template,{articleid: window.articleid});

	// If there is a content_btn class, then append one after the class.
	if($(element).closest(".content_btn").length >0){
		$(element).closest(".content_btn").after(temp);
	}else{  // Else append one after this parent class.
		$(element).parent().after(temp);
	}

	$(".btn-destory").click(function(){
		$(this).closest(".content_btn").slideUp("slow",function(){
			idsection = $(this).find('input[name="idsection"]').val();
			articleid =  $(this).find('input[name="articleid"]').val();
			if(idsection && idsection != ""){
				data={idsection: idsection, articleid: articleid};
				$.ajax({
					url: '/storycreate/removeitem',
					type: 'POST',
					data: data
				});
				resequence();
			}
			$(this).remove();
		});
	});
	$("Form :input:submit").click(function() {
	    $(this).attr("disabled", true);
	});
	initlocationsearch();

}

function initlocationsearch(){
	$( ".locationsearch" ).typeahead({
		source: function (query, process) {
			var objarr = [];
              return $.get('/bit/localize/findlocation', { search: query }, function (data) {
//            	  console.log(data);
          		var name = jQuery.parseJSON(data);
          		$.each(name, function(i, name) {
//                    map[name.result] = name.id;
                    objarr.push(name.result);
//                    console.log("result: "+name.result+ ", id: "+ name.id);
                });

//console.log(objarr);
	            return process(objarr);
	        });
          },
          minLength: 2});
}

function savedarticle(element)
{
	var tzero = $(element).closest("Form");
	var senddata = new FormData($(tzero)[0]);
	var title = $(tzero).find('input[name="title"]').val();

	if(title.length == 0)
	{
		$("Form :input:submit").unbind("click");
    	$("Form :input:submit").removeAttr("disabled");
		return;
	}

    $.ajax({
		url: '/storycreate/articlecreate',
		type: 'POST',
		data: senddata,
		cache: false,
		processData: false,
		contentType: false,
        success:  function (responseText){

        	try{
        	var outdata = jQuery.parseJSON(responseText);
        	if(outdata.status!="false"){
        		var sequence = $(".sequence").length;
        		//console.log("num entries"+sequence);
        		if(sequence==0)
        		{
            		window.articleid=outdata.articleid;
            		addmodule($(element).parent());
            		$("#tutscreen_2").show();
//            		console.log("show...");
        		}else{
            		window.articleid=outdata.articleid;
        		}
//        		console.log(outdata);
        		if(outdata.thumbnail=='/' || outdata.thumbnail==''){
        			$(tzero).find(".placeholder_box>img").attr("src", "http://siteimages.gatheringup.com/images/placeholder_img2.jpg");
        		}else{
        			$(tzero).find(".placeholder_box>img").attr("src", outdata.thumbnail);
        		}
        		$(tzero).find(".form_sizing>.image_unit>span").html("");
//        		console.log($(tzero).find('input[type="file"]'));
        		$(tzero).find('input[type="file"]').val("");

        		var articleid = $(tzero).find('input[name="articleid"]');
        		$(articleid).val(window.articleid);
	        }
        	}catch(e){
            	$("Form :input:submit").removeAttr("disabled");
        		$("Form :input:submit").click(function() {
        		    $(this).attr("disabled", true);
        		});
//        		console.log("found json error!");
//        		console.log(e);
        		
        	}
        },
    	complete: function (){
	    	$("Form :input:submit").removeAttr("disabled");
    	}
    });

}

function savemodule(element){
	var tzero = $(element).closest("form");
	var senddata = new FormData($(tzero)[0]);
	var title = $(tzero).find('input[name="title"]').val();

	if(title.length == 0)
	{
		$("Form :input:submit").unbind("click");
    	$("Form :input:submit").removeAttr("disabled");
		return;
	}
//	console.log("calling ajax");
	$.ajax({
		url: '/storycreate/itemcreate',
		type: 'POST',
		data: senddata,
		cache: false,
		processData: false,
		contentType: false,
        success:  function (responseText){
        	try{
        	var outdata = jQuery.parseJSON(responseText);
//console.log(outdata);
        	if(outdata.status!="false"){
        		if(outdata.thumbnail=='/' || outdata.thumbnail==''){
        			$(tzero).find(".placeholder_box>img").attr("src", "http://siteimages.gatheringup.com/images/placeholder_img.jpg");
        		}else{
        			$(tzero).find(".placeholder_box>img").attr("src", outdata.thumbnail);
        		}
        		$(tzero).find(".form_sizing>.image_unit>span").html("");
//        		console.log($(tzero).find('input[type="file"]'));
        		$(tzero).find('input[type="file"]').val("");

        		var hidden = $(element).closest("Form").find('input[name="idsection"]');

//        		console.log("pre section: "+ $(hidden).val());
            	// If section id is not set, then set it.
        		if($(hidden).val() == undefined || $(hidden).val() == '')
        		{
        			if(!window.templatebutton){
        				window.templatebutton  = $("#idaddmodulebutton").html();
        			}

        			var temp = _.template(window.templatebutton,{});
        			$(element).closest(".content_btn").append(temp);
//console.log("setting section");
        			$(hidden).val(outdata.idsection);
        		}

        		// If section has been saved then show the publish button.
        		if(!window.publishready)
        		{
        			var publishbutton = $("#publishbutton").html();
        			var temp = _.template(publishbutton, {});
        			$(element).closest(".create_frame").append(temp);
        			window.publishready=1;
        		}

        		// resequence the sections.
        		resequence();	
	        }
        	}catch(e){
            	$("Form :input:submit").removeAttr("disabled");
        		$("Form :input:submit").click(function() {
        		    $(this).attr("disabled", true);
        		});
//        		console.log("found json error!");
//        		console.log(e);
        	}
        },
        error: function(){
	    	$("Form :input:submit").removeAttr("disabled");
        },
    	complete: function (){
	    	$("Form :input:submit").removeAttr("disabled");
    		$("Form :input:submit").click(function() {
    		    $(this).attr("disabled", true);
    		});
    	}
    });
}

function resequence()
{
	var sequence;
	$(".sequence").each(function(idx, val){
		sequence = (sequence==undefined) ? $(val).val() : sequence+","+$(val).val() ;
	});
	
	var data = { articleid: window.articleid, sequence: sequence };
	
	$.ajax({
		url: '/storycreate/resequence',
		type: 'POST',
		data: data,
        success:  function (responseText){
//        	console.log(responseText);
        }
	});
}

function uploadimage(element)
{
	$(element).parent().parent().find("span").html($(element).val());
	
	if(element.files[0] != undefined && element.files[0].size > 6000000)
	{
		alert("Files cannot be larger than 2MB: "+ element.files[0].size);
	}

}

function publishstory()
{
	console.log(window.articleid);
	window.location = "/storycreate/publish?articleid="+window.articleid;
}
