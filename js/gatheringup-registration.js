/**
 * 
 */

jQuery(document).ready(function() {

	$.ajax({
        type: "GET",
        url: "/user/facebookurl",
        cache: true,
        success: function(data){
			var outdata = jQuery.parseJSON(data);
			$(".facebookurl").attr("href",outdata.loginUrl);
           }
  });
//		$.get("/user/registerinit");
//		$('.dropdown-toggle ul.dropdown-menu form.form-horizontal, div.SignInField').click(function(e) {
		$('.dropdown-menu form#signin_content.clearfix span#logindropdownspan').click(function(e) {
			e.stopPropagation();
		});
		$(".dropdown-toggle").click(function(e){
			var x = setTimeout('$("#signin_content input:text:visible:first").focus()', 200);
//			var x = setTimeout('$("#loginsideform input:text:visible:first").focus()', 200);
		});
		$("#registerform").submit(function(e) {       
			register();
//		      alert('Fired!'); // <<<<<=====
		      e.preventDefault();
		});
		$("#signin_content").submit(function(e) {       
			loginsidedrop();
//		      alert('Fired!'); // <<<<<=====
		      e.preventDefault();
		});
		$("#forgotpw_modal").submit(function(e) {       
			forgotpassword();
//		      alert('Fired!'); // <<<<<=====
		      e.preventDefault();
		});
	      $('.dropdown-menu').click(function(event){
	           event.stopPropagation();
	       });
});

function checkloggedin(url)
{
	if(!window.isloggedin)
	{
//		console.log("logged in: "+window.isloggedin);
		registerpopup(url);
	}else{
//		console.log("not logged: "+window.isloggedin);
		window.location=url;
	}
	console.log("url: "+url);
}

function registerpopup(url)
{
//	console.log("registerpopup");
	$("#register_modal").modal('show');
    $('#register_modal').on('shown', function (e) {
 //   	console.log("register_modal");
    	$('input:text:visible:first', this).focus();
   // 	console.log("register_modal focus");
        });
	$("#Signin_Modal").modal('hide');
	 //$("#myModal").modal('show');
}

/*
 * Switching dialogs from login to registration
 */
function logintoforget()
{
    $('#forgotpw_modal').on('shown', function (e) {
    	$('input:text:visible:first', this).focus();
        });
	$("#Signin_Modal").modal('hide');
	$("#forgotpw_modal").modal('show');
}

function forgotpassword()
{
	email = $("#forgotemail").val();
	console.log("reset password: "+email);
	if(validemail(email)){
		forgotemail = {email: email};
		$.post('/user/resetpassword', forgotemail, function(data) {
			if(data=='true')
			{
				console.log("forgotpasswod");
				$("#forgotemail").val("");
				$('#forgotpw_modal').modal('hide');
			}
		  });
	}
}


function loginsidedrop()
{
	if($("#droploginemail").val() == ''  || $("#droploginpassword").val()=='' )
	{
		$("#SideDropLoginErrors").html('<font color="#ff3333">Invalid email or password.</font>');
		return;
	}
	email = $("#droploginemail").val();
	password =  $("#droploginpassword").val();
	logindata= {email: email, password: password};
	console.log(logindata);
	$.post('/user/loginbit', logindata, function(data) {
		console.log(data);
		if(data=='true')
		{
			$.get('/user/firstnamelastname', function(data2){
//				console.log(data2);
				var tempdata = JSON.parse(data2);
				
				var template  = $("#loggedintemplate").html();

				var temp = _.template(template, {user : tempdata});
				$("#loggedinuserspan").html(temp);
				window.isloggedin=1;
			});
//			window.location="/datebook";
//			$("#redirect").val("");
		}else{
		$("#SideDropLoginErrors").html('<font color="#ff3333">'+data+'</font>');
		}
	  });
}

function register()
{

		registerdata = $("#registerform").serialize();
//		alert(registerdata);
		
		$.post('/user/registerbit', registerdata, function(data) {
			if(data=='true')
			{
				$("#register_modal").modal('hide');
				$.get('/user/firstnamelastname', function(data2){
//					console.log(data2);
					var tempdata = JSON.parse(data2);
					
					var template  = $("#loggedintemplate").html();

					var temp = _.template(template, {user : tempdata});
					$("#loggedinuserspan").html(temp);
					window.isloggedin=1;
					$("#dp_label").popover({content: '<p style="padding: 5px; ">Welcome to GatheringUp!</p>', trigger: "manual", placement: "bottom", html: true});
					$("#dp_label").popover("show");
					setTimeout(function (){$("#dp_label").popover("destroy");},5000);
				});
			}else{
				$("#RegistrationErrors").html('<font color="#ff3333">'+data+'</font>');
			}
		  });
}

function validname(name)
{
	var regexp = /^[a-zA-Z0-9\-\.\,\_\s]+$/;
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexp) == -1)
	    { return false; }
	else
	    { return true; }
}
function validemail(name)
{
	console.log(name+"\n");
	var regexp = /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9\.\_]+\.[a-zA-Z]{2,4}$/;
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexp) == -1){
		console.log("false");
		return false; 
		}
	else
	    { return true; }
}
function validpassword(name)
{
	var regexpnum = /[0-9]/;
//	var regexpstr = /[A-Z]/;
	
	if(name==null || name.length==0)
	{		return false;	}
	if (name.search(regexpnum) != -1 && name.length>8)
	    { return true; }
	else
	    { return false; }
}
