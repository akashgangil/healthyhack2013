function render_waiting_room(room_name, isAdmin) {
  var template = Handlebars.compile(template_waiting_room);
    
  var context = {}
  var html    = template(context);
	
	$( ".content_container" ).html( html );
	
	setInterval(check_room_ready(room_name), 2000);
	 
	if(isAdmin) { 
		$(".content_container").prepend(
			'<button type="button" id="start_game" class="btn btn-default btn-lg">\
					Start Game\
			</button>');
		$("#start_room").on( "click", function() {  
			start_game(room_name);
		});
	}
}

function check_room_ready(room_name) {
	$.ajax({
        url: "/waiting_rooms",
        type: "GET",
				data: { roomName: room_name},
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 checking room ready");
					}
					else if(jqXHR.status == 200) {
						alert("check room ready: room: " + data);
//						$.each(data, function(index, element) {
//							$(".list_group").append('<a href="#" class="list-group-item">'+element.roomName+'</a>');
//						});	
					}
					else {
						console.log("check room ready error: " + jqXHR.status);
					}
        },
				error: function(data) {
					console.log("error checking if room is ready");
				}
    });
}

function start_game(room_name) {
	$.ajax({
        url: "/rooms",
        type: "POST",
        data: { roomName: room_name},
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 starting game");
					}
					else if(jqXHR.status == 200) {
						console.log("created new room");
						//call your thing
					}
					else {
						console.log("start game error: " + jqXHR.status);
					}
        },
				error: function(data) {
					console.log("error starting game");
				}
    });
}