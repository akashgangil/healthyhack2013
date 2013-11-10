function render_room() {
  var template = Handlebars.compile(template_room);
    
  var context = {}
  var html    = template(context);
	
	get_room_list();
	  
  $("#new_room").on( "click",function() {  
  	create_new_room();
  });
}

function get_room_list() {
	$.ajax({
        url: server_url+"/room",
        type: "GET",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						//error occurred
					}
					else if(jqXHR.status == 200) {
						$.each(data, function(index, element) {
							$(".list_group").append('<a href="#" class="list-group-item">'+element.room_name+'</a>');
						});	
					}
					else {
						alert("check login error: " + jqXHR.status);
					}
        },
				error: function(data) {
					console.log("couldn't retrieve servers");
				}
    });
}

function create_new_room() {
	$.ajax({
        url: server_url+"/room",
        type: "POST",
        data: {},
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						//error occurred
					}
					else if(jqXHR.status == 200) {
						//$(".list_group").append();
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

function pokeball_clicked() {
    alert("pokeball clicked");
    $.ajax({
        url: server_url+"/room",
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