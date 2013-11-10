require 'sinatra'
require 'mongo'
require 'json/ext'
require 'mongoid'
require 'cf-app-utils'

include Mongo

#Mongoid.load!("mongoid.yml", :development)

#mongo_db = JSON.parse(ENV['VCAP_SERVICES'])["mongolab-n/a"]
#credentials = db.first["credentials"]
#uri = credentials["uri"]



#Mongoid.database = Mongo::Connection.new(uri)
#Mongoid.database.authenticate(user, pass)

set :public_folder, 'client'

class User
    include Mongoid::Document

    field :name, type: String
    field :email, type: String
end

get '/' do
  puts "Serve"
  send_file File.join(settings.public_folder, 'index.html')
end

get '/users' do
  puts "GET on USERS! #{params[:name]}"
  content_type :json
  users = User.where(name: params[:name], email: params[:email])
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
  user = User.where(name: params[:name], email: params[:email])
  if(!user.exists?) 
    puts "User not present, inserting into the database"
    user = User.new(name: params[:name] , email: params[:email])
    user.save
  else
    status 400
  end  
end
