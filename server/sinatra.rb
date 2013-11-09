require 'sinatra'
require 'mongo'
require 'json/ext'

include Mongo

configure do
  conn = MongoClient.new("localhost", 27017)
  set :mongo_connection, conn
  set :mongo_db, conn.db('test')
	set :public_folder, '/Users/donovanhatch/Documents/hackathon/healthyhack2013/client/'
end 


helpers do
  def object_id val
      BSON::ObjectId.from_string(val)
  end

  def document_by_id(val, coll)
     id = object_id(id) if String === id
     settings.mongo_db[coll].find_one(:_id => id).to_json
  end  
end

get '/' do
	puts settings.public_folder
    send_file File.join(settings.public_folder, 'index.html')
end

get '/users' do
  puts "GET on USERS! #{params[:name]}"
  #puts "GET ON USERS"
  content_type :json
  settings.mongo_db['test'].find.to_a.to_json
end

post '/users' do
  content_type :json
  puts "Name is #{params[:id]}"
  puts "Email is #{params[:email]}"
  settings.mongo_db['users'].insert params
end

get '/pokemons' do
  content_type :json
  settings.mongo_db['sessions'].find.to_a.to_json
end

post '/pokemons' do
  content_type :json
  settings.mongo_db['sessions'].insert params
end

get '/sessions' do
  content_type :json
  settings.mongo_db['sessions'].find.to_a.to_json
end

post '/sessions' do
  content_type :json
  settings.mongo_db['sessions'].insert params
end
