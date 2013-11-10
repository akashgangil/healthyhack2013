require 'sinatra'
require 'mongo'
require 'json/ext'
require 'cf-app-utils'

include Mongo
if ENV['VCAP_SERVICES']
  db = JSON.parse(ENV['VCAP_SERVICES'])["mongolab-n/a"]
  credentials = db.first["credentials"]
  uri = credentials["uri"]
else
  uri = 'mongodb://CloudFoundry_46pg6anj_ejufv6k0_h48mhcne:_zj_Wtoi9qhLZNDKy5IxC-Q0JJjbviAW@ds053788.mongolab.com:53788/CloudFoundry_46pg6anj_ejufv6k0'
end

set :public_folder, './client'

client = Mongo::MongoClient.from_uri(uri)

db_name = uri[%r{/([^/\?]+)(\?|$)}, 1]
db = client.db(db_name)

users = db.collection("users")
rooms = db.collection("rooms")
get '/' do
  puts "Serve"
  send_file File.join(settings.public_folder, 'index.html')
end

get '/users' do
  puts "GET on USERS! #{params[:name]}"
  content_type :json
  user = users.find({ 'name' => params[:name], 'email'=> params[:email] })
  if(user.has_next?)
      user.next.to_json
  else
      status 404
  end
end

post '/users' do
  content_type :json
  puts "Name is #{params[:name]}"
  puts "Email is #{params[:email]}"
  user = users.find({ 'name' => params[:name], 'email'=> params[:email] })
  if(!user.has_next?) 
    puts "User not present, inserting into the database"
    user = users.insert({:name => params[:name] , :email => params[:email]})
  else
    status 400
  end  
end

post '/rooms' do
  content_type :json
  puts "Room Name #{params[:roomName]}"
  puts "email is #{params[:email]}"
  puts "name is #{params[:name]}"
  room = rooms.find({'roomName' => params[:roomName]}) 
  if(!room.has_next?)
      puts "Room doesnt exist"
      room = rooms.insert(
                          {:roomName => params[:roomName], :members => [
                                                                        {:name => params[:name],
                                                                         :email => params[:email]}
                                                                       ]
                          }
                        ) 
      room.to_json
  else  
    room = room.next
    puts room
    js = JSON.parse(room.to_json)
    m = Array.new
    m = m + js["members"]
    m = m + [{"name" => params[:name], "email" => params[:email]}]
    puts "Members"
    puts m
    r = rooms.update(
                  {:roomName => params[:roomName]},
                  {:roomName => params[:roomName], :members => m}
                ).to_json
    puts "Updated to "
    puts r
    r
  end    
end 


get '/waiting_rooms' do
  room = rooms.find({:roomName => params[:roomName]})
  room.next.to_json
end

post '/waiting_rooms' do
  ids = rooms.update({:roomName => params[:roomName]}, { "$set" => {"ready"=>"true"} })
  ids.to_json
end

get '/rooms' do
  all_rooms = rooms.find()
  out = Array.new
  all_rooms.each { |row| out = out + [row.to_json] }
  out.to_json
end 


