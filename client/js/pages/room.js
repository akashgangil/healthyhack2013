function render_room() {
    //var template = Handlebars.compile(template_sign_in);
    
    //var context = {}
    //var html    = template(context);
	
		var es = new EventSource('/stream');
		es.onmessage = function(e) { 
			$( ".content_container" ).html(e.data + "\n"); 
		};
    
    $(".game_pokeball").on( "click",function() {  
        pokeball_clicked();
    });
}

function check_if_torch() {
    alert("torch check");
    $.ajax({
        url: "http://localhost:4567/users",
        type: "GET",
        data: { id : user_name, email: parent_email },
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						register(user_name, parent_email);
					}
					else if(jqXHR.status == 200) {
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

function pokeball_clicked() {
    alert("pokeball clicked");
    $.ajax({
        url: "http://localhost:4567/room",
        type: "POST",
        data: {msg: "torch_pass"},
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						//error occurred
					}
					else if(jqXHR.status == 200) {
						//torch was passed to somebody
					}
					else {
						alert("check login error: " + jqXHR.status);
					}
        },
				error: function(data) {
					//recieved error
				}
    });
}