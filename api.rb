require 'sinatra'
require 'mongo'
require 'json/ext'
require 'mongo_mapper'
require 'cf-app-utils'

include Mongo
if ENV['VCAP_SERVICES']
  db = JSON.parse(ENV['VCAP_SERVICES'])["mongolab-n/a"]
  credentials = db.first["credentials"]
  uri = credentials["uri"]
else
  uri = 'mongodb://CloudFoundry_46pg6anj_ejufv6k0_h48mhcne:_zj_Wtoi9qhLZNDKy5IxC-Q0JJjbviAW@ds053788.mongolab.com:53788/CloudFoundry_46pg6anj_ejufv6k0'
end

  
client = Mongo::MongoClient.from_uri(uri)

db_name = uri[%r{/([^/\?]+)(\?|$)}, 1]
db = client.db(db_name)

set :public_folder, './client'
#Mongoid.load!("mongoid.yml", :development)

class User
    include MongoMapper::Document
    key :name, String
    key :email, String
end

get '/' do
  puts User.all()
  puts "Serve"
  send_file File.join(settings.public_folder, 'index.html')
end

get '/users' do
  puts "GET on USERS! #{params[:name]}"
  content_type :json
  users = User.where(:name => params[:name], :email => params[:email])
  if(users.exists?)
      users.first.to_json
  else
      status 404
  end
end

post '/users' do
  content_type :json
  puts "Name is #{params[:name]}"
  puts "Email is #{params[:email]}"
  user = User.where(:name => params[:name], :email => params[:email])
  if(!user.exists?) 
    puts "User not present, inserting into the database"
    user = User.new(:name => params[:name] , :email => params[:email])
    user.save!
  else
    status 400
  end  
end
