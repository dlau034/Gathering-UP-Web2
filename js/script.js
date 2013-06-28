
$(document).ready(function(){
	$(".mini_item").hover(function(){
		$(this).find(".CTA_button_mini").toggle();
	});
		$(".item_tab").click(function() {
			$(this).parent().children(".item_content").slideToggle();
			$(this).children("span").toggleClass("icon-chevron-down");
			$(this).children("span").toggleClass("icon-chevron-up");
//			$(this).children("span").toggleClass("up_arrow");
		});
	$(".nearby_item").off('mouseenter mouseleave');
	$(".nearby_item").hover(function(){
		$(this).find(".CTA_button").toggle();
	});

});


