var i;
function render_waiting_room(room_name, isAdmin) {
  var template = Handlebars.compile(template_waiting_room);
    
  var context = {}
  var html    = template(context);
	
	$( ".content_container" ).html( html );
	
	i = setInterval(function() {check_room_ready(room_name)}, 2000);
	 
	if(isAdmin) { 
		$(".content_container").prepend(
			'Once all of the players have joined, please select: <br/><button type="button" id="start_game" class="btn btn-default btn-lg">Start Game</button>');
		$("#start_game").on( "click", function() {  
			start_game(room_name);
		});
	} else {
		$(".content_container").prepend('Waiting to start...');
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
						console.log("check room ready: room: ");
						console.log(data);
						if(data && data.ready == "true") {
							clearInterval(i);
					  		window.location = "/stream?roomName="+room_name+"&user="+global_user_name;
						}
						$(".list-group").html("");
						$.each(data.members, function(index, element) {
							$(".list-group").append('<a href="#" class="list-group-item">'+element.name+'</a>');
						});	
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
	clearInterval(i);
	$.ajax({
        url: "/waiting_rooms",
        type: "POST",
        data: { roomName: room_name},
        dataType: "html",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 starting game");
					}
					else if(jqXHR.status == 200) {
					  window.location = "/stream?roomName="+room_name+"&user="+global_user_name;
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
