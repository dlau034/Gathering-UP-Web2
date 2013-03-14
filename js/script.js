$(document).ready(function(){
	$(".nearby_item").hover(function(){
		$(".CTA_button").toggle();
	});
});

$(document).ready(function(){
	$(".item_tab").click(function(){
		$(".item_content").slideToggle();
	});
});

$(document).ready(function(){
	$("#Outing_frame").resizable();
});
