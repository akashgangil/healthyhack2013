function render_waiting_room(room_name, isAdmin) {
  var template = Handlebars.compile(template_waiting_room);
    
  var context = {}
  var html    = template(context);
	
	$( ".content_container" ).html( html );
	
	setInterval(check_room_ready(), 2000);
	 
	if(isAdmin) { 
		$(".content_container").prepend(
			'<button type="button" id="start_game" class="btn btn-default btn-lg">\
					<span class="glyphicon glyphicon-plus"></span> Create New Room\
			</button>');
		$("#start_room").on( "click", function() {  
			start_game();
		});
	}
	
	$(".list-group-item").on("click", function() {
		join_room($(this).html(), global_parent_email);
	});
}

function check_room_ready() {
	$.ajax({
        url: "/waiting_rooms",
        type: "GET",
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
					if(jqXHR.status == 404) {
						console.log("404 getting room list");
					}
					else if(jqXHR.status == 200) {
						alert(data);
						$.each(data, function(index, element) {
							$(".list_group").append('<a href="#" class="list-group-item">'+element.roomName+'</a>');
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

function start_game(room_name) {
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
						//call your thing
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