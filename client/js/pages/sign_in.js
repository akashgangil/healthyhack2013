var global_user_name;
var global_parent_email;

function render_sign_in() {
    var template = Handlebars.compile(template_sign_in);
    
    var context = {}
    var html    = template(context);
    $( ".content_container" ).html( html );
    
    $("#sign_in").on( "click",function() {  
        check_login($("#user_name").val(), $("#parent_email").val());  
    });
}

function check_login(user_name, parent_email) {
    alert("check login");
    $.ajax({
        url: server_url+"/users",
        type: "GET",
        data: { name : user_name, email: parent_email },
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						register(user_name, parent_email);
					}
					else if(jqXHR.status == 200) {
						global_user_name = user_name;
						global_parent_email = parent_email;
						alert("user is logged in. do something?");
					}
					else {
						alert("check login error: " + jqXHR.status);
					}
        },
				error: function(data) {
					register(user_name, parent_email); 
				}
    });
}

function register(user_name, parent_email) {
    alert("register");
    $.ajax({
        url: server_url+"/users",
        type: "POST",
        data: { name : user_name, email: parent_email },
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 200) {
						check_login(user_name, parent_email);
					}
					else {
						alert("register error: " + jqXHR.status);
					}
        },
				error: function(data) {
						alert("so many errors in register");
				}
    });
}

