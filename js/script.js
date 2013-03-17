$(document).ready(function(){
	$(".nearby_item").hover(function(){
		$(this).find(".CTA_button").toggle();
	});
});

$(document).ready(function() {
	$(".item_tab").click(function() {
		$(this).parent().siblings(".item_content").slideToggle();
	});
});

$(document).ready(function(){
	$("#Outing_frame").resizable();
});
