$(document).ready(function(){
	$(".nearby_item").hover(function(){
		$(this).find(".CTA_button").toggle();
	});
});

$(document).ready(function(){
	$(".mini_item").hover(function(){
		$(this).find(".CTA_button_mini").toggle();
	});
});

$(document).ready(function() {
	$(".item_tab").click(function() {
		$(this).parent().siblings(".item_content").slideToggle();
		$(this).children("span").toggleClass("up_arrow");
	});
});

$(document).ready(function() {
	$(".item_tab").click(function(){
		$(this).siblings(".item_content").slideToggle();
	});
});

// $(document).ready(function(){
// 	$("#Outing_frame").resizable();
// });

$(function() {
       var datePicker = $('#datepicker').datepicker({
 		 	inline: true,  
        	showOtherMonths: true,  
        	dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
       });

    $(".demo").scroll(function() { 
      datePicker.datepicker('hide');
      $('#datepicker').blur();  
    });
    
    $(window).resize(function() {
      datePicker.datepicker('hide');
            $('#datepicker').blur();  
    });
});

$(document).ready(function(){
	$(".btn-destory").click(function(){
		$(this).closest(".content_btn").fadeOut("slow",function(){
			$(this).remove();
		});
	});
});



      $(function(){ 
        $(".tier3").popover({container:'body',});  
      });  
         
