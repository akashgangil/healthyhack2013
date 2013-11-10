#!/usr/bin/env ruby -I ../lib -I lib
# coding: utf-8

require 'sinatra'
set :server, 'thin'
set :port, 9999
connections = []
x=[]
count=0
r=rand(20..30)
get '/' do
  halt erb(:login) unless params[:user]
  erb :chat, :locals => { :user => params[:user].gsub(/\W/, '') }
end

get '/stream', :provides => 'text/event-stream' do
  stream :keep_open do |out|
    connections << out
    out.callback { connections.delete(out) }
  end
end

post '/' do
  x << connections.sample
  x.each { |out| out << "{poke:true}data: \"<div class=\"game_pokeball_closed\"></div>\n\n" }
  x=[]
  count=count+1
  if count > r
	puts "r"
	puts r
	r=rand(20..30)
	puts "r"
	puts r
	puts count
	count=0
	puts "count"
	puts count
	connections.each { |out| out << "data: Game Over\n\n" }	
  end
  204 # response without entity body
end

__END__

@@ layout
<html>
<head>
<title>Super Simple Chat with Sinatra</title>
<meta charset="utf-8" />
</head>
</html>

@@ chat
<pre id='chat'></pre>
<form>
<input id='msg' placeholder='type message here...' />
</form>

<script>
// reading
var es = new EventSource('/stream');
es.onmessage = function(e) { $('#chat').append(e.data + "\n") };

// writing
$("form").on('submit',function(e) {
$.post('/', {msg: "<%= user %>: " + $('#msg').val()});
$('#msg').val(''); $('#msg').focus();
e.preventDefault();
});
</script>
