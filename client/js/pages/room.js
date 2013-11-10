function render_room() {
  var template = Handlebars.compile(template_room);
    
  var context = {}
  var html    = template(context);
	
	$( ".content_container" ).html( html );
	
	get_room_list();
	  
  $("#new_room").on( "click",function() {  
  	create_new_room($("#create_room_name").val(), global_parent_email);
  });
	
	$(".list-group-item").on("click", function() {
		join_room($(this).html(), global_parent_email);
	});
}

function get_room_list() {
	$.ajax({
        url: "/rooms",
        type: "GET",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 getting room list");
					}
					else if(jqXHR.status == 200) {
						alert(data);
						$.each(data, function(index, element) {
							$(".list-group").append('<a href="#" class="list-group-item">'+element.roomName+'</a>');
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

function create_new_room(room_name, email) {
	$.ajax({
        url: "/rooms",
        type: "POST",
        data: { roomName: room_name, email: email},
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 creating new room");
					}
					else if(jqXHR.status == 200) {
						console.log("created new room");
					}
					else {
						alert("check login error: " + jqXHR.status);
					}
        },
				error: function(data) {
					console.log("error creating room");
				}
    });
}

function join_room(room_name, email) {
	$.ajax({
        url: "/rooms",
        type: "POST",
        data: { roomName: room_name, email: email},
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 joining room");
					}
					else if(jqXHR.status == 200) {
						console.log("joining other room");
						render_waiting_room();
					}
					else {
						alert("check login error: " + jqXHR.status);
					}
        },
				error: function(data) {
					console.log("error joining room");
				}
    });
}

//function pokeball_clicked() {
//    alert("pokeball clicked");
//    $.ajax({
//        url: server_url+"/room",
//        type: "POST",
//        data: {msg: "torch_pass"},
//        dataType: "html",
//        success: function(data, textStatus, jqXHR) {
//					if(jqXHR.status == 404) {
//						//error occurred
//					}
//					else if(jqXHR.status == 200) {
//						//torch was passed to somebody
//					}
//					else {
//						alert("check login error: " + jqXHR.status);
//					}
//        },
//				error: function(data) {
//					//recieved error
//				}
//    });
//}
