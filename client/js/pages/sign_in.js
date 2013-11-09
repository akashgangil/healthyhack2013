function render_sign_in() {
    var template = Handlebars.compile(template_sign_in);
    
    var context = {}
    var html    = template(context);
    $( ".content_container" ).append( html );
    
    $("#sign_in").on( "click",function() {  
        check_login($("#user_name").val(), $("#parent_email").val());  
    });
}

function check_login(user_name, parent_email) {
    alert("check login");
    $.ajax({
        url: "http://localhost:4567/users",
        type: "GET",
        data: { id : user_name, email: parent_email },
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					alert("check");
            if(jqXHR.status == 404) {
                register(); 
            }
            else if(jqXHR.status = 200) {
                //user is logged in   
            }
            else {
                alert("soooo many errors in check login");   
            }
        }
    });
}

function register(user_name, parent_email) {
    alert("register");
    $.ajax({
        url: "http://localhost:4567/users",
        type: "POST",
        data: { id : user_name, email: parent_email },
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 200) {
						check_login(user_name, parent_email);
					}
        },
				error: function(data) {
						alert("so many errors in register");
				}
    });
}

